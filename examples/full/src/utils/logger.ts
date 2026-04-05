/**
 * Structured logger — consistent logging across services
 *
 * @see docs/adr/0001-monorepo-structure.md
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug(msg: string, ctx?: Record<string, unknown>): void;
  info(msg: string, ctx?: Record<string, unknown>): void;
  warn(msg: string, ctx?: Record<string, unknown>): void;
  error(msg: string, ctx?: Record<string, unknown>): void;
}

export function createLogger(service: string): Logger {
  const log = (level: LogLevel, msg: string, ctx?: Record<string, unknown>) => {
    const entry = { timestamp: new Date().toISOString(), level, service, msg, ...ctx };
    console.log(JSON.stringify(entry));
  };

  return {
    debug: (msg, ctx) => log('debug', msg, ctx),
    info: (msg, ctx) => log('info', msg, ctx),
    warn: (msg, ctx) => log('warn', msg, ctx),
    error: (msg, ctx) => log('error', msg, ctx),
  };
}
