import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiUsers,
  FiMessageCircle,
  FiHeadphones,
  FiCheckCircle,
  FiArrowRight,
  FiMail,
  FiClock,
  FiSearch,
  FiX,
  FiShield,
  FiGlobe,
  FiZap,
  FiStar,
  FiPhone,
  FiMapPin,
  FiDownload,
  FiFileText,
  FiVideo,
  FiBookOpen,
  FiSettings,
  FiTrendingUp,
  FiAward,
  FiTarget
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const supportOptions = [
  {
    icon: FiUsers,
    title: 'Dedicated Account Manager',
    copy: 'Every enterprise client gets a named point of contact who understands your business, priorities, and SLAs.',
    image: '/hero-images/image01.svg'
  },
  {
    icon: FiMessageCircle,
    title: 'Live Chat Support',
    copy: 'Real-time assistance from our delivery and support teams during business hours with instant response.',
    image: '/hero-images/image02.svg'
  },
  {
    icon: FiHeadphones,
    title: '24/7 Escalation Desk',
    copy: 'Critical incidents are handled within minutes through our always-on escalation protocol and on-call engineers.',
    image: '/hero-images/image03.svg'
  },
  {
    icon: FiMail,
    title: 'Email & Ticketing',
    copy: 'Structured ticketing with SLAs, automated updates, and full audit trails for every support request.',
    image: '/hero-images/image04.svg'
  }
];

const faqs = [
  { q: 'What are your support hours?', a: 'Standard support is available 24/5. Enterprise clients receive 24/7 coverage for critical issues with a 15-minute response SLA.' },
  { q: 'How do I raise a support ticket?', a: 'You can email support@trimuryacorporation.in, use the client portal, or call your dedicated account manager directly.' },
  { q: 'What is your escalation process?', a: 'Issues are triaged within 30 minutes. P1 incidents are escalated to engineering leadership and resolved within 4 hours or less.' },
  { q: 'Do you offer proactive monitoring?', a: 'Yes. Our SRE team monitors your applications 24/7 with automated alerting, health checks, and monthly performance reports.' },
  { q: 'Can I request feature enhancements?', a: 'Absolutely. We maintain a prioritized backlog and work with you on quarterly roadmap planning sessions.' },
  { q: 'Is there a knowledge base or documentation?', a: 'Yes. Enterprise clients get access to our private documentation portal, API references, and video training libraries.' },
  { q: 'What SLAs do you offer?', a: 'We offer tiered SLAs ranging from standard business hours to 24/7 critical coverage with guaranteed response and resolution times.' },
  { q: 'Do you support on-site assistance?', a: 'Yes, for enterprise clients we can deploy on-site support engineers for critical deployments and incident response.' }
];

const teamMembers = [
  { name: 'Rajesh Kumar', role: 'Head of Support', image: '/hero-images/image10.svg' },
  { name: 'Priya Sharma', role: 'Enterprise Account Lead', image: '/hero-images/image11.svg' },
  { name: 'Amit Patel', role: 'Technical Lead', image: '/hero-images/image12.svg' },
  { name: 'Sunita Rao', role: 'Client Success Manager', image: '/hero-images/image13.svg' }
];

const resources = [
  { title: 'API Documentation', desc: 'Complete API references and integration guides for all Trimurya platforms.', icon: FiFileText, image: '/hero-images/image14.svg' },
  { title: 'Video Tutorials', desc: 'Step-by-step walkthroughs for setup, configuration, and best practices.', icon: FiVideo, image: '/hero-images/image15.svg' },
  { title: 'Knowledge Base', desc: 'Searchable articles, troubleshooting guides, and FAQ for common issues.', icon: FiBookOpen, image: '/hero-images/image16.svg' },
  { title: 'Client Portal', desc: 'Access your tickets, SLA status, and account details in one place.', icon: FiSettings, image: '/hero-images/image17.svg' }
];

