import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import api from '../services/api.js';
import config from '../config/index.js';

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const token = localStorage.getItem(config.TOKEN_KEY);
    if (token) {
      const returnTo = searchParams.get('returnTo') || '/';
      navigate(returnTo, { replace: true });
    }
  }, [navigate, searchParams]);

  const onSubmit = async (values) => {
    setLoading(true);
    setError('');
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await api.post(endpoint, values);
      if (data.success) {
        localStorage.setItem(config.TOKEN_KEY, data.token);
        localStorage.setItem(config.ADMIN_KEY, JSON.stringify({ ...data.user, role: data.user?.role || 'candidate' }));
        const returnTo = searchParams.get('returnTo') || '/';
        window.location.href = returnTo;
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setError('');
    reset();
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-20">
      <SectionHeader eyebrow={isLogin ? 'Authentication' : 'Join Us'} title={isLogin ? 'Login To Apply' : 'Create Account To Apply'} copy={isLogin ? 'Login to apply for jobs and track your applications.' : 'Register to apply for jobs and track your applications.'} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button type="button" onClick={() => toggleMode()} className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition ${isLogin ? 'bg-white text-primary shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>Login</button>
          <button type="button" onClick={() => toggleMode()} className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition ${!isLogin ? 'bg-white text-primary shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>Register</button>
        </div>

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="John Doe" type="text" {...register('name', { required: !isLogin })} />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">Name is required</p>}
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="john@example.com" type="email" {...register('email', { required: true })} />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">Email is required</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="••••••••" type="password" {...register('password', { required: true, minLength: 6 })} />
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">Password must be at least 6 characters</p>}
          </div>
          <button type="submit" disabled={loading} className="focus-ring w-full rounded-xl bg-secondary py-3 text-sm font-bold text-white shadow-lg shadow-secondary/25 transition hover:bg-secondary/80 disabled:opacity-60">
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          {isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
          <button type="button" onClick={toggleMode} className="font-bold text-secondary hover:underline">{isLogin ? 'Register here' : 'Login here'}</button>
        </div>
      </motion.div>
    </section>
  );
}
