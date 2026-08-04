import StandaloneServicePage from '../components/StandaloneServicePage.jsx';
import { getServicePageBySlug } from '../data/services.js';
import hrConsultancyHero from '../assets/hr-consultancy-hero.svg';

export default function HrConsultancy() {
  return (
    <StandaloneServicePage service={getServicePageBySlug('hr-consultancy')} heroImage={hrConsultancyHero} />
  );
}
