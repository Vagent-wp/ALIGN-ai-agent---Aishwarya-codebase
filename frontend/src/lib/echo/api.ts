export interface EchoMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendEchoMessage(
  message: string,
  userName: string | null,
  history: EchoMessage[]
): Promise<string> {
  const res = await fetch('/api/echo/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, userName, history }),
  });

  const data = (await res.json()) as { reply?: string; error?: string };

  if (!res.ok) {
    throw new Error(data.error ?? 'Echo is unavailable right now.');
  }

  if (!data.reply) {
    throw new Error('No response from Echo.');
  }

  return data.reply;
}
