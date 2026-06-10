import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, User } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { BRAND } from '@/lib/brand';
import { CONTACT } from '@/lib/marketing/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeading } from '@/components/shared/SectionTitle';
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
    <div className="page-shell py-10 md:py-16">
      <SectionHeading
        title="Contact Us"
        subtitle={`Have questions about ${BRAND.company}, ${BRAND.platform}, or our services? Reach out — we'd love to hear from you.`}
      />

      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="dashboard-panel space-y-6 p-6 md:p-8">
          <div>
            <p className="section-title text-left">Get in touch</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              For project inquiries, ALIGN Network partnerships, or custom AI & automation builds — contact us directly.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact person</p>
                <p className="mt-1 font-poppins text-lg font-bold">{CONTACT.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</p>
                <a href={CONTACT.phoneHref} className="mt-1 block text-base font-semibold text-primary hover:underline">
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
                <ul className="mt-2 space-y-2">
                  {CONTACT.emails.map((email) => (
                    <li key={email.address}>
                      <a
                        href={`mailto:${email.address}`}
                        className="block text-sm font-medium text-primary hover:underline"
                      >
                        {email.address}
                      </a>
                      <span className="text-xs text-muted-foreground">{email.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="border-t border-border/50 pt-4 text-xs text-muted-foreground">
            {BRAND.company} · {BRAND.platform}
          </p>
        </div>

        <div>
          {submitted ? (
            <div className="dashboard-panel animate-fade-in p-8 text-center">
              <h2 className="text-lg font-semibold">Message sent!</h2>
              <p className="mt-2 text-sm text-muted-foreground">We&apos;ll get back to you soon.</p>
              <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                Back to home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="dashboard-panel space-y-5 p-6 md:p-8">
              <p className="font-poppins text-lg font-bold">Send a message</p>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold">Name</Label>
                <Input id="name" touch placeholder="Your name" {...register('name')} />
                {errors.name && <p className="text-sm font-medium text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">Email</Label>
                <Input id="email" type="email" touch placeholder="you@example.com" {...register('email')} />
                {errors.email && <p className="text-sm font-medium text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-semibold">Message</Label>
                <Textarea id="message" placeholder="How can we help?" rows={4} {...register('message')} />
                {errors.message && <p className="text-sm font-medium text-destructive">{errors.message.message}</p>}
              </div>
              <Button type="submit" className="h-12 w-full rounded-2xl font-bold" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
