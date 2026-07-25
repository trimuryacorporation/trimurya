import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiFileText,
  FiCalendar,
  FiExternalLink,
  FiArrowRight,
  FiMail,
  FiDownload,
  FiSearch,
  FiX,
  FiTrendingUp,
  FiAward,
  FiGlobe,
  FiShield,
  FiUsers,
  FiZap,
  FiClock,
  FiTag,
  FiLayers,
  FiTarget,
  FiStar,
  FiChevronDown,
  FiPlus,
  FiCheckCircle,
  FiMapPin,
  FiPhone,
  FiGlobe as FiGlobe2
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { fetchPublished } from '../services/contentApi.js';

const FALLBACK_PRESS_RELEASES = [
  {
    id: 1,
    date: 'July 22, 2026',
    title: 'Trimurya Corporation Announces Strategic Partnership with Global Cloud Provider',
    excerpt: 'The partnership will accelerate enterprise AI adoption across 12 countries, combining Trimurya delivery expertise with next-generation cloud infrastructure to transform how global enterprises scale intelligent systems.',
    category: 'Partnership',
    featured: true,
    image: '/hero-images/image01.svg'
  },
  {
    id: 2,
    date: 'June 15, 2026',
    title: 'Trimurya Wins "Best Enterprise AI Implementation" at Global Tech Awards',
    excerpt: 'Recognized for delivering a mission-critical AI platform for a Fortune 500 financial services client, processing 2M+ transactions daily with 99.99% uptime and real-time fraud detection.',
    category: 'Award',
    featured: true,
    image: '/hero-images/image02.svg'
  },
  {
    id: 3,
    date: 'May 08, 2026',
    title: 'Trimurya Expands Delivery Network with New Engineering Center in Singapore',
    excerpt: 'The new center will house 200+ engineers focused on cloud, cybersecurity, and digital transformation projects for APAC clients, marking our fifth global delivery hub.',
    category: 'Growth',
    featured: false,
    image: '/hero-images/image03.svg'
  },
  {
    id: 4,
    date: 'April 20, 2026',
    title: 'Trimurya Achieves SOC 2 Type II and ISO 27001 Certifications',
    excerpt: 'These certifications reinforce our commitment to enterprise-grade security, data privacy, and compliance for global clients operating in regulated industries.',
    category: 'Compliance',
    featured: false,
    image: '/hero-images/image04.svg'
  },
  {
    id: 5,
    date: 'March 01, 2026',
    title: 'Trimurya Launches AI-Powered Supply Chain Platform for Healthcare Clients',
    excerpt: 'The platform reduces drug stockouts by 67% across 35 countries, leveraging IoT sensors and machine learning demand forecasting to save lives and optimize logistics.',
    category: 'Product',
    featured: false,
    image: '/hero-images/image05.svg'
  },
  {
    id: 6,
    date: 'February 12, 2026',
    title: 'Trimurya Honored in "Top 50 Enterprise Tech Providers" List',
    excerpt: 'Ranked among the top enterprise technology partners globally for AI, cloud, and digital transformation services by an independent industry analyst firm.',
    category: 'Recognition',
    featured: false,
    image: '/hero-images/image06.svg'
  },
  {
    id: 7,
    date: 'January 18, 2026',
    title: 'Trimurya and Government of India Collaborate on Digital Public Infrastructure',
    excerpt: 'The collaboration will build scalable digital identity and payment infrastructure serving over 500 million citizens across rural and urban India.',
    category: 'Partnership',
    featured: false,
    image: '/hero-images/image07.svg'
  },
  {
    id: 8,
    date: 'December 05, 2025',
    title: 'Trimurya Raises $45M Series C to Accelerate Global Expansion',
    excerpt: 'The funding round was led by leading venture capital firms and will fuel Trimurya\'s expansion into North America and Europe.',
    category: 'Growth',
    featured: false,
    image: '/hero-images/image08.svg'
  },
  {
    id: 9,
    date: 'November 20, 2025',
    title: 'Trimurya Launches Sustainability Initiative: Zero Carbon Delivery by 2030',
    excerpt: 'The initiative commits Trimurya to carbon-neutral operations across all delivery centers, with investments in renewable energy and green computing.',
    category: 'Product',
    featured: false,
    image: '/hero-images/image09.svg'
  }
];

