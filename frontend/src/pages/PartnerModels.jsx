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

const models = [
  {
    slug: 'strategic-alliance',
    title: 'Strategic Alliance',
    eyebrow: 'Model 01',
    image: '/hero-images/image01.svg',
    summary: 'Long-term embedded partnerships with shared accountability, co-designed roadmaps, and joint delivery teams.',
    details: 'Our strategic alliances go beyond vendor relationships. We embed with your teams, align incentives, and operate as an extension of your organization. This model is ideal for enterprise clients who need sustained transformation across multiple workstreams.',
    benefits: ['Dedicated delivery team', 'Shared OKRs and KPIs', 'Quarterly business reviews', 'Priority access to talent'],
    bestFor: 'Enterprise transformation, multi-year digital programs, AI/ML at scale'
  },
  {
    slug: 'joint-go-to-market',
    title: 'Joint Go-to-Market',
    eyebrow: 'Model 02',
    image: '/hero-images/image02.svg',
    summary: 'Co-selling and co-marketing partnerships to expand reach, reference accounts, and accelerate pipeline growth.',
    details: 'We combine your product strength with our delivery credibility to win bigger deals faster. Joint GTM includes co-branded collateral, shared sales motions, proof-of-value plays, and referral pipelines.',
    benefits: ['Co-branded sales collateral', 'Shared pipeline and revenue', 'Joint customer success stories', 'Unified pricing packages'],
    bestFor: 'SaaS partners, technology vendors, consulting firms'
  },
  {
    slug: 'technology-integration',
    title: 'Technology Integration',
    eyebrow: 'Model 03',
    image: '/hero-images/image03.svg',
    summary: 'Deep technical integrations through shared APIs, platform extensions, and ecosystem playbooks.',
    details: 'We build interoperable solutions that extend the reach of your platform. Our integration partnerships include product-led growth motions, marketplace listings, and joint solution architecture.',
    benefits: ['Shared API roadmap', 'Marketplace co-listing', 'Joint solution architecture', 'Technical enablement sessions'],
    bestFor: 'Cloud platforms, ISVs, data providers, infrastructure partners'
  },
  {
    slug: 'channel-referral',
    title: 'Channel & Referral',
    eyebrow: 'Model 04',
    image: '/hero-images/image04.svg',
    summary: 'Structured referral incentives and channel programs for partners delivering high-quality enterprise opportunities.',
    details: 'A lightweight, high-margin model designed for partners who want to refer Trimurya without the operational overhead of co-delivery. Includes tiered incentives, fast-track onboarding, and dedicated partner managers.',
    benefits: ['Tiered commission structure', 'Fast-track partner onboarding', 'Dedicated partner manager', 'Marketing development funds'],
    bestFor: 'Digital agencies, system integrators, independent consultants'
  }
];

export default function PartnerModels() {
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
            <span className="font-semibold text-white">Partnership Models</span>
          </nav>
          <div className="mt-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
              Engagement Models
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">Choose the right model for your goals.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              We offer four proven partnership models. Each is designed for different market positions, product maturity, and go-to-market strategies.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="space-y-24">
            {models.map((model, index) => (
              <motion.div key={model.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className={`relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-primary to-slate-900">
                    <img src={model.image} alt={model.title} className="h-full w-full object-cover opacity-80 mix-blend-overlay" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-flex items-center rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold text-secondary backdrop-blur-sm">{model.eyebrow}</span>
                    <h3 className="mt-3 text-2xl font-black text-white">{model.title}</h3>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">Partnership Model</span>
                  <h3 className="mt-2 text-2xl font-black text-primary dark:text-white md:text-3xl">{model.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{model.bestFor}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{model.summary}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{model.details}</p>

                  <div className="mt-6">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Key Benefits</span>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {model.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800">
                          <FiCheckCircle className="text-secondary" size={18} />
                          <span className="text-sm font-semibold text-primary dark:text-white">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">Ready to partner?</span>
              <h2 className="mt-3 text-3xl font-black text-primary dark:text-white md:text-4xl">Let us find your ideal partnership model.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Tell us about your organization, market focus, and goals. Our partnerships team will propose the right model and terms.</p>
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
            <Button to="/case_studies" variant="ghost" className="border-white/30 bg-white/10 text-white hover:bg-white/20">View Case Studies</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
