import StandaloneServicePage from '../components/StandaloneServicePage.jsx';
import { getServicePageBySlug } from '../data/services.js';
import mobileAppHero from '../assets/mobile-app-development-hero.svg';

export default function MobileAppDevelopment() {
  return (
    <StandaloneServicePage service={getServicePageBySlug('mobile-app-development')} heroImage={mobileAppHero} />
  );
}
