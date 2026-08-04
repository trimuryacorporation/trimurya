import ServiceDetailPage from '../components/ServiceDetailPage.jsx';
import cloudSolutionsHero from '../assets/cloud-solutions-hero.svg';

export default function CloudSolutions() {
  return (
    <ServiceDetailPage
      slug="cloud-solutions"
      heroImage={cloudSolutionsHero}
      eyebrow="Cloud"
      introLabel="Cloud Architecture"
      introCopy="Build reliable, scalable cloud foundations with cost control, automation, and long-term maintainability."
    />
  );
}
