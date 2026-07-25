import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMail, FiMapPin, FiBriefcase, FiClock, FiCheckCircle, FiX, FiEye } from 'react-icons/fi';
import api from '../../services/api.js';
import SectionHeader from '../../components/SectionHeader.jsx';
import Button from '../../components/Button.jsx';

const applicationStatuses = ['new', 'reviewed', 'shortlisted', 'rejected', 'hired'];

const statusColors = {
  new: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  reviewed: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  shortlisted: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  rejected: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
  hired: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
};

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [availableStatuses, setAvailableStatuses] = useState(applicationStatuses);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/applications');
      setApplications(data.data || []);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put('/applications/' + id, { status });
      await fetchApplications();
      setSelectedApp(null);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await api.delete('/applications/' + id);
      await fetchApplications();
      setSelectedApp(null);
    } catch (err) {
      alert('Failed to delete application');
    }
  };

  const filtered = applications.filter((app) => {
    const matchesSearch = (app.name + ' ' + app.email + ' ' + app.jobTitle).toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    return statusColors[status] || statusColors.new;
  };

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Applications" title="Job Applications" copy="Review and manage candidate applications submitted through the careers page." />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or job title..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-primary placeholder:text-slate-400 transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition focus:border-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <option value="all">All Status</option>
          {availableStatuses.map((status) => (
            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">Loading applications...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800"><FiMail size={24} /></div>
            <h3 className="mt-4 text-lg font-black text-primary dark:text-white">No applications found</h3>
            <p className="mt-2 text-sm text-slate-500">Applications will appear here when candidates apply for jobs.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Candidate</th>
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Job</th>
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Department</th>
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Type</th>
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Applied</th>
                  <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((app, i) => (
                  <tr key={app._id || i} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-primary dark:text-white">{app.name}</p>
                        <p className="text-xs text-slate-500">{app.email}</p>
                        {app.phone && <p className="text-xs text-slate-500">{app.phone}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary dark:text-white">{app.jobTitle}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{app.department}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{app.jobType}</td>
                    <td className="px-6 py-4">
                      <span className={"rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider " + getStatusClass(app.status)}>
                        {app.status || 'new'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-secondary/10 hover:text-secondary"
                          title="View"
                        >
                          <FiEye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedApp && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedApp(null)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-lg font-black text-primary dark:text-white">Application Details</h3>
              <button onClick={() => setSelectedApp(null)} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</p><p className="mt-1 text-sm font-medium text-primary dark:text-white">{selectedApp.name}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</p><p className="mt-1 text-sm font-medium text-primary dark:text-white">{selectedApp.email}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone</p><p className="mt-1 text-sm font-medium text-primary dark:text-white">{selectedApp.phone || '-'}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Job Title</p><p className="mt-1 text-sm font-medium text-primary dark:text-white">{selectedApp.jobTitle}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Department</p><p className="mt-1 text-sm font-medium text-primary dark:text-white">{selectedApp.department}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Employment Type</p><p className="mt-1 text-sm font-medium text-primary dark:text-white">{selectedApp.jobType}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</p><p className="mt-1 text-sm font-medium text-primary dark:text-white">{selectedApp.location}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Experience</p><p className="mt-1 text-sm font-medium text-primary dark:text-white">{selectedApp.experience || '-'}</p></div>
              </div>
              {selectedApp.skills && (
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Skills</p><p className="mt-1 text-sm font-medium text-primary dark:text-white">{selectedApp.skills}</p></div>
              )}
              {selectedApp.coverLetter && (
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Cover Letter</p><p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300 whitespace-pre-line">{selectedApp.coverLetter}</p></div>
              )}
              {selectedApp.resumeUrl && (
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Resume</p><a href={selectedApp.resumeUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline">View Resume <FiEye size={14} /></a></div>
              )}
              <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {availableStatuses.map((status) => {
                    const isActive = selectedApp.status === status;
                    const btnClass = isActive
                      ? 'rounded-full px-3 py-1.5 text-xs font-bold capitalize transition bg-secondary text-white'
                      : 'rounded-full px-3 py-1.5 text-xs font-bold capitalize transition bg-slate-100 text-slate-600 hover:bg-secondary/10 hover:text-secondary dark:bg-slate-800 dark:text-slate-300';
                    return (
                      <button key={status} onClick={() => handleStatusUpdate(selectedApp._id, status)} className={btnClass}>
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <button onClick={() => handleDelete(selectedApp._id)} className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950">Delete</button>
                <button onClick={() => setSelectedApp(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-secondary hover:text-secondary dark:border-slate-700 dark:text-slate-300">Close</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
