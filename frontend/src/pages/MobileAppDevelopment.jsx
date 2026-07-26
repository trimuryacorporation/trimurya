import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiCheckCircle,
  FiHome,
  FiCpu,
  FiChevronRight,
  FiHelpCircle,
  FiArrowRight,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiTarget,
  FiStar,
  FiMail,
  FiSmartphone,
  FiZap,
  FiGlobe,
  FiLock
} from 'react-icons/fi';
import { fetchPublishedBySlug } from '../services/contentApi.js';import { resolveIcon } from '../utils/iconResolver.js';
import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Button from '../components/Button.jsx';
import mobileAppHero from '../assets/mobile-app-development-hero.svg';

function serviceSlug(title) {
  return title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function MobileAppDevelopment() {
  const slug = 'mobile-app-development';
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedBySlug('services', slug).then((data) => {
      if (cancelled) return;
      setService(data);
      if (data?.related?.length) {
        Promise.all(data.related.map((rSlug) => fetchPublishedBySlug('services', rSlug)))
          .then((results) => { if (!cancelled) setRelatedServices(results.filter(Boolean)); });
      }
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { cancelled = true; };
  }, [slug]);

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
        <p className="text-center text-slate-600 dark:text-slate-300">Service not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative -mt-12 overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -left-32 -bottom-32 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center gap-1 text-slate-400 hover:text-secondary transition-colors"><FiHome size={14} /><span>Home</span></Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <Link to="/services" className="text-slate-400 hover:text-secondary transition-colors">Services</Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <span className="font-semibold text-white">{service.title}</span>
          </nav>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary"><FiCpu size={14} />Mobile Excellence</div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">{service.title}</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">{service.longDescription}</p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {service.heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <p className="text-2xl font-black text-secondary">{stat.value}</p>
                    <p className="mt-1 text-xs font-bold text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/contact" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">Start Your Mobile Journey <FiArrowRight size={16} /></Button>
                <Button to="/services" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10">View All Services</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <img src={mobileAppHero} alt="Mobile App Development Dashboard" className="w-full rounded-2xl" />
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
            {[...new Set([
              ...service.outcomes,
              '4.8+ average app store ratings',
              '30% faster time-to-market',
              '99.9% crash-free sessions',
              '50% reduction in maintenance costs',
              '2x user retention improvement'
            ])].map((outcome, index) => (
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
          <SectionHeader eyebrow="Why Choose Us" title="Benefits that drive impact" copy="We deliver measurable results through structured mobile app development services that de-risks initiatives and accelerates outcomes." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((benefit, index) => {
              const BenefitIcon = resolveIcon(benefit.icon) || FiShield;
              return (
                <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white"><BenefitIcon size={24} /></div>
                    <h3 className="mt-4 text-lg font-black text-primary dark:text-white">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{benefit.copy}</p>
                  </div>
                </motion.div>
              );
            })}
            {[
              { title: 'Native-Quality Performance', copy: 'Optimized for iOS and Android with smooth animations, fast load times, and responsive interactions that feel native.', icon: FiSmartphone },
              { title: 'Cross-Platform Reach', copy: 'Single codebase deploying to iOS, Android, and web while maintaining platform-specific UX patterns and performance.', icon: FiGlobe },
              { title: 'Secure & Compliant Apps', copy: 'Enterprise-grade security with OWASP-aligned practices, encryption, and compliance with GDPR, HIPAA, and app store guidelines.', icon: FiLock },
              { title: 'Faster Time-to-Market', copy: 'Agile sprints, reusable components, and automated testing to launch faster and iterate based on real user feedback.', icon: FiZap }
            ].map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (service.benefits.length + index) * 0.08 }} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white"><BenefitIcon size={24} /></div>
                    <h3 className="mt-4 text-lg font-black text-primary dark:text-white">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{benefit.copy}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="What we deliver" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...new Set([
              ...service.features,
              'Native iOS (Swift) and Android (Kotlin) development',
              'Cross-platform apps with React Native and Flutter',
              'UI/UX design with interactive prototyping',
              'API integration and backend connectivity',
              'Push notifications and real-time messaging',
              'Offline-first architecture and sync',
              'App store deployment and optimization',
              'Performance testing and crash analytics',
              'Accessibility and localization support',
              'Maintenance and feature updates'
            ])].map((feature, index) => (
              <motion.div key={feature} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-5 shadow-sm dark:bg-slate-900">
                <FiCheckCircle className="shrink-0 text-accent mt-0.5" size={20} />
                <span className="text-sm font-semibold leading-6 text-primary dark:text-white">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-primary py-20 dark:bg-slate-900">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Live Delivery Dashboard" title="Real-time visibility into your mobile app-development program" copy="Track milestones, dependencies, and team velocity from a single unified command center designed for mobile delivery." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '94%', label: 'Sprint Velocity', color: 'text-secondary' },
              { value: '12', label: 'Active Workstreams', color: 'text-white' },
              { value: '3', label: 'Blockers Resolved', color: 'text-accent' },
              { value: '28', label: 'Days to Launch', color: 'text-secondary' }
            ].map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-slate-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Tech Stack" title="Platforms & tools we leverage" copy="We work with industry-leading platforms to deliver scalable, performant, and secure mobile experiences." />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {service.technologies.map((tech) => (
              <span key={tech} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-300 hover:border-secondary hover:text-secondary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{tech}</span>
            ))}
            {[
              'Flutter',
              'React Native',
              'Swift',
              'Kotlin',
              'Dart',
              'Objective-C',
              'Java',
              'Xcode',
              'Android Studio',
              'CocoaPods',
              'Gradle',
              'Fastlane',
              'Firebase',
              'AWS Amplify',
              'App Center',
              'Sentry',
              'Postman',
              'Figma',
              'Zeplin',
              'Jira'
            ].map((tech) => (
              <span key={tech} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-300 hover:border-secondary hover:text-secondary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{tech}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Our Process" title="How we bring your vision to life" />
          <div className="mt-12 relative">
            <div className="absolute left-8 top-0 h-full w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
            <div className="space-y-10">
              {service.process.map((phase, index) => (
                <motion.div key={phase.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative grid gap-6 md:grid-cols-[80px_1fr] md:gap-10">
                  <div className="hidden md:flex"><div className="relative z-10 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-secondary text-sm font-black text-white shadow-lg dark:border-slate-950">{phase.step}</div></div>
                  <div className="md:pl-4">
                    <div className="flex items-center gap-3 md:hidden"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-black text-white">{phase.step}</span><h3 className="text-lg font-black text-primary dark:text-white">{phase.title}</h3></div>
                    <h3 className="hidden text-lg font-black text-primary dark:text-white md:block">{phase.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{phase.copy}</p>
                  </div>
                </motion.div>
              ))}
              {[
                { step: '02', title: 'UI/UX Design & Prototyping', copy: 'Create intuitive, platform-specific interfaces with interactive prototypes, design systems, and user journey mapping.' },
                { step: '03', title: 'Development & Integration', copy: 'Build native or cross-platform apps with clean architecture, REST/GraphQL APIs, and third-party integrations.' },
                { step: '04', title: 'Testing & Quality Assurance', copy: 'Execute unit, integration, UI, and performance tests across devices and OS versions to ensure stability.' },
                { step: '05', title: 'Launch & Post-Launch Support', copy: 'Handle app store submissions, monitor analytics, and provide continuous updates and feature improvements.' }
              ].map((phase, index) => (
                <motion.div key={phase.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: (service.process.length + index) * 0.1 }} className="relative grid gap-6 md:grid-cols-[80px_1fr] md:gap-10">
                  <div className="hidden md:flex"><div className="relative z-10 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-secondary text-sm font-black text-white shadow-lg dark:border-slate-950">{phase.step}</div></div>
                  <div className="md:pl-4">
                    <div className="flex items-center gap-3 md:hidden"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-black text-white">{phase.step}</span><h3 className="text-lg font-black text-primary dark:text-white">{phase.title}</h3></div>
                    <h3 className="hidden text-lg font-black text-primary dark:text-white md:block">{phase.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{phase.copy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Continue Exploring" title="Related services" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((rs) => (
              <ServiceCard key={rs.slug || rs._id} service={rs} index={0} />
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to get started with {service.title}?</h2>
            <p className="mt-4 text-lg leading-8 text-white/90">Let's discuss your requirements and explore how Trimurya Corporation can help you achieve your goals.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg">Schedule a Strategy Call <FiArrowRight size={16} /></Button>
              <Button to="/services" variant="ghost" className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"><FiArrowLeft size={16} /> All Services</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

