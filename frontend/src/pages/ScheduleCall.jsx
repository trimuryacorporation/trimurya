import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiArrowRight,
  FiMail,
  FiVideo,
  FiFileText
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const timeSlots = [
  { label: '09:00 AM', value: '09:00' },
  { label: '10:30 AM', value: '10:30' },
  { label: '01:00 PM', value: '13:00' },
  { label: '03:30 PM', value: '15:30' },
  { label: '05:00 PM', value: '17:00' }
];

export default function ScheduleCall() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('10:30');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
            <span className="font-semibold text-white">Schedule a Call</span>
          </nav>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
                <FiCalendar size={14} />
                Book a Call
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">Schedule a meeting with our experts.</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Pick a time that works for you. We will discuss your goals, challenges, and how Trimurya can help you deliver enterprise outcomes.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: FiCheckCircle, text: '45-minute executive discovery call' },
                  { icon: FiCheckCircle, text: 'Google Meet or Zoom link sent instantly' },
                  { icon: FiCheckCircle, text: 'No sales pitch, just honest expert advice' },
                  { icon: FiCheckCircle, text: 'Follow-up summary delivered within 24 hours' }
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
                    { stat: '24/7', label: 'Support Available' },
                    { stat: '45m', label: 'Avg Call Length' },
                    { stat: '98%', label: 'Satisfaction' },
                    { stat: '15+', label: 'Time Zones Covered' }
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
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <FiVideo size={22} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-secondary">Schedule</p>
                  <h3 className="text-xl font-black text-primary dark:text-white">Choose your preferred slot</h3>
                </div>
              </div>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                    <FiCheckCircle className="text-emerald-600 dark:text-emerald-400" size={32} />
                  </div>
                  <h3 className="mt-4 text-xl font-black text-emerald-900 dark:text-emerald-300">Meeting Scheduled!</h3>
                  <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">A calendar invite has been sent to your email. We look forward to speaking with you.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Full Name *</label>
                      <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Work Email *</label>
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Company</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Preferred Date *</label>
                    <input required type="date" value={selectedDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => setSelectedDate(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200">Available Time Slots *</label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {timeSlots.map((slot) => (
                        <button key={slot.value} type="button" onClick={() => setSelectedSlot(slot.value)} className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${selectedSlot === slot.value ? 'border-secondary bg-secondary/10 text-secondary' : 'border-slate-200 bg-white text-slate-700 hover:border-secondary/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                          <span className="flex items-center gap-2"><FiClock size={14} />{slot.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-secondary/20 bg-secondary/10 p-5 text-sm text-slate-700 dark:text-slate-200">
                    <p className="font-semibold">Selected: {selectedDate} at {timeSlots.find((s) => s.value === selectedSlot)?.label}</p>
                    <p className="mt-1">We will send a Google Meet link to your email.</p>
                  </div>
                  <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-secondary/25 transition hover:bg-secondary/80">
                    Confirm Booking <FiArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
              <h3 className="text-xl font-black text-primary dark:text-white">What to expect</h3>
              <p className="mt-2 text-sm text-slate-500">A focused, no-obligation conversation about your needs.</p>
              <div className="mt-6 space-y-5">
                {[
                  { step: '1', title: 'Confirmation', text: 'You will receive a calendar invite within minutes of booking.' },
                  { step: '2', title: 'Preparation', text: 'We will send a short pre-call questionnaire to maximize our time.' },
                  { step: '3', title: 'The Call', text: 'A 45-minute video call with a senior advisor from our team.' },
                  { step: '4', title: 'Follow-up', text: 'We will share a summary with next steps within 24 hours.' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-black text-white">{item.step}</div>
                    <div>
                      <h4 className="text-sm font-black text-primary dark:text-white">{item.title}</h4>
                      <p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <FiMail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500">Prefer email?</p>
                    <p className="text-sm font-black text-primary dark:text-white">calendar@trimuryacorporation.in</p>
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
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">Prefer a different time?</h2>
          <p className="mt-4 text-lg leading-8 text-white/90">Our team covers 15+ time zones. Reach out and we will find a slot that works.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/contact" className="bg-white text-primary hover:bg-slate-100 shadow-lg"><FiMail size={16} /> Contact Us</Button>
            <Button to="/request_quote" variant="ghost" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><FiFileText size={16} /> Request a Quote</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
