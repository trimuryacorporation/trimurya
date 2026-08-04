import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCalendar, FiUsers, FiClock } from 'react-icons/fi';

export default function ProjectCard({ project, index = 0 }) {
  const gradientClass = 'from-secondary/80 to-accent/80';
  const tech = Array.isArray(project.tech) ? project.tech : [];
  const metrics = Array.isArray(project.metrics) ? project.metrics : [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group relative block overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900"
    >
      <div className={`h-48 bg-gradient-to-br ${gradientClass} relative`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">{project.type}</span>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">{project.industry}</span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-primary">
            <FiArrowUpRight size={18} />
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-bold text-white/80">{project.client}</p>
        </div>
      </div>

      <div className="p-7">
        <div className="flex flex-wrap gap-2 mb-3">
          {tech.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t}</span>
          ))}
        </div>

        <h3 className="text-2xl font-black leading-tight text-primary dark:text-white group-hover:text-secondary transition-colors">{project.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 line-clamp-2">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5"><FiCalendar size={14} /> {project.date}</span>
          <span className="inline-flex items-center gap-1.5"><FiClock size={14} /> {project.duration}</span>
          <span className="inline-flex items-center gap-1.5"><FiUsers size={14} /> {project.teamSize} Members</span>
        </div>

        {metrics.length > 0 && (
          <div className="mt-5 rounded-xl bg-secondary/10 px-4 py-3 dark:bg-secondary/20">
            <p className="text-sm font-black text-secondary">{metrics[0].value} {metrics[0].label}</p>
          </div>
        )}
      </div>

      <Link to={`/projects/${project.slug}`} className="absolute inset-0" aria-label={`View ${project.title} project`} />
    </motion.article>
  );
}
