import { useState, useEffect } from 'react';
import CounterCard from '../components/CounterCard.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Button from '../components/Button.jsx';
import heroIllustration from '../assets/ai-hero.png';
import { fetchPublished } from '../services/contentApi.js';
import { resolveIcon } from '../utils/iconResolver.js';
import SeoHead from '../components/SeoHead.jsx';
import { breadcrumbSchema, organizationSchema, websiteSchema, DEFAULT_KEYWORDS } from '../utils/seo.js';
import { SERVICE_PAGES } from '../data/services.js';

const processSteps = [
  {
    title: 'Discover',
    copy: 'We define the opportunity, success metrics, and operating model before any work begins.',
    icon: 'FiClipboard'
  },
  {
    title: 'Architect',
    copy: 'We design the right solution, team structure, timeline, and technology stack for your business.',
    icon: 'FiLayers'
  },
  {
    title: 'Deliver',
    copy: 'We launch fast, maintain quality, and make sure every deliverable is usable from day one.',
    icon: 'FiCheckCircle'
  }
];

export default function Home() {
  const [stats, setStats] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const featuredServices = SERVICE_PAGES.slice(0, 4);

  useEffect(() => {
    Promise.all([
      fetchPublished('stats'),
      fetchPublished('values')
    ]).then(([statsData, valuesData]) => {
      setStats(statsData);
      setValues(valuesData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <SeoHead
        pathname="/"
        title="AI Services & Software Development Company India"
        description="Trimurya Corporation India delivers AI data collection, data annotation, AI automation, model training support, software, SaaS, website and mobile app development."
        keywords={DEFAULT_KEYWORDS}
        schemas={[websiteSchema(), organizationSchema()]}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.trimuryacorporation.in/' }
        ]}
      />

      <HeroSlider />

      <section className="relative z-20 -mt-7 px-4 lg:px-8">
        {loading ? (
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
            {[1,2,3,4].map((n) => <div key={n} className="h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">{stats.map((stat) => <CounterCard key={stat.slug || stat._id} value={stat.value} label={stat.label} />)}</div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader eyebrow="Enterprise Delivery" title="Professional support for AI services and software delivery" copy="Trimurya Corporation India supports AI data collection, data annotation, AI automation, software development, SaaS, websites, and mobile apps for growing teams." />
            <div className="grid gap-5 sm:grid-cols-2">
              {featuredServices.slice(0, 2).map((service) => {
                const Icon = resolveIcon(service.icon);
                return (
                  <div key={service.slug} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-5 text-lg font-black text-primary dark:text-white">{service.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.summary}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                to="/contact"
                variant="ghost"
                className="rounded-xl border border-yellow-500 bg-yellow-500 px-6 py-3 font-semibold text-white shadow-lg shadow-yellow-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-600 hover:border-yellow-600 hover:shadow-xl"
              >
                Schedule a Strategy Call
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[7px] bg-slate-950/5 shadow-2xl dark:bg-white/10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/15 via-slate-950/0 to-slate-950/60" />
            <div
              className="relative w-full h-[420px] lg:h-[520px] rounded-[32px] bg-center bg-cover shadow-2xl"
              style={{ backgroundImage: `url(${heroIllustration})` }}
              role="img"
              aria-label="Enterprise service illustration"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Delivery Framework" title="A trusted process for complex projects" copy="We combine enterprise-grade planning with lean execution so your project stays on schedule and on budget." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {processSteps.map((step) => {
              const Icon = resolveIcon(step.icon);
              return (
                <div key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary/10 text-secondary dark:bg-secondary/20">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-primary dark:text-white">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-20 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Why Clients Choose Us" title="Built to support enterprise expectations" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = resolveIcon(value.icon);
              return (
                <div key={value.slug || value._id} className="rounded-3xl bg-white p-7 shadow-sm dark:bg-slate-950">
                  {Icon && <Icon className="text-secondary" size={26} />}
                  <h3 className="mt-5 font-black text-lg text-primary dark:text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{value.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeader eyebrow="Featured Services" title="A dynamic service stack designed for growth" copy="These are pulled from the same service registry that powers the service pages, so the homepage stays aligned automatically." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(6,29,92,0.35)] sm:px-12 lg:px-16">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${heroIllustration})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/30" />

          <div className="relative px-8 py-12 text-white sm:px-12 lg:px-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-secondary/80">Enterprise-grade readiness</p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Start your next AI program or website project with confidence.</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-secondary/90 sm:text-base">We combine rigorous planning, polished design, and backend-ready execution so your digital initiative is built on a solid foundation.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact" className="text-primary hover:bg-slate-100">Schedule a Discovery Call</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
