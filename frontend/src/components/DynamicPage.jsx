import { useEffect, useState } from 'react';
import { fetchPageBySlug } from '../services/contentApi.js';
import PageSectionRenderer from './PageSectionRenderer.jsx';
import SeoHead from './SeoHead.jsx';
import { breadcrumbSchema } from '../utils/seo.js';

function normalizeSections(page) {
  return page?.sections || page?.metadata?.sections || [];
}

export default function DynamicPage({ slug, fallback = null }) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPageBySlug(slug)
      .then((data) => {
        if (!cancelled) setPage(data);
      })
      .catch(() => {
        if (!cancelled) setPage(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="h-72 rounded-[28px] bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    );
  }

  if (!page) {
    return fallback;
  }

  const sections = normalizeSections(page);
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.trimuryacorporation.in/' },
    { name: page.title, url: `https://www.trimuryacorporation.in/${slug}` }
  ];

  return (
    <div className="min-h-screen">
      <SeoHead
        pathname={`/${slug}`}
        title={page.seoTitle || page.title}
        description={page.seoDescription || page.summary || ''}
        keywords={page.seoKeywords || ''}
        image={page.heroImage}
        schemas={page.schema ? [page.schema] : []}
        breadcrumbs={breadcrumbs}
      />
      <div>
        {sections.map((section, index) => (
          <PageSectionRenderer key={`${section.type || 'section'}-${index}`} section={section} />
        ))}
      </div>
    </div>
  );
}
