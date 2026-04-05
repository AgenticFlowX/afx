/**
 * Auth API routes — registration, login, token refresh, logout
 *
 * @see docs/specs/user-auth/design.md#api-design
 * @see docs/specs/user-auth/tasks.md#32-implement-api-routes
 */

import { getAuthService } from '../services/auth.service';
import { requireAuth } from '../middleware/auth.middleware';
import { isValidEmail } from '../utils/validation';

export function registerAuthRoutes(app: unknown, db: unknown) {
  const authService = getAuthService(db);

  return {
    async handleRegister(req: { body: { email: string; password: string; displayName: string } }) {
      return authService.register(req.body);
    },

    async handleLogin(req: { body: { email: string; password: string } }) {
      return authService.login(req.body);
    },

    async handleRefresh(req: { body: { refreshToken: string } }) {
      return authService.refresh(req.body.refreshToken);
    },

    async handleLogout(req: { headers: Record<string, string>; body: { refreshToken: string } }) {
      const authed = requireAuth(req);
      return authService.logout(req.body.refreshToken);
    },
  };
}
