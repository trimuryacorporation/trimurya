import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Services from '../pages/Services.jsx';
import AiProjectManagement from '../pages/AiProjectManagement.jsx';
import WebsiteDevelopment from '../pages/WebsiteDevelopment.jsx';
import DigitalMarketing from '../pages/DigitalMarketing.jsx';
import BusinessConsultancy from '../pages/BusinessConsultancy.jsx';
import HrConsultancy from '../pages/HrConsultancy.jsx';
import MobileAppDevelopment from '../pages/MobileAppDevelopment.jsx';
import CloudSolutions from '../pages/CloudSolutions.jsx';
import Cybersecurity from '../pages/Cybersecurity.jsx';
import Industries from '../pages/Industries.jsx';
import Projects from '../pages/Projects.jsx';
import ProjectDetail from '../pages/ProjectDetail.jsx';
import CaseStudies from '../pages/CaseStudies.jsx';
import CaseStudyDetail from '../pages/CaseStudyDetail.jsx';
import Marketplace from '../pages/Marketplace.jsx';
import Careers from '../pages/Careers.jsx';
import CareersProcess from '../pages/CareersProcess.jsx';
import OpenPositions from '../pages/OpenPositions.jsx';
import JobDetail from '../pages/JobDetail.jsx';
import Blog from '../pages/Blog.jsx';
import Contact from '../pages/Contact.jsx';
import PartnerWithUs from '../pages/PartnerWithUs.jsx';
import PartnerModels from '../pages/PartnerModels.jsx';
import PartnerWithUsProcess from '../pages/PartnerWithUsProcess.jsx';
import RequestQuote from '../pages/RequestQuote.jsx';
import ScheduleCall from '../pages/ScheduleCall.jsx';
import ClientSupport from '../pages/ClientSupport.jsx';
import PressMedia from '../pages/PressMedia.jsx';
import Auth from '../pages/Auth.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import NotFound from '../pages/NotFound.jsx';
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx';
import ServiceRoute from '../components/ServiceRoute.jsx';
import AdminLayout from '../admin/layout/AdminLayout.jsx';
import AdminLogin from '../admin/pages/AdminLogin.jsx';
import AdminDashboard from '../admin/pages/AdminDashboard.jsx';
import AdminContentManager from '../admin/pages/AdminContentManager.jsx';
import AdminUsers from '../admin/pages/AdminUsers.jsx';
import AdminSettings from '../admin/pages/AdminSettings.jsx';
import AdminApplications from '../admin/pages/AdminApplications.jsx';
import MongoPageRoute from '../components/MongoPageRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<MongoPageRoute slug="about" fallback={<About />} />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceRoute />} />
        <Route path="services/ai-project-management" element={<AiProjectManagement />} />
        <Route path="services/website-development" element={<WebsiteDevelopment />} />
        <Route path="services/digital-marketing" element={<DigitalMarketing />} />
        <Route path="services/business-consultancy" element={<BusinessConsultancy />} />
        <Route path="services/hr-consultancy" element={<HrConsultancy />} />
        <Route path="services/hr-and-recruitment-solutions" element={<HrConsultancy />} />
        <Route path="services/mobile-app-development" element={<MobileAppDevelopment />} />
        <Route path="services/cloud-solutions" element={<CloudSolutions />} />
        <Route path="services/cybersecurity" element={<Cybersecurity />} />
        <Route path="services/cybersecurity-services" element={<Cybersecurity />} />
        <Route path="industries" element={<MongoPageRoute slug="industries" fallback={<Industries />} />} />
        <Route path="projects" element={<MongoPageRoute slug="projects" fallback={<Projects />} />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="case_studies" element={<MongoPageRoute slug="case_studies" fallback={<CaseStudies />} />} />
        <Route path="case_studies/:slug" element={<CaseStudyDetail />} />
        <Route path="marketplace" element={<MongoPageRoute slug="marketplace" fallback={<Marketplace />} />} />
        <Route path="careers" element={<MongoPageRoute slug="careers" fallback={<Careers />} />} />
        <Route path="careers/process" element={<MongoPageRoute slug="careers/process" fallback={<CareersProcess />} />} />
        <Route path="careers/open-positions" element={<MongoPageRoute slug="careers/open-positions" fallback={<OpenPositions />} />} />
        <Route path="careers/jobs/:slug" element={<JobDetail />} />
        <Route path="blog" element={<MongoPageRoute slug="blog" fallback={<Blog />} />} />
        <Route path="contact" element={<MongoPageRoute slug="contact" fallback={<Contact />} />} />
        <Route path="partner_with_us" element={<MongoPageRoute slug="partner_with_us" fallback={<PartnerWithUs />} />} />
        <Route path="partner_with_us/models" element={<MongoPageRoute slug="partner_with_us/models" fallback={<PartnerModels />} />} />
        <Route path="partner_with_us/process" element={<MongoPageRoute slug="partner_with_us/process" fallback={<PartnerWithUsProcess />} />} />
        <Route path="request_quote" element={<MongoPageRoute slug="request_quote" fallback={<RequestQuote />} />} />
        <Route path="Schedule_Call" element={<MongoPageRoute slug="Schedule_Call" fallback={<ScheduleCall />} />} />
        <Route path="Client_Support" element={<MongoPageRoute slug="Client_Support" fallback={<ClientSupport />} />} />
        <Route path="Client_Support/contact" element={<MongoPageRoute slug="Client_Support/contact" fallback={<ClientSupport />} />} />
        <Route path="Client_Support/faq" element={<MongoPageRoute slug="Client_Support/faq" fallback={<ClientSupport />} />} />
        <Route path="Press_Media" element={<MongoPageRoute slug="Press_Media" fallback={<PressMedia />} />} />
        <Route path="Press_Media/releases" element={<MongoPageRoute slug="Press_Media/releases" fallback={<PressMedia />} />} />
        <Route path="Press_Media/media-kit" element={<MongoPageRoute slug="Press_Media/media-kit" fallback={<PressMedia />} />} />
        <Route path="login" element={<Auth />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="privacy-policy" element={<MongoPageRoute slug="privacy-policy" fallback={<PrivacyPolicy />} />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="content/:type" element={<AdminContentManager />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
