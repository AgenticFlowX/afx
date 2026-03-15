/**
 * User repository — persistence layer for user entities
 *
 * @see docs/specs/user-auth/design.md#repository-implementation
 * @see docs/specs/user-auth/tasks.md#21-create-repository-interface
 */

import { User, UserProfile, RefreshToken } from '../models/user.model';
import { createPool } from '../config/database';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  updateFailedAttempts(id: string, attempts: number, lockedUntil: Date | null): Promise<void>;
  storeRefreshToken(token: Omit<RefreshToken, 'id' | 'createdAt'>): Promise<RefreshToken>;
  revokeRefreshToken(tokenHash: string): Promise<void>;
  findRefreshToken(tokenHash: string): Promise<RefreshToken | null>;
}

// TODO: Implement PostgreSQL adapter
// @see docs/specs/user-auth/tasks.md#22-implement-repository

export function createUserRepository(pool: ReturnType<typeof createPool>): UserRepository {
  return {
    async findById(id) {
      const rows = await pool.query<User>('SELECT * FROM users WHERE id = $1', [id]);
      return rows[0] ?? null;
    },
    async findByEmail(email) {
      const rows = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);
      return rows[0] ?? null;
    },
    async create(user) {
      throw new Error('Not implemented');
    },
    async updateFailedAttempts(id, attempts, lockedUntil) {
      throw new Error('Not implemented');
    },
    async storeRefreshToken(token) {
      throw new Error('Not implemented');
    },
    async revokeRefreshToken(tokenHash) {
      throw new Error('Not implemented');
    },
    async findRefreshToken(tokenHash) {
      throw new Error('Not implemented');
    },
  };
}
