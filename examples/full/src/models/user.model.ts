/**
 * User data model — core entity for authentication
 *
 * @see docs/specs/user-auth/design.md#data-model
 * @see docs/specs/user-auth/tasks.md#11-project-setup
 */

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  displayName: string;
  failedAttempts: number;
  lockedUntil: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
}

export interface RefreshToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
}
