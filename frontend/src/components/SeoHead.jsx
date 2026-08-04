import { Helmet } from 'react-helmet-async';
import { useSettings } from '../context/SettingsContext.jsx';
import { buildPageMetadata, breadcrumbSchema } from '../utils/seo.js';

function normalizeSchemas(schemas) {
  if (!schemas) return [];
  return Array.isArray(schemas) ? schemas.filter(Boolean) : [schemas].filter(Boolean);
}

export default function SeoHead({
  pathname = '/',
  title,
  description,
  keywords,
  canonical,
  image,
  schemas = [],
  breadcrumbs,
  noindex = false
}) {
  const settings = useSettings();
  const meta = buildPageMetadata(pathname, {
    title,
    description,
    keywords,
    canonical,
    image,
    siteTitle: settings.seo?.title || settings.siteName || 'Trimurya Corporation',
    siteUrl: settings.siteUrl || 'https://www.trimuryacorporation.in'
  });
  const schemaList = normalizeSchemas(schemas);

  if (breadcrumbs?.length) {
    schemaList.unshift(breadcrumbSchema(breadcrumbs));
  }

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="theme-color" content="#0F172A" />
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.ogUrl} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content={meta.siteTitle} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.ogTitle} />
      <meta name="twitter:description" content={meta.ogDescription} />
      <meta name="twitter:image" content={meta.image} />
      <link rel="canonical" href={meta.canonical} />
      <link rel="icon" href="/favicon.ico" />
      {schemaList.map((schema, index) => (
        <script key={`${meta.canonical}-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
