'use client';

/**
 * Error Handler Utilities
 * Sistema centralizado de tratamento e logging de erros
 */

export type ErrorType =
  | 'network'
  | 'validation'
  | 'authentication'
  | 'authorization'
  | 'notFound'
  | 'server'
  | 'unknown';

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: Error;
  statusCode?: number;
  retry?: boolean;
}

/**
 * Classe de erro customizada da aplicação
 */
export class ApplicationError extends Error {
  type: ErrorType;
  statusCode?: number;
  retry: boolean;

  constructor(
    type: ErrorType,
    message: string,
    statusCode?: number,
    retry: boolean = false
  ) {
    super(message);
    this.name = 'ApplicationError';
    this.type = type;
    this.statusCode = statusCode;
    this.retry = retry;
  }
}

/**
 * Determina o tipo de erro baseado na resposta
 */
export function getErrorType(error: any): ErrorType {
  // Network errors
  if (!navigator.onLine) return 'network';
  if (error.message?.includes('fetch')) return 'network';

  // HTTP status codes
  if (error.status || error.statusCode) {
    const status = error.status || error.statusCode;

    if (status === 401) return 'authentication';
    if (status === 403) return 'authorization';
    if (status === 404) return 'notFound';
    if (status === 422) return 'validation';
    if (status >= 500) return 'server';
  }

  return 'unknown';
}

/**
 * Cria mensagem amigável baseada no tipo de erro
 */
export function getFriendlyErrorMessage(type: ErrorType): string {
  const messages: Record<ErrorType, string> = {
    network: 'Ops! Parece que você está sem conexão. Verifique sua internet e tente novamente.',
    validation: 'Alguns dados não estão corretos. Por favor, revise e tente novamente.',
    authentication: 'Sua sessão expirou. Por favor, faça login novamente.',
    authorization: 'Você não tem permissão para acessar isso.',
    notFound: 'Não conseguimos encontrar o que você procura.',
    server: 'Algo deu errado em nossos servidores. Estamos trabalhando nisso!',
    unknown: 'Ops! Algo inesperado aconteceu. Tente novamente em alguns instantes.',
  };

  return messages[type];
}

/**
 * Determina se o erro permite retry
 */
export function canRetry(type: ErrorType): boolean {
  return ['network', 'server'].includes(type);
}

/**
 * Processa erro e retorna objeto padronizado
 */
export function handleError(error: any): AppError {
  // Se já é um ApplicationError
  if (error instanceof ApplicationError) {
    return {
      type: error.type,
      message: getFriendlyErrorMessage(error.type),
      originalError: error,
      statusCode: error.statusCode,
      retry: error.retry,
    };
  }

  // Processa outros erros
  const type = getErrorType(error);
  const retry = canRetry(type);

  return {
    type,
    message: getFriendlyErrorMessage(type),
    originalError: error,
    statusCode: error.status || error.statusCode,
    retry,
  };
}

/**
 * Logger de erros (pode ser integrado com Sentry futuramente)
 */
export function logError(error: AppError | Error, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔴 Error ${context ? `in ${context}` : ''}`);
    console.error('Message:', error.message);
    if ('type' in error) {
      console.error('Type:', error.type);
      console.error('Can Retry:', error.retry);
    }
    if ('originalError' in error && error.originalError) {
      console.error('Original:', error.originalError);
    }
    console.groupEnd();
  }

  // TODO: Integrar com serviço de logging (Sentry, etc)
  // Sentry.captureException(error);
}

/**
 * Função de retry com backoff exponencial
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Não faz retry se não for erro de rede/servidor
      const errorType = getErrorType(error);
      if (!canRetry(errorType)) {
        throw error;
      }

      // Aguarda com backoff exponencial
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Wrapper para fetch com tratamento de erro
 */
export async function safeFetch<T = any>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: AppError }> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorType = getErrorType({ status: response.status });
      throw new ApplicationError(
        errorType,
        getFriendlyErrorMessage(errorType),
        response.status,
        canRetry(errorType)
      );
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    const appError = handleError(error);
    logError(appError, `Fetch ${url}`);
    return { error: appError };
  }
}

/**
 * Wrapper para async functions com tratamento de erro
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
  context?: string
): Promise<{ data?: T; error?: AppError }> {
  try {
    const data = await fn();
    return { data };
  } catch (error) {
    const appError = handleError(error);
    logError(appError, context);
    return { error: appError };
  }
}
