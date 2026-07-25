import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiArrowRight,
  FiSearch,
  FiX,
  FiGlobe,
  FiHeart,
  FiDollarSign,
  FiBox,
  FiShoppingBag,
  FiBriefcase,
  FiCpu,
  FiBookOpen,
  FiFlag,
  FiCheckCircle,
  FiMail,
  FiExternalLink
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { fetchPublished } from '../services/contentApi.js';

const fallbackIndustries = [
  {
    slug: 'healthcare',
    title: 'Healthcare & Life Sciences',
    summary: 'AI-driven diagnostics, patient-data platforms, and compliance-first delivery for medical enterprises.',
    content: 'We help healthcare organizations transform patient outcomes through AI, automation, and secure data platforms. Our HIPAA-compliant delivery spans clinical NLP, medical imaging, supply chain optimization, and real-world evidence platforms.',
    tags: ['AI Diagnostics', 'HIPAA Compliant', 'Clinical NLP', 'Medical Imaging', 'Supply Chain'],
    stat: '35+',
    statLabel: 'Health Clients',
    image: '/hero-images/image03.svg'
  },
  {
    slug: 'financial-services',
    title: 'Financial Services',
    summary: 'Risk engines, anti-fraud systems, regulatory reporting, and digital banking platforms for global banks.',
    content: 'From core banking transformation to real-time fraud detection and algorithmic risk scoring, we build secure, scalable platforms that meet the highest compliance standards while improving time-to-market.',
    tags: ['Fintech', 'Risk Analytics', 'RegTech', 'Digital Banking', 'Fraud Detection'],
    stat: '$2B+',
    statLabel: 'Transactions Daily',
    image: '/hero-images/image06.svg'
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    summary: 'Predictive maintenance, smart factories, computer vision QC, and supply-chain visibility at scale.',
    content: 'We integrate IoT, computer vision, and digital twins into manufacturing operations to reduce downtime, improve quality control, and create end-to-end supply-chain visibility across global production networks.',
    tags: ['IoT', 'Computer Vision', 'Digital Twins', 'Predictive Maintenance', 'ERP'],
    stat: '40%',
    statLabel: 'Downtime Reduced',
    image: '/hero-images/image10.svg'
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail & E-Commerce',
    summary: 'Personalization engines, omnichannel platforms, inventory AI, and last-mile logistics optimization.',
    content: 'We help retailers and D2C brands build AI-powered commerce platforms that deliver personalized experiences, optimize inventory, and unify online and offline customer journeys for higher lifetime value.',
    tags: ['Personalization', 'Omnichannel', 'Recommendation AI', 'Inventory AI', 'CDP'],
    stat: '3x',
    statLabel: 'Conversion Lift',
    image: '/hero-images/image12.svg'
  },
  {
    slug: 'professional-services',
    title: 'Professional Services',
    summary: 'Delivery enablement, knowledge AI, automated workflows, and client-experience platforms for firms.',
    content: 'Law firms, consultancies, and advisory practices rely on Trimurya to automate knowledge work, streamline client engagement, and deploy secure document and workflow platforms that scale with practice growth.',
    tags: ['Knowledge AI', 'Automation', 'Client Portals', 'Document AI', 'Workflow'],
    stat: '60%',
    statLabel: 'Efficiency Gain',
    image: '/hero-images/image03.svg'
  },
  {
    slug: 'technology-saas',
    title: 'Technology & SaaS',
    summary: 'Product engineering, platform scalability, developer experience, and go-to-market acceleration for software companies.',
    content: 'We partner with SaaS and platform companies to accelerate product development, improve developer velocity, and scale infrastructure for millions of users. Our engagements include platform engineering, DevSecOps, and AI feature integration.',
    tags: ['DevSecOps', 'Platform Eng', 'AI Features', 'Cloud Native', 'DX'],
    stat: '99.99%',
    statLabel: 'Uptime Achieved',
    image: '/hero-images/image07.svg'
  },
  {
    slug: 'education',
    title: 'Education',
    summary: 'Adaptive learning systems, student analytics, campus automation, and research data platforms for universities.',
    content: 'From adaptive learning engines to automated grading and student success dashboards, we build ed-tech solutions that improve outcomes, reduce administrative burden, and personalize education at scale.',
    tags: ['EdTech', 'Adaptive Learning', 'Analytics', 'Campus Automation', 'LMS'],
    stat: '2M+',
    statLabel: 'Learners Impacted',
    image: '/hero-images/image15.svg'
  },
  {
    slug: 'government-public-sector',
    title: 'Government & Public Sector',
    summary: 'Digital government services, citizen platforms, smart-city infrastructure, and secure data ecosystems for public agencies.',
    content: 'We deliver secure, accessible digital services for government agencies and public-sector organizations. Our work includes citizen portals, smart-city platforms, geospatial analytics, and compliance-first cloud migrations.',
    tags: ['GovTech', 'Smart Cities', 'Geospatial', 'Cloud Migration', 'Accessibility'],
    stat: '12+',
    statLabel: 'Countries Served',
    image: '/hero-images/image18.svg'
  }
];

const iconMap = {
  'healthcare': FiHeart,
  'financial-services': FiDollarSign,
  'manufacturing': FiBox,
  'retail-ecommerce': FiShoppingBag,
  'professional-services': FiBriefcase,
  'technology-saas': FiCpu,
  'education': FiBookOpen,
  'government-public-sector': FiFlag
};

