/**
 * Logger Utility
 * Sistema centralizado de logging com proteção de ambiente
 *
 * Features:
 * - Logs apenas em desenvolvimento
 * - Type-safe
 * - Formatação consistente
 * - Preparado para integração futura com Sentry
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

/**
 * Logger principal da aplicação
 * Todos os logs são suprimidos em produção automaticamente
 */
export const logger = {
  /**
   * Loga erros críticos
   * Visível em dev e test, oculto em produção
   * @param message - Mensagem descritiva do erro
   * @param error - Objeto de erro (opcional)
   * @param context - Contexto/origem do erro (ex: 'HomePage', 'API:User')
   */
  error: (message: string, error?: unknown, context?: string) => {
    if (isDev || isTest) {
      const prefix = context ? `[${context}]` : '';
      const timestamp = new Date().toISOString();
      console.error(`🔴 ${timestamp} ${prefix} ${message}`, error || '');
    }
    // TODO: Integrar com Sentry em produção
    // if (!isDev && !isTest) {
    //   Sentry.captureException(error, { tags: { context }, extra: { message } });
    // }
  },

  /**
   * Loga avisos importantes
   * Apenas em desenvolvimento
   * @param message - Mensagem de aviso
   * @param data - Dados adicionais (opcional)
   * @param context - Contexto/origem
   */
  warn: (message: string, data?: unknown, context?: string) => {
    if (isDev) {
      const prefix = context ? `[${context}]` : '';
      const timestamp = new Date().toISOString();
      console.warn(`⚠️  ${timestamp} ${prefix} ${message}`, data || '');
    }
  },

  /**
   * Loga informações gerais
   * Apenas em desenvolvimento
   * @param message - Mensagem informativa
   * @param data - Dados adicionais (opcional)
   * @param context - Contexto/origem
   */
  info: (message: string, data?: unknown, context?: string) => {
    if (isDev) {
      const prefix = context ? `[${context}]` : '';
      const timestamp = new Date().toISOString();
      console.log(`ℹ️  ${timestamp} ${prefix} ${message}`, data || '');
    }
  },

  /**
   * Loga mensagens de debug detalhadas
   * Apenas em desenvolvimento
   * @param message - Mensagem de debug
   * @param data - Dados para debug
   */
  debug: (message: string, data?: unknown) => {
    if (isDev) {
      const timestamp = new Date().toISOString();
      console.debug(`🐛 ${timestamp} ${message}`, data || '');
    }
  },

  /**
   * Loga grupo de mensagens relacionadas
   * Apenas em desenvolvimento
   * @param label - Label do grupo
   * @param fn - Função que contém os logs do grupo
   */
  group: (label: string, fn: () => void) => {
    if (isDev) {
      console.group(label);
      fn();
      console.groupEnd();
    }
  },
};

/**
 * Wrapper para promises com logging automático de erros
 * @param fn - Função async a ser executada
 * @param context - Contexto para logging
 * @returns Promise com resultado ou erro
 */
export async function withLogging<T>(
  fn: () => Promise<T>,
  context: string
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    logger.error('Operation failed', error, context);
    throw error;
  }
}
