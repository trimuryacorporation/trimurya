import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock, FiUsers, FiExternalLink } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';
import { fetchPublishedBySlug } from '../services/contentApi.js';
import { FALLBACK_PROJECTS, normalizeProject } from '../data/projectContent.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedBySlug('projects', slug).then((data) => {
      if (cancelled) return;
      const normalized = data ? normalizeProject(data) : FALLBACK_PROJECTS.find((item) => item.slug === slug) || null;
      setProject(normalized);
      if (normalized?.related?.length) {
        Promise.all(normalized.related.map((rSlug) => fetchPublishedBySlug('projects', rSlug)))
          .then((results) => {
            if (!cancelled) setRelated(results.filter(Boolean));
          });
      }
      setLoading(false);
    }).catch(() => {
      if (!cancelled) {
        const fallbackProject = FALLBACK_PROJECTS.find((item) => item.slug === slug) || null;
        setProject(fallbackProject ? normalizeProject(fallbackProject) : null);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="h-8 w-48 rounded bg-slate-100 dark:bg-slate-800 animate-pulse mb-8" />
        <div className="h-72 md:h-96 rounded-[36px] bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </section>
    );
  }

  if (!project) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeader eyebrow="404" title="Project Not Found" />
        <p className="text-center text-slate-600 dark:text-slate-300">The project you are looking for does not exist.</p>
        <div className="mt-8 flex justify-center">
          <Button to="/projects">Back to Projects</Button>
        </div>
      </section>
    );
  }

  const gradientClass = 'from-secondary/80 to-accent/80';
  const tech = Array.isArray(project.tech) ? project.tech : [];
  const metrics = Array.isArray(project.metrics) ? project.metrics : [];
  const results = project.results;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Link to="/projects" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-secondary dark:text-slate-400">
          <FiArrowLeft size={18} /> Back to Projects
        </Link>
      </motion.div>

      <div className="overflow-hidden rounded-[36px] bg-gradient-to-br relative" data-aos="fade-up">
        <div className={`h-72 md:h-96 bg-gradient-to-br ${gradientClass} relative`}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">{project.type}</span>
              <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">{project.industry}</span>
              <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">{project.status}</span>
            </div>
            <h1 className="text-4xl font-black text-white md:text-5xl lg:text-6xl leading-tight">{project.title}</h1>
            <p className="mt-3 max-w-3xl text-base text-white/80 md:text-lg">{project.summary}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4" data-aos="fade-up">
        {metrics.map((m, i) => (
          <div key={i} className="rounded-[24px] border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black text-secondary">{m.value}</p>
            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3" data-aos="fade-up">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-black text-primary dark:text-white">The Challenge</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.challenge}</p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-black text-primary dark:text-white">Our Solution</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.solution}</p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-black text-primary dark:text-white">The Results</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{results}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-black text-primary dark:text-white mb-4">Project Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Client</span>
                <span className="text-sm font-bold text-primary dark:text-white">{project.client}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Industry</span>
                <span className="text-sm font-bold text-primary dark:text-white">{project.industry}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Duration</span>
                <span className="text-sm font-bold text-primary dark:text-white">{project.duration}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Date</span>
                <span className="text-sm font-bold text-primary dark:text-white">{project.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Team</span>
                <span className="text-sm font-bold text-primary dark:text-white inline-flex items-center gap-1.5"><FiUsers size={14} /> {project.teamSize} Members</span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-black text-primary dark:text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <span key={t} className="rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-bold text-secondary dark:bg-secondary/20">{t}</span>
              ))}
            </div>
          </div>

          {project.testimonial && (
            <div className="rounded-[28px] border border-secondary/30 bg-secondary/5 p-8 dark:bg-secondary/10">
              <div className="flex items-start gap-3">
                <div className="mt-1 shrink-0 rounded-full bg-secondary/20 p-2 text-secondary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4.995v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                <div>
                  <p className="text-sm leading-7 text-slate-700 dark:text-slate-200 italic">{project.testimonial.quote}</p>
                  <div className="mt-3">
                    <p className="text-sm font-black text-primary dark:text-white">{project.testimonial.author}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{project.testimonial.role}, {project.testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20" data-aos="fade-up">
          <SectionHeader eyebrow="Related" title="Similar Projects" centered={false} />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {related.map((rp, i) => (
              <motion.div
                key={rp.slug || rp._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-secondary">{rp.type}</p>
                <h4 className="mt-3 text-xl font-black text-primary dark:text-white">{rp.title}</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{rp.summary}</p>
                <Link to={`/projects/${rp.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-secondary transition hover:text-accent">
                  View Case Study <FiExternalLink size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