const placeholderColors = [
  ['#0f172a', '#1e3a5f'],
  ['#06283d', '#0f4c81'],
  ['#1e3a5f', '#0f172a'],
  ['#0f172a', '#334155'],
  ['#1e293b', '#0f172a'],
  ['#0c4a6e', '#082f49'],
  ['#1e3a5f', '#0f172a'],
  ['#0f172a', '#172554']
];

function IndustryPlaceholder({ title, index }) {
  const colors = placeholderColors[index % placeholderColors.length];
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-t-[28px]" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.12) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 backdrop-blur-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
    </div>
  );
}

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    fetchPublished('industries').then((data) => {
      const hasData = Array.isArray(data) && data.length > 0 && data.some((item) => item.title || item.summary);
      if (hasData) {
        const normalized = data.map((item) => ({
          id: item._id || item.slug || Math.random().toString(),
          slug: item.slug || (item.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
          title: item.title || 'Untitled',
          summary: item.summary || item.content?.slice(0, 120) || 'Enterprise delivery for this sector.',
          content: item.content || item.summary || '',
          image: item.image || item.images?.[0] || null,
          tags: item.metadata?.tags || [],
          stat: item.metadata?.stat || null,
          statLabel: item.metadata?.statLabel || null
        }));
        setIndustries(normalized);
      } else {
        setIndustries(fallbackIndustries);
      }
      setLoading(false);
    }).catch(() => {
      setIndustries(fallbackIndustries);
      setLoading(false);
    });
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set();
    industries.forEach((industry) => {
      (industry.tags || []).forEach((tag) => tags.add(tag));
    });
    return ['All', ...tags];
  }, [industries]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return industries.filter((industry) => {
      const matchesSearch = !q ||
        (industry.title || '').toLowerCase().includes(q) ||
        (industry.summary || '').toLowerCase().includes(q) ||
        (industry.content || '').toLowerCase().includes(q);
      const matchesTag = selectedTag === 'All' || (industry.tags || []).includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [industries, search, selectedTag]);

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
            <span className="font-semibold text-white">Industries</span>
          </nav>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
                <FiGlobe size={14} />
                Industries
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">Deep expertise across regulated and fast-growth sectors.</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                We bring decades of combined delivery experience to healthcare, finance, manufacturing, retail, technology, education, and government clients worldwide.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="#industry-grid" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">Explore Industries <FiArrowRight size={16} /></Button>
                <Button to="/about" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10">Our Story</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { stat: '25+', label: 'Industries Served' },
                    { stat: '12', label: 'Global Markets' },
                    { stat: '200+', label: 'Enterprise Clients' },
                    { stat: '99%', label: 'Client Retention' }
                  ].map((item) => (
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

      <section id="industry-grid" className="border-y border-slate-200 bg-white py-24 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeader eyebrow="Portfolio" title="Industries we transform" copy="Domain-led teams with proven outcomes in every sector we serve." centered={false} />
            <div className="flex gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search industries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 sm:w-64"
                />
                {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><FiX size={16} /></button>}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${selectedTag === tag ? 'bg-secondary text-white shadow-lg shadow-secondary/25' : 'bg-white border border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {loading ? (
                [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div key={n} className="h-80 rounded-[28px] bg-slate-100 dark:bg-slate-800 animate-pulse" />
                ))
              ) : (
                filtered.map((industry, index) => {
                  const Icon = iconMap[industry.slug] || FiGlobe;
                  return (
                    <motion.div
                      key={industry.id || industry.slug}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group flex flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="relative h-56 w-full overflow-hidden">
                        {industry.image ? (
                          <img src={industry.image} alt={industry.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <IndustryPlaceholder title={industry.title} index={index} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1 text-[11px] font-bold text-secondary backdrop-blur-sm">
                            <Icon size={12} />
                            {industry.title}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-lg font-black text-primary dark:text-white">{industry.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{industry.summary}</p>
                        {industry.content && industry.content !== industry.summary && (
                          <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400 line-clamp-3">{industry.content}</p>
                        )}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {(industry.tags || []).slice(0, 4).map((tag) => (
                            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{tag}</span>
                          ))}
                        </div>
                        <div className="mt-auto pt-5">
                          <div className="flex items-center justify-between">
                            {industry.stat && (
                              <div>
                                <p className="text-xl font-black text-secondary">{industry.stat}</p>
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{industry.statLabel}</p>
                              </div>
                            )}
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors group-hover:text-accent">
                              Explore
                              <FiArrowRight size={16} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && !loading && (
            <div className="mt-16 text-center" data-aos="fade-up">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <FiSearch size={28} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-black text-primary dark:text-white">No industries found</h3>
              <p className="mt-2 text-sm text-slate-500">Try adjusting your search or filter to discover more sectors.</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to transform your industry?</h2>
          <p className="mt-4 text-lg leading-8 text-white/90">Partner with Trimurya to build intelligent, scalable solutions tailored to your sector.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg"><FiMail size={16} /> Start a Conversation</Button>
            <Button to="/case_studies" variant="ghost" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><FiExternalLink size={16} /> View Case Studies</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
