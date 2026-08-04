import ServiceDetailPage from '../components/ServiceDetailPage.jsx';
import aiPmHero from '../assets/ai-project-management-hero.svg';

export default function AiProjectManagement() {
  return (
    <ServiceDetailPage
      slug="ai-project-management"
      heroImage={aiPmHero}
      eyebrow="AI Delivery"
      introLabel="AI Program Delivery"
      introCopy="Turn AI initiatives into structured programs with visible milestones, accountability, and measurable delivery."
    />
  );
}
