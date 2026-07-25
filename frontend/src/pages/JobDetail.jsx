import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiArrowLeft,
  FiSend,
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiCheckCircle,
  FiLock
} from 'react-icons/fi';
import { fetchPublishedBySlug } from '../services/contentApi.js';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';
import ApplicationSuccess from '../components/ApplicationSuccess.jsx';
import api from '../services/api.js';
import config from '../config/index.js';

export default function JobDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', skills: '', coverLetter: '', resumeUrl: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreview, setResumePreview] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(config.TOKEN_KEY);
    setIsAuthenticated(!!token);
    setAuthChecking(false);
  }, []);

  useEffect(() => {
    if (slug && slug.includes('/apply')) {
      const cleanSlug = slug.replace(/\/apply$/, '');
      navigate(`${cleanSlug}#apply`, { replace: true });
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (window.location.hash === '#apply') {
      const el = document.getElementById('apply');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSuccess(false);
    setError('');
    fetchPublishedBySlug('jobs', slug).then((data) => {
      if (cancelled) return;
      setJob(data);
      setLoading(false);
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [slug]);

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return;
    }
    setResumeFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setResumePreview(reader.result);
    reader.readAsDataURL(file);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate(`/auth?returnTo=${encodeURIComponent(location.pathname)}#apply`);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const payload = { jobId: job._id, jobTitle: job.title, department: job.department, jobType: job.jobType, location: job.location, ...form };
      if (resumePreview) payload.resumeUrl = resumePreview;

      const { data } = await api.post('/applications', payload);
      if (data.success) {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', experience: '', skills: '', coverLetter: '', resumeUrl: '' });
        setResumeFile(null);
        setResumePreview('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="h-96 rounded-[28px] bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-primary dark:text-white">Job Not Found</h2>
          <p className="mt-3 text-sm text-slate-500">The position you are looking for does not exist or has been removed.</p>
          <Button to="/careers/open-positions" className="mt-6">Browse All Positions</Button>
        </div>
      </div>
    );
  }

  const showAuthGate = !isAuthenticated;

  const handleApplyClick = () => {
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAuthRedirect = () => {
    navigate(`/auth?returnTo=${encodeURIComponent(location.pathname)}#apply`);
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
            <Link to="/careers" className="text-slate-400 hover:text-secondary transition-colors">Careers</Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <Link to="/careers/open-positions" className="text-slate-400 hover:text-secondary transition-colors">Open Positions</Link>
            <FiChevronRight size={14} className="text-slate-500" />
            <span className="font-semibold text-white">{job.title}</span>
          </nav>
          <div className="mt-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-secondary">
              <FiBriefcase size={14} />
              {job.department}
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">{job.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              {job.location && <span className="flex items-center gap-1"><FiMapPin size={16} /> {job.location}</span>}
              {job.jobType && <span className="flex items-center gap-1"><FiClock size={16} /> {job.jobType}</span>}
            </div>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">{job.summary || job.description}</p>
            <div className="mt-8">
              {showAuthGate ? (
                <Button to={`/auth?returnTo=${encodeURIComponent(location.pathname)}#apply`} className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">
                  Login to Apply <FiLock size={16} />
                </Button>
              ) : (
                <Button onClick={handleApplyClick} className="bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25">
                  Apply Now <FiSend size={16} />
                </Button>
              )}
              <Button to="/careers/open-positions" variant="ghost" className="border-white/20 bg-white/5 text-white hover:bg-white/10 ml-3"><FiArrowLeft size={16} /> Back to Jobs</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <h2 className="text-2xl font-black text-primary dark:text-white">Job Description</h2>
            <div className="mt-6 prose prose-slate dark:prose-invert max-w-none">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 whitespace-pre-line">{job.description || job.summary || 'No detailed description provided for this position.'}</p>
            </div>
          </div>

          <div id="apply" className="lg:sticky lg:top-24">
            <h3 className="mb-4 text-xl font-black text-primary dark:text-white">Apply for this Position</h3>
            <p className="mb-6 text-sm text-slate-500">Fill out the form below and we will get back to you within 48 hours.</p>

            {success ? (
              <ApplicationSuccess job={job} form={form} />
            ) : (
              <>
                {showAuthGate && (
                  <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center dark:border-blue-900 dark:bg-blue-950">
                    <FiLock className="mx-auto text-blue-500 dark:text-blue-400" size={32} />
                    <h4 className="mt-3 text-lg font-black text-blue-900 dark:text-blue-300">Login Required</h4>
                    <p className="mt-2 text-sm text-blue-700 dark:text-blue-400">Please login or create an account to apply for this position.</p>
                    <Button to={`/auth?returnTo=${encodeURIComponent(location.pathname)}#apply`} className="mt-4 w-full">Login / Register</Button>
                  </div>
                )}

                {error && (
                  <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
                    {error}
                  </div>
                )}

              {!showAuthGate && !success && (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Full Name *</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="John Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email Address *</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Phone Number</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="+1-234-567-8900" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Years of Experience</label>
                    <input type="text" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="e.g. 5 years" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Key Skills (comma separated)</label>
                    <input type="text" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="React, Node.js, AWS, etc." />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cover Letter</label>
                    <textarea rows={4} value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="Tell us why you are a great fit for this role..."></textarea>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Resume / CV (PDF, max 5MB)</label>
                    <div className="relative">
                      <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="file" accept="application/pdf" onChange={handleResumeChange} className="w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                    </div>
                    {resumePreview && (
                      <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <FiCheckCircle size={14} />
                        Resume attached: {resumeFile?.name}
                      </div>
                    )}
                    {!resumePreview && form.resumeUrl && (
                      <a href={form.resumeUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-secondary hover:underline">View current resume URL <FiFileText size={12} /></a>
                    )}
                  </div>
                   <button type="submit" disabled={submitting} className="focus-ring w-full rounded-xl bg-secondary py-3 text-sm font-bold text-white shadow-lg shadow-secondary/25 transition hover:bg-secondary/80 disabled:opacity-60">
                     {submitting ? 'Submitting...' : 'Submit Application'}
                   </button>
                 </form>
               )}
              </>
            )}
          </div>
        </div>
      </section>
  </div>
  );
}
