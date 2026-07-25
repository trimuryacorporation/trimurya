import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiArrowLeft, FiEye, FiEyeOff,
  FiBriefcase, FiFileText, FiLayers, FiGrid, FiPlay, FiUsers
} from 'react-icons/fi';
import api from '../../services/api.js';

const TYPE_CONFIG = {
  projects: {
    label: 'Projects',
    icon: FiBriefcase,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'client', label: 'Client', type: 'text' },
      { key: 'industry', label: 'Industry', type: 'text' },
      { key: 'type', label: 'Type', type: 'select', options: ['AI Project Management', 'Website Development', 'Digital Marketing', 'Business Consultancy', 'HR & Recruitment', 'Mobile App Development', 'Cloud Solutions', 'Cybersecurity'] },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'duration', label: 'Duration', type: 'text' },
      { key: 'teamSize', label: 'Team Size', type: 'text' },
      { key: 'tech', label: 'Technologies (comma separated)', type: 'textarea' },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'challenge', label: 'Challenge', type: 'textarea' },
      { key: 'solution', label: 'Solution', type: 'textarea' },
      { key: 'results', label: 'Results', type: 'textarea' },
      { key: 'metrics', label: 'Metrics (JSON)', type: 'json' },
      { key: 'testimonial', label: 'Testimonial (JSON)', type: 'json' },
      { key: 'related', label: 'Related Slugs (comma separated)', type: 'textarea' },
    ]
  },
  case_studies: {
    label: 'Case Studies',
    icon: FiBriefcase,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'client', label: 'Client', type: 'text' },
      { key: 'industry', label: 'Industry', type: 'text' },
      { key: 'image', label: 'Image URL / Path', type: 'text' },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'challenge', label: 'Challenge', type: 'textarea' },
      { key: 'solution', label: 'Solution', type: 'textarea' },
      { key: 'results', label: 'Results (JSON)', type: 'json' },
      { key: 'tech', label: 'Tech Stack (comma separated)', type: 'textarea' },
      { key: 'featured', label: 'Featured', type: 'select', options: ['true', 'false'] },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  services: {
    label: 'Services',
    icon: FiLayers,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'icon', label: 'Icon (Feather icon name)', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'longDescription', label: 'Long Description', type: 'textarea' },
      { key: 'items', label: 'Items (comma separated)', type: 'textarea' },
      { key: 'features', label: 'Features (comma separated)', type: 'textarea' },
      { key: 'outcomes', label: 'Outcomes (comma separated)', type: 'textarea' },
      { key: 'process', label: 'Process (JSON)', type: 'json' },
      { key: 'faqs', label: 'FAQs (JSON)', type: 'json' },
      { key: 'related', label: 'Related (comma separated)', type: 'textarea' },
      { key: 'heroStats', label: 'Hero Stats (JSON)', type: 'json' },
      { key: 'benefits', label: 'Benefits (JSON)', type: 'json' },
      { key: 'technologies', label: 'Technologies (comma separated)', type: 'textarea' },
      { key: 'testimonials', label: 'Testimonials (JSON)', type: 'json' },
    ]
  },
  blogs: {
    label: 'Blogs',
    icon: FiFileText,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'image', label: 'Image URL', type: 'text' },
      { key: 'images', label: 'Images (JSON array of URLs)', type: 'json' },
      { key: 'tags', label: 'Tags (comma separated)', type: 'textarea' },
      { key: 'time', label: 'Time', type: 'text' },
      { key: 'readTime', label: 'Read Time', type: 'text' },
      { key: 'visualClass', label: 'Visual Class', type: 'text' },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'content', label: 'Content', type: 'textarea' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  videos: {
    label: 'Videos',
    icon: FiPlay,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'speaker', label: 'Speaker / Source', type: 'text' },
      { key: 'youtubeId', label: 'YouTube ID', type: 'text' },
      { key: 'duration', label: 'Duration', type: 'text' },
      { key: 'views', label: 'Views', type: 'text' },
      { key: 'visualClass', label: 'Visual Class', type: 'text' },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  industries: {
    label: 'Industries',
    icon: FiGrid,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'services', label: 'Services (comma separated)', type: 'textarea' },
      { key: 'stats', label: 'Stats (JSON)', type: 'json' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  stats: {
    label: 'Stats',
    icon: FiBriefcase,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'value', label: 'Value', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  values: {
    label: 'Values',
    icon: FiGrid,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'icon', label: 'Icon', type: 'text' },
      { key: 'copy', label: 'Copy', type: 'textarea' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  jobs: {
    label: 'Jobs',
    icon: FiBriefcase,
    fields: [
      { key: 'title', label: 'Job Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'department', label: 'Department', type: 'select', options: ['Engineering', 'Design', 'Product', 'Marketing', 'Delivery', 'Leadership'] },
      { key: 'jobType', label: 'Employment Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
      { key: 'location', label: 'Location', type: 'select', options: ['Remote', 'Hybrid', 'On-site', 'India', 'USA', 'UK', 'Singapore'] },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  'hero-slides': {
    label: 'Hero Slides',
    icon: FiGrid,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'primary', label: 'Primary Button Text', type: 'text' },
      { key: 'secondary', label: 'Secondary Button Text', type: 'text' },
      { key: 'metrics', label: 'Metrics (JSON array)', type: 'json' },
      { key: 'accent', label: 'Accent Gradient', type: 'text' },
      { key: 'image', label: 'Background Image URL', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  testimonials: {
    label: 'Testimonials',
    icon: FiFileText,
    fields: [
      { key: 'quote', label: 'Quote', type: 'textarea' },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  team: {
    label: 'Team',
    icon: FiUsers,
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'image', label: 'Image URL', type: 'text' },
      { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
      { key: 'twitter', label: 'Twitter URL', type: 'text' },
      { key: 'bio', label: 'Bio', type: 'textarea' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  clients: {
    label: 'Clients',
    icon: FiBriefcase,
    fields: [
      { key: 'name', label: 'Client Name', type: 'text' },
      { key: 'logo', label: 'Logo URL', type: 'text' },
      { key: 'industry', label: 'Industry', type: 'text' },
      { key: 'website', label: 'Website URL', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  },
  'press-releases': {
    label: 'Press Releases',
    icon: FiFileText,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { key: 'content', label: 'Content', type: 'textarea' },
      { key: 'featured', label: 'Featured', type: 'select', options: ['true', 'false'] },
      { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'] },
    ]
  }
};

function parseJsonField(value, fallback = {}) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function FormField({ field, value, onChange }) {
  const commonProps = {
    value: value || '',
    onChange: (e) => onChange(field.key, e.target.value),
    placeholder: field.label,
  };

  if (field.type === 'select') {
    return (
      <select
        {...commonProps}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        <option value="">Select {field.label}</option>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        {...commonProps}
        rows={3}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary placeholder:text-slate-400 transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    );
  }

  if (field.type === 'json') {
    return (
      <textarea
        value={typeof value === 'object' ? JSON.stringify(value, null, 2) : (value || '')}
        onChange={(e) => onChange(field.key, e.target.value)}
        rows={6}
        placeholder={field.label}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-mono text-primary placeholder:text-slate-400 transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    );
  }

  return (
    <input
      type={field.type}
      {...commonProps}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm font-medium text-primary placeholder:text-slate-400 transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    />
  );
}

export default function AdminContentManager() {
  const { type } = useParams();
  const navigate = useNavigate();
  const config = TYPE_CONFIG[type];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/${type}`);
      setItems(data.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (config) fetchItems();
  }, [type]);

  if (!config) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-xl font-black text-primary dark:text-white">Content type not supported</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">The type "{type}" does not have a configured admin form.</p>
        <Link to="/admin/dashboard" className="mt-4 inline-flex rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white">Back to Dashboard</Link>
      </div>
    );
  }

  const filtered = items.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.slug?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingItem(null);
    setForm({ status: 'published' });
    setError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    const base = {
      title: item.title || '',
      slug: item.slug || '',
      summary: item.summary || '',
      status: item.status || 'published',
    };
    if (type === 'jobs') {
      base.department = item.department || '';
      base.jobType = item.jobType || '';
      base.location = item.location || '';
      base.description = item.description || '';
    }
    setForm(base);
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = { ...form };

      Object.keys(payload).forEach((key) => {
        if (payload[key] === '') payload[key] = undefined;
      });

      if (editingItem) {
        const { data } = await api.put(`/${type}/${editingItem._id}`, payload);
        if (data.success) {
          await fetchItems();
          setModalOpen(false);
          setForm({});
          setEditingItem(null);
        }
      } else {
        const { data } = await api.post(`/${type}`, payload);
        if (data.success) {
          await fetchItems();
          setModalOpen(false);
          setForm({ status: 'published' });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await api.delete(`/${type}/${deleteConfirm._id}`);
      await fetchItems();
      setDeleteConfirm(null);
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="focus-ring rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FiArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-black text-primary dark:text-white">{config.label} Management</h2>
        </div>
        <button
          onClick={openCreate}
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-secondary/25 transition hover:bg-secondary/80"
        >
          <FiPlus size={18} />
          Add New
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${config.label.toLowerCase()}...`}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-primary placeholder:text-slate-400 transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                {config.fields.slice(0, 4).map((f) => (
                  <th key={f.key} className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {f.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={config.fields.length + 2} className="p-8 text-center text-sm text-slate-500">Loading...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={config.fields.length + 2} className="p-8 text-center text-sm text-slate-500">No {config.label.toLowerCase()} found</td>
                </tr>
              ) : (
                filtered.map((item, i) => (
                  <tr key={item._id || i} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    {config.fields.slice(0, 4).map((f) => (
                      <td key={f.key} className="px-6 py-3 text-sm text-primary dark:text-white">
                        {typeof item[f.key] === 'object' ? JSON.stringify(item[f.key])?.slice(0, 40) : String(item[f.key] || '-').slice(0, 50)}
                      </td>
                    ))}
                    <td className="px-6 py-3">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                        item.status === 'published' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                        : item.status === 'draft' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {item.status || 'draft'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-secondary/10 hover:text-secondary"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-lg font-black text-primary dark:text-white">{editingItem ? 'Edit' : 'Add'} {config.label}</h3>
                <button onClick={() => { setModalOpen(false); setForm({}); setEditingItem(null); setError(''); }} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {error && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950 dark:text-red-400">
                    {error}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  {config.fields.map((field) => (
                    <div key={field.key} className={field.type === 'textarea' || field.type === 'json' ? 'sm:col-span-2' : ''}>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{field.label}</label>
                      <FormField field={field} value={form[field.key]} onChange={(key, val) => setForm({ ...form, [key]: val })} />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => { setModalOpen(false); setForm({}); setEditingItem(null); setError(''); }}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-secondary hover:text-secondary dark:border-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="focus-ring inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-secondary/80 disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : <><FiSave size={16} /> Save {config.label}</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-md rounded-[24px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-lg font-black text-primary dark:text-white">Delete {config.label.slice(0, -1)}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Are you sure you want to delete <span className="font-bold">{deleteConfirm.title}</span>? This action cannot be undone.
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Cancel</button>
                <button onClick={handleDelete} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
