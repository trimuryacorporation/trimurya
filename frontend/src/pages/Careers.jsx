import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiSearch,
  FiHome,
  FiChevronRight,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiUsers,
  FiTrendingUp,
  FiHeart,
  FiZap,
  FiGlobe,
  FiAward,
  FiCoffee,
  FiArrowRight,
  FiHelpCircle,
  FiMail,
  FiStar,
  FiBookOpen,
  FiMonitor,
  FiLayers
} from 'react-icons/fi';
import { fetchPublished } from '../services/contentApi.js';
import { resolveIcon } from '../utils/iconResolver.js';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';
import SearchBar from '../components/SearchBar.jsx';
import heroIllustration from '../assets/ai-hero.png';

const processSteps = [
  { step: '01', title: 'Application Review', copy: 'Our talent team reviews every resume carefully to find the best match for the role and our culture. We look for passion, potential, and alignment with our values.' },
  { step: '02', title: 'Initial Screening', copy: 'A 30-minute call with HR to discuss your experience, expectations, and how Trimurya can help you grow. This is also your chance to ask questions.' },
  { step: '03', title: 'Technical Interview', copy: 'A deep-dive session with the hiring team to assess skills, problem-solving, and collaboration style. Be prepared to share your work.' },
  { step: '04', title: 'Final Round', copy: 'Meet leadership, review your portfolio or case study, and confirm mutual fit before extending an offer. We move fast once we find the right person.' }
];

const benefits = [
  { icon: 'FiTrendingUp', title: 'Career Growth', copy: 'Clear promotion paths, mentorship programs, and continuous learning budgets to accelerate your professional journey.' },
  { icon: 'FiGlobe', title: 'Remote Flexibility', copy: 'Work from anywhere with flexible hours, async-first collaboration, and quarterly team offsites worldwide.' },
  { icon: 'FiHeart', title: 'Health & Wellness', copy: 'Comprehensive medical coverage, mental wellness support, gym reimbursements, and unlimited PTO.' },
  { icon: 'FiZap', title: 'Innovation Days', copy: 'Every quarter, spend 48 hours on passion projects that could become your next big breakthrough.' }
];

const cultureValues = [
  { title: 'Ownership', copy: 'We give people real authority and hold them accountable for outcomes.' },
  { title: 'Transparency', copy: 'Every team member has context into strategy, metrics, and decision-making.' },
  { title: 'Craftsmanship', copy: 'We obsess over quality and never ship something we are not proud of.' },
  { title: 'Diversity', copy: 'Different perspectives make us stronger. We hire for talent, not background.' }
];

const teamHighlights = [
  { stat: '150+', label: 'Team Members', desc: 'Brilliant minds from around the world' },
  { stat: '12', label: 'Countries', desc: 'Truly global and distributed' },
  { stat: '30+', label: 'Open Roles', desc: 'Across engineering, design, and delivery' },
  { stat: '96%', label: 'Satisfaction', desc: 'Our people love working here' }
];

const testimonials = [
  { quote: 'Trimurya gave me the freedom to lead real enterprise projects within my first year. The mentorship here is next level.', author: 'Priya Sharma', role: 'Senior Engineer', company: 'Trimurya Corp' },
  { quote: 'I switched from a corporate role to Trimurya and never looked back. The culture genuinely cares about your growth.', author: 'Rahul Verma', role: 'Product Designer', company: 'Trimurya Corp' },
  { quote: 'The innovation days changed how I think about work. They actually encourage you to be curious and experiment.', author: 'Anika Patel', role: 'Data Scientist', company: 'Trimurya Corp' }
];

const faqs = [
  { q: 'Do you hire remotely worldwide?', a: 'Yes. We are a distributed-first company with team members across multiple continents. We support flexible schedules and home-office stipends.' },
  { q: 'What is the interview process like?', a: 'It typically takes 2-3 weeks and includes a screening call, technical or role-specific interview, and a final fit conversation with leadership.' },
  { q: 'Do you offer internships?', a: 'We run structured internship programs twice a year. Check the careers page regularly for openings or send your resume to careers@trimuryacorporation.in.' },
  { q: 'What benefits do you provide?', a: 'We offer competitive salaries, health insurance, wellness benefits, learning budgets, remote work stipends, and quarterly team offsites.' }
];

const jobDepartments = ['All', 'Engineering', 'Design', 'Delivery', 'Leadership', 'Marketing'];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [activeDept, setActiveDept] = useState('All');

  useEffect(() => {
    fetchPublished('jobs').then((data) => setJobs(data));
  }, []);

  const filtered = jobs.filter((job) => {
    const matchesQuery = `${job.title} ${job.department || ''}`.toLowerCase().includes(query.toLowerCase());
    const matchesDept = activeDept === 'All' || (job.department || '').toLowerCase().includes(activeDept.toLowerCase());
    return matchesQuery && matchesDept;
  });

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
            <span className="font-semibold text-white">Careers</span>
          </nav>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
                <FiUsers size={14} />
                Join Our Team
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">
                Build the future of enterprise delivery with us.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                We are looking for bold thinkers, passionate builders, and relentless problem-solvers. If you want to work on meaningful projects with a world-class team, you are in the right place.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/careers/open-positions" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">View Open Positions <FiArrowRight size={16} /></Button>
                <Button to="/careers/process" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10">Our Hiring Process</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4 p-6">
                  {teamHighlights.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                      <p className="text-3xl font-black text-secondary">{item.stat}</p>
                      <p className="mt-1 text-xs font-bold text-slate-400">{item.label}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{item.desc}</p>
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
          <SectionHeader eyebrow="Why Trimurya" title="Benefits that attract the best talent" centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const BenefitIcon = resolveIcon(benefit.icon);
              return (
                <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                    <BenefitIcon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-primary dark:text-white">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{benefit.copy}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Our Culture" title="Values that drive how we work" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cultureValues.map((val, index) => (
              <motion.div key={val.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-3xl bg-white p-7 shadow-sm dark:bg-slate-950">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <FiAward size={20} />
                </div>
                <h3 className="mt-4 text-lg font-black text-primary dark:text-white">{val.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{val.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-20 dark:bg-slate-900">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.1) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="By The Numbers" title="A workplace people stay to build" centered />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamHighlights.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                <p className="text-4xl font-black text-secondary">{stat.stat}</p>
                <p className="mt-2 text-sm font-bold text-slate-300">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-400">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeader eyebrow="Life at Trimurya" title="Where great work happens" copy="A glimpse into how we collaborate, create, and celebrate together." centered />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Global Collaboration', copy: 'Work with talented people across 12 countries in a distributed-first environment.', gradient: 'from-secondary/20 to-accent/10', icon: FiGlobe },
            { title: 'Continuous Learning', copy: 'Access courses, conferences, and certifications with your personal learning budget.', gradient: 'from-primary/20 to-secondary/10', icon: FiBookOpen },
            { title: 'Work-Life Balance', copy: 'Flexible hours, unlimited PTO, and a culture that respects your time and boundaries.', gradient: 'from-accent/20 to-secondary/10', icon: FiCoffee },
            { title: 'Cutting-Edge Tech', copy: 'Build with modern stacks, cloud platforms, and AI tools that push boundaries.', gradient: 'from-secondary/20 to-primary/10', icon: FiMonitor },
            { title: 'Team Events', copy: 'Quarterly offsites, hackathons, and innovation days that spark creativity.', gradient: 'from-primary/20 to-accent/10', icon: FiLayers },
            { title: 'Recognition', copy: 'We celebrate wins, milestones, and exceptional contributions every step of the way.', gradient: 'from-accent/20 to-primary/10', icon: FiStar }
          ].map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.gradient} p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-primary backdrop-blur-sm">
                  <item.icon size={24} />
                </div>
                <h3 className="mt-4 text-lg font-black text-primary dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{item.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-slate-900 py-20 dark:bg-slate-900">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(242,178,24,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,0.1) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
                <FiAward size={14} />
                Join Us
              </div>
              <h2 className="mt-6 text-3xl font-black leading-tight text-white md:text-4xl">Ready to build something extraordinary?</h2>
              <p className="mt-6 text-base leading-7 text-slate-300">
                We are always looking for exceptional people. If you are passionate about enterprise delivery, digital innovation, and making a real impact, we want to hear from you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/careers/open-positions" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">View Open Positions <FiArrowRight size={16} /></Button>
                <Button to="/contact" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10">Get in Touch</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <img src={heroIllustration} alt="Enterprise team collaboration" className="w-full rounded-2xl" />
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="open-positions" className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeader eyebrow="Open Positions" title="Find your next role" copy="Explore opportunities across engineering, design, delivery, and leadership." centered />
        <div className="mx-auto max-w-2xl">
          <SearchBar value={query} onChange={setQuery} placeholder="Search jobs by title or department" />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {jobDepartments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                activeDept === dept
                  ? 'bg-secondary text-white shadow-lg shadow-secondary/25'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-sm text-slate-500 py-10">No jobs found matching your search. Try a different keyword or check back later.</p>
          )}
          {filtered.map((job) => (
            <Link key={job.slug || job._id} to={`/careers/jobs/${job.slug || job._id}`}>
              <motion.article
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-secondary">
                      {job.department || job.type || 'Job'}
                    </span>
                    {job.type && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
                        <FiClock size={13} /> {job.type}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-black leading-tight text-primary dark:text-white group-hover:text-secondary transition-colors">{job.title}</h3>
                  <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
                    {job.location && <span className="flex items-center gap-1"><FiMapPin size={14} /> {job.location}</span>}
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{job.summary || job.description || ''}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-xs font-bold text-white shadow-sm">View Details</span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>

      <section id="process" className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Our Process" title="What to expect when you apply" centered />
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

      <section className="border-t border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Testimonials" title="Hear from our team" centered />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.author} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="text-5xl font-serif leading-none text-secondary/20">&ldquo;</div>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-sm font-black text-secondary">{testimonial.author.split(' ').map(n => n[0]).join('')}</div>
                  <div><p className="text-sm font-bold text-primary dark:text-white">{testimonial.author}</p><p className="text-xs text-slate-500">{testimonial.role}, {testimonial.company}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
        <SectionHeader eyebrow="FAQs" title="Frequently asked questions" centered />
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={faq.q} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start gap-3">
                <FiHelpCircle className="shrink-0 text-secondary mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-primary dark:text-white">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to join the Trimurya team?</h2>
            <p className="mt-4 text-lg leading-8 text-white/90">We are always looking for exceptional people. Explore open roles and take the next step in your career.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/careers/open-positions" className="bg-white text-primary hover:bg-slate-100 shadow-lg">Explore Careers <FiArrowRight size={16} /></Button>
              <Button to="/contact" variant="ghost" className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"><FiMail size={16} /> Contact Recruiting</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
