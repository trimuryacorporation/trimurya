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
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiShield,
  FiCloud,
  FiBriefcase,
  FiGlobe,
  FiLayers
} from 'react-icons/fi';
import { resolveIcon } from '../utils/iconResolver.js';
import SeoHead from './SeoHead.jsx';
import SectionHeader from './SectionHeader.jsx';
import Button from './Button.jsx';
import { breadcrumbSchema, serviceSchema } from '../utils/seo.js';
import { getServicePageBySlug, getServicePageList } from '../data/services.js';

const VARIANT_STYLES = {
  'split-dark': 'bg-gradient-to-br from-slate-950 via-primary to-slate-900 text-white',
  'split-light': 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-primary',
  'grid-accent': 'bg-gradient-to-br from-amber-50 via-white to-orange-50 text-primary',
  'split-navy': 'bg-gradient-to-br from-slate-950 via-blue-950 to-primary text-white',
  'split-sand': 'bg-gradient-to-br from-stone-50 via-white to-amber-50 text-primary',
  'center-card': 'bg-gradient-to-br from-slate-900 via-primary to-slate-950 text-white',
  'analytics-panel': 'bg-gradient-to-br from-blue-950 via-slate-900 to-slate-800 text-white',
  'dark-grid': 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white'
};

function variantShell(variant) {
  return VARIANT_STYLES[variant] || VARIANT_STYLES['split-dark'];
}

function variantAccent(variant) {
  switch (variant) {
    case 'split-light':
      return 'bg-primary/8 text-primary';
    case 'grid-accent':
      return 'bg-secondary/10 text-secondary';
    case 'split-sand':
      return 'bg-amber-500/10 text-amber-700';
    case 'analytics-panel':
      return 'bg-cyan-500/10 text-cyan-200';
    default:
      return 'bg-secondary/10 text-secondary';
  }
}

function heroImageFrame(variant) {
  switch (variant) {
    case 'split-light':
      return 'border-slate-200 bg-white shadow-premium';
    case 'grid-accent':
      return 'border-amber-200 bg-white shadow-premium';
    case 'split-sand':
      return 'border-amber-100 bg-white shadow-premium';
    case 'center-card':
      return 'border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl';
    case 'analytics-panel':
      return 'border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl';
    default:
      return 'border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl';
  }
}

const HERO_ICON_MAP = {
  'FiCpu': FiCpu,
  'FiGlobe': FiGlobe,
  'FiTrendingUp': FiTrendingUp,
  'FiBriefcase': FiBriefcase,
  'FiUsers': FiUsers,
  'FiLayers': FiLayers,
  'FiCloud': FiCloud,
  'FiShield': FiShield
};

