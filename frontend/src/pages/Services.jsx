import { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import SeoHead from '../components/SeoHead.jsx';
import { DEFAULT_KEYWORDS, breadcrumbSchema, itemListSchema } from '../utils/seo.js';
import { SERVICE_PAGES } from '../data/services.js';

export default function Services() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const visibleServices = SERVICE_PAGES;

  return (
    <>
      <SeoHead
        pathname="/services"
        title="AI, Data, Website & Software Services"
        description="Explore AI services, AI data collection, data annotation, model training support, automation, website development, SaaS, and mobile app development."
        keywords={DEFAULT_KEYWORDS}
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
