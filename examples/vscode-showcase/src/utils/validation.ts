/**
 * Input validation utilities — shared across services
 *
 * @see docs/specs/user-auth/design.md#api-design
 * @see docs/specs/user-auth/tasks.md#11-project-setup
 */

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

export function sanitizeInput(input: string): string {
  return input.trim().toLowerCase();
}
