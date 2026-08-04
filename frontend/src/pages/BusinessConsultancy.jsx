import StandaloneServicePage from '../components/StandaloneServicePage.jsx';
import { getServicePageBySlug } from '../data/services.js';
import businessConsultancyHero from '../assets/business-consultancy-hero.svg';

export default function BusinessConsultancy() {
  return (
    <StandaloneServicePage service={getServicePageBySlug('business-consultancy')} heroImage={businessConsultancyHero} />
  );
}