const CATEGORY_ICONS = {
  'Partnership': FiGlobe,
  'Award': FiAward,
  'Growth': FiTrendingUp,
  'Compliance': FiShield,
  'Product': FiZap,
  'Recognition': FiUsers
};

const mediaKit = [
  { title: 'Brand Guidelines', desc: 'Logos, colors, typography, and usage rules for all media.', fileType: 'PDF', icon: FiFileText },
  { title: 'Executive Headshots', desc: 'High-resolution photos of the leadership team.', fileType: 'ZIP', icon: FiUsers },
  { title: 'Company Fact Sheet', desc: 'Key stats, services, and global footprint overview.', fileType: 'PDF', icon: FiFileText },
  { title: 'Case Study Pack', desc: 'Selected enterprise case studies and client references.', fileType: 'PDF', icon: FiAward }
];

const milestones = [
  { year: '2026', title: 'Global AI Platform Launch', desc: 'Launched our enterprise AI platform serving 12 countries with 99.99% uptime.', icon: FiZap },
  { year: '2025', title: 'Series C Funding', desc: 'Raised $45M to accelerate global expansion into North America and Europe.', icon: FiStar },
  { year: '2024', title: 'ISO 27001 & SOC 2 Certified', desc: 'Achieved enterprise-grade security certifications for global compliance.', icon: FiShield },
  { year: '2023', title: '500+ Enterprise Clients', desc: 'Surpassed 500 enterprise clients across healthcare, finance, and government sectors.', icon: FiUsers },
  { year: '2022', title: 'Singapore Delivery Hub', desc: 'Opened our fifth global delivery center with 200+ engineers in APAC.', icon: FiGlobe },
  { year: '2021', title: 'Company Founded', desc: 'Trimurya Corporation was established with a vision to transform enterprise delivery.', icon: FiStar }
];

const coverageLogos = [
  'Forbes', 'TechCrunch', 'Bloomberg', 'Economic Times', 'Business Standard',
  'Mint', 'Inc42', 'YourStory', 'Entrackr', 'Livemint'
];

