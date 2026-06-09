import { BRAND } from '@/lib/brand';

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-base font-semibold md:text-lg">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export function TermsPage() {
  return (
    <div className="page-shell py-10 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="mx-auto mt-10 max-w-3xl">
        <LegalSection title="1. Acceptance of Terms">
          <p>By accessing or using {BRAND.platform} and {BRAND.assistant}, you agree to be bound by these Terms & Conditions.</p>
        </LegalSection>
        <LegalSection title="2. Service Description">
          <p>{BRAND.assistant} is the intelligent business matchmaking assistant of {BRAND.platform}, operated by {BRAND.company}. The service connects users within the startup and business ecosystem via WhatsApp and related platform services.</p>
        </LegalSection>
        <LegalSection title="3. User Responsibilities">
          <p>You agree to provide accurate information, use the service lawfully, and not misuse the platform for spam, harassment, or fraudulent activities.</p>
        </LegalSection>
        <LegalSection title="4. AI Limitations">
          <p>{BRAND.assistant} provides recommendations and introductions but does not guarantee outcomes. Users are responsible for their own business decisions.</p>
        </LegalSection>
        <LegalSection title="5. Intellectual Property">
          <p>All platform content, branding, and technology belong to {BRAND.company}. Users retain ownership of content they submit.</p>
        </LegalSection>
        <LegalSection title="6. Limitation of Liability">
          <p>{BRAND.company} is not liable for indirect, incidental, or consequential damages arising from use of the service.</p>
        </LegalSection>
        <LegalSection title="7. Contact">
          <p>For questions about these terms, please contact us through our Contact page.</p>
        </LegalSection>
      </div>
    </div>
  );
}
