'use client';

import { Component, ReactNode } from 'react';
import { ErrorDisplay } from './errors/ErrorDisplay';
import { logError, handleError } from '@/lib/utils/errorHandler';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryTimeout?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorCount: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error
    const appError = handleError(error);
    logError(appError, 'ErrorBoundary');

    // Increment error count
    this.setState((prev) => ({
      errorCount: prev.errorCount + 1,
    }));

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Auto retry once after 2 seconds (only for first error)
    if (this.state.errorCount === 0) {
      this.retryTimeout = setTimeout(() => {
        this.handleReset();
      }, 2000);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  handleReset = () => {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
    this.setState({ hasError: false, error: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/home';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error display
      const appError = this.state.error ? handleError(this.state.error) : undefined;

      return (
        <div className="mobile-container min-h-screen flex items-center justify-center">
          <ErrorDisplay
            type={appError?.type}
            message={
              appError?.message ||
              'Ops! Algo inesperado aconteceu. Pedimos desculpas pelo inconveniente.'
            }
            onRetry={this.state.errorCount < 2 ? this.handleReset : this.handleReload}
            onGoHome={this.handleGoHome}
            showHomeButton={this.state.errorCount >= 2}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
