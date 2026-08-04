import ServiceDetailPage from '../components/ServiceDetailPage.jsx';
import businessConsultancyHero from '../assets/business-consultancy-hero.svg';

export default function BusinessConsultancy() {
  return (
    <ServiceDetailPage
      slug="business-consultancy"
      heroImage={businessConsultancyHero}
      eyebrow="Strategy"
      introLabel="Business Advisory"
      introCopy="Align operations, process, and growth goals with a practical consulting approach built for execution."
    />
  );
}
