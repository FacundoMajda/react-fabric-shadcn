export const logger = {
  error: (message: string, error?: any, context?: Record<string, any>) => {
    const logData = {
      message,
      error,
      context,
      timestamp: new Date().toISOString(),
    };
    if (import.meta.env.DEV) {
      console.error("[API Error]", logData);
    } else {
      // TODO: Enviar a servicio de logging (e.g., Sentry, LogRocket)
      // sendToLoggingService(logData);
    }
  },
  info: (message: string, context?: Record<string, any>) => {
    const logData = { message, context, timestamp: new Date().toISOString() };
    if (import.meta.env.DEV) {
      console.info("[API Info]", logData);
    }
  },
  warn: (message: string, context?: Record<string, any>) => {
    const logData = { message, context, timestamp: new Date().toISOString() };
    if (import.meta.env.DEV) {
      console.warn("[API Warn]", logData);
    }
  },
};
