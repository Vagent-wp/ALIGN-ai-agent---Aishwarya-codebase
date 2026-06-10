import { InvLabel } from '@/components/marketing/invisible/Editorial';
import { BRAND } from '@/lib/brand';

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="inv-heading !text-lg md:!text-xl">{title}</h2>
      <div className="inv-body mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function PrivacyPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="inv-section">
        <div className="inv-container">
          <div className="mx-auto max-w-3xl">
            <InvLabel>Legal</InvLabel>
            <h1 className="inv-heading-lg mt-4">Privacy Policy</h1>
            <p className="inv-body-sm mt-2 text-[var(--color-steel)]">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="mt-10">
              <LegalSection title="1. Introduction">
                <p>
                  {BRAND.company} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates {BRAND.platform} and{' '}
                  {BRAND.assistant}. This Privacy Policy explains how we collect, use, and protect your information when
                  you use our services.
                </p>
              </LegalSection>
              <LegalSection title="2. Information We Collect">
                <p>
                  We may collect information you provide directly (name, email, phone number, profile details),
                  conversation data with {BRAND.assistant}, and usage analytics to improve our services.
                </p>
              </LegalSection>
              <LegalSection title="3. How We Use Your Information">
                <p>
                  We use your information to provide matchmaking services on {BRAND.platform}, improve AI responses,
                  communicate with you about early access and updates, and maintain platform security.
                </p>
              </LegalSection>
              <LegalSection title="4. Data Security">
                <p>
                  We implement industry-standard encryption and security measures. Phone numbers and sensitive data are
                  encrypted at rest.
                </p>
              </LegalSection>
              <LegalSection title="5. Your Rights">
                <p>
                  You may request access, correction, or deletion of your personal data by contacting us through our
                  contact page.
                </p>
              </LegalSection>
              <LegalSection title="6. Contact">
                <p>For privacy-related inquiries, please visit our Contact page.</p>
              </LegalSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
