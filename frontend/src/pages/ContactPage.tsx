import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { BRAND } from '@/lib/brand';
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
        subtitle={`Have questions about ${BRAND.company}, ${BRAND.platform}, or ${BRAND.assistant}? We'd love to hear from you.`}
      />

      <div className="mx-auto max-w-md md:max-w-lg">
        {submitted ? (
          <div className="dashboard-panel animate-fade-in p-8 text-center">
            <h2 className="text-lg font-semibold">Message sent!</h2>
            <p className="mt-2 text-sm text-muted-foreground">We'll get back to you soon.</p>
            <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
              Back to home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="dashboard-panel space-y-5 p-6 md:p-8">
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
  );
}
