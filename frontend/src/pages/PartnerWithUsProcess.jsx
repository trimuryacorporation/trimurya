import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiArrowLeft,
  FiCheckCircle,
  FiArrowRight,
  FiMail
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const processSteps = [
  { step: '01', title: 'Discovery & Alignment', copy: 'Executive-level working session to map mutual goals, ICP overlaps, and success metrics.', details: 'We start with a structured discovery workshop involving leadership from both sides. The goal is to align on market segments, ideal customer profiles, revenue targets, and non-functional requirements such as compliance and data handling.' },
  { step: '02', title: 'Pilot Engagement', copy: 'Structured pilot with clear scope, timeline, and governance to prove value quickly.', details: 'We define a bounded pilot with clear success criteria, governance cadence, and a joint delivery team. Pilots typically run 6-12 weeks and produce a measurable outcome such as a reference architecture, co-sold proof of value, or integrated MVP.' },
  { step: '03', title: 'Scale Program', copy: 'Expand across geographies, lines of business, or product families with formal partnership terms.', details: 'Once the pilot delivers, we formalize the partnership with commercial terms, SLAs, integration roadmaps, and joint GTM plans. We expand across regions, verticals, or customer segments while maintaining quality and compliance.' },
  { step: '04', title: 'Joint Growth', copy: 'Co-innovation, co-marketing, and continuous improvement to unlock new revenue together.', details: 'Long-term partnerships evolve into co-innovation programs. We invest in joint R&D, shared IP where appropriate, and continuous business reviews to keep expanding the pie for both organizations.' }
];

export default function PartnerWithUsProcess() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.12) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -left-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center gap-1 text-slate-400 hover:text-secondary transition-colors"><FiHome size={14} /><span>Home</span></Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <Link to="/partner_with_us" className="text-slate-400 hover:text-secondary transition-colors">Partner With Us</Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <span className="font-semibold text-white">Our Process</span>
          </nav>
          <div className="mt-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
              Partnership Process
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">How partnerships come to life.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A proven onboarding and scaling journey designed to remove friction, align teams, and accelerate joint value creation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative">
            <div className="absolute left-8 top-0 h-full w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
            <div className="space-y-16">
              {processSteps.map((phase, index) => (
                <motion.div key={phase.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative grid gap-6 md:grid-cols-[80px_1fr] md:gap-10">
                  <div className="hidden md:flex">
                    <div className="relative z-10 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-slate-50 bg-secondary text-sm font-black text-white shadow-lg dark:border-slate-900">
                      {phase.step}
                    </div>
                  </div>
                  <div className="md:pl-4">
                    <div className="flex items-center gap-3 md:hidden">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-black text-white">{phase.step}</span>
                      <h3 className="text-lg font-black text-primary dark:text-white">{phase.title}</h3>
                    </div>
                    <h3 className="hidden text-lg font-black text-primary dark:text-white md:block">{phase.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{phase.copy}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">{phase.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">Ready to partner?</span>
              <h2 className="mt-3 text-3xl font-black text-primary dark:text-white md:text-4xl">Let us build the next chapter together.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Tell us about your organization, market focus, and what success looks like. Our partnerships team will respond within one business day.</p>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <FiMail size={22} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">Contact</p>
                  <p className="text-lg font-black text-primary dark:text-white">partnerships@trimuryacorporation.in</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <FiCheckCircle size={16} className="text-secondary" />
                  <span>Response within 1 business day</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <FiCheckCircle size={16} className="text-secondary" />
                  <span>Confidential NDA available on request</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <FiCheckCircle size={16} className="text-secondary" />
                  <span>Executive sponsor matched to your segment</span>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button to="/contact" className="flex-1">Book a Meeting</Button>
                <Button to="/partner_with_us" variant="ghost" className="flex-1"><FiArrowLeft size={16} /> Back to Partners</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to grow together?</h2>
          <p className="mt-4 text-lg leading-8 text-white/90">Join 40+ partners already serving enterprise clients with Trimurya.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg">Start a Conversation <FiArrowRight size={16} /></Button>
            <Button to="/partner_with_us/models" variant="ghost" className="border-white/30 bg-white/10 text-white hover:bg-white/20">View Partnership Models</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
