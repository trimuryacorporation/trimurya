import StandaloneServicePage from './StandaloneServicePage.jsx';
import { getServicePageBySlug } from '../data/services.js';
import aiPmHero from '../assets/ai-project-management-hero.svg';
import webDevHero from '../assets/website-development-hero.svg';
import digitalMarketingHero from '../assets/digital-marketing-hero.svg';
import businessConsultancyHero from '../assets/business-consultancy-hero.svg';
import hrConsultancyHero from '../assets/hr-consultancy-hero.svg';
import mobileAppHero from '../assets/mobile-app-development-hero.svg';
import cloudSolutionsHero from '../assets/cloud-solutions-hero.svg';
import cybersecurityHero from '../assets/cybersecurity-hero.svg';

const HERO_BY_SLUG = {
  'ai-project-management': aiPmHero,
  'website-development': webDevHero,
  'digital-marketing': digitalMarketingHero,
  'business-consultancy': businessConsultancyHero,
  'hr-consultancy': hrConsultancyHero,
  'mobile-app-development': mobileAppHero,
  'cloud-solutions': cloudSolutionsHero,
  'cybersecurity': cybersecurityHero
};

export default function ServiceRoute({ slug }) {
  const service = getServicePageBySlug(slug);

  return <StandaloneServicePage service={service} heroImage={HERO_BY_SLUG[slug]} />;
}
