import StandaloneServicePage from '../components/StandaloneServicePage.jsx';
import { getServicePageBySlug } from '../data/services.js';
import aiPmHero from '../assets/ai-project-management-hero.svg';

export default function AiProjectManagement() {
  return (
    <StandaloneServicePage service={getServicePageBySlug('ai-project-management')} heroImage={aiPmHero} />
  );
}
