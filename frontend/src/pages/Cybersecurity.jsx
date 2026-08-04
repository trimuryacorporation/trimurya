import StandaloneServicePage from '../components/StandaloneServicePage.jsx';
import { getServicePageBySlug } from '../data/services.js';
import cybersecurityHero from '../assets/cybersecurity-hero.svg';

export default function Cybersecurity() {
  return (
    <StandaloneServicePage service={getServicePageBySlug('cybersecurity')} heroImage={cybersecurityHero} />
  );
}
