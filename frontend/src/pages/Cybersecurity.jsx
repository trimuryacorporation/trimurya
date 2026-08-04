import ServiceDetailPage from '../components/ServiceDetailPage.jsx';
import cybersecurityHero from '../assets/cybersecurity-hero.svg';

export default function Cybersecurity() {
  return (
    <ServiceDetailPage
      slug="cybersecurity"
      heroImage={cybersecurityHero}
      eyebrow="Security"
      introLabel="Cybersecurity Services"
      introCopy="Protect digital operations with practical security programs, monitoring, and risk-aware delivery."
    />
  );
}
