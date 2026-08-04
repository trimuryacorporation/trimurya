import ServiceDetailPage from '../components/ServiceDetailPage.jsx';
import mobileAppHero from '../assets/mobile-app-development-hero.svg';

export default function MobileAppDevelopment() {
  return (
    <ServiceDetailPage
      slug="mobile-app-development"
      heroImage={mobileAppHero}
      eyebrow="Mobile"
      introLabel="App Development"
      introCopy="Launch mobile experiences that are fast, secure, and ready for real-world use."
    />
  );
}
