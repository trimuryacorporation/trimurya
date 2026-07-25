import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiDollarSign,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiArrowRight,
  FiMail,
  FiFileText
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import api from '../services/api.js';

const services = [
  'AI & Machine Learning',
  'Web Development',
  'Mobile App Development',
  'Cloud Solutions',
  'Digital Marketing',
  'Cybersecurity',
  'HR Consultancy',
  'Business Consultancy'
];

const budgetRanges = ['$10K - $50K', '$50K - $100K', '$100K - $500K', '$500K+'];

export default function RequestQuote() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: services[0],
    budget: budgetRanges[0],
    timeline: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/contact', {
        ...form,
        type: 'quote',
        message: form.details || `Quote request for ${form.service}`
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit quote request. Please try again.');
    }
  };

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
            <span className="font-semibold text-white">Request a Quote</span>
          </nav>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
                <FiDollarSign size={14} />
                Get a Quote
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">Tell us about your project.</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Fill out the form and our team will prepare a tailored proposal with timelines,Scope, and transparent pricing.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: FiCheckCircle, text: 'Free consultation within 24 hours' },
                  { icon: FiCheckCircle, text: 'Transparent, fixed-price engagement models' },
                  { icon: FiCheckCircle, text: 'NDA-protected confidential discussions' },
                  { icon: FiCheckCircle, text: 'No obligation, just expert guidance' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3 text-sm text-slate-300">
                      <Icon size={18} className="text-secondary" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { stat: '97%', label: 'On-time delivery' },
                    { stat: '40+', label: 'Enterprise clients' },
                    { stat: '24h', label: 'Response time' },
                    { stat: '500+', label: 'Projects delivered' }
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                      <p className="text-3xl font-black text-secondary">{item.stat}</p>
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

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
                <h3 className="text-2xl font-black text-primary dark:text-white">Request Your Quote</h3>
                <p className="mt-2 text-sm text-slate-500">All fields marked with * are required.</p>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                      <FiCheckCircle className="text-emerald-600 dark:text-emerald-400" size={32} />
                    </div>
                    <h3 className="mt-4 text-xl font-black text-emerald-900 dark:text-emerald-300">Quote Request Submitted!</h3>
                    <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">Our team will review your requirements and send a tailored proposal within 24 hours.</p>
                    <Button to="/contact" className="mt-6">Book a Call</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {error && (
                      <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
                        {error}
                      </div>
                    )}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Full Name *</label>
                        <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Work Email *</label>
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Company *</label>
                        <input required type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Inc." className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Phone</label>
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Service Interested In *</label>
                        <select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                          {services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Budget Range *</label>
                        <select required value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                          {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Expected Timeline</label>
                      <input type="text" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} placeholder="e.g. 3-6 months" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Project Details *</label>
                      <textarea required rows={5} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Describe your project goals, requirements, and any specific challenges..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"></textarea>
                    </div>
                    <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-secondary/25 transition hover:bg-secondary/80">
                      Submit Quote Request <FiArrowRight size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          <div className="lg:col-span-2">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
              <h3 className="text-xl font-black text-primary dark:text-white">Why request a quote with us?</h3>
              <p className="mt-2 text-sm text-slate-500">We deliver enterprise solutions with transparency and speed.</p>
              <div className="mt-6 space-y-4">
                {[
                  { icon: FiFileText, title: 'Detailed Proposal', text: 'Receive a comprehensive Scope, timeline, and fixed-price quote.' },
                  { icon: FiUsers, title: 'Dedicated Team', text: 'Senior architects and delivery leads assigned to your engagement.' },
                  { icon: FiClock, title: 'Fast Turnaround', text: 'Initial proposal within 24-48 hours of your request.' },
                  { icon: FiCheckCircle, title: 'No Hidden Costs', text: 'Clear pricing with defined milestones and deliverables.' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-primary dark:text-white">{item.title}</h4>
                        <p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 rounded-2xl border border-secondary/20 bg-secondary/10 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                    <FiMail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500">Direct email</p>
                    <p className="text-sm font-black text-primary dark:text-white">collab@trimuryacorporation.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-secondary to-accent py-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Ready to start your project?</h2>
          <p className="mt-4 text-lg leading-8 text-white/90">Get a detailed, no-obligation quote within 24 hours.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg">Book a Call <FiArrowRight size={16} /></Button>
            <Button to="/case_studies" variant="ghost" className="border-white/30 bg-white/10 text-white hover:bg-white/20">View Case Studies</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
