import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiCheckCircle,
  FiTrendingUp,
  FiUsers,
  FiClock,
  FiBarChart2,
  FiGlobe,
  FiLayers,
  FiArrowLeft,
  FiMail
} from 'react-icons/fi';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const allCaseStudies = [
  {
    id: 1,
    slug: 'global-bank-digital-transformation',
    title: 'Global Bank Digital Transformation',
    client: 'Fortune 500 Financial Services',
    industry: 'Finance',
    image: '/hero-images/image01.svg',
    summary: 'Replatformed core banking infrastructure and unified 12 legacy systems into a scalable cloud-native platform serving 4.2M customers.',
    challenge: 'The client operated 12 disconnected legacy systems across 8 countries. Customer onboarding took 14 days, and system outages during peak hours were increasing.',
    solution: 'We architected a cloud-native core banking platform with microservices, real-time event streaming, and unified customer data layer across all regions. Our team performed a phased migration with zero downtime, ensuring regulatory compliance in each jurisdiction.',
    results: [
      { label: 'Onboarding time', value: '14 days → 4 hours', icon: FiClock },
      { label: 'System uptime', value: '99.98%', icon: FiCheckCircle },
      { label: 'Cost reduction', value: '42%', icon: FiTrendingUp },
      { label: 'Customer NPS', value: '+38 points', icon: FiUsers }
    ],
    tech: ['AWS', 'Kubernetes', 'Kafka', 'PostgreSQL', 'React', 'Node.js', 'Terraform'],
    featured: true,
    content: 'This enterprise engagement spanned 18 months and involved 60+ engineers across 3 delivery centers. We used domain-driven design to decompose the monolith, built a real-time event mesh with Kafka, and implemented a unified customer 360 view. The migration was executed in phases by business capability, with comprehensive rollback procedures and chaos testing to ensure resilience.'
  },
  {
    id: 2,
    slug: 'healthchain-supply-chain',
    title: 'HealthChain Supply Chain Optimization',
    client: 'Multinational Pharmaceutical',
    industry: 'Healthcare',
    image: '/hero-images/image02.svg',
    summary: 'Built AI-powered supply chain visibility platform reducing stockouts by 67% across 35 countries and 200+ distribution centers.',
    challenge: 'Fragmented supply chain data led to frequent stockouts of critical medicines, with an average 23-day delay in demand forecasting across emerging markets.',
    solution: 'Deployed an AI/ML demand forecasting engine with real-time IoT sensor integration and blockchain-based provenance tracking.',
    results: [
      { label: 'Stockout reduction', value: '67%', icon: FiTrendingUp },
      { label: 'Forecast accuracy', value: '94.2%', icon: FiBarChart2 },
      { label: 'Countries covered', value: '35', icon: FiGlobe },
      { label: 'Cost savings', value: '$28M/year', icon: FiTrendingUp }
    ],
    tech: ['Python', 'TensorFlow', 'Azure', 'IoT', 'Blockchain', 'PostgreSQL', 'React'],
    featured: true,
    content: 'We integrated IoT temperature and humidity sensors across 200+ distribution centers, feeding real-time data into our ML forecasting models. The blockchain layer ensured immutable provenance records for regulatory compliance. The solution reduced emergency air freight by 40% and improved vaccine stockout rates from 18% to under 6%.'
  },
  {
    id: 3,
    slug: 'retailnext-omnichannel',
    title: 'RetailNext Omnichannel Platform',
    client: 'Top 3 Global Retailer',
    industry: 'Retail',
    image: '/hero-images/image03.svg',
    summary: 'Delivered unified omnichannel commerce platform handling 2.1M daily transactions with real-time inventory sync and personalization engine.',
    challenge: 'Siloed online and offline operations caused inventory mismatches, poor customer experience, and lost revenue opportunities.',
    solution: 'Created a unified commerce platform with real-time inventory sync, AI-driven personalization, and seamless BOPIS/curbside pickup workflows.',
    results: [
      { label: 'Daily transactions', value: '2.1M+', icon: FiBarChart2 },
      { label: 'Revenue uplift', value: '31%', icon: FiTrendingUp },
      { label: 'Cart abandonment', value: '-24%', icon: FiUsers },
      { label: 'Delivery SLA', value: '99.5%', icon: FiCheckCircle }
    ],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'Elasticsearch', 'TensorFlow', 'AWS'],
    featured: false,
    content: 'The platform unified ERP, POS, and e-commerce systems into a single inventory truth layer. We built an AI recommendation engine that increased average order value by 18%. The BOPIS workflow reduced pickup wait times from 22 minutes to under 4 minutes during peak hours.'
  },
  {
    id: 4,
    slug: 'cloudnine-enterprise-saas',
    title: 'CloudNine Enterprise SaaS Suite',
    client: 'Enterprise SaaS Unicorn',
    industry: 'Technology',
    image: '/hero-images/image04.svg',
    summary: 'Scaled SaaS platform from 10K to 500K enterprise users with multi-tenant architecture, RBAC, and SOC 2 Type II compliance.',
    challenge: 'The platform could not handle enterprise clients due to lack of multi-tenancy, granular access controls, and compliance certifications.',
    solution: 'Re-architected to a multi-tenant SaaS model with role-based access control, audit logging, and achieved SOC 2 Type II and GDPR compliance.',
    results: [
      { label: 'Enterprise users', value: '500K+', icon: FiUsers },
      { label: 'Uptime SLA', value: '99.99%', icon: FiCheckCircle },
      { label: 'Incident response', value: '< 8 min', icon: FiClock },
      { label: 'Compliance', value: 'SOC 2 + GDPR', icon: FiLayers }
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Kubernetes', 'Docker', 'Datadog'],
    featured: true,
    content: 'We designed a multi-tenant data schema with tenant isolation at the database level. The RBAC system supported 47 distinct permission sets. Our SRE team implemented proactive monitoring and automated incident response, reducing MTTR by 80%.'
  },
  {
    id: 5,
    slug: 'smartfactory-industry-4.0',
    title: 'SmartFactory Industry 4.0',
    client: 'Global Automotive Manufacturer',
    industry: 'Manufacturing',
    image: '/hero-images/image05.svg',
    summary: 'Implemented IoT-enabled smart factory platform connecting 8,000+ sensors for predictive maintenance and real-time production optimization.',
    challenge: 'Unplanned downtime cost $4.2M monthly. Maintenance was reactive rather than predictive, and production bottlenecks were identified too late.',
    solution: 'Deployed edge IoT sensors with ML-based predictive maintenance and digital twin simulation for production line optimization.',
    results: [
      { label: 'Unplanned downtime', value: '-78%', icon: FiTrendingUp },
      { label: 'Sensors connected', value: '8,000+', icon: FiLayers },
      { label: 'Maintenance cost', value: '-35%', icon: FiTrendingUp },
      { label: 'OEE improvement', value: '+22%', icon: FiBarChart2 }
    ],
    tech: ['IoT', 'Azure', 'Python', 'ML', 'React', 'PostgreSQL', 'Kafka', 'Edge Computing'],
    featured: false,
    content: 'Edge gateways processed 1.2M sensor readings per minute with sub-100ms latency. The ML models predicted equipment failure 72 hours in advance with 91% accuracy. Digital twin simulations enabled what-if scenario planning for production scheduling.'
  },
  {
    id: 6,
    slug: 'finova-lending-platform',
    title: 'Finova Lending Platform',
    client: 'Digital-Only Neobank',
    industry: 'Finance',
    image: '/hero-images/image06.svg',
    summary: 'Built end-to-end digital lending platform processing 50K+ loan applications monthly with AI credit scoring and automated underwriting.',
    challenge: 'Manual underwriting took 3-5 business days. Approval rates were inconsistent, and fraud losses exceeded 1.2% of portfolio value.',
    solution: 'Developed AI-powered credit scoring engine with automated underwriting workflows and real-time fraud detection using graph neural networks.',
    results: [
      { label: 'Approval time', value: '< 5 minutes', icon: FiClock },
      { label: 'Monthly applications', value: '50K+', icon: FiBarChart2 },
      { label: 'Fraud reduction', value: '89%', icon: FiCheckCircle },
      { label: 'Approval accuracy', value: '97.3%', icon: FiTrendingUp }
    ],
    tech: ['Python', 'TensorFlow', 'Node.js', 'React', 'MongoDB', 'Redis', 'AWS'],
    featured: false,
    content: 'The AI credit scoring model analyzed 800+ alternative data signals beyond traditional bureau data. Real-time graph neural networks identified fraud rings with 89% higher accuracy than rule-based systems. Automated underwriting reduced operational costs by 62% while maintaining risk-adjusted returns.'
  }
];

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const cs = allCaseStudies.find((item) => item.slug === slug);

  if (!cs) {
    return (
      <div className="min-h-screen">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-20 lg:py-28">
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="flex items-center gap-1 text-slate-400 hover:text-secondary transition-colors"><FiHome size={14} /><span>Home</span></Link>
              <FiChevronRight size={14} className="text-slate-500" />
              <Link to="/case_studies" className="text-slate-400 hover:text-secondary transition-colors">Case Studies</Link>
              <FiChevronRight size={14} className="text-slate-500" />
              <span className="font-semibold text-white">Not Found</span>
            </nav>
            <div className="mt-10">
              <h1 className="text-4xl font-black text-white">Case Study Not Found</h1>
              <p className="mt-4 text-slate-300">The requested case study does not exist or has been moved.</p>
              <Button to="/case_studies" className="mt-6">Browse All Case Studies</Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
            <Link to="/case_studies" className="text-slate-400 hover:text-secondary transition-colors">Case Studies</Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <span className="font-semibold text-white">{cs.title}</span>
          </nav>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">{cs.industry}</span>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">{cs.title}</h1>
              <p className="mt-4 text-lg text-slate-300">{cs.client}</p>
              <p className="mt-4 text-base leading-7 text-slate-300">{cs.summary}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="#results" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">View Results</Button>
                <Button to="/case_studies" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10"><FiArrowLeft size={16} /> All Case Studies</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-slate-900">
                  <img src={cs.image} alt={cs.title} className="h-full w-full object-cover opacity-70" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">The Challenge</span>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{cs.challenge}</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Our Solution</span>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{cs.solution}</p>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeader eyebrow="Impact" title="Measurable business outcomes" centered />
          <div id="results" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cs.results.map((result) => {
              const Icon = result.icon;
              return (
                <motion.div key={result.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <Icon size={24} />
                  </div>
                  <p className="mt-4 text-3xl font-black text-primary dark:text-white">{result.value}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">{result.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-24">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Engagement Summary</span>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{cs.content}</p>
          </div>
        </div>

        <div className="mt-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Technology Stack</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {cs.tech.map((t) => (
              <span key={t} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">{t}</span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-lg font-black text-primary dark:text-white">Client</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{cs.client}</p>
            <p className="mt-1 text-xs text-slate-500">{cs.industry}</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-lg font-black text-primary dark:text-white">Ready to start?</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Discuss your requirements with our engineering team.</p>
            <Button to="/contact" className="mt-4"><FiMail size={16} /> Contact Us</Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-2xl font-black text-white">Want similar results?</h2>
              <p className="mt-1 text-sm text-white/90">Let us build your case study next.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/case_studies" variant="ghost" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><FiArrowLeft size={16} /> All Case Studies</Button>
              <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg"><FiMail size={16} /> Get in Touch</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
