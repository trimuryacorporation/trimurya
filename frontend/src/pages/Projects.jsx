import { useState, useMemo, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader.jsx';
import StatsBar from '../components/StatsBar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import SeoHead from '../components/SeoHead.jsx';
import { fetchPublished } from '../services/contentApi.js';
import { DEFAULT_KEYWORDS, itemListSchema, breadcrumbSchema } from '../utils/seo.js';
import { FALLBACK_PROJECTS, normalizeProject } from '../data/projectContent.js';

export default function Projects() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchPublished('projects')
      .then((data) => {
        if (cancelled) return;
        const normalized = Array.isArray(data) ? data.map(normalizeProject) : [];
        setProjects(normalized.length > 0 ? normalized : FALLBACK_PROJECTS.map(normalizeProject));
      })
      .catch(() => {
        if (!cancelled) setProjects(FALLBACK_PROJECTS.map(normalizeProject));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const projectTypes = useMemo(() => [...new Set(projects.map((p) => p.type).filter(Boolean))], [projects]);
  const industryOptions = useMemo(() => [...new Set(projects.map((p) => p.industry).filter(Boolean))], [projects]);

  const filtered = useMemo(() => {
    let result = [...projects];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.client || '').toLowerCase().includes(q) ||
        (p.industry || '').toLowerCase().includes(q) ||
        (Array.isArray(p.tech) ? p.tech.some((t) => (t || '').toLowerCase().includes(q)) : false)
      );
    }

    if (typeFilter) result = result.filter((p) => p.type === typeFilter);
    if (industryFilter) result = result.filter((p) => p.industry === industryFilter);

    result.sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.date || 0) - new Date(a.date || 0);
      if (sortOrder === 'oldest') return new Date(a.date || 0) - new Date(b.date || 0);
      if (sortOrder === 'impact') return (b.metrics?.[0]?.value || '').localeCompare(a.metrics?.[0]?.value || '');
      if (sortOrder === 'team') return (parseInt(b.teamSize) || 0) - (parseInt(a.teamSize) || 0);
      return 0;
    });

    return result;
  }, [search, typeFilter, industryFilter, sortOrder, projects]);

  const activeCount = [search, typeFilter, industryFilter].filter(Boolean).length;

  const projectListSchema = projects.length > 0 ? itemListSchema(
    projects.map((p) => ({
      name: p.title,
      description: p.summary,
      url: `https://www.trimuryacorporation.in/projects/${p.slug || p._id}`
    })),
    'Trimurya Corporation Projects'
  ) : null;

  return (
    <>
      <SeoHead
        pathname="/projects"
        title="Projects"
        description="See Trimurya Corporation projects across AI automation, data services, software development, website design, web applications, SaaS, and mobile apps."
        keywords={`technology projects, AI implementation, digital transformation projects, ${DEFAULT_KEYWORDS}`}
        schemas={projectListSchema ? [projectListSchema] : []}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.trimuryacorporation.in/' },
          { name: 'Projects', url: 'https://www.trimuryacorporation.in/projects' }
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeader
          eyebrow="Portfolio"
          title="Enterprise Projects & Case Studies"
          copy="Explore our delivery records across AI, web, mobile, cloud, and enterprise transformation initiatives."
        />

        <StatsBar />

        <FilterBar
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          industryFilter={industryFilter}
          setIndustryFilter={setIndustryFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          types={projectTypes}
          industries={industryOptions}
        />

        {activeCount > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2" data-aos="fade-up">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Active filters:</span>
            {search && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary dark:bg-secondary/20">
                Search: {search}
                <button onClick={() => setSearch('')} aria-label="Clear search"><FiX size={14} /></button>
              </span>
            )}
            {typeFilter && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary dark:bg-secondary/20">
                {typeFilter}
                <button onClick={() => setTypeFilter('')} aria-label="Clear type filter"><FiX size={14} /></button>
              </span>
            )}
            {industryFilter && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary dark:bg-secondary/20">
                {industryFilter}
                <button onClick={() => setIndustryFilter('')} aria-label="Clear industry filter"><FiX size={14} /></button>
              </span>
            )}
            <button
              onClick={() => { setSearch(''); setTypeFilter(''); setIndustryFilter(''); setSortOrder('newest'); }}
              className="text-xs font-bold text-slate-400 underline decoration-slate-300 underline-offset-4 hover:text-secondary"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug || project._id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && !loading && (
          <div className="mt-16 text-center" data-aos="fade-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <FiSearch size={28} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-primary dark:text-white">No projects found</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try adjusting your filters or search query to discover more work.</p>
          </div>
        )}

        {!loading && (search || typeFilter || industryFilter) && filtered.length > 0 && (
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Showing {filtered.length} of {projects.length} projects
          </p>
        )}
      </section>
    </>
  );
}
