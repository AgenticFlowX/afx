/**
 * Database configuration and connection pool
 *
 * @see docs/adr/0002-database-choice.md
 * @see docs/specs/user-auth/design.md#data-model
 */

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  maxConnections: number;
  ssl: boolean;
}

export function createPool(config: DatabaseConfig) {
  return {
    async query<T>(sql: string, params?: unknown[]): Promise<T[]> {
      throw new Error('Not implemented');
    },
    async transaction<T>(fn: (client: unknown) => Promise<T>): Promise<T> {
      throw new Error('Not implemented');
    },
    async close(): Promise<void> {
      throw new Error('Not implemented');
    },
  };
}

export const defaultConfig: DatabaseConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME ?? 'showcase',
  maxConnections: 10,
  ssl: process.env.NODE_ENV === 'production',
};