export default function PressMedia() {
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPublished('press-releases').then((data) => {
      if (cancelled) return;
      const normalized = (data || []).map((item) => ({
        ...item,
        id: item._id || item.id,
        date: item.date || new Date(item.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        featured: item.featured === true || item.featured === 'true',
        image: item.image || item.images?.[0] || null
      }));
      setPressReleases(normalized.length > 0 ? normalized : FALLBACK_PRESS_RELEASES);
      setLoading(false);
    }).catch(() => {
      if (!cancelled) {
        setPressReleases(FALLBACK_PRESS_RELEASES);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith('/releases')) {
      const el = document.getElementById('releases');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 0);
    } else if (path.endsWith('/media-kit')) {
      const el = document.getElementById('media-kit');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 0);
    }
  }, [location.pathname]);

  const categories = ['All', ...new Set(pressReleases.map((p) => p.category).filter(Boolean))];

  const filtered = pressReleases.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch = !q || (item.title || '').toLowerCase().includes(q) || (item.excerpt || '').toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const featuredRelease = pressReleases.find((p) => p.featured) || pressReleases[0];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-24 lg:py-32">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.12) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -left-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center gap-1 text-slate-400 hover:text-secondary transition-colors"><FiHome size={14} /><span>Home</span></Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <span className="font-semibold text-white">Press & Media</span>
          </nav>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
                <FiFileText size={14} />
                Press Room
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">News, stories, and brand resources.</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Stay updated with the latest announcements, industry recognition, and media resources from Trimurya Corporation.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button to="/Press_Media/releases" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">Latest News <FiArrowRight size={16} /></Button>
                <Button to="/Press_Media/media-kit" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10">Media Kit</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { stat: '50+', label: 'Press Mentions', icon: FiFileText },
                    { stat: '6', label: 'Awards Won', icon: FiAward },
                    { stat: '12', label: 'Countries Covered', icon: FiGlobe },
                    { stat: '2026', label: 'Established Presence', icon: FiZap }
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <item.icon size={20} />
                      </div>
                      <p className="mt-3 text-3xl font-black text-secondary">{item.stat}</p>
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

      <section id="releases" className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="py-16">
            <SectionHeader eyebrow="Press Releases" title="Latest announcements" copy="Company news, product launches, partnerships, and industry awards." centered />
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${selectedCategory === cat ? 'bg-secondary text-white shadow-lg shadow-secondary/25' : 'bg-white border border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search press releases..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 sm:w-64" />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><FiX size={16} /></button>}
            </div>
          </div>

          {featuredRelease && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 overflow-hidden rounded-2xl border border-secondary/20 bg-white shadow-lg shadow-secondary/5 dark:border-slate-800 dark:bg-slate-900">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  {featuredRelease.image ? (
                    <img src={featuredRelease.image} alt={featuredRelease.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                      <FiFileText size={64} className="text-slate-300 dark:text-slate-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                      <FiStar size={10} /> Featured Story
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">{featuredRelease.category}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-500"><FiCalendar size={12} /> {featuredRelease.date}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black leading-tight text-primary dark:text-white">{featuredRelease.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{featuredRelease.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4">
                    <Button to="/Press_Media/releases" className="bg-secondary text-white hover:bg-secondary/90">Read Full Story <FiArrowRight size={16} /></Button>
                    <button className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline">
                      Share <FiExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {filtered.filter((item) => !item.featured).map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 ${item.featured ? 'border-secondary/20' : 'border-slate-200'}`}>
                <div className="relative h-48 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                      <FiFileText size={48} className="text-slate-300 dark:text-slate-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                      <FiFileText size={10} /> {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-primary dark:text-white group-hover:text-secondary transition-colors leading-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300 line-clamp-3">{item.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <FiCalendar size={14} />
                      {item.date}
                    </div>
                    <button className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline">
                      Read more <FiExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <FiSearch size={28} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-black text-primary dark:text-white">No press releases found</h3>
              <p className="mt-2 text-sm text-slate-500">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <SectionHeader eyebrow="Our Journey" title="Key milestones" copy="A decade of delivering enterprise-grade solutions across the globe." centered />
          <div className="mt-16 relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 lg:left-1/2 lg:-translate-x-px" />
            <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
              {milestones.map((milestone, index) => (
                <motion.div key={milestone.year} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`relative pl-12 lg:pl-0 lg:pr-8 ${index % 2 === 0 ? 'lg:text-right lg:pr-8 lg:pl-0' : 'lg:pl-8 lg:pr-0'}`}>
                  <div className={`absolute left-0 top-0 hidden h-8 w-8 items-center justify-center rounded-full bg-secondary text-white text-xs font-black lg:flex ${index % 2 === 0 ? 'lg:right-0 lg:-translate-x-1/2' : 'lg:left-0 lg:translate-x-1/2'}`}>
                    <milestone.icon size={14} />
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">{milestone.year}</span>
                    <h3 className="mt-3 text-lg font-black text-primary dark:text-white">{milestone.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <SectionHeader eyebrow="In the News" title="Recent media coverage" copy="Trimurya has been featured in leading publications and industry reports." centered />
          <div className="mt-16">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {coverageLogos.map((logo) => (
                <motion.div key={logo} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-2 text-slate-400 hover:text-secondary transition-colors">
                  <FiFileText size={16} />
                  <span className="text-sm font-bold">{logo}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="media-kit" className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <SectionHeader eyebrow="Media Kit" title="Brand resources for journalists" copy="Download official logos, photos, and company information for editorial use." centered />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mediaKit.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <item.icon size={24} />
              </div>
              <h3 className="mt-5 text-lg font-black text-primary dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <FiDownload size={12} /> {item.fileType}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Want to feature Trimurya?</h2>
          <p className="mt-4 text-lg leading-8 text-white/90">Our communications team is happy to help with interviews, data, and brand assets for your story.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg"><FiMail size={16} /> Press Contact</Button>
            <Button to="/case_studies" variant="ghost" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><FiArrowRight size={16} /> View Case Studies</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <FiMail size={24} />
            </div>
            <h3 className="mt-4 text-xl font-black text-primary dark:text-white">Stay in the loop</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Get the latest press releases and company news delivered to your inbox.</p>
          </div>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" required className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
            <Button type="submit" className="bg-secondary text-white hover:bg-secondary/90 whitespace-nowrap">Subscribe <FiArrowRight size={16} /></Button>
          </form>
          <p className="mt-3 text-xs text-slate-500">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
}