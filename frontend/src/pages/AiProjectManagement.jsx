import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiZap,
  FiArrowLeft,
  FiCheckCircle,
  FiCheck,
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
  FiMail
} from 'react-icons/fi';
import { fetchPublished, fetchPublishedBySlug } from '../services/contentApi.js';import { resolveIcon } from '../utils/iconResolver.js';
import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Button from '../components/Button.jsx';
import aiPmHero from '../assets/ai-project-management-hero.svg';
import aiPmBenefits from '../assets/ai-project-management-benefits.svg';
import OurProcessImage from '../assets/ai-project-management-benefits.svg';
import CapabilitiesImage from '../assets/ai-project-management-benefits.svg';

import aiPmBenefitsto from '../assets/ai-project-management-benefits.svg';

function serviceSlug(title) {
  return title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function AiProjectManagement() {
  const slug = 'ai-project-management';
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
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
      return fetchPublished('services');
    }).then((all) => {
      if (!cancelled && all) {
        setAllServices(all.filter((s) => s.slug !== slug));
      }
    }).catch(() => setLoading(false))
    .finally(() => { if (!cancelled) setLoading(false); });
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
              <h1 className="text-2xl font-black leading-tight text-white md:text-4xl">{service.title}</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">{service.longDescription}</p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {service.heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <p className="text-lg md:text-xl font-black text-secondary">{stat.value}</p>
                    <p className="mt-1 text-xs font-bold text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/contact" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">Start Your AI Journey <FiArrowRight size={16} /></Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <img src={aiPmHero} alt="AI Project Management Dashboard" className="w-full rounded-2xl" />
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
              '40% cost savings on AI operations',
              '60% reduction in manual workflows',
              '100% model deployment success rate',
            ])].map((outcome, index) => (
              <motion.div key={outcome} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <FiCheckCircle className="mx-auto text-accent" size={24} />
                <p className="mt-3 text-sm font-bold leading-6 text-primary dark:text-white">{outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden p-3">
              <img
                src={aiPmBenefits}
                alt="AI Project Management Benefits"
                className="w-full mt-6 rounded-[5px]"
              />
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">Why Choose Us</p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-primary dark:text-white md:text-4xl">Benefits that drive impact</h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">We deliver measurable results through structured AI project management that de-risks initiatives and accelerates outcomes.</p>
              <div className="mt-8 space-y-5">
                {service.benefits.map((benefit, index) => {
                  const BenefitIcon = resolveIcon(benefit.icon) || FiCpu;
                  return (
                    <div key={benefit.title} className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><BenefitIcon size={20} /></div>
                      <div>
                        <h3 className="text-base font-black text-primary dark:text-white">{benefit.title}</h3>
                        <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{benefit.copy}</p>
                      </div>
                    </div>
                  );
                })}
                {[
                  { title: 'Faster Time-to-Market', copy: 'Accelerate your AI initiatives with proven frameworks, reusable components, and automated pipelines that reduce delivery cycles.', icon: FiZap },
                  { title: 'Enterprise-Grade Security', copy: 'Implement robust governance, data privacy, and compliance controls aligned with industry standards and regulations.', icon: FiShield },
                  { title: 'Scalable Architecture', copy: 'Design AI systems that grow with your business, handling increased loads, new data sources, and evolving model requirements.', icon: FiTrendingUp },
                  { title: 'Measurable ROI', copy: 'Track business impact with clear KPIs, attribution models, and continuous optimization to maximize your AI investment returns.', icon: FiTarget }
                ].map((benefit, index) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div key={benefit.title} className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><BenefitIcon size={20} /></div>
                      <div>
                        <h3 className="text-base font-black text-primary dark:text-white">{benefit.title}</h3>
                        <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{benefit.copy}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader eyebrow="Capabilities" title="What we deliver" />
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">Our end-to-end AI capabilities cover the full lifecycle from data strategy and model development to deployment, monitoring, and continuous improvement.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[...new Set([
                  ...service.features,
                  'Custom AI delivery frameworks',
                  'ML model development and training',
                  'Natural language processing (NLP)',
                  'Computer vision and image recognition',
                  'Predictive analytics and forecasting',
                  'AI integration with existing systems',
                  'Data pipeline and ETL automation',
                  'Model monitoring and MLOps',
                  'Generative AI and LLM applications'
                ])].map((feature, index) => (
                  <motion.div key={feature} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-5 shadow-sm dark:bg-slate-900">
                    <FiCheckCircle className="shrink-0 text-accent mt-0.5" size={20} />
                    <span className="text-sm font-semibold leading-6 text-primary dark:text-white">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative overflow-hidden">
                <img src={CapabilitiesImage} alt="AI Capabilities" className="w-full rounded-[10px]" />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-primary py-20 dark:bg-slate-900">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Live Delivery Dashboard" title="Real-time visibility into your AI program" copy="Track milestones, dependencies, and team velocity from a single unified command center designed for AI delivery." />
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
     
      <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Our Process" title="How we bring your vision to life" />
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="relative">
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
                    { step: '02', title: 'Data Strategy & Architecture', copy: 'Design data pipelines, feature stores, and infrastructure to support scalable model training and inference.' },
                    { step: '03', title: 'Model Development & Training', copy: 'Build, train, and validate ML/DL models using best practices for performance, fairness, and reproducibility.' },
                    { step: '04', title: 'Deployment & Integration', copy: 'Package models into APIs, integrate with business systems, and orchestrate deployment with CI/CD and monitoring.' },
                    { step: '05', title: 'Monitoring & Continuous Improvement', copy: 'Track model drift, performance, and business impact, then retrain and refine on a continuous basis.' }
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
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative overflow-hidden">
                <img src={OurProcessImage} alt="AI Project Management Process" className="w-full rounded-[10px]" />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>
     
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Continue Exploring" title="All services" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
              <Link to="/marketplace" className="group relative block overflow-hidden rounded-3xl border border-secondary/20 bg-gradient-to-br from-primary to-slate-900 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-secondary/30">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white"><FiCpu size={24} /></div>
                  <h3 className="mt-4 text-xl font-black text-white">AI Marketplace</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">Browse AI-ready datasets, model tooling, training data, and enterprise solutions.</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-widest text-secondary"><span>Explore marketplace</span><FiArrowRight size={14} /></div>
                </div>
              </Link>
            </motion.div>
            {allServices.map((s, index) => (
              <ServiceCard key={s.slug || s._id} service={s} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20" style={{ backgroundImage: `url(${aiPmBenefits})` }}>
        <div className="absolute inset-0 bg-black/60" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to get started with {service.title}?</h2>
            <p className="mt-4 text-lg leading-8 text-white/90">Let's discuss your requirements and explore how Trimurya Corporation can help you achieve your goals.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact" className="bg-yellow-500 text-primary hover:bg-yellow-600 shadow-lg transition-colors duration-300">Schedule a Strategy Call <FiArrowRight size={16} /></Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

