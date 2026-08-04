import { motion } from 'framer-motion';
import { FiCheckCircle, FiChevronRight, FiExternalLink, FiList, FiTarget } from 'react-icons/fi';
import Button from './Button.jsx';
import SectionHeader from './SectionHeader.jsx';
import { resolveIcon } from '../utils/iconResolver.js';

function actionNode(action, variant = 'primary') {
  if (!action?.label) return null;
  const isExternal = typeof action.href === 'string' && /^(https?:)?\/\//.test(action.href);
  const sharedClass = variant === 'secondary'
    ? 'border-slate-200 bg-white text-primary hover:border-secondary hover:text-secondary dark:border-slate-700 dark:bg-slate-900 dark:text-white'
    : '';

  if (isExternal) {
    return (
      <a key={action.label} href={action.href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold ${sharedClass || 'bg-secondary text-white shadow-lg shadow-secondary/20 hover:bg-secondary/90'}`}>
        {action.label}
        <FiExternalLink size={15} />
      </a>
    );
  }

  return (
    <Button key={action.label} to={action.href || '/'} variant={variant === 'secondary' ? 'ghost' : 'primary'} className={sharedClass}>
      {action.label}
      <FiChevronRight size={15} />
    </Button>
  );
}

export default function PageSectionRenderer({ section }) {
  if (!section?.type) return null;

  if (section.type === 'hero') {
    const metrics = Array.isArray(section.metrics) ? section.metrics : [];
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            {section.eyebrow && <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">{section.eyebrow}</p>}
            <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">{section.title}</h1>
            {section.copy && <p className="mt-6 text-lg leading-8 text-slate-300">{section.copy}</p>}
            <div className="mt-8 flex flex-wrap gap-4">
              {actionNode(section.primaryAction)}
              {actionNode(section.secondaryAction, 'secondary')}
            </div>
            {metrics.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <p className="text-2xl font-black text-secondary">{metric.value}</p>
                    <p className="mt-1 text-xs font-bold text-slate-400">{metric.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {section.image && (
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
              <img src={section.image} alt={section.title || 'Hero'} className="w-full rounded-2xl" loading="eager" />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (section.type === 'stats') {
    return (
      <section className="border-y border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(section.items || []).map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-3xl font-black text-secondary">{item.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === 'cards') {
    return (
      <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
          <div className={`mt-12 grid gap-6 ${section.columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
            {(section.items || []).map((item, index) => {
              const Icon = item.icon ? resolveIcon(item.icon) : FiTarget;
              return (
                <motion.div key={item.title || index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-primary dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.copy || item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === 'steps') {
    return (
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
          <div className="mt-12 space-y-6">
            {(section.items || []).map((step, index) => (
              <div key={step.step || step.title || index} className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[80px_1fr]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-lg font-black text-white">
                  {step.step || String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-lg font-black text-primary dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.copy || step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === 'faq') {
    return (
      <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeader eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
          <div className="mt-12 space-y-4">
            {(section.items || []).map((faq, index) => (
              <div key={faq.q || faq.question || index} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start gap-3">
                  <FiHelpCircle className="mt-0.5 shrink-0 text-secondary" size={20} />
                  <div>
                    <h3 className="font-bold text-primary dark:text-white">{faq.q || faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.a || faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === 'content') {
    return (
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeader eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
          <div className="mt-10 space-y-6 text-sm leading-8 text-slate-600 dark:text-slate-300">
            {(section.paragraphs || []).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === 'cta') {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          {section.eyebrow && <p className="text-xs font-black uppercase tracking-[0.3em] text-white/80">{section.eyebrow}</p>}
          <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">{section.title}</h2>
          {section.copy && <p className="mt-4 text-lg leading-8 text-white/90">{section.copy}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {actionNode(section.primaryAction)}
            {actionNode(section.secondaryAction, 'secondary')}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === 'list') {
    return (
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
          <div className="mt-10 flex flex-wrap gap-3">
            {(section.items || []).map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <FiList size={14} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
}
