import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiFileText, FiUsers, FiLayers, FiGrid, FiShoppingBag, FiBarChart2, FiBookOpen, FiMessageCircle, FiPlus, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import api from '../../services/api.js';

const statsConfig = [
  { key: 'projects', label: 'Projects', icon: FiBriefcase, color: 'from-violet-500 to-indigo-600' },
  { key: 'case_studies', label: 'Case Studies', icon: FiBookOpen, color: 'from-emerald-500 to-teal-600' },
  { key: 'services', label: 'Services', icon: FiLayers, color: 'from-blue-500 to-indigo-600' },
  { key: 'blogs', label: 'Blogs', icon: FiFileText, color: 'from-orange-500 to-rose-500' },
  { key: 'testimonials', label: 'Testimonials', icon: FiMessageCircle, color: 'from-pink-500 to-rose-500' },
  { key: 'industries', label: 'Industries', icon: FiGrid, color: 'from-cyan-500 to-blue-600' },
  { key: 'team', label: 'Team', icon: FiUsers, color: 'from-teal-500 to-emerald-600' },
  { key: 'clients', label: 'Clients', icon: FiShoppingBag, color: 'from-amber-500 to-orange-600' },
  { key: 'press-releases', label: 'Press Releases', icon: FiFileText, color: 'from-purple-500 to-pink-600' },
  { key: 'users', label: 'Users', icon: FiUsers, color: 'from-red-500 to-pink-600' },
  { key: 'stats', label: 'Stats', icon: FiBarChart2, color: 'from-indigo-500 to-purple-600' },
];

