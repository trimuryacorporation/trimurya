import StandaloneServicePage from '../components/StandaloneServicePage.jsx';
import { getServicePageBySlug } from '../data/services.js';
import webDevHero from '../assets/website-development-hero.svg';

export default function WebsiteDevelopment() {
  return (
    <StandaloneServicePage service={getServicePageBySlug('website-development')} heroImage={webDevHero} />
  );
}
