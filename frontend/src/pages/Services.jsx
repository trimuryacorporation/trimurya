import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { fetchPublished } from '../services/contentApi.js';
import { breadcrumbSchema } from '../utils/seo.js';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublished('services').then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const serviceListSchema = services.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Trimurya Corporation Services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://www.trimuryacorporation.in/services/${service.slug || service._id}`,
      name: service.title,
      description: service.summary || service.description
    }))
  } : null;

  return (
    <>
      <Helmet>
        <title>Services | Trimurya Corporation</title>
        <meta name="description" content="Explore enterprise AI, software, recruitment, digital marketing, telecom, call center, and media services from Trimurya Corporation." />
        <meta name="keywords" content="enterprise AI services, technology services, recruitment services, digital marketing, telecom services" />
        <link rel="canonical" href="https://www.trimuryacorporation.in/services" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name: 'Home', url: 'https://www.trimuryacorporation.in/' },
          { name: 'Services', url: 'https://www.trimuryacorporation.in/services' }
        ]))}</script>
        {serviceListSchema && <script type="application/ld+json">{JSON.stringify(serviceListSchema)}</script>}
      </Helmet>
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <SectionHeader eyebrow="Services" title="Our Services" copy="Explore our comprehensive enterprise solutions tailored to your business needs." />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {loading ? (
          [1,2,3,4,5,6,7,8].map((n) => <div key={n} className="h-48 rounded-[28px] bg-slate-100 dark:bg-slate-800 animate-pulse" />)
        ) : (
          services.map((service, index) => (
            <ServiceCard key={service.slug || service._id} service={service} index={index} />
          ))
        )}
      </div>
    </section>
    </>
  );
}
