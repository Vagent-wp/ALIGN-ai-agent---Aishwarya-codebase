import { Navigate, Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { LandingPage } from '@/pages/LandingPage';
import { AboutPage } from '@/pages/AboutPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { ContactPage } from '@/pages/ContactPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { IndustriesPage } from '@/pages/IndustriesPage';
import { ThankYouPage } from '@/pages/ThankYouPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectDashboardPage } from '@/pages/ProjectDashboardPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminProfilesPage } from '@/pages/admin/AdminProfilesPage';
import { AdminProfileDetailPage } from '@/pages/admin/AdminProfileDetailPage';
import { AdminActivityPage } from '@/pages/admin/AdminActivityPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDashboardPage />} />
        <Route path="thank-you" element={<ThankYouPage />} />
      </Route>

      {/* Public onboarding — anyone can register */}
      <Route path="onboarding" element={<OnboardingPage />} />

      {/* Legacy paths → public onboarding */}
      <Route path="early-access" element={<Navigate to="/onboarding" replace />} />
      <Route path="dashboard/onboarding" element={<Navigate to="/onboarding" replace />} />

      {/* Member dashboard — login coming soon */}
      <Route path="dashboard" element={<DashboardLayout />} />

      {/* Admin */}
      <Route path="admin">
        <Route index element={<AdminLoginPage />} />
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="profiles" element={<AdminProfilesPage />} />
          <Route path="profiles/:id" element={<AdminProfileDetailPage />} />
          <Route path="activity" element={<AdminActivityPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
