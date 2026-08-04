import ServiceDetailPage from '../components/ServiceDetailPage.jsx';
import webDevHero from '../assets/website-development-hero.svg';

export default function WebsiteDevelopment() {
  return (
    <ServiceDetailPage
      slug="website-development"
      heroImage={webDevHero}
      eyebrow="Web"
      introLabel="Website Development"
      introCopy="Create polished, conversion-focused websites with strong performance and SEO foundations."
    />
  );
}
