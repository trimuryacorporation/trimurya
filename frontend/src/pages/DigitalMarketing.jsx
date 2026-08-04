import StandaloneServicePage from '../components/StandaloneServicePage.jsx';
import { getServicePageBySlug } from '../data/services.js';
import digitalMarketingHero from '../assets/digital-marketing-hero.svg';

export default function DigitalMarketing() {
  return (
    <StandaloneServicePage service={getServicePageBySlug('digital-marketing')} heroImage={digitalMarketingHero} />
  );
}
