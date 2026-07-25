import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiBriefcase, FiClock, FiFilter, FiX } from 'react-icons/fi';
import { fetchPublished } from '../services/contentApi.js';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';
import SearchBar from '../components/SearchBar.jsx';

const departments = ['All', 'Engineering', 'Design', 'Product', 'Marketing', 'Delivery', 'Leadership'];
const employmentTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];
const locations = ['All', 'Remote', 'Hybrid', 'On-site', 'India', 'USA', 'UK', 'Singapore'];

export default function OpenPositions() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [activeDept, setActiveDept] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [activeLocation, setActiveLocation] = useState('All');

  useEffect(() => {
    fetchPublished('jobs').then((data) => setJobs(data));
  }, []);

  const filtered = jobs.filter((job) => {
    const matchesQuery = `${job.title} ${job.department || ''} ${job.location || ''}`.toLowerCase().includes(query.toLowerCase());
    const matchesDept = activeDept === 'All' || (job.department || '').toLowerCase().includes(activeDept.toLowerCase());
    const matchesType = activeType === 'All' || (job.jobType || '').toLowerCase().includes(activeType.toLowerCase());
    const matchesLocation = activeLocation === 'All' || (job.location || '').toLowerCase().includes(activeLocation.toLowerCase());
    return matchesQuery && matchesDept && matchesType && matchesLocation;
  });

  const activeFiltersCount = [activeDept, activeType, activeLocation].filter((f) => f !== 'All').length;

  return (
    <div className="min-h-screen">
      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Open Positions" title="Find your next role" copy="Explore opportunities across engineering, design, delivery, and leadership." centered />
          <div className="mx-auto max-w-2xl">
            <SearchBar value={query} onChange={setQuery} placeholder="Search positions by title, skill, or keyword" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Department</h3>
                  <div className="mt-3 space-y-2">
                    {departments.map((dept) => (
                      <button key={dept} onClick={() => setActiveDept(dept)} className={`block w-full text-left rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${activeDept === dept ? 'bg-secondary text-white shadow-lg shadow-secondary/25' : 'bg-white border border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'}`}>
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Employment Type</h3>
                  <div className="mt-3 space-y-2">
                    {employmentTypes.map((type) => (
                      <button key={type} onClick={() => setActiveType(type)} className={`block w-full text-left rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${activeType === type ? 'bg-secondary text-white shadow-lg shadow-secondary/25' : 'bg-white border border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Location</h3>
                  <div className="mt-3 space-y-2">
                    {locations.map((loc) => (
                      <button key={loc} onClick={() => setActiveLocation(loc)} className={`block w-full text-left rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${activeLocation === loc ? 'bg-secondary text-white shadow-lg shadow-secondary/25' : 'bg-white border border-slate-200 text-slate-600 hover:border-secondary hover:text-secondary dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'}`}>
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <SearchBar value={query} onChange={setQuery} placeholder="Search positions by title, skill, or keyword" />
                </div>
              </div>
              {(activeDept !== 'All' || activeType !== 'All' || activeLocation !== 'All') && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Active Filters:</span>
                  {activeDept !== 'All' && <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">{activeDept} <button onClick={() => setActiveDept('All')}><FiX size={12} /></button></span>}
                  {activeType !== 'All' && <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">{activeType} <button onClick={() => setActiveType('All')}><FiX size={12} /></button></span>}
                  {activeLocation !== 'All' && <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">{activeLocation} <button onClick={() => setActiveLocation('All')}><FiX size={12} /></button></span>}
                  <button onClick={() => { setActiveDept('All'); setActiveType('All'); setActiveLocation('All'); }} className="text-xs font-bold text-slate-500 underline">Clear all</button>
                </div>
              )}
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {filtered.length === 0 && (
                  <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800"><FiBriefcase size={24} /></div>
                    <h3 className="mt-4 text-lg font-black text-primary dark:text-white">No positions found</h3>
                    <p className="mt-2 text-sm text-slate-500">Try adjusting your search or filters. We are constantly adding new roles.</p>
                  </div>
                )}
                {filtered.map((job, index) => (
                  <Link key={job.slug || job._id} to={`/careers/jobs/${job.slug || job._id}`}>
                    <motion.article initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-secondary">
                            {job.department || 'General'}
                          </span>
                          {job.jobType && <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500"><FiClock size={13} /> {job.jobType}</span>}
                        </div>
                        <h3 className="mt-4 text-xl font-black leading-tight text-primary dark:text-white group-hover:text-secondary transition-colors">{job.title}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          {job.location && <span className="flex items-center gap-1"><FiMapPin size={14} /> {job.location}</span>}
                        </div>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{job.summary || job.description || ''}</p>
                        <div className="mt-6 flex items-center gap-3">
                          <span className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-xs font-bold text-white shadow-sm">View Details</span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
