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
  FiLock,
  FiServer,
  FiEye,
  FiZap,
  FiGlobe,
  FiAward,
  FiFileText,
  FiAlertTriangle,
  FiLayers,
  FiCode,
  FiDatabase
} from 'react-icons/fi';
import { fetchPublished, fetchPublishedBySlug } from '../services/contentApi.js';
import { resolveIcon } from '../utils/iconResolver.js';
import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Button from '../components/Button.jsx';
import cybersecurityHero from '../assets/cybersecurity-hero.svg';
import cybersecurityShield from '../assets/cybersecurity-shield.svg';
import cybersecurityMonitor from '../assets/cybersecurity-monitor.svg';
import ctaBg from '../assets/cybersecurity-cta-bg.svg';

function serviceSlug(title) {
  return title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const complianceBadges = [
  { name: 'ISO 27001', icon: FiAward },
  { name: 'SOC 2 Type II', icon: FiFileText },
  { name: 'GDPR Compliant', icon: FiGlobe },
  { name: 'NIST Framework', icon: FiLayers },
  { name: 'CIS Controls', icon: FiShield },
  { name: 'PCI DSS', icon: FiLock }
];

const frameworks = [
  { name: 'Zero Trust Architecture', desc: 'Never trust, always verify across every access point.' },
  { name: 'DevSecOps', desc: 'Integrate security into every stage of the development lifecycle.' },
  { name: 'Threat Intelligence', desc: 'Proactive monitoring and analysis of emerging threats.' },
  { name: 'Incident Response', desc: 'Rapid containment, eradication, and recovery protocols.' },
  { name: 'Vulnerability Management', desc: 'Continuous scanning, prioritization, and remediation.' },
  { name: 'Security Analytics', desc: 'AI-driven anomaly detection and real-time dashboards.' }
];

const engagementModels = [
  { title: 'Dedicated Security Team', copy: 'A fully embedded squad acting as your extended security department with 24/7 coverage.', icon: FiUsers },
  { title: 'Project-Based Engagement', copy: 'Targeted assessments, audits, or implementations with clear milestones and deliverables.', icon: FiTarget },
  { title: 'Co-Managed Security', copy: 'Collaborative model where we augment your internal team with specialized expertise.', icon: FiLayers },
  { title: 'Advisory & Consulting', copy: 'Strategic guidance on governance, compliance roadmaps, and maturity assessments.', icon: FiTrendingUp }
];

export default function Cybersecurity() {
  const slug = 'cybersecurity';
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
                    <p className="text-2xl font-black text-secondary">{stat.value}</p>
                    <p className="mt-1 text-xs font-bold text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/contact" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">Start Your Security Journey <FiArrowRight size={16} /></Button>
              
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <img src={cybersecurityHero} alt="Cybersecurity Services Dashboard" className="w-full rounded-2xl" />
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
              '40% faster incident response',
              '100% compliance audit pass rate',
              '3x ROI on security investments',
            ])].map((outcome, index) => (
              <motion.div key={outcome} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <FiCheckCircle className="mx-auto text-accent" size={24} />
                <p className="mt-3 text-sm font-bold leading-6 text-primary dark:text-white">{outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <img src={cybersecurityShield} alt="Cybersecurity Shield" className="w-full rounded-2xl" />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <SectionHeader eyebrow="Why Choose Us" title="Benefits that drive impact" copy="We deliver measurable results through structured cybersecurity services that de-risks initiatives and accelerates outcomes." />
              <div className="mt-8 space-y-5">
                {service.benefits.map((benefit, index) => {
                  const BenefitIcon = resolveIcon(benefit.icon) || FiShield;
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
                  { title: '24/7 Security Operations Center', copy: 'Round-the-clock threat detection, monitoring, and rapid incident response to keep your business protected at all times.', icon: FiEye },
                  { title: 'Expert-Led Response', copy: 'Certified security professionals with deep expertise across industries, ensuring fast and effective incident handling.', icon: FiUsers },
                  { title: 'Continuous Compliance', copy: 'Ongoing monitoring and reporting to maintain regulatory alignment with ISO, SOC, GDPR, and industry-specific standards.', icon: FiFileText },
                  { title: 'Cost-Effective Security', copy: 'Reduce risk and operational overhead with scalable security solutions that deliver maximum protection without breaking the bank.', icon: FiTrendingUp }
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

      <section className="relative bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader eyebrow="Capabilities" title="What we deliver" />
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">Our end-to-end cybersecurity capabilities cover the full lifecycle from strategy and assessment to implementation, monitoring, and continuous improvement.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {service.features.map((feature, index) => (
                  <motion.div key={feature} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-5 shadow-sm dark:bg-slate-900">
                    <FiCheckCircle className="shrink-0 text-accent mt-0.5" size={20} />
                    <span className="text-sm font-semibold leading-6 text-primary dark:text-white">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <img src={cybersecurityHero} alt="Cybersecurity Capabilities Dashboard" className="w-full rounded-2xl" />
              </div>
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-20 dark:bg-slate-900">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Live Delivery Dashboard" title="Real-time visibility into your cybersecurity program" copy="Track milestones, dependencies, and team velocity from a single unified command center designed for security delivery." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '99.9%', label: 'Uptime Protected', color: 'text-secondary', icon: FiServer },
              { value: '< 15min', label: 'Incident Response', color: 'text-accent', icon: FiZap },
              { value: '24/7', label: 'SOC Monitoring', color: 'text-white', icon: FiEye },
              { value: '100+', label: 'Threat Feeds', color: 'text-secondary', icon: FiTrendingUp }
            ].map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                <stat.icon className="mx-auto text-secondary/80" size={28} />
                <p className={`mt-4 text-4xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-slate-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="relative bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Compliance & Standards" title="Enterprise-grade assurance" copy="We align your security program with globally recognized frameworks and regulatory requirements." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {complianceBadges.map((badge, index) => {
              const BadgeIcon = badge.icon;
              return (
                <motion.div key={badge.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary dark:bg-secondary/20"><BadgeIcon size={20} /></div>
                  <div>
                    <h3 className="text-sm font-black text-primary dark:text-white">{badge.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Certified & Audited</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Security Frameworks" title="How we protect your business" copy="A proven methodology combining people, process, and technology to build resilient security postures." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {frameworks.map((fw, index) => (
              <motion.div key={fw.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white dark:bg-accent/20"><FiShield size={20} /></div>
                <h3 className="mt-4 text-base font-black text-primary dark:text-white">{fw.name}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{fw.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-white/80">Engagement Models</p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">Flexible models tailored to your maturity</h2>
              <p className="mt-4 text-base leading-7 text-white/80">Whether you need a full security team, a targeted assessment, or ongoing advisory, we adapt to your operating model.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {engagementModels.slice(0, 2).map((model, index) => {
                  const ModelIcon = model.icon;
                  return (
                    <motion.div key={model.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                      <ModelIcon className="text-white" size={22} />
                      <h3 className="mt-3 text-sm font-black text-white">{model.title}</h3>
                      <p className="mt-1 text-xs leading-6 text-white/75">{model.copy}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
                <img src={cybersecurityShield} alt="Cybersecurity Engagement" className="w-full rounded-2xl" />
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            </motion.div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engagementModels.slice(2).map((model, index) => {
              const ModelIcon = model.icon;
              return (
                <motion.div key={model.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                  <ModelIcon className="text-white" size={22} />
                  <h3 className="mt-3 text-sm font-black text-white">{model.title}</h3>
                  <p className="mt-1 text-xs leading-6 text-white/75">{model.copy}</p>
                </motion.div>
              );
            })}
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
                { step: '02', title: 'Security Strategy & Roadmap', copy: 'Develop a prioritized roadmap aligned with business objectives, risk appetite, and regulatory requirements to guide your security investments.' },
                { step: '03', title: 'Implementation & Integration', copy: 'Deploy security tools, policies, and controls across cloud, on-prem, and hybrid environments with minimal disruption to operations.' },
                { step: '04', title: 'Continuous Monitoring & Improvement', copy: 'Leverage real-time analytics, threat intelligence, and automated response to maintain a resilient security posture over time.' },
                { step: '05', title: 'Incident Response & Recovery', copy: 'Activate proven playbooks, coordinate cross-functional response, and restore services quickly with post-incident review and remediation.' }
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
          <SectionHeader eyebrow="Continue Exploring" title="All services" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allServices.map((s, index) => (
              <ServiceCard key={s.slug || s._id} service={s} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-slate-900/40" style={{ backgroundImage: `url(${ctaBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to get started with {service.title}?</h2>
            <p className="mt-4 text-lg leading-8 text-white/90">Let's discuss your requirements and explore how Trimurya Corporation can help you achieve your goals.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact" className="bg-yellow text-primary hover:bg-yellow-1000 shadow-lg">Schedule a Strategy Call <FiArrowRight size={16} /></Button>
              
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