export default function StandaloneServicePage({ service, heroImage }) {
  if (!service) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <p className="text-center text-slate-600 dark:text-slate-300">Service not found</p>
      </div>
    );
  }

  const ServiceIcon = HERO_ICON_MAP[service.icon] || resolveIcon(service.icon) || FiCpu;
  const relatedServices = (service.related || [])
    .map((slug) => getServicePageBySlug(slug))
    .filter(Boolean);
  const pageList = getServicePageList().filter((item) => item.slug !== service.slug);
  const canonicalPath = `/services/${service.slug}`;
  const description = service.seoDescription || service.summary || service.intro;
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.trimuryacorporation.in/' },
    { name: 'Services', url: 'https://www.trimuryacorporation.in/services' },
    { name: service.title, url: `https://www.trimuryacorporation.in${canonicalPath}` }
  ];

  return (
    <div className="min-h-screen">
      <SeoHead
        pathname={canonicalPath}
        title={service.title}
        description={description}
        keywords={[service.title, service.label, service.summary, 'Trimurya Corporation'].filter(Boolean).join(', ')}
        image={heroImage}
        schemas={[serviceSchema(service)]}
        breadcrumbs={breadcrumbs}
      />

      <section className={`relative overflow-hidden py-20 lg:py-28 ${variantShell(service.variant)}`}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.12) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center gap-1 text-slate-400 transition-colors hover:text-secondary">
              <FiHome size={14} />
              <span>Home</span>
            </Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <Link to="/services" className="text-slate-400 transition-colors hover:text-secondary">Services</Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <span className={`font-semibold ${service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'text-primary' : 'text-white'}`}>{service.title}</span>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-widest ${variantAccent(service.variant)}`}>
                <ServiceIcon size={14} />
                {service.badge || service.label}
              </div>
              <h1 className={`mt-6 text-4xl font-black leading-tight md:text-6xl ${service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'text-primary' : 'text-white'}`}>
                {service.title}
              </h1>
              <p className={`mt-6 max-w-2xl text-lg leading-8 ${service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'text-slate-600' : 'text-slate-300'}`}>
                {service.intro || service.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {(service.items || []).map((item) => (
                  <span key={item} className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'border-slate-200 bg-white text-slate-600' : 'border-white/15 bg-white/5 text-white/80'}`}>
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {(service.metrics || []).map((metric) => (
                  <div key={metric.label} className={`rounded-2xl border p-4 text-center ${service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/5 backdrop-blur-sm'}`}>
                    <p className="text-2xl font-black text-secondary">{metric.value}</p>
                    <p className={`mt-1 text-xs font-bold ${service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'text-slate-500' : 'text-slate-300'}`}>{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/contact" className="bg-secondary text-white shadow-lg shadow-secondary/25 hover:bg-secondary/90">
                  Start Conversation
                  <FiArrowRight size={16} />
                </Button>
                <Button to="/services" variant="ghost" className={service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'border-slate-300 bg-white text-primary hover:bg-slate-50' : 'border-white/20 bg-white/5 text-white hover:bg-white/10'}>
                  View All Services
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative">
              <div className={`relative overflow-hidden rounded-[32px] border p-3 ${heroImageFrame(service.variant)}`}>
                <img src={heroImage} alt={service.title} className="w-full rounded-[24px]" loading="eager" />
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`border-b py-12 ${service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950' : 'border-white/10 bg-slate-950'}`}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">Key Outcomes</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(service.outcomes || []).map((outcome, index) => (
              <motion.div key={outcome} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className={`rounded-2xl border p-6 text-center ${service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5 backdrop-blur-sm'}`}>
                <FiCheckCircle className="mx-auto text-accent" size={24} />
                <p className={`mt-3 text-sm font-bold leading-6 ${service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'text-primary' : 'text-white'}`}>{outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-20 ${service.variant === 'split-light' || service.variant === 'grid-accent' || service.variant === 'split-sand' ? 'bg-slate-50 dark:bg-slate-900/40' : 'bg-slate-950/70'}`}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Why Choose Us" title="Benefits that drive impact" copy={`We deliver measurable results through structured ${service.title.toLowerCase()} services that keep the work organized and moving.`} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Clear Roadmap', copy: 'Structured milestones and outcomes keep execution easy to manage.', icon: 'FiTarget' },
              { title: 'Scalable Build', copy: 'We design for future growth instead of short-term patchwork.', icon: 'FiTrendingUp' },
              { title: 'Enterprise Trust', copy: 'Security and quality are included from the first step.', icon: 'FiShield' },
              { title: 'Responsive Team', copy: 'Communication stays visible and collaborative throughout.', icon: 'FiUsers' }
            ].map((benefit, index) => {
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
          <SectionHeader eyebrow="Capabilities" title="What we deliver" copy={service.intro || 'A clean, repeatable service structure that keeps execution aligned with business goals.'} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {(service.features || []).map((feature, index) => (
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
          <div className="mt-12 space-y-10">
            {(service.process || []).map((phase, index) => (
              <motion.div key={phase.step || phase.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="grid gap-6 md:grid-cols-[80px_1fr] md:gap-10">
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
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Testimonials" title="Trusted by industry leaders" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { quote: `Trimurya made the ${service.title.toLowerCase()} engagement feel organized and predictable from the first week.`, author: 'Project Lead', role: 'Operations', company: 'Enterprise Client' },
              { quote: 'Communication stayed sharp, deadlines were realistic, and the team kept the work moving.', author: 'Business Owner', role: 'Founder', company: 'Growth Client' },
              { quote: 'The final delivery matched our expectations and gave us a strong base to scale from.', author: 'Department Head', role: 'Strategy', company: 'Corporate Client' }
            ].map((testimonial, index) => (
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
            {(service.faqs || []).map((faq, index) => (
              <motion.details key={faq.q || index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <summary className="flex cursor-pointer list-none items-start gap-3 font-bold text-primary dark:text-white">
                  <FiHelpCircle className="mt-0.5 shrink-0 text-secondary" size={20} />
                  <span>{faq.q}</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Related Work" title="Explore other services" copy="Continue through the service stack that fits your needs." />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {relatedServices.concat(pageList).filter((item, index, list) => list.findIndex((entry) => entry.slug === item.slug) === index).slice(0, 8).map((item) => (
              <Link key={item.slug} to={`/services/${item.slug}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-300 hover:border-secondary hover:text-secondary dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to get started with {service.title}?</h2>
            <p className="mt-4 text-lg leading-8 text-white/90">{service.cta || 'Let us discuss your requirements and shape the right engagement model.'}</p>
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
