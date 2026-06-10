const TOKEN_KEY = 'align_admin_token';
const EMAIL_KEY = 'align_admin_email';

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdminEmail(): string | null {
  return localStorage.getItem(EMAIL_KEY);
}

export function setAdminSession(token: string, email: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
}

export function clearAdminSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function isAdminLoggedIn(): boolean {
  return !!getAdminToken();
}
