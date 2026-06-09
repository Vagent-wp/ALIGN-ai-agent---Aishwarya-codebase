import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LandingPage } from '@/pages/LandingPage';
import { AboutPage } from '@/pages/AboutPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { ContactPage } from '@/pages/ContactPage';
import { EarlyAccessPage } from '@/pages/EarlyAccessPage';
import { ThankYouPage } from '@/pages/ThankYouPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="thank-you" element={<ThankYouPage />} />
      </Route>

      {/* Wizard — full viewport, no public footer */}
      <Route path="early-access" element={<EarlyAccessPage />} />

      {/* Future-ready dashboard shell */}
      <Route path="dashboard" element={<DashboardLayout />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
