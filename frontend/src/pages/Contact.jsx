import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCalendar, FiClock, FiMail, FiMapPin, FiPhone, FiVideo } from 'react-icons/fi';
import { localBusinessSchema, breadcrumbSchema } from '../utils/seo.js';


const timeSlots = [
  { label: '09:00 AM', value: '09:00' },
  { label: '10:30 AM', value: '10:30' },
  { label: '01:00 PM', value: '13:00' },
  { label: '03:30 PM', value: '15:30' },
  { label: '05:00 PM', value: '17:00' }
];

const serviceOptions = [
  'AI strategy session',
  'Website & product design',
  'Recruitment & talent advisory',
  'Digital growth consulting',
  'Enterprise transformation program'
];

function formatSelectedDate(dateValue) {
  if (!dateValue) return 'your preferred date';
  const parsed = new Date(`${dateValue}T12:00:00`);
  return parsed.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function buildGoogleCalendarUrl(dateValue, timeValue, serviceValue, nameValue, emailValue) {
  const start = new Date(`${dateValue}T${timeValue}:00`);
  const end = new Date(start.getTime() + 45 * 60 * 1000);
  const title = encodeURIComponent(`Trimurya Corporation - ${serviceValue}`);
  const details = encodeURIComponent(`Discovery meeting with Trimurya Corporation.\n\nClient: ${nameValue || 'Prospective client'}\nEmail: ${emailValue || 'Not provided'}\nService focus: ${serviceValue}\n\nPlease join via Google Meet.`);
  const startString = start.toISOString().replace(/[-:]/g, '').replace('.000Z', 'Z');
  const endString = end.toISOString().replace(/[-:]/g, '').replace('.000Z', 'Z');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startString}/${endString}&details=${details}&location=${encodeURIComponent('Google Meet')}`;
}

export default function Contact() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('10:30');
  const [serviceFocus, setServiceFocus] = useState(serviceOptions[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = buildGoogleCalendarUrl(selectedDate, selectedSlot, serviceFocus, name, email);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Trimurya Corporation</title>
        <meta name="description" content="Contact Trimurya Corporation to discuss AI, technology, recruitment, digital marketing, telecom, and media needs." />
        <meta name="keywords" content="contact Trimurya Corporation, business enquiry, AI consultation, recruitment enquiry" />
        <link rel="canonical" href="https://www.trimuryacorporation.in/contact" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name: 'Home', url: 'https://www.trimuryacorporation.in/' },
          { name: 'Contact Us', url: 'https://www.trimuryacorporation.in/contact' }
        ]))}</script>
      </Helmet>
      <div className="bg-slate-50 dark:bg-slate-950">


      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_30px_100px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950 lg:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-secondary">Enterprise discovery call</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-primary dark:text-white sm:text-4xl">
              Book a Google Meet with our leadership and delivery team.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Pick a date and time that works for you, and we’ll open a tailored conversation around your AI roadmap, product, website, or talent requirements.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <FiPhone size={20} />
                </div>
                <p className="mt-4 font-black text-primary dark:text-white">Call or WhatsApp</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">+91 00000 00000</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <FiMail size={20} />
                </div>
                <p className="mt-4 font-black text-primary dark:text-white">Email</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">info@trimuryacorporation.in</p>
              </div>
            </div>

            <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-secondary">
                  <FiVideo size={18} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-secondary/80">What happens next</p>
                  <p className="text-lg font-black">A focused, executive-level planning call.</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-secondary" />We review your goals, priority outcomes, and delivery expectations.</li>
                <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-secondary" />We identify the right service path for AI, websites, recruitment, or growth strategy.</li>
                <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-secondary" />You leave with a sharper plan and next-step proposal.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_30px_100px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950 lg:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <FiCalendar size={22} />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-secondary">Schedule meeting</p>
                <p className="text-lg font-black text-primary dark:text-white">Choose a slot and confirm</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Preferred date</label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none ring-0 focus:border-secondary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Available times</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => setSelectedSlot(slot.value)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${selectedSlot === slot.value ? 'border-secondary bg-secondary/10 text-secondary' : 'border-slate-200 bg-white text-slate-700 hover:border-secondary/60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}
                    >
                      <span className="flex items-center gap-2"><FiClock size={14} />{slot.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Primary focus</label>
                <select
                  value={serviceFocus}
                  onChange={(event) => setServiceFocus(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Your name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Aarav Sharma"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Work email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-secondary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="rounded-[24px] border border-secondary/20 bg-secondary/10 p-4 text-sm text-slate-700 dark:text-slate-200">
                <p className="font-semibold">Selected slot: {formatSelectedDate(selectedDate)} at {timeSlots.find((slot) => slot.value === selectedSlot)?.label}</p>
                <p className="mt-1">We’ll open a prefilled Google Calendar event so you can confirm the meeting instantly.</p>
              </div>

              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white transition hover:bg-secondary">
                Book on Google Calendar
                <FiArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
