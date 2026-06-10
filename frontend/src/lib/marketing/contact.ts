export const CONTACT = {
  name: 'Vishal Wadekar',
  phone: '7387340570',
  phoneE164: '917387340570',
  phoneDisplay: '+91 73873 40570',
  phoneHref: 'tel:+917387340570',
  whatsappHref: 'https://wa.me/917387340570',
  kaya: {
    name: 'Kaya',
    phone: '7219696769',
    phoneE164: '917219696769',
    phoneDisplay: '+91 72196 96769',
    phoneHref: 'tel:+917219696769',
    whatsappHref: 'https://wa.me/917219696769',
    whatsappGreeting: "Hi Kaya, I'd like to learn more about ALIGN Network.",
  },
  emails: [
    { address: 'vishal5952v@gmail.com', label: 'Primary' },
    { address: 'alignecosystems@gmail.com', label: 'ALIGN Ecosystems' },
  ],
} as const;

export function buildWhatsAppUrl(phoneE164: string, text: string) {
  return `https://wa.me/${phoneE164}?text=${encodeURIComponent(text)}`;
}

export function buildGmailComposeUrl(to: string, subject?: string, body?: string) {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to });
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function buildContactWhatsAppMessage(data: { name: string; email: string; message: string }) {
  return `Hi, I'm ${data.name} (${data.email}).\n\n${data.message}`;
}
