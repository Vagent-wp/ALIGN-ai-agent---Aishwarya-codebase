import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { BRAND } from '@/lib/brand';
import {
  buildContactWhatsAppMessage,
  buildGmailComposeUrl,
  buildWhatsAppUrl,
  CONTACT,
} from '@/lib/marketing/contact';
import { InvLabel } from '@/components/marketing/invisible/Editorial';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState, type ReactNode } from 'react';

type ShortcutAction = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
  tone: 'sky' | 'peach' | 'lavender';
  angleDeg: number;
};

const SHORTCUT_RADIUS = 78;

function FloatingShortcutHub({ actions }: { actions: ShortcutAction[] }) {
  const toneIcon = {
    sky: 'bg-[var(--color-align-sky)] text-[var(--color-cobalt-spark)]',
    peach: 'bg-[var(--color-align-peach)] text-[var(--color-align-orange)]',
    lavender: 'bg-[var(--color-align-lavender)] text-[var(--color-cobalt-spark)]',
  };

  return (
    <div className="contact-shortcut-hub" aria-label="Quick contact shortcuts">
      <div className="contact-shortcut-hub__orbit" aria-hidden />
      <div className="contact-shortcut-hub__core" aria-hidden>
        <MessageCircle className="h-4 w-4 text-[var(--color-cobalt-spark)]" />
      </div>

      {actions.map((action) => {
        const Icon = action.icon;
        const rad = (action.angleDeg * Math.PI) / 180;
        const x = Math.cos(rad) * SHORTCUT_RADIUS;
        const y = Math.sin(rad) * SHORTCUT_RADIUS;

        return (
          <a
            key={action.title}
            href={action.href}
            target={action.external ? '_blank' : undefined}
            rel={action.external ? 'noopener noreferrer' : undefined}
            className="contact-shortcut-hub__node group"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={cn('contact-shortcut-hub__node-icon', toneIcon[action.tone])}>
              <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            </div>
            <span className="text-[10px] font-medium leading-tight text-[var(--color-carbon-ink)]">
              {action.title}
            </span>
            <span className="line-clamp-2 text-[9px] leading-tight text-[var(--color-steel)]">
              {action.subtitle}
            </span>
          </a>
        );
      })}
    </div>
  );
}

function ContactDetailRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="inv-label !text-[10px] text-[var(--color-steel)]">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-[var(--color-carbon-ink)]">{children}</dd>
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const personalEmail = CONTACT.emails[0];
  const primaryEmail = CONTACT.emails[1];
  const gmailPrimaryHref = buildGmailComposeUrl(
    primaryEmail.address,
    `Inquiry for ${BRAND.company}`,
    `Hi ${CONTACT.name},\n\n`,
  );
  const kayaWhatsAppHref = buildWhatsAppUrl(CONTACT.kaya.phoneE164, CONTACT.kaya.whatsappGreeting);

  const shortcuts: ShortcutAction[] = [
    {
      icon: Phone,
      title: 'Call now',
      subtitle: CONTACT.phoneDisplay,
      href: CONTACT.phoneHref,
      tone: 'sky',
      angleDeg: -90,
    },
    {
      icon: Mail,
      title: 'Gmail',
      subtitle: 'Compose an email',
      href: gmailPrimaryHref,
      external: true,
      tone: 'lavender',
      angleDeg: 150,
    },
    {
      icon: MessageCircle,
      title: 'Talk with Kaya',
      subtitle: CONTACT.kaya.phoneDisplay,
      href: kayaWhatsAppHref,
      external: true,
      tone: 'peach',
      angleDeg: 30,
    },
  ];

  const onSubmit = (data: ContactFormData) => {
    const url = buildWhatsAppUrl(CONTACT.phoneE164, buildContactWhatsAppMessage(data));
    setLastWhatsAppUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="overflow-x-hidden">
      <section className="inv-section !py-10 md:!py-12">
        <div className="inv-container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 text-center">
              <InvLabel>Get in touch</InvLabel>
              <h1 className="inv-heading mt-3 !text-2xl sm:!text-3xl">Contact us</h1>
            </div>

            <div className="inv-card overflow-hidden rounded-2xl !p-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
              <div className="flex flex-col border-b border-[var(--color-ash)] px-5 py-6 sm:px-6 lg:border-b-0 lg:border-r">
                <div>
                  <p className="inv-label">Direct contact</p>
                  <p className="inv-body-sm mt-2 text-[var(--color-steel)]">
                    For project inquiries, {BRAND.company} partnerships, or custom AI &amp; automation
                    builds — contact us directly.
                  </p>

                  <dl className="mt-5 space-y-3.5">
                    <ContactDetailRow label="Contact person">{CONTACT.name}</ContactDetailRow>
                    <ContactDetailRow label="Phone">
                      <a href={CONTACT.phoneHref} className="inv-link font-medium">
                        {CONTACT.phoneDisplay}
                      </a>
                    </ContactDetailRow>
                    <ContactDetailRow label="Email">
                      <a href={`mailto:${personalEmail.address}`} className="inv-link font-medium">
                        {personalEmail.address}
                      </a>
                    </ContactDetailRow>
                    <ContactDetailRow label="Primary">
                      <a href={`mailto:${primaryEmail.address}`} className="inv-link font-medium">
                        {primaryEmail.address}
                      </a>
                    </ContactDetailRow>
                  </dl>

                  <p className="mt-4 border-t border-[var(--color-ash)] pt-4 text-xs font-medium text-[var(--color-steel)]">
                    {BRAND.company}
                    <span className="mx-1.5 text-[var(--color-ash)]" aria-hidden>
                      ·
                    </span>
                    {BRAND.platform}
                  </p>
                </div>

                <div className="mt-6 border-t border-[var(--color-ash)] pt-6">
                  <p className="inv-label mb-1 text-center !text-[10px]">Quick shortcuts</p>
                  <FloatingShortcutHub actions={shortcuts} />
                  <p className="inv-body-sm mx-auto mt-3 max-w-[210px] text-center text-[var(--color-steel)]">
                    Tap to call, open Gmail, or chat with {BRAND.assistant}.
                  </p>
                </div>
              </div>

              <div className="bg-[var(--color-mist)]/35 px-5 py-5 sm:px-6 sm:py-6">
                {submitted ? (
                  <div className="flex min-h-[320px] flex-col items-center justify-center py-4 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(37,99,235,0.12)] bg-[var(--color-align-sky)] text-[var(--color-cobalt-spark)]">
                      <MessageCircle className="h-5 w-5" aria-hidden />
                    </div>
                    <h2 className="inv-heading mt-4 !text-lg">WhatsApp is ready</h2>
                    <p className="inv-body-sm mt-1.5 max-w-xs text-[var(--color-steel)]">
                      Message pre-filled for {CONTACT.phoneDisplay}.
                    </p>
                    <a
                      href={lastWhatsAppUrl ?? CONTACT.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inv-btn-black mt-4 inline-flex items-center gap-2 text-sm"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                      Open WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inv-link mt-3 text-sm"
                    >
                      Send another
                    </button>
                    <Link to="/" className="inv-link mt-1.5 text-sm">
                      Home <span aria-hidden>→</span>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                      <p className="inv-heading !text-lg">Send a message</p>
                      <p className="inv-body-sm mt-1 text-[var(--color-steel)]">
                        Opens WhatsApp to {CONTACT.phoneDisplay}.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="inv-label !text-[10px]">
                          Name
                        </Label>
                        <Input id="name" touch placeholder="Your name" {...register('name')} />
                        {errors.name && (
                          <p className="text-xs font-medium text-destructive">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="inv-label !text-[10px]">
                          Email
                        </Label>
                        <Input id="email" type="email" touch placeholder="you@example.com" {...register('email')} />
                        {errors.email && (
                          <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="inv-label !text-[10px]">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="How can we help?"
                          rows={3}
                          {...register('message')}
                        />
                        {errors.message && (
                          <p className="text-xs font-medium text-destructive">{errors.message.message}</p>
                        )}
                      </div>
                    </div>

                    <Button type="submit" className="inv-btn-black !h-10 w-full !rounded-xl text-sm">
                      <MessageCircle className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                      Send via WhatsApp
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
