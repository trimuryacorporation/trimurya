import { useState, useEffect, useRef } from 'react';
import { FiAward, FiBriefcase, FiCheckCircle, FiClock, FiGlobe, FiHeart, FiLayers, FiShield, FiTarget, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi';
import { resolveIcon } from '../utils/iconResolver.js';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';
import { fetchPublished } from '../services/contentApi.js';
import heroBackground from '../assets/ai-hero.png';
import SeoHead from '../components/SeoHead.jsx';
import { DEFAULT_KEYWORDS, organizationSchema, breadcrumbSchema } from '../utils/seo.js';

const storyMilestones = [
  { year: '2018', event: 'Founded as a technology consulting firm with a focus on enterprise digital transformation' },
  { year: '2019', event: 'Launched AI consulting practice, partnering with early adopters on machine learning initiatives' },
  { year: '2020', event: 'Expanded into full-stack web development and cloud infrastructure services' },
  { year: '2021', event: 'Built dedicated recruitment and HR consultancy division to serve high-growth teams' },
  { year: '2022', event: 'Achieved 100+ AI project milestones and 200+ web experiences delivered' },
  { year: '2023', event: 'Introduced enterprise BPO operations and customer experience solutions' },
  { year: '2024', event: 'Launched AI automation practice with enterprise-grade delivery frameworks' },
  { year: '2025', event: 'Established as a multi-service enterprise partner with 4.9/5 client satisfaction' }
];

const leadership = [
  {
    name: 'Prajwal Sharma',
    role: 'Founder & CEO',
    bio: 'Visionary leader with 12+ years in enterprise technology consulting and digital transformation strategy.',
    initials: 'PS'
  },
  {
    name: 'Priya Mehta',
    role: 'Head of Engineering',
    bio: 'Full-stack architect driving technical excellence across AI, web, and cloud delivery platforms.',
    initials: 'PM'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Head of Delivery',
    bio: 'Delivery expert ensuring on-time, on-budget execution for enterprise AI programs and websites.',
    initials: 'RK'
  },
  {
    name: 'Ananya Singh',
    role: 'Head of AI Practice',
    bio: 'AI strategist and data scientist leading our enterprise automation and machine learning initiatives.',
    initials: 'AS'
  },
  {
    name: 'Vikram Patel',
    role: 'Head of Design',
    bio: 'UX/UI expert crafting enterprise-grade digital experiences that drive engagement and conversion.',
    initials: 'VP'
  }
];

const credentials = [
  { label: 'ISO 27001 Aligned', icon: FiShield },
  { label: 'AWS Partner', icon: FiLayers },
  { label: 'SOC 2 Ready', icon: FiAward },
  { label: 'Google Cloud Partner', icon: FiGlobe }
];

const enterpriseCards = [
  { title: 'Integrated Delivery', description: 'Cross-functional teams, systems, and workflows aligned to your business priorities.', icon: FiLayers },
  { title: 'Security & Governance', description: 'Enterprise-grade compliance and operational oversight built into every project.', icon: FiShield },
  { title: 'People-Led Growth', description: 'Experienced teams that help your business navigate change with confidence.', icon: FiUsers }
];

const coreValues = [
  { title: 'Integrity First', copy: 'We believe trust is earned through consistent delivery, transparent communication, and honest partnerships.' },
  { title: 'Excellence in Execution', copy: 'Every project meets rigorous quality standards. We do not ship what we would not use ourselves.' },
  { title: 'Innovation with Purpose', copy: 'We leverage AI and modern technology to solve real business challenges, not chase trends.' },
  { title: 'Client-First Mindset', copy: 'Your goals are our goals. We measure success by the value we deliver to your organization.' },
  { title: 'Continuous Improvement', copy: 'We constantly refine our methods, learn from every project, and invest in our team\'s growth.' },
  { title: 'Sustainable Growth', copy: 'We build solutions that scale with your business, ensuring long-term value and adaptability.' }
];

const serviceHighlights = [
  { title: 'AI Project Management', copy: 'End-to-end oversight ensuring measurable outcomes and transparent delivery for complex AI initiatives.' },
  { title: 'Enterprise Websites', copy: 'High-performance, conversion-focused websites built for brand credibility and measurable growth.' },
  { title: 'Digital Marketing', copy: 'Data-driven strategies spanning SEO, paid media, and content to scale revenue and visibility.' },
  { title: 'Business Consultancy', copy: 'Strategic advisory for digital transformation, operational efficiency, and sustainable growth.' },
  { title: 'HR & Recruitment', copy: 'End-to-end talent acquisition and workforce planning to build high-performing teams.' },
  { title: 'Cloud & Security', copy: 'Scalable cloud architecture and comprehensive cybersecurity for enterprise-grade reliability.' }
];

const techStack = [
  'React', 'Next.js', 'Node.js', 'Python', 'AWS', 'Azure', 'GCP',
  'OpenAI', 'TensorFlow', 'Kubernetes', 'Docker', 'Terraform', 'MongoDB', 'PostgreSQL', 'Redis'
];

function AnimatedCounter({ value, suffix = '', label, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
  const displaySuffix = typeof value === 'string' ? value.replace(/[0-9./]/g, '') : suffix;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, numericValue, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-secondary md:text-5xl">
        {count}{displaySuffix}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, index }) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950">
      <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-secondary to-accent transition-all duration-500 group-hover:w-full" />
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-all duration-500 group-hover:bg-secondary group-hover:text-white">
        <span className="text-xl font-black">{index + 1}</span>
      </div>
      <h3 className="text-xl font-black text-primary dark:text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

export default function About() {
  const [visibleSections, setVisibleSections] = useState({});
  const [stats, setStats] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.section;
            setVisibleSections(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    Promise.all([fetchPublished('stats'), fetchPublished('values')])
      .then(([s, v]) => { setStats(s); setValues(v); });
  }, []);

  return (
    <>
      <SeoHead
        pathname="/about"
        title="About Trimurya Corporation India"
        description="Learn about Trimurya Corporation India, an AI services and software development company delivering automation, websites, SaaS, mobile apps, and AI data services."
        keywords={`about Trimurya Corporation, Trimurya Corporation India, Trimurya Corporation AI, ${DEFAULT_KEYWORDS}`}
        schemas={[organizationSchema()]}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.trimuryacorporation.in/' },
          { name: 'About Us', url: 'https://www.trimuryacorporation.in/about' }
        ]}
      />
      {/* Hero Section */}
      <section className="relative min-h-[85vh] overflow-hidden bg-primary" data-section="hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(242,178,24,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,122,18,0.08),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">

            <h1 className="mt-8 text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
              Building the Future of{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-secondary">Enterprise</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-secondary/20 md:bottom-3 md:h-4" />
              </span>{' '}
              Technology
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-200 md:text-lg lg:text-xl">
              Trimurya Corporation is a multi-service enterprise partner that integrates AI, web, cloud, talent, and strategy into one growth platform. We help modern businesses move faster, scale smarter, and compete with confidence.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button to="/services" className="bg-secondary shadow-2xl shadow-secondary/30 hover:bg-secondary/80 hover:shadow-secondary/50 text-base px-8 py-4">
                Explore Our Services
              </Button>
              <Button to="/contact" variant="ghost" className="border-white/20 bg-white/10 text-white hover:bg-white/20 text-base px-8 py-4">
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="-mt-1 border-b border-secondary/20 bg-white dark:bg-slate-950" data-section="stats">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.slug || stat._id} value={stat.value} suffix={stat.suffix || ''} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-20 dark:bg-slate-950 lg:py-28" data-section="story">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Our Story</span>
              </div>
              <h2 className="mt-5 text-3xl font-black leading-tight text-primary dark:text-white md:text-4xl">
                From a vision to an enterprise partner
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
                Trimurya Corporation was founded with a clear mission: bridge the gap between ambitious business goals and practical technology delivery. What started as a focused consulting practice has grown into a full-spectrum enterprise platform.
              </p>
              <div className="mt-7 space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <p>
                  We saw a persistent problem: businesses struggling to find partners who could deliver across strategy, technology, and people operations. Too often, organizations had to manage multiple vendors, align conflicting roadmaps, and reconcile different standards of execution.
                </p>
                <p>
                  Trimurya was built to solve that. From day one, we integrated strategic thinking with hands-on delivery, ensuring every engagement starts with clarity, proceeds with discipline, and ends with measurable impact.
                </p>
                <p>
                  Today, we are a trusted partner to startups and enterprise organizations across technology, healthcare, finance, manufacturing, and more. Our teams combine deep domain expertise with modern delivery practices to help clients navigate complexity and capture opportunity.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {credentials.map((cred) => {
                  const Icon = cred.icon;
                  return (
                    <div key={cred.label} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <Icon className="text-secondary" size={16} />
                      {cred.label}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[32px] overflow-hidden shadow-2xl">
                <img src={heroBackground} alt="Trimurya Corporation" className="h-[420px] w-full object-cover lg:h-[520px]" />
              </div>
              <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-secondary/10 blur-2xl" />
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-accent/10 blur-xl" />

              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-white px-5 py-3 shadow-xl dark:bg-slate-900">
                <p className="text-sm font-semibold text-primary">12+ Years of Excellence</p>
                <p className="text-xs text-slate-500">Trusted by 200+ organizations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Leadership */}
      <section className="relative overflow-hidden border-y border-slate-200 bg-slate-50/80 py-20 dark:border-slate-800 dark:bg-slate-900/50 lg:py-28" data-section="mvv">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(242,178,24,0.04),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="What Drives Us" title="Our operating principles" copy="Every decision we make is guided by our mission, informed by our vision, and grounded in our values." />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {['Mission', 'Vision', 'Leadership'].map((item, idx) => (
              <div key={item} className={`group relative rounded-[32px] p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 ${idx === 1 ? 'bg-primary text-white lg:scale-105' : 'bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-950'}`}>
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl transition-all duration-500 group-hover:scale-110 ${idx === 1 ? 'bg-white/20 text-secondary' : 'bg-secondary/10 text-secondary'}`}>
                  {idx === 0 ? <FiTarget size={26} /> : idx === 1 ? <FiGlobe size={26} /> : <FiBriefcase size={26} />}
                </div>
                <h3 className="text-2xl font-black transition-colors duration-500 group-hover:text-secondary">{item}</h3>
                <div className={`mt-5 h-1 w-12 rounded-full transition-all duration-500 group-hover:w-20 ${idx === 1 ? 'bg-secondary' : 'bg-secondary'}`} />
                <p className={`mt-5 text-sm leading-7 transition-colors duration-500 ${idx === 1 ? 'text-white/80' : 'text-slate-600 dark:text-slate-300'}`}>
                  {idx === 0
                    ? 'To deliver secure, scalable, and measurable enterprise solutions through professional teams, transparent processes, and practical innovation that helps modern businesses achieve extraordinary outcomes.'
                    : idx === 1
                    ? 'To become the most trusted multi-service enterprise partner in global markets, recognized for integrated delivery, people-first culture, and AI-powered excellence.'
                    : 'To inspire confidence in every engagement through expert guidance, ethical standards, and a commitment to building lasting partnerships that stand the test of time.'}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-500 ${idx === 1 ? 'bg-white/15 text-white' : 'bg-secondary/10 text-secondary'}`}>
                    {idx === 0 ? 'Purpose-driven' : idx === 1 ? 'Future-ready' : 'People-first'}
                  </span>
                  <span className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-500 ${idx === 1 ? 'bg-white/15 text-white' : 'bg-secondary/10 text-secondary'}`}>
                    {idx === 0 ? 'Results-focused' : idx === 1 ? 'Innovation-led' : 'Trust-centered'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="bg-white py-20 dark:bg-slate-950 lg:py-28" data-section="values">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Core Values" title="The principles that power every partnership" copy="These values are not just words on a wall. They shape our culture, guide our decisions, and define how we show up for every client and teammate." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <div key={value.title} className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-secondary to-accent transition-all duration-500 group-hover:w-full" />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-all duration-500 group-hover:bg-secondary group-hover:text-white">
                  <FiHeart size={22} />
                </div>
                <h3 className="text-xl font-black text-primary dark:text-white">{value.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900/80 lg:py-28" data-section="leadership">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Leadership" title="The people behind Trimurya" copy="A leadership team built on decades of combined experience across technology, strategy, and operations." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member) => (
              <div key={member.name} className="group relative rounded-[28px] bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 dark:bg-slate-950">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-xl font-black text-white shadow-lg">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-primary dark:text-white">{member.name}</h3>
                    <p className="text-sm font-semibold text-secondary">{member.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{member.bio}</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                  <FiCheckCircle className="text-secondary" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Credentials */}
      <section className="relative bg-primary py-16 lg:py-20" data-section="trust">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(242,178,24,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/80">Trusted by organizations worldwide</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4 lg:items-center">
            {credentials.map((cred) => {
              const Icon = cred.icon;
              return (
                <div key={cred.label} className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                  <Icon className="text-secondary" size={22} />
                  <span className="text-sm font-semibold text-white/90">{cred.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="bg-white py-20 dark:bg-slate-950 lg:py-28" data-section="timeline">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Our Journey" title="Enterprise growth in action" copy="From a single-room consultancy to a multi-service enterprise partner, our journey reflects our commitment to continuous improvement and client impact." />
          <div className="relative mt-14 pl-8 md:pl-16">
            <div className="absolute left-3 top-0 h-full w-0.5 bg-gradient-to-b from-secondary via-accent to-secondary/20 md:left-7" />
            <div className="space-y-8">
              {storyMilestones.map((milestone, index) => (
                <div key={milestone.year} className="relative grid gap-4 md:grid-cols-[auto_1fr] md:gap-8">
                  <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-2 md:pr-8">
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg font-black text-primary shadow-lg shadow-secondary/40">
                      {index + 1}
                    </div>
                    <span className="text-sm font-black text-secondary md:text-right">{milestone.year}</span>
                  </div>
                  <div className="relative rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all duration-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-semibold leading-7 text-slate-700 dark:text-slate-200">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28" data-section="services">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="What We Deliver" title="End-to-end solutions for modern enterprises" copy="From AI programs to cloud infrastructure, we provide the full spectrum of services your business needs to thrive in the digital age." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceHighlights.map((service) => (
              <div key={service.title} className="group relative overflow-hidden rounded-[28px] bg-white p-7 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-950">
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary/5 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                <h3 className="text-lg font-black text-primary dark:text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.copy}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary">
                  Learn more
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Cards */}
      <section className="bg-white py-20 dark:bg-slate-950 lg:py-28" data-section="enterprise">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
              <img src={heroBackground} alt="Enterprise DNA" className="h-[450px] w-full object-cover lg:h-[520px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-9 text-white lg:p-11">
                <span className="inline-flex w-fit rounded-full bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-secondary backdrop-blur-sm">
                  Enterprise DNA
                </span>
                <h3 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">Core values that power every partnership</h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200">
                  Our work combines strategic foresight, proven delivery methods, and a human-centered approach to help modern businesses achieve measurable results.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {values.map((value) => {
                    const Icon = resolveIcon(value.icon);
                    return (
                      <div key={value.slug || value._id} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                        {Icon && <Icon className="text-secondary" size={18} />}
                        <p className="mt-2 font-bold text-white">{value.title}</p>
                        <p className="mt-1 text-xs leading-6 text-slate-200">{value.copy}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="rounded-[32px] bg-slate-50 p-8 shadow-2xl dark:bg-slate-900">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-secondary">Company Timeline</p>
                  <h3 className="mt-3 text-2xl font-black text-slate-900 dark:text-white lg:text-3xl">Enterprise growth milestone</h3>
                </div>
                <span className="inline-flex w-fit items-center rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary dark:bg-secondary/20">
                  Since 2018
                </span>
              </div>
              <div className="relative space-y-5">
                {storyMilestones.filter((_, i) => i % 2 === 0 || i === storyMilestones.length - 1).slice(0, 6).map((milestone, index) => (
                  <div key={milestone.year} className="relative flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-black text-primary shadow-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">{milestone.year}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Capability Cards */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28" data-section="capabilities">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Enterprise Capabilities" title="Built for scale, designed for impact" copy="We bring enterprise disciplines to every engagement, ensuring consistent quality and measurable outcomes regardless of project size or complexity." />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {enterpriseCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="group relative rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950">
                  <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full transition-all duration-500 group-hover:scale-150 ${idx === 0 ? 'bg-secondary/5' : idx === 1 ? 'bg-accent/5' : 'bg-secondary/5'}`} />
                  <div className="relative">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary/10 text-secondary transition-all duration-500 group-hover:bg-secondary group-hover:text-white dark:bg-secondary/20">
                      <Icon size={24} />
                    </div>
                    <h4 className="text-xl font-black text-primary dark:text-white">{card.title}</h4>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack / Differentiators */}
      <section className="bg-white py-20 dark:bg-slate-950 lg:py-28" data-section="differentiators">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Why Clients Choose Us</span>
              </div>
              <h2 className="mt-5 text-3xl font-black leading-tight text-primary dark:text-white md:text-4xl">
                Built to support enterprise expectations
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
                We combine deep technical expertise with proven delivery methodologies to help organizations navigate complexity and capture opportunity. Every engagement is designed around measurable outcomes, transparent communication, and sustainable impact.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  'End-to-end delivery from strategy to launch',
                  'Transparent pricing and fixed-scope engagements',
                  'Dedicated project management for every client',
                  'Proven methodologies refined across 200+ projects',
                  'Multi-disciplinary teams with deep expertise',
                  'Continuous improvement driven by client feedback'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <FiCheckCircle className="mt-0.5 flex-shrink-0 text-secondary" size={18} />
                    <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black text-primary dark:text-white">Our Technology Stack</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">We work with modern, enterprise-grade technologies to build scalable, secure, and high-performance solutions.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-10 rounded-[32px] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <FiClock size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-primary dark:text-white">24/7 Enterprise Support</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Round-the-clock monitoring and support for mission-critical applications.</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <FiZap size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-primary dark:text-white">Rapid Deployment</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Agile delivery with continuous integration and deployment pipelines.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28" data-section="awards">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,178,24,0.04),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Recognition" title="Awards and achievements" copy="Our commitment to excellence has been recognized by industry leaders and enterprise organizations worldwide." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Top AI Consultant 2024', org: 'Global Tech Awards' },
              { label: 'Best Enterprise Website', org: 'Web Excellence Institute' },
              { label: 'Innovation Leader', org: 'Enterprise Tech Summit' },
              { label: 'Client Choice Award', org: 'Clutch.co 2024' }
            ].map((award) => (
              <div key={award.label} className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <FiAward size={22} />
                </div>
                <p className="text-sm font-bold text-primary dark:text-white">{award.label}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach / Industries */}
      <section className="bg-white py-20 dark:bg-slate-950 lg:py-28" data-section="industries">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Global Reach" title="Trusted across industries and continents" copy="Our multi-disciplinary teams serve clients across diverse sectors, bringing domain-specific expertise to every engagement." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              'Healthcare & Life Sciences', 'Financial Services', 'Manufacturing', 'Retail & E-Commerce',
              'Professional Services', 'Technology & SaaS', 'Education', 'Government & Public Sector'
            ].map((industry) => (
              <div key={industry} className="group flex items-center gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                  <FiGlobe size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28" data-section="testimonials">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Client Stories" title="Trusted by industry leaders" copy="Here's what our clients say about working with Trimurya Corporation." />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                quote: 'Trimurya transformed our AI delivery practices. Their governance frameworks and transparent reporting gave us confidence in our most critical initiatives.',
                author: 'Sarah Johnson',
                role: 'CTO, FinTech Solutions Inc.'
              },
              {
                quote: 'The website redesign exceeded our expectations. Load times improved dramatically and our conversion rate is up 35%. Exceptional work from a true partner.',
                author: 'Michael Chen',
                role: 'VP Marketing, GrowthHub'
              },
              {
                quote: 'Their HR consultancy helped us build a world-class engineering team in record time. The quality of candidates and speed of delivery was outstanding.',
                author: 'David Park',
                role: 'COO, TechScale Ventures'
              }
            ].map((testimonial) => (
              <div key={testimonial.author} className="relative rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950">
                <div className="absolute -top-3 left-8">
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary">
                    <FiTrendingUp size={14} />
                    Verified
                  </span>
                </div>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-black text-primary dark:text-white">{testimonial.author}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-28" data-section="cta">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,178,24,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,122,18,0.1),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
          <span className="inline-flex rounded-full bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-secondary backdrop-blur-sm">
            Let's Work Together
          </span>
          <h2 className="mt-8 text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
            Ready to build something <span className="text-secondary">extraordinary</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
            Whether you need an AI delivery partner, a new enterprise website, or a comprehensive digital transformation strategy, our team is ready to help you achieve measurable results.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" className="bg-secondary shadow-2xl shadow-secondary/30 hover:bg-secondary/80 hover:shadow-secondary/50 text-base px-8 py-4">
              Schedule a Discovery Call
            </Button>
            <Button to="/services" variant="ghost" className="border-white/20 bg-white/10 text-white hover:bg-white/20 text-base px-8 py-4">
              View All Services
            </Button>
          </div>
          <p className="mt-8 text-xs text-slate-400">No commitment required. Initial consultation is complimentary.</p>
        </div>
      </section>
    </>
  );
}

function FiArrowRight({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
