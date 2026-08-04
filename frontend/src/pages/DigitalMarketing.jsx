import ServiceDetailPage from '../components/ServiceDetailPage.jsx';
import digitalMarketingHero from '../assets/digital-marketing-hero.svg';

export default function DigitalMarketing() {
  return (
    <ServiceDetailPage
      slug="digital-marketing"
      heroImage={digitalMarketingHero}
      eyebrow="Growth"
      introLabel="Digital Growth"
      introCopy="Combine SEO, content, and performance marketing into one measurable growth engine."
    />
  );
}
