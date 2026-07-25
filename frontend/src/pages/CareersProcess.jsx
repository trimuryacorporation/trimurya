import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheckCircle, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const processSteps = [
  { step: '01', title: 'Application Review', copy: 'Our talent team reviews every resume carefully to find the best match for the role and our culture. We look for passion, potential, and alignment with our values.' },
  { step: '02', title: 'Initial Screening', copy: 'A 30-minute call with HR to discuss your experience, expectations, and how Trimurya can help you grow. This is also your chance to ask questions.' },
  { step: '03', title: 'Technical Interview', copy: 'A deep-dive session with the hiring team to assess skills, problem-solving, and collaboration style. Be prepared to share your work.' },
  { step: '04', title: 'Final Round', copy: 'Meet leadership, review your portfolio or case study, and confirm mutual fit before extending an offer. We move fast once we find the right person.' }
];

export default function CareersProcess() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.12) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -left-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center gap-1 text-slate-400 hover:text-secondary transition-colors"><FiCheckCircle size={14} /><span>Home</span></Link>
            <span className="text-slate-500">/</span>
            <Link to="/careers" className="text-slate-400 hover:text-secondary transition-colors">Careers</Link>
            <span className="text-slate-500">/</span>
            <span className="font-semibold text-white">Our Hiring Process</span>
          </nav>
          <div className="mt-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
              <FiCheckCircle size={14} />
              Hiring Process
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">What to expect when you apply</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">We have designed a transparent, respectful interview process that helps us get to know you and helps you get to know us. Here is how it works.</p>
          </div>
        </div>
      </section>

      <section className="relative bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Our Process" title="How we hire" copy="Every step is designed to be fair, efficient, and human." centered />
          <div className="mt-12 relative">
            <div className="absolute left-8 top-0 h-full w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
            <div className="space-y-10">
              {processSteps.map((phase, index) => (
                <motion.div key={phase.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative grid gap-6 md:grid-cols-[80px_1fr] md:gap-10">
                  <div className="hidden md:flex"><div className="relative z-10 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-slate-50 bg-secondary text-sm font-black text-white shadow-lg dark:border-slate-900">{phase.step}</div></div>
                  <div className="md:pl-4">
                    <div className="flex items-center gap-3 md:hidden"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-black text-white">{phase.step}</span><h3 className="text-lg font-black text-primary dark:text-white">{phase.title}</h3></div>
                    <h3 className="hidden text-lg font-black text-primary dark:text-white md:block">{phase.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{phase.copy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-xl font-black text-primary dark:text-white">Ready to apply?</h3>
          <p className="mt-2 text-sm text-slate-500">Browse our open positions and take the next step in your career with Trimurya.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button to="/careers/open-positions" className="flex-1">View Open Positions</Button>
            <Button to="/careers" variant="ghost" className="flex-1">Back to Careers</Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Have questions about the process?</h2>
          <p className="mt-4 text-lg leading-8 text-white/90">Our recruiting team is happy to help. Reach out anytime.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg"><FiMail size={16} /> Contact Recruiting</Button>
            <Button to="/careers/open-positions" variant="ghost" className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"><FiArrowLeft size={16} /> Back to Jobs</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
