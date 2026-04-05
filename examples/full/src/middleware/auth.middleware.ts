/**
 * Authentication middleware — JWT verification and request context
 *
 * @see docs/specs/user-auth/design.md#api-design
 * @see docs/specs/user-auth/tasks.md#31-implement-auth-middleware
 * @see docs/specs/user-auth/research/0001-auth-strategy.md
 */

import { User } from '../models/user.model';
import { isValidEmail } from '../utils/validation';

export interface AuthContext {
  userId: string;
  email: string;
  displayName: string;
}

export interface AuthenticatedRequest {
  auth: AuthContext;
  headers: Record<string, string>;
  body: unknown;
}

// FIXME: Token expiry check not yet implemented
// @see docs/specs/user-auth/tasks.md#41-security-hardening

export function verifyToken(token: string): AuthContext | null {
  // Implementation placeholder — JWT verification
  throw new Error('Not implemented');
}

export function requireAuth(req: { headers: Record<string, string> }): AuthenticatedRequest {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('UNAUTHORIZED');
  }
  const token = authHeader.slice(7);
  const auth = verifyToken(token);
  if (!auth) {
    throw new Error('UNAUTHORIZED');
  }
  return { ...req, auth };
}
