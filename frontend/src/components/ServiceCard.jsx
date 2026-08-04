import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiBox } from 'react-icons/fi';
import { resolveIcon } from '../utils/iconResolver.js';

export default function ServiceCard({ service, index = 0 }) {
  const Icon = resolveIcon(service.icon) || FiBox;
  const MotionLink = motion(Link);

  return (
    <MotionLink
      to={`/services/${service.slug || service.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="group relative block overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white dark:bg-secondary/20">
            <Icon size={28} />
          </span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-secondary group-hover:text-secondary dark:border-slate-700">
            <FiArrowUpRight size={18} />
          </span>
        </div>

        <h3 className="text-xl font-black leading-tight text-primary dark:text-white">{service.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {(service.items || []).slice(0, 6).map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 transition-colors duration-300 group-hover:bg-secondary/10 group-hover:text-secondary dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-secondary/20 dark:group-hover:text-secondary">{item}</span>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors duration-300 group-hover:text-accent">
          Explore service
          <FiArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </MotionLink>
  );
}
