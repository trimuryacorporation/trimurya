import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiTrendingUp,
  FiUsers,
  FiClock,
  FiArrowRight,
  FiSearch,
  FiX,
  FiCheckCircle,
  FiBarChart2,
  FiGlobe,
  FiLayers
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { fetchPublished } from '../services/contentApi.js';

const industries = ['All', 'Finance', 'Healthcare', 'Retail', 'Technology', 'Manufacturing'];

const FALLBACK_CASE_STUDIES = [
  {
    id: 1,
    slug: 'global-bank-digital-transformation',
    title: 'Global Bank Digital Transformation',
    client: 'Fortune 500 Financial Services',
    industry: 'Finance',
    image: '/hero-images/image01.svg',
    summary: 'Replatformed core banking infrastructure and unified 12 legacy systems into a scalable cloud-native platform serving 4.2M customers.',
    challenge: 'The client operated 12 disconnected legacy systems across 8 countries. Customer onboarding took 14 days, and system outages during peak hours were increasing.',
    solution: 'We architected a cloud-native core banking platform with microservices, real-time event streaming, and unified customer data layer across all regions.',
    results: [
      { label: 'Onboarding time', value: '14 days → 4 hours', icon: FiClock },
      { label: 'System uptime', value: '99.98%', icon: FiCheckCircle },
      { label: 'Cost reduction', value: '42%', icon: FiTrendingUp },
      { label: 'Customer NPS', value: '+38 points', icon: FiUsers }
    ],
    tech: ['AWS', 'Kubernetes', 'Kafka', 'PostgreSQL', 'React', 'Node.js', 'Terraform'],
    featured: true
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
    featured: true
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
    featured: false
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
    featured: true
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
    featured: false
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
    featured: false
  }
];

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndustry, setActiveIndustry] = useState('All');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPublished('case_studies').then((data) => {
      if (cancelled) return;
      const normalized = (data || []).map((item) => ({
        ...item,
        results: typeof item.results === 'string' ? JSON.parse(item.results || '[]') : (item.results || []),
        tech: typeof item.tech === 'string' ? item.tech.split(',').map((t) => t.trim()).filter(Boolean) : (item.tech || []),
        featured: item.featured === true || item.featured === 'true'
      }));
      setCaseStudies(normalized.length > 0 ? normalized : FALLBACK_CASE_STUDIES);
      setLoading(false);
    }).catch(() => {
      if (!cancelled) {
        setCaseStudies(FALLBACK_CASE_STUDIES);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    let result = caseStudies;
    if (activeIndustry !== 'All') {
      result = result.filter((cs) => cs.industry === activeIndustry);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (cs) =>
          (cs.title || '').toLowerCase().includes(q) ||
          (cs.client || '').toLowerCase().includes(q) ||
          (cs.industry || '').toLowerCase().includes(q) ||
          (cs.summary || '').toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeIndustry, search]);

  const featured = caseStudies.filter((cs) => cs.featured);

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
            <Link to="/projects" className="text-slate-400 hover:text-secondary transition-colors">Projects</Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <span className="font-semibold text-white">Case Studies</span>
          </nav>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
                <FiLayers size={14} />
                Case Studies
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">Enterprise-grade solutions delivered at scale.</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Real results for real enterprises. Each case study documents our approach, technology stack, and measurable business impact.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="#featured" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">View Featured Work <FiArrowRight size={16} /></Button>
                <Button to="#all-case-studies" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10">All Case Studies</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { stat: '500+', label: 'Projects Delivered' },
                    { stat: '99.9%', label: 'Average Uptime' },
                    { stat: '$2.1B', label: 'Client Revenue Impact' },
                    { stat: '40+', label: 'Enterprise Clients' }
                  ].map((item, index) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                      <p className="text-3xl font-black text-secondary">{item.stat}</p>
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
            {[
              { value: '500+', label: 'Projects Delivered', desc: 'Across 12 industries worldwide' },
              { value: '40+', label: 'Enterprise Clients', desc: 'Including Fortune 500 companies' },
              { value: '$2.1B', label: 'Revenue Impact', desc: 'Generated for our clients' },
              { value: '99.9%', label: 'Avg Uptime', desc: 'Enterprise-grade reliability' }
            ].map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="text-center">
                <p className="text-4xl font-black text-secondary md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-slate-500">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-400">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Featured" title="Flagship case studies" copy="Deep dives into our most impactful enterprise engagements." centered />
          <div className="mt-12 space-y-24">
            {featured.map((cs, index) => (
              <motion.div key={cs.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className={`relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-primary to-slate-900">
                    <img src={cs.image} alt={cs.title} className="h-full w-full object-cover opacity-80 mix-blend-overlay" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-flex items-center rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold text-secondary backdrop-blur-sm">{cs.industry}</span>
                    <h3 className="mt-3 text-2xl font-black text-white">{cs.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{cs.client}</p>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">Client Background</span>
                  <h3 className="mt-2 text-2xl font-black text-primary dark:text-white md:text-3xl">{cs.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{cs.client}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{cs.summary}</p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Challenge</span>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{cs.challenge}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Solution</span>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{cs.solution}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Business Outcomes</span>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {cs.results.map((result) => {
                        const Icon = result.icon;
                        return (
                          <div key={result.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800">
                            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                              <Icon size={18} />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">{result.label}</p>
                              <p className="text-sm font-black text-primary dark:text-white">{result.value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Technology Stack</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cs.tech.map((t) => (
                        <span key={t} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="all-case-studies" className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <SectionHeader eyebrow="All Case Studies" title="Browse our work" copy="Filter by industry or search for specific clients, technologies, or outcomes." centered />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveIndustry(industry)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                  activeIndustry === industry
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/25'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search case studies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:w-64"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cs, index) => (
            <motion.div key={cs.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
              <Link to={`/case_studies/${cs.slug}`} className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary to-slate-900">
                  <img src={cs.image} alt={cs.title} className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold text-secondary backdrop-blur-sm">{cs.industry}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs font-bold text-slate-300">{cs.client}</p>
                    <h3 className="mt-1 text-lg font-black text-white group-hover:text-secondary transition-colors">{cs.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300 line-clamp-2">{cs.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cs.tech.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t}</span>
                    ))}
                    {cs.tech.length > 4 && <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">+{cs.tech.length - 4}</span>}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-secondary">
                    Read case study <FiArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <FiSearch size={28} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-primary dark:text-white">No case studies found</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or industry filter.</p>
          </div>
        )}
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to build your success story?</h2>
            <p className="mt-4 text-lg leading-8 text-white/90">Let us discuss how we can deliver measurable impact for your enterprise.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg">Start a Conversation <FiArrowRight size={16} /></Button>
              <Button to="/projects" variant="ghost" className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20">View All Projects</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
