import { useState, useEffect } from 'react';
import CounterCard from '../components/CounterCard.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Button from '../components/Button.jsx';
import heroIllustration from '../assets/ai-hero.png';
import { fetchPublished } from '../services/contentApi.js';
import { resolveIcon } from '../utils/iconResolver.js';

const processSteps = [
  {
    title: 'Discover',
    copy: 'We define the opportunity, success metrics, and operating model before any work begins.',
    icon: 'FiClipboard'
  },
  {
    title: 'Architect',
    copy: 'We design the right solution, team structure, timeline, and technology stack for your business.',
    icon: 'FiLayers'
  },
  {
    title: 'Deliver',
    copy: 'We launch fast, maintain quality, and make sure every deliverable is usable from day one.',
    icon: 'FiCheckCircle'
  }
];

export default function Home() {
  const [stats, setStats] = useState([]);
  const [values, setValues] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchPublished('stats'),
      fetchPublished('values'),
      fetchPublished('projects')
    ]).then(([statsData, valuesData, projectsData]) => {
      setStats(statsData);
      setValues(valuesData);
      setProjects(projectsData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <HeroSlider />

      <section className="relative z-20 -mt-7 px-4 lg:px-8">
        {loading ? (
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
            {[1,2,3,4].map((n) => <div key={n} className="h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">{stats.map((stat) => <CounterCard key={stat.slug || stat._id} value={stat.value} label={stat.label} />)}</div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader eyebrow="Enterprise Delivery" title="Professional support for AI programs and websites" copy="We build digital experiences and delivery systems that help growing teams move faster with confidence." />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-lg font-black text-primary dark:text-white">AI Program Enablement</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">Keep your AI initiatives aligned with business goals, delivery rhythm, and stakeholder visibility.</p>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-lg font-black text-primary dark:text-white">Website Transformation</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">Launch sleek, fast, and conversion-focused websites designed for enterprise credibility and growth.</p>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/services">View Services</Button>
              <Button to="/contact" variant="ghost" className="border-primary bg-slate-950/5 text-primary hover:bg-slate-950/10 dark:border-white/20 dark:bg-white/10 dark:text-white">Schedule a Strategy Call</Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[7px] bg-slate-950/5 shadow-2xl dark:bg-white/10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/15 via-slate-950/0 to-slate-950/60" />
            <div
              className="relative w-full h-[420px] lg:h-[520px] rounded-[32px] bg-center bg-cover shadow-2xl"
              style={{ backgroundImage: `url(${heroIllustration})` }}
              role="img"
              aria-label="Enterprise service illustration"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Delivery Framework" title="A trusted process for complex projects" copy="We combine enterprise-grade planning with lean execution so your project stays on schedule and on budget." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {processSteps.map((step) => {
              const Icon = resolveIcon(step.icon);
              return (
                <div key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary/10 text-secondary dark:bg-secondary/20">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-primary dark:text-white">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-20 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Why Clients Choose Us" title="Built to support enterprise expectations" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = resolveIcon(value.icon);
              return (
                <div key={value.slug || value._id} className="rounded-3xl bg-white p-7 shadow-sm dark:bg-slate-950">
                  {Icon && <Icon className="text-secondary" size={26} />}
                  <h3 className="mt-5 font-black text-lg text-primary dark:text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{value.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeader eyebrow="Case Studies" title="Outcomes for modern teams" copy="Selected examples where better delivery and digital design made a difference." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug || project._id} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">{project.type}</p>
              <h3 className="mt-4 text-2xl font-black leading-tight text-primary dark:text-white">{project.title}</h3>
              <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-300">{project.client}</p>
              <div className="mt-6 rounded-3xl bg-secondary/10 px-4 py-4 text-sm font-black text-secondary dark:bg-secondary/20 dark:text-secondary">{project.summary}</div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Technology</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{Array.isArray(project.tech) ? project.tech.join(', ') : project.tech}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(6,29,92,0.35)] sm:px-12 lg:px-16">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${heroIllustration})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/30" />

          <div className="relative px-8 py-12 text-white sm:px-12 lg:px-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-secondary/80">Enterprise-grade readiness</p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Start your next AI program or website project with confidence.</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-secondary/90 sm:text-base">We combine rigorous planning, polished design, and backend-ready execution so your digital initiative is built on a solid foundation.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact" className="text-primary hover:bg-slate-100">Schedule a Discovery Call</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
