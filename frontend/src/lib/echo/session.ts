const NAME_KEY = 'echo_user_name';

export function getEchoUserName(): string | null {
  try {
    return localStorage.getItem(NAME_KEY);
  } catch {
    return null;
  }
}

export function setEchoUserName(name: string): void {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    /* ignore */
  }
}

export function parseVisitorName(input: string): string {
  const trimmed = input.trim();
  const withoutPrefix = trimmed
    .replace(/^(hi|hey|hello|i'm|i am|my name is|this is|it's|its|call me)\s+/i, '')
    .trim();
  const word = (withoutPrefix || trimmed).split(/\s+/)[0] ?? trimmed;
  if (!word) return 'there';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
