import ServiceDetailPage from '../components/ServiceDetailPage.jsx';
import hrConsultancyHero from '../assets/hr-consultancy-hero.svg';

export default function HrConsultancy() {
  return (
    <ServiceDetailPage
      slug="hr-consultancy"
      heroImage={hrConsultancyHero}
      eyebrow="Talent"
      introLabel="HR & Recruitment"
      introCopy="Design hiring workflows and people operations that support scale, culture, and team performance."
    />
  );
}
