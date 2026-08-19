import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiSave, FiGlobe, FiMail, FiShield, FiRefreshCw } from 'react-icons/fi';
import { fetchSiteSettings, persistSettings } from '../../services/settingsApi.js';
import { DEFAULT_SOCIAL_LINKS } from '../../utils/seo.js';

const defaultState = {
  siteName: 'Trimurya Corporation',
  siteUrl: 'https://www.trimuryacorporation.in',
  siteDescription: '',
  contactEmail: '',
  contactPhone: '',
  address: '',
  social: { ...DEFAULT_SOCIAL_LINKS, twitter: '', facebook: '' }
};

export default function AdminSettings() {
  const [admin, setAdmin] = useState(null);
  const [state, setState] = useState({ ...defaultState, social: {} });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminData = localStorage.getItem('trimurya_admin');
    if (adminData) {
      try {
        setAdmin(JSON.parse(adminData));
      } catch {}
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchSiteSettings().then((data) => {
      if (!mounted) return;
      setState({
        ...defaultState,
        ...data,
        social: {
          ...defaultState.social,
          ...(data.social || {})
        }
      });
      setLoading(false);
    }).catch(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  const handleChange = (field) => (e) => {
    setState((s) => ({ ...s, [field]: e.target.value }));
  };

  const handleSocialChange = (platform) => (e) => {
    setState((s) => ({ ...s, social: { ...s.social, [platform]: e.target.value } }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await persistSettings(state);
      setSaved(true);
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-black text-primary dark:text-white">
                <FiGlobe size={20} className="text-secondary" /> Site Configuration
              </h3>
              <button type="button" onClick={() => window.location.reload()} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800" title="Refresh">
                <FiRefreshCw size={16} />
              </button>
            </div>
            {loading ? (
              <div className="py-8 text-center text-sm text-slate-500">Loading settings...</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Site Name</label>
                  <input type="text" value={state.siteName} onChange={handleChange('siteName')} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Site URL</label>
                  <input type="url" value={state.siteUrl} onChange={handleChange('siteUrl')} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Site Description</label>
                  <textarea value={state.siteDescription} onChange={handleChange('siteDescription')} rows={3} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
              </div>
            )}
            <div className="mt-6 flex items-center justify-end">
              <button type="submit" disabled={saving || loading} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-secondary/80 disabled:opacity-60">
                {saving ? 'Saving...' : <><FiSave size={16} /> Save Settings</>}
              </button>
            </div>
            {saved && <p className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">Settings saved successfully!</p>}
          </form>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-primary dark:text-white">
              <FiMail size={20} className="text-secondary" /> Contact Information
            </h3>
            {loading ? (
              <div className="py-4 text-center text-sm text-slate-500">Loading...</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Contact Email</label>
                  <input type="email" value={state.contactEmail} onChange={handleChange('contactEmail')} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Contact Phone</label>
                  <input type="tel" value={state.contactPhone} onChange={handleChange('contactPhone')} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Address</label>
                  <input type="text" value={state.address} onChange={handleChange('address')} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-primary dark:text-white">
              <FiShield size={20} className="text-secondary" /> Social Links
            </h3>
            {loading ? (
              <div className="py-4 text-center text-sm text-slate-500">Loading...</div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">LinkedIn</label>
                  <input type="text" value={state.social?.linkedin || ''} onChange={handleSocialChange('linkedin')} placeholder="https://linkedin.com/in/..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Twitter / X</label>
                  <input type="text" value={state.social?.twitter || ''} onChange={handleSocialChange('twitter')} placeholder="https://x.com/..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Facebook</label>
                  <input type="text" value={state.social?.facebook || ''} onChange={handleSocialChange('facebook')} placeholder="https://facebook.com/..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Instagram</label>
                  <input type="text" value={state.social?.instagram || ''} onChange={handleSocialChange('instagram')} placeholder="https://instagram.com/..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-black text-primary dark:text-white">API Configuration</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                <div><p className="text-sm font-medium text-primary dark:text-white">API Endpoint</p><p className="text-xs text-slate-500 dark:text-slate-400">/api</p></div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">Active</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                <div><p className="text-sm font-medium text-primary dark:text-white">Authentication</p><p className="text-xs text-slate-500 dark:text-slate-400">Bearer Token (JWT)</p></div>
                <FiShield className="text-secondary" size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-black text-primary dark:text-white">Admin Profile</h3>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-black text-white dark:bg-white dark:text-primary">
                {admin?.name?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-black text-primary dark:text-white">{admin?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{admin?.email}</p>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary dark:bg-primary/20 dark:text-white">{admin?.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
