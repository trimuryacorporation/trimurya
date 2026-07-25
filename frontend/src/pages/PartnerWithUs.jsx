import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiUsers,
  FiTrendingUp,
  FiGlobe,
  FiAward,
  FiCheckCircle,
  FiArrowRight,
  FiMail,
  FiBriefcase,
  FiZap
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const partnershipModels = [
  {
    icon: FiBriefcase,
    title: 'Strategic Alliance',
    copy: 'Long-term partnerships where we embed with your teams, co-design roadmaps, and share accountability for outcomes.'
  },
  {
    icon: FiZap,
    title: 'Joint Go-to-Market',
    copy: 'Co-selling and co-marketing together to expand reach, reference accounts, and accelerate pipeline in new segments.'
  },
  {
    icon: FiGlobe,
    title: 'Technology Integration',
    copy: 'Deep technical integrations, shared APIs, and ecosystem playbooks that make your product and ours stronger together.'
  },
  {
    icon: FiAward,
    title: 'Channel & Referral',
    copy: 'Structured referral incentives and channel programs for firms that bring us high-quality enterprise opportunities.'
  }
];

const valueProps = [
  { title: 'Shared Revenue', copy: 'Competitive margin share and co-investment structures aligned to your growth targets.' },
  { title: 'Co-Innovation', copy: 'Access to our R&D labs, engineers, and AI/ML teams to build differentiated solutions.' },
  { title: 'Global Delivery', copy: 'Our delivery network across 12+ countries becomes yours for faster execution.' },
  { title: 'Enterprise Trust', copy: 'Leverage our Fortune 500 references, compliance posture, and proven delivery methodology.' }
];

const processSteps = [
  { step: '01', title: 'Discovery & Alignment', copy: 'Executive-level working session to map mutual goals, ICP overlaps, and success metrics.' },
  { step: '02', title: 'Pilot Engagement', copy: 'Structured pilot with clear scope, timeline, and governance to prove value quickly.' },
  { step: '03', title: 'Scale Program', copy: 'Expand across geographies, lines of business, or product families with formal partnership terms.' },
  { step: '04', title: 'Joint Growth', copy: 'Co-innovation, co-marketing, and continuous improvement to unlock new revenue together.' }
];

const stats = [
  { value: '40+', label: 'Active Partners' },
  { value: '18', label: 'Countries' },
  { value: '$240M', label: 'Partner Revenue' },
  { value: '92%', label: 'Renewal Rate' }
];

export default function PartnerWithUs() {
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
            <span className="font-semibold text-white">Partner With Us</span>
          </nav>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
                <FiUsers size={14} />
                Partnerships
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">Build more value together.</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                We partner with consulting firms, technology vendors, service integrators, and industry experts to deliver enterprise outcomes at scale.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/partner_with_us/models" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">Explore Models <FiArrowRight size={16} /></Button>
                <Button to="/partner_with_us/process" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10">How It Works</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4 p-6">
                  {stats.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                      <p className="text-3xl font-black text-secondary">{item.value}</p>
                      <p className="mt-1 text-xs font-bold text-slate-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="text-center">
                <p className="text-4xl font-black text-secondary md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="models" className="bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Partnership Models" title="Choose the right model for your goals" copy="We offer flexible engagement models that can be tailored to your market, product, and go-to-market strategy." centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnershipModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <Link key={model.title} to="/partner_with_us/models" className="group block rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-primary dark:text-white">{model.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{model.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-secondary group-hover:underline">View model <FiArrowRight size={12} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-20 dark:bg-slate-900">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.1) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Why Partners Choose Us" title="Built for enterprise co-creation" copy="We invest in partnerships the same way we invest in delivery: with rigor, transparency, and long-term commitment." centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                  <FiCheckCircle size={22} />
                </div>
                <h3 className="text-lg font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Process" title="How partnerships come to life" copy="A proven onboarding and scaling journey designed to remove friction and accelerate joint value." centered />
          <div className="mt-12 relative">
            <div className="absolute left-8 top-0 h-full w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
            <div className="space-y-10">
              {processSteps.map((phase, index) => (
                <motion.div key={phase.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative grid gap-6 md:grid-cols-[80px_1fr] md:gap-10">
                  <div className="hidden md:flex"><div className="relative z-10 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-slate-50 bg-secondary text-sm font-black text-white shadow-lg dark:border-slate-900">{phase.step}</div></div>
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
                <Button to="/case_studies" variant="ghost" className="flex-1">View Case Studies</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to grow together?</h2>
            <p className="mt-4 text-lg leading-8 text-white/90">Join 40+ partners already serving enterprise clients with Trimurya.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg">Start a Conversation <FiArrowRight size={16} /></Button>
              <Button to="/partner_with_us/process" variant="ghost" className="border-white/30 bg-white/10 text-white hover:bg-white/20">Our Partnership Process</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
