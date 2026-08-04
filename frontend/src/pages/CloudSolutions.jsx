import StandaloneServicePage from '../components/StandaloneServicePage.jsx';
import { getServicePageBySlug } from '../data/services.js';
import cloudSolutionsHero from '../assets/cloud-solutions-hero.svg';

export default function CloudSolutions() {
  return (
    <StandaloneServicePage service={getServicePageBySlug('cloud-solutions')} heroImage={cloudSolutionsHero} />
  );
}
