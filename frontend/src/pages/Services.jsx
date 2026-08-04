import { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { fetchPublished } from '../services/contentApi.js';
import SeoHead from '../components/SeoHead.jsx';
import { breadcrumbSchema, itemListSchema } from '../utils/seo.js';
import { getFallbackServices } from '../data/serviceContent.js';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const fallbackServices = getFallbackServices();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchPublished('services').catch(() => []);
        if (!cancelled) {
          setServices(Array.isArray(data) && data.length > 0 ? data : fallbackServices);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleServices = services.length > 0 ? services : fallbackServices;

  return (
    <>
      <SeoHead
        pathname="/services"
        title="Services"
        description="Explore enterprise AI, software, recruitment, digital marketing, telecom, call center, and media services from Trimurya Corporation."
        keywords="enterprise AI services, technology services, recruitment services, digital marketing, telecom services"
        schemas={[
          breadcrumbSchema([
            { name: 'Home', url: 'https://www.trimuryacorporation.in/' },
            { name: 'Services', url: 'https://www.trimuryacorporation.in/services' }
          ]),
          itemListSchema(
            visibleServices.map((service) => ({
              name: service.title,
              url: `https://www.trimuryacorporation.in/services/${service.slug || service._id}`,
              description: service.summary || service.description
            })),
            'Trimurya Corporation Services'
          )
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeader eyebrow="Services" title="Our Services" copy="Explore our comprehensive enterprise solutions tailored to your business needs." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <div key={n} className="h-48 rounded-[28px] bg-slate-100 dark:bg-slate-800 animate-pulse" />)
          ) : (
            visibleServices.map((service, index) => (
              <ServiceCard key={service.slug || service._id} service={service} index={index} />
            ))
          )}
        </div>
      </section>
    </>
  );
}