export default function AdminDashboard() {
  console.log('AdminDashboard mounted, loading data...');
  const [dashboard, setDashboard] = useState({ summary: {}, recent: [], loading: true, error: '' });
  const [homepageStats, setHomepageStats] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [statForm, setStatForm] = useState({ value: '', suffix: '', label: '' });
  const [savingStat, setSavingStat] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setDashboard(prev => ({ ...prev, loading: true, error: '' }));
      try {
        const [summaryRes, projectsRes, blogsRes, servicesRes, caseStudiesRes, testimonialsRes] = await Promise.all([
          api.get('/dashboard/summary').catch((err) => {
            console.error('Summary error:', err);
            return { data: { data: {} } };
          }),
          api.get('/projects').catch((err) => {
            console.error('Projects error:', err);
            return { data: { data: [] } };
          }),
          api.get('/blogs').catch((err) => {
            console.error('Blogs error:', err);
            return { data: { data: [] } };
          }),
          api.get('/services').catch((err) => {
            console.error('Services error:', err);
            return { data: { data: [] } };
          }),
          api.get('/case_studies').catch((err) => {
            console.error('Case studies error:', err);
            return { data: { data: [] } };
          }),
          api.get('/testimonials').catch((err) => {
            console.error('Testimonials error:', err);
            return { data: { data: [] } };
          }),
        ]);

        if (cancelled) return;
        const summaryData = summaryRes.data?.data || {};
        const recentItems = [
          ...(projectsRes.data?.data || []).slice(0, 3).map((i) => ({ ...i, _type: 'Project' })),
          ...(caseStudiesRes.data?.data || []).slice(0, 3).map((i) => ({ ...i, _type: 'Case Study' })),
          ...(blogsRes.data?.data || []).slice(0, 3).map((i) => ({ ...i, _type: 'Blog' })),
          ...(servicesRes.data?.data || []).slice(0, 3).map((i) => ({ ...i, _type: 'Service' })),
          ...(testimonialsRes.data?.data || []).slice(0, 2).map((i) => ({ ...i, _type: 'Testimonial' })),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);
        setDashboard({ summary: summaryData, recent: recentItems, loading: false, error: '' });
      } catch (error) {
        if (!cancelled) {
          console.error('Dashboard error:', error);
          setDashboard(prev => ({ ...prev, loading: false, error: 'Failed to load dashboard data.' }));
        }
      }
    };

    const fetchHomepageStats = async () => {
      setStatsLoading(true);
      try {
        const { data } = await api.get('/stats');
        setHomepageStats(data.data || []);
      } catch {
        setHomepageStats([]);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchData();
    fetchHomepageStats();
    return () => { cancelled = true; };
  }, []);

  const { summary, recent, loading, error } = dashboard;

  const openCreateStat = () => {
    setEditingStat(null);
    setStatForm({ value: '', suffix: '', label: '' });
    setStatsModalOpen(true);
  };

  const openEditStat = (item) => {
    setEditingStat(item);
    const rawValue = String(item.value || '');
    const numericPart = rawValue.replace(/[^0-9]/g, '');
    const suffixPart = rawValue.replace(/[0-9]/g, '').trim();
    setStatForm({ value: numericPart, suffix: suffixPart, label: item.label || '' });
    setStatsModalOpen(true);
  };

  const handleSaveStat = async (e) => {
    e.preventDefault();
    setSavingStat(true);
    try {
      const payload = {
        ...statForm,
        value: `${statForm.value}${statForm.suffix}`,
        slug: statForm.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        status: 'published'
      };
      if (editingStat) {
        await api.put(`/stats/${editingStat._id}`, payload);
      } else {
        await api.post('/stats', payload);
      }
      setStatsModalOpen(false);
      const { data } = await api.get('/stats');
      setHomepageStats(data.data || []);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save stat');
    } finally {
      setSavingStat(false);
    }
  };

  const handleDeleteStat = async (item) => {
    if (!confirm(`Delete "${item.label}"?`)) return;
    try {
      await api.delete(`/stats/${item._id}`);
      const { data } = await api.get('/stats');
      setHomepageStats(data.data || []);
    } catch (err) {
      alert('Failed to delete stat');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-transparent" />
        <p className="ml-3 text-sm text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl bg-amber-50 p-4 text-sm font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400">
          {error}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statsConfig.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                <Icon size={20} />
              </div>
              <p className="mt-4 text-3xl font-black text-primary dark:text-white">{summary?.[stat.key] || 0}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h3 className="text-lg font-black text-primary dark:text-white">Recent Activity</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {recent.length === 0 ? (
            <p className="p-6 text-sm text-slate-500 dark:text-slate-400">No recent activity</p>
          ) : (
            recent.map((item, i) => (
              <div key={item._id || i} className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary dark:bg-secondary/20">
                    {item._type}
                  </span>
                  <span className="text-sm font-medium text-primary dark:text-white">{item.title}</span>
                </div>
                <span className="text-xs text-slate-400">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h3 className="text-lg font-black text-primary dark:text-white">Homepage Counter Stats</h3>
          <button onClick={openCreateStat} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/25 transition hover:bg-secondary/80">
            <FiPlus size={18} />
            Add Stat
          </button>
        </div>
        <div className="p-6">
          {statsLoading ? (
            <p className="text-sm text-slate-500">Loading stats...</p>
          ) : homepageStats.length === 0 ? (
            <p className="text-sm text-slate-500">No homepage stats configured. Add one to get started.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {homepageStats.map((stat) => (
                <div key={stat._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${stat.status === 'published' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'}`}>
                      {stat.status || 'draft'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEditStat(stat)} className="rounded-lg p-2 text-slate-500 transition hover:bg-secondary/10 hover:text-secondary">
                        <FiSave size={14} />
                      </button>
                      <button onClick={() => handleDeleteStat(stat)} className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-black text-primary dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {statsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-primary dark:text-white">{editingStat ? 'Edit' : 'Add'} Homepage Stat</h3>
              <button onClick={() => { setStatsModalOpen(false); setStatForm({ value: '', suffix: '', label: '' }); setEditingStat(null); }} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveStat} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Value</label>
                <input required type="text" value={statForm.value} onChange={(e) => setStatForm({ ...statForm, value: e.target.value })} placeholder="e.g. 200" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Suffix</label>
                <input type="text" value={statForm.suffix} onChange={(e) => setStatForm({ ...statForm, suffix: e.target.value })} placeholder="e.g. + or % or M" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Label</label>
                <input required type="text" value={statForm.label} onChange={(e) => setStatForm({ ...statForm, label: e.target.value })} placeholder="e.g. Projects Delivered" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={() => { setStatsModalOpen(false); setStatForm({ value: '', suffix: '', label: '' }); setEditingStat(null); }} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-secondary hover:text-secondary dark:border-slate-700 dark:text-slate-300">Cancel</button>
                <button type="submit" disabled={savingStat} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-secondary/80 disabled:opacity-60">
                  {savingStat ? 'Saving...' : <><FiSave size={16} /> Save</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