export default function ClientSupport() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith('/contact')) {
      const el = document.getElementById('contact');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 0);
    } else if (path.endsWith('/faq')) {
      const el = document.getElementById('faq');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 0);
    }
  }, [location.pathname]);

  const filteredFaqs = faqs.filter((faq) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (faq.q || '').toLowerCase().includes(q) || (faq.a || '').toLowerCase().includes(q);
  });

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
            <span className="font-semibold text-white">Client Support</span>
          </nav>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
                <FiHeadphones size={14} />
                Support Center
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">We are here when you need us.</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Enterprise-grade support with dedicated account management, 24/7 escalation coverage, and proactive monitoring.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button to="/Client_Support/contact" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">Contact Support <FiArrowRight size={16} /></Button>
                <Button to="/Client_Support/faq" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10">View FAQs</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { stat: '15min', label: 'Response Time', icon: FiClock },
                    { stat: '99.9%', label: 'Uptime SLA', icon: FiShield },
                    { stat: '24/7', label: 'Coverage', icon: FiGlobe },
                    { stat: '100+', label: 'Enterprise Clients', icon: FiUsers }
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

      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="py-16">
            <SectionHeader eyebrow="Support Channels" title="How we support you" copy="Multiple channels, one commitment: fast, expert, and reliable support." centered />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div key={option.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="relative h-40 overflow-hidden">
                    {option.image ? (
                      <img src={option.image} alt={option.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                        <Icon size={48} className="text-slate-300 dark:text-slate-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                        <Icon size={10} /> {option.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{option.copy}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Our Team" title="Meet the support team" copy="Experienced professionals dedicated to your success." centered />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="relative h-32 overflow-hidden rounded-2xl">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                      <FiUsers size={48} className="text-secondary/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-black text-primary dark:text-white">{member.name}</h3>
                  <p className="mt-1 text-xs font-bold text-secondary">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <SectionHeader eyebrow="FAQs" title="Frequently asked questions" copy="Quick answers to common client support questions." centered />
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {['All', 'General', 'Technical', 'SLA'].map((tag) => (
              <button key={tag} className="rounded-full px-4 py-2 text-xs font-bold bg-white border border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
                {tag}
              </button>
            ))}
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search FAQs..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:w-64" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><FiX size={16} /></button>}
          </div>
        </div>
        <div className="mt-10 space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div key={faq.q} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <button className="flex w-full items-center justify-between text-left" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                <span className="text-sm font-black text-primary dark:text-white flex items-center gap-2"><FiCheckCircle size={16} className="text-secondary" />{faq.q}</span>
                <span className="text-secondary text-lg">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.a}</p>}
            </motion.div>
          ))}
        </div>
        {filteredFaqs.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <FiSearch size={28} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-primary dark:text-white">No FAQs found</h3>
            <p className="mt-2 text-sm text-slate-500">Try adjusting your search.</p>
          </div>
        )}
      </section>

      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <SectionHeader eyebrow="Resources" title="Help center & documentation" copy="Everything you need to get the most out of Trimurya's platform." centered />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource, index) => (
              <motion.div key={resource.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="relative h-40 overflow-hidden">
                  {resource.image ? (
                    <img src={resource.image} alt={resource.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                      <resource.icon size={48} className="text-slate-300 dark:text-slate-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                      <resource.icon size={10} /> {resource.title}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{resource.desc}</p>
                  <button className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline">
                    Access <FiArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">Get in Touch</span>
            <h2 className="mt-3 text-3xl font-black text-primary dark:text-white md:text-4xl">Need immediate assistance?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Our support team is available around the clock for enterprise clients. For general inquiries, we respond within 2 business hours.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><FiPhone size={18} /></div>
                <div>
                  <p className="text-xs font-bold text-slate-500">Phone</p>
                  <p className="text-sm font-black text-primary dark:text-white">+91 80808 80808</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><FiMail size={18} /></div>
                <div>
                  <p className="text-xs font-bold text-slate-500">Email</p>
                  <p className="text-sm font-black text-primary dark:text-white">support@trimuryacorporation.in</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><FiMapPin size={18} /></div>
                <div>
                  <p className="text-xs font-bold text-slate-500">Office</p>
                  <p className="text-sm font-black text-primary dark:text-white">Bangalore, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><FiClock size={18} /></div>
                <div>
                  <p className="text-xs font-bold text-slate-500">Response</p>
                  <p className="text-sm font-black text-primary dark:text-white">Under 2 hours</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xl font-black text-primary dark:text-white">Send us a message</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Fill out the form and our team will get back to you within 2 hours.</p>
            <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-2 sm:grid-cols-2">
                <input type="text" placeholder="Your name" required className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                <input type="email" placeholder="your@email.com" required className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
              </div>
              <input type="text" placeholder="Subject" required className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
              <textarea rows={4} placeholder="Describe your issue or inquiry..." required className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 resize-none" />
              <Button type="submit" className="bg-secondary text-white hover:bg-secondary/90 w-full">Send Message <FiArrowRight size={16} /></Button>
            </form>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to get started?</h2>
          <p className="mt-4 text-lg leading-8 text-white/90">Our team is ready to help you succeed with enterprise-grade support.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg"><FiMail size={16} /> Contact Us</Button>
            <Button to="/schedule_call" variant="ghost" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><FiClock size={16} /> Schedule a Call</Button>
          </div>
        </div>
      </section>
    </div>
  );
}