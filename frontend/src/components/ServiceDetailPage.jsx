import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiChevronRight,
  FiCpu,
  FiHelpCircle,
  FiHome,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers
} from 'react-icons/fi';
import { fetchPublished, fetchPublishedBySlug } from '../services/contentApi.js';
import { resolveIcon } from '../utils/iconResolver.js';
import SectionHeader from './SectionHeader.jsx';
import ServiceCard from './ServiceCard.jsx';
import Button from './Button.jsx';
import SeoHead from './SeoHead.jsx';
import { breadcrumbSchema, serviceSchema } from '../utils/seo.js';

function normalizeArray(value, fallback = []) {
  if (Array.isArray(value) && value.length > 0) return value;
  return fallback;
}

function slugify(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function defaultHeroStats(title) {
  return [
    { value: '24/7', label: `${title || 'Service'} Support` },
    { value: 'Fast', label: 'Delivery Cycles' },
    { value: 'Enterprise', label: 'Ready Execution' },
    { value: 'SEO', label: 'Optimized Presence' }
  ];
}

function defaultBenefits() {
  return [
    { title: 'Clear Roadmap', copy: 'We structure the engagement around business outcomes, milestones, and measurable delivery checkpoints.', icon: 'FiTarget' },
    { title: 'Scalable Build', copy: 'Each solution is designed to grow with your company without creating maintenance headaches.', icon: 'FiTrendingUp' },
    { title: 'Enterprise Trust', copy: 'Security, governance, and reliability are built into the process from day one.', icon: 'FiShield' },
    { title: 'Responsive Team', copy: 'You get a team that communicates clearly and keeps momentum moving forward.', icon: 'FiUsers' }
  ];
}

function defaultFeatures(title) {
  return [
    `${title} discovery and planning`,
    'Execution roadmap and milestones',
    'Performance tracking and reporting',
    'Quality assurance and refinement'
  ];
}

function defaultProcess() {
  return [
    { step: '01', title: 'Discovery', copy: 'We understand the goals, constraints, and success metrics before building anything.' },
    { step: '02', title: 'Strategy', copy: 'We translate the brief into a practical roadmap, scope, and delivery plan.' },
    { step: '03', title: 'Delivery', copy: 'We build, validate, and launch with weekly progress checks and clear ownership.' },
    { step: '04', title: 'Optimization', copy: 'After launch, we monitor outcomes and continuously improve the service experience.' }
  ];
}

function defaultTestimonials(title) {
  return [
    { quote: `Trimurya made the ${title || 'service'} engagement feel organized and predictable from the first week.`, author: 'Project Lead', role: 'Operations', company: 'Enterprise Client' },
    { quote: 'Communication stayed sharp, deadlines were realistic, and the team kept the project moving.', author: 'Business Owner', role: 'Founder', company: 'Growth Client' },
    { quote: 'The final delivery matched our expectations and gave us a strong base to scale from.', author: 'Department Head', role: 'Strategy', company: 'Corporate Client' }
  ];
}

function defaultFaqs(title) {
  return [
    { q: `How does ${title || 'this service'} start?`, a: 'We begin with a quick discovery call, then shape the delivery plan around your goals and timeline.' },
    { q: 'Can the scope be customized?', a: 'Yes. Every engagement can be tailored to your workflow, budget, and internal process.' },
    { q: 'Do you provide support after launch?', a: 'Yes. We stay involved after delivery to monitor, optimize, and support future changes.' }
  ];
}

export default function ServiceDetailPage({ slug, heroImage, eyebrow = 'Service', introLabel, introCopy }) {
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const primary = await fetchPublishedBySlug('services', slug);
        if (cancelled) return;

        if (primary) {
          setService(primary);
          const related = normalizeArray(primary.related);
          if (related.length > 0) {
            const relatedItems = await Promise.all(related.map((relatedSlug) => fetchPublishedBySlug('services', relatedSlug)));
            if (!cancelled) {
              setRelatedServices(relatedItems.filter(Boolean));
            }
          } else {
            setRelatedServices([]);
          }
        }

        const services = await fetchPublished('services');
        if (!cancelled) {
          setAllServices(Array.isArray(services) ? services.filter((item) => item.slug !== slug) : []);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load().catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const heroStats = useMemo(() => normalizeArray(service?.heroStats, defaultHeroStats(service?.title)), [service]);
  const benefits = useMemo(() => normalizeArray(service?.benefits, defaultBenefits(service?.title)), [service]);
  const features = useMemo(() => normalizeArray(service?.features, defaultFeatures(service?.title)), [service]);
  const process = useMemo(() => normalizeArray(service?.process, defaultProcess()), [service]);
  const testimonials = useMemo(() => normalizeArray(service?.testimonials, defaultTestimonials(service?.title)), [service]);
  const faqs = useMemo(() => normalizeArray(service?.faqs, defaultFaqs(service?.title)), [service]);
  const outcomes = useMemo(() => normalizeArray(service?.outcomes, [`Better ${service?.title || 'service'} visibility`, 'Clear delivery structure', 'Higher conversion quality']), [service]);
  const technologies = useMemo(() => normalizeArray(service?.technologies, ['Strategy', 'Design', 'Development', 'Optimization']), [service]);
  const serviceItems = useMemo(() => normalizeArray(service?.items, normalizeArray(service?.features, normalizeArray(service?.technologies, []))).slice(0, 6), [service]);
  const canonicalPath = `/services/${slug}`;
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.trimuryacorporation.in/' },
    { name: 'Services', url: 'https://www.trimuryacorporation.in/services' },
    { name: service?.title || slugify(slug), url: `https://www.trimuryacorporation.in${canonicalPath}` }
  ];

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="h-96 rounded-[28px] bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SeoHead pathname={canonicalPath} title="Service not found" description="The requested service page could not be found." noindex />
        <p className="text-center text-slate-600 dark:text-slate-300">Service not found</p>
      </div>
    );
  }

  const serviceDescription = service.longDescription || service.summary || service.description || '';

  return (
    <div className="min-h-screen">
      <SeoHead
        pathname={canonicalPath}
        title={service.title}
        description={serviceDescription}
        keywords={[service.title, ...(technologies || []), 'Trimurya Corporation'].filter(Boolean).join(', ')}
        image={heroImage}
        schemas={[serviceSchema(service)]}
        breadcrumbs={breadcrumbs}
      />

      <section className="relative -mt-12 overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -left-32 -bottom-32 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center gap-1 text-slate-400 transition-colors hover:text-secondary">
              <FiHome size={14} />
              <span>Home</span>
            </Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <Link to="/services" className="text-slate-400 transition-colors hover:text-secondary">Services</Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <span className="font-semibold text-white">{service.title}</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
                <FiCpu size={14} />
                {introLabel || eyebrow}
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">{service.title}</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">{serviceDescription}</p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <p className="text-2xl font-black text-secondary">{stat.value}</p>
                    <p className="mt-1 text-xs font-bold text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/contact" className="bg-secondary text-white shadow-lg shadow-secondary/25 hover:bg-secondary/90">
                  Start Conversation
                  <FiArrowRight size={16} />
                </Button>
                <Button to="/services" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                  View All Services
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <img src={heroImage} alt={service.title} className="w-full rounded-2xl" loading="eager" />
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">Key Outcomes</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome, index) => (
              <motion.div key={outcome} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <FiCheckCircle className="mx-auto text-accent" size={24} />
                <p className="mt-3 text-sm font-bold leading-6 text-primary dark:text-white">{outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Why Choose Us" title="Benefits that drive impact" copy={`We deliver measurable results through structured ${service.title.toLowerCase()} services that keep your project organized and moving.`} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const BenefitIcon = resolveIcon(benefit.icon) || FiStar;
              return (
                <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                    <BenefitIcon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-primary dark:text-white">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{benefit.copy}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="What we deliver" copy={introCopy || 'A clean, repeatable service structure that keeps execution aligned with business goals.'} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div key={`${feature}-${index}`} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-5 shadow-sm dark:bg-slate-900">
                <FiCheckCircle className="mt-0.5 shrink-0 text-accent" size={20} />
                <span className="text-sm font-semibold leading-6 text-primary dark:text-white">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-20 dark:bg-slate-900">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Process" title="How we bring your vision to life" copy="Each stage is transparent, measurable, and designed to reduce rework." />
          <div className="mt-12 relative">
            <div className="absolute left-8 top-0 hidden h-full w-px bg-slate-200 dark:bg-slate-800 md:block" />
            <div className="space-y-10">
              {process.map((phase, index) => (
                <motion.div key={phase.step || phase.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative grid gap-6 md:grid-cols-[80px_1fr] md:gap-10">
                  <div className="hidden md:flex">
                    <div className="relative z-10 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-secondary text-sm font-black text-white shadow-lg dark:border-slate-950">
                      {phase.step || String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="md:pl-4">
                    <div className="flex items-center gap-3 md:hidden">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-black text-white">{phase.step || String(index + 1).padStart(2, '0')}</span>
                      <h3 className="text-lg font-black text-white">{phase.title}</h3>
                    </div>
                    <h3 className="hidden text-lg font-black text-white md:block">{phase.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{phase.copy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Testimonials" title="Trusted by industry leaders" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div key={`${testimonial.author}-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="text-5xl font-serif leading-none text-secondary/20">&ldquo;</div>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{testimonial.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-sm font-black text-secondary">
                    {String(testimonial.author || 'TM').split(' ').map((part) => part[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary dark:text-white">{testimonial.author}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeader eyebrow="FAQs" title="Frequently asked questions" />
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={faq.q || faq.question || index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start gap-3">
                  <FiHelpCircle className="mt-0.5 shrink-0 text-secondary" size={20} />
                  <div>
                    <h3 className="font-bold text-primary dark:text-white">{faq.q || faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.a || faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Tech Stack" title="Platforms & tools we leverage" copy="We combine delivery discipline with a practical technology stack that supports scale." />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <span key={tech} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-300 hover:border-secondary hover:text-secondary dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Related Work" title="All services" copy="Continue exploring related service areas." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(relatedServices.length > 0 ? relatedServices : allServices).slice(0, 6).map((relatedService, index) => (
              <ServiceCard key={relatedService.slug || relatedService._id} service={relatedService} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to get started with {service.title}?</h2>
            <p className="mt-4 text-lg leading-8 text-white/90">Let's discuss your requirements and shape the right engagement model.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact" className="bg-white text-primary shadow-lg hover:bg-slate-100">
                Schedule a Strategy Call
                <FiArrowRight size={16} />
              </Button>
              <Button to="/services" variant="ghost" className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20">
                <FiArrowLeft size={16} />
                All Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
