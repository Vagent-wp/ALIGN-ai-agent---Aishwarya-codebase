import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, User } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { BRAND } from '@/lib/brand';
import { CONTACT } from '@/lib/marketing/contact';
import { InvLabel } from '@/components/marketing/invisible/Editorial';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  };

  return (
    <div className="overflow-x-hidden">
      <section className="inv-section">
        <div className="inv-container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <InvLabel>Get in touch</InvLabel>
            <h1 className="inv-heading-lg mt-4">Contact us</h1>
            <p className="inv-body mt-4">
              Have questions about {BRAND.company}, {BRAND.platform}, or our services? Reach out — we&apos;d love to
              hear from you.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="inv-card space-y-6 p-6 md:p-8">
              <div>
                <p className="inv-label">Direct contact</p>
                <p className="inv-body-sm mt-3">
                  For project inquiries, {BRAND.platform} partnerships, or custom AI & automation builds — contact us
                  directly.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-align-sky)] text-[var(--color-align-blue)]">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="inv-label !text-[10px]">Contact person</p>
                    <p className="inv-heading mt-1 !text-lg">{CONTACT.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-align-sky)] text-[var(--color-align-blue)]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="inv-label !text-[10px]">Phone</p>
                    <a
                      href={CONTACT.phoneHref}
                      className="mt-1 block text-base font-medium text-[var(--color-align-blue)] hover:underline"
                    >
                      {CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-align-sky)] text-[var(--color-align-blue)]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="inv-label !text-[10px]">Email</p>
                    <ul className="mt-2 space-y-2">
                      {CONTACT.emails.map((email) => (
                        <li key={email.address}>
                          <a
                            href={`mailto:${email.address}`}
                            className="block text-sm font-medium text-[var(--color-align-blue)] hover:underline"
                          >
                            {email.address}
                          </a>
                          <span className="inv-body-sm text-[var(--color-steel)]">{email.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <p className="border-t border-[var(--color-ash)] pt-4 inv-body-sm text-[var(--color-steel)]">
                {BRAND.company} · {BRAND.platform}
              </p>
            </div>

            <div>
              {submitted ? (
                <div className="inv-card animate-fade-in p-8 text-center">
                  <h2 className="inv-heading !text-xl">Message sent!</h2>
                  <p className="inv-body-sm mt-2">We&apos;ll get back to you soon.</p>
                  <Link to="/" className="inv-link mt-4 inline-flex">
                    Back to home
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="inv-card space-y-5 p-6 md:p-8">
                  <p className="inv-heading !text-lg">Send a message</p>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="inv-label !text-[10px]">
                      Name
                    </Label>
                    <Input id="name" touch placeholder="Your name" {...register('name')} />
                    {errors.name && (
                      <p className="text-sm font-medium text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="inv-label !text-[10px]">
                      Email
                    </Label>
                    <Input id="email" type="email" touch placeholder="you@example.com" {...register('email')} />
                    {errors.email && (
                      <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="inv-label !text-[10px]">
                      Message
                    </Label>
                    <Textarea id="message" placeholder="How can we help?" rows={4} {...register('message')} />
                    {errors.message && (
                      <p className="text-sm font-medium text-destructive">{errors.message.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="inv-btn-black !h-12 w-full !rounded-xl" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
