const SITE_URL = 'https://www.trimuryacorporation.in';
const DEFAULT_TITLE = 'Trimurya Corporation';
const DEFAULT_DESCRIPTION = 'Trimurya Corporation delivers enterprise AI, technology, recruitment, HR, digital marketing, telecom, call center, and media solutions for business growth.';
const DEFAULT_KEYWORDS = 'Trimurya Corporation, AI services, technology solutions, recruitment, HR services, digital marketing, telecom, call center, media services';

const ROUTE_METADATA = {
  '/': {
    title: 'AI, Technology & Talent Solutions',
    description: 'Trimurya Corporation helps businesses scale with AI, technology, recruitment, HR, digital marketing, telecom, call center, and media services.',
    keywords: DEFAULT_KEYWORDS
  },
  '/about': {
    title: 'About Trimurya Corporation',
    description: 'Learn about Trimurya Corporation and our mission to empower businesses through innovation, technology, and talent.',
    keywords: 'about Trimurya Corporation, AI company, technology services, business transformation'
  },
  '/services': {
    title: 'Services',
    description: 'Explore enterprise AI, software, recruitment, digital marketing, telecom, call center, and media services from Trimurya Corporation.',
    keywords: 'enterprise AI services, technology services, recruitment services, digital marketing, telecom services'
  },
  '/industries': {
    title: 'Industries',
    description: 'Trimurya Corporation delivers tailored solutions for automotive, healthcare, retail, finance, defense, and more.',
    keywords: 'industry solutions, automotive AI, healthcare AI, retail technology, fintech solutions'
  },
  '/projects': {
    title: 'Projects',
    description: 'See how Trimurya Corporation has enabled transformation through technology, data, and digital growth initiatives.',
    keywords: 'technology projects, AI implementation, digital transformation projects'
  },
  '/marketplace': {
    title: 'Marketplace',
    description: 'Browse Trimurya Corporation marketplace offerings for AI data, model tooling, training data, and enterprise solutions.',
    keywords: 'AI marketplace, data marketplace, training data, model tooling'
  },
  '/careers': {
    title: 'Careers',
    description: 'Join Trimurya Corporation and help build the next generation of AI, technology, and business solutions.',
    keywords: 'careers, jobs, AI jobs, technology careers, recruitment jobs'
  },
  '/blog': {
    title: 'Blog',
    description: 'Read insights on AI, technology, digital marketing, operations, and business growth from Trimurya Corporation.',
    keywords: 'AI blog, technology insights, digital marketing blog, business growth blog'
  },
  '/contact': {
    title: 'Contact Us',
    description: 'Contact Trimurya Corporation to discuss AI, technology, recruitment, digital marketing, telecom, and media needs.',
    keywords: 'contact Trimurya Corporation, business enquiry, AI consultation, recruitment enquiry'
  },
  '/login': {
    title: 'Login',
    description: 'Secure login for Trimurya Corporation clients and team members.',
    keywords: 'Trimurya Corporation login'
  },
  '/dashboard': {
    title: 'Dashboard',
    description: 'Access your Trimurya Corporation dashboard and resources.',
    keywords: 'Trimurya Corporation dashboard'
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'Read Trimurya Corporation\'s privacy policy, terms of service, and cookie policy to understand how we protect and use your data.',
    keywords: 'privacy policy, terms of service, cookie policy, Trimurya Corporation data protection, GDPR compliance'
  }
};

function normalizePath(pathname = '/') {
  const safePath = pathname || '/';
  const trimmed = safePath.replace(/\/+$/, '') || '/';
  return trimmed === '' ? '/' : trimmed;
}

function getRouteMetadata(pathname = '/') {
  const normalizedPath = normalizePath(pathname);
  const serviceMatch = normalizedPath.match(/^\/services\/([^/]+)$/);

  if (serviceMatch) {
    const serviceLabel = serviceMatch[1]
      .split('-')
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');

    return {
      title: `${serviceLabel} Services`,
      description: `Explore ${serviceLabel} services from Trimurya Corporation for modern business growth and digital transformation.`,
      keywords: `${serviceLabel}, Trimurya Corporation, business solutions`
    };
  }

  return ROUTE_METADATA[normalizedPath] || ROUTE_METADATA['/'];
}

function upsertMetaTag(attributes, content) {
  const head = document.head;
  const selector = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' and ');
  const existing = head.querySelector(`meta[${Object.entries(attributes)[0][0]}="${Object.entries(attributes)[0][1]}"]`);

  if (existing) {
    existing.setAttribute('content', content);
    return existing;
  }

  const tag = document.createElement('meta');
  Object.entries(attributes).forEach(([key, value]) => tag.setAttribute(key, value));
  tag.setAttribute('content', content);
  head.appendChild(tag);
  return tag;
}

function upsertLinkTag(attributes) {
  const head = document.head;
  const existing = head.querySelector(`link[${Object.entries(attributes)[0][0]}="${Object.entries(attributes)[0][1]}"]`);

  if (existing) {
    Object.entries(attributes).forEach(([key, value]) => existing.setAttribute(key, value));
    return existing;
  }

  const tag = document.createElement('link');
  Object.entries(attributes).forEach(([key, value]) => tag.setAttribute(key, value));
  head.appendChild(tag);
  return tag;
}

export function pageTitle(title) {
  return `${title} | ${DEFAULT_TITLE}`;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Trimurya Corporation',
    legalName: 'Trimurya Corporation',
    slogan: 'Empowering Businesses Through Innovation, Technology & Talent',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.svg`,
    description: DEFAULT_DESCRIPTION,
    sameAs: ['https://www.linkedin.com/', 'https://www.facebook.com/', 'https://www.instagram.com/'],
    areaServed: ['India', 'Global'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English'
    }
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Trimurya Corporation',
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function buildPageMetadata(pathname = '/') {
  const routeMeta = getRouteMetadata(pathname);
  const normalizedPath = normalizePath(pathname);
  const canonicalPath = normalizedPath === '/' ? '/' : normalizedPath;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const title = pageTitle(routeMeta.title);
  const description = routeMeta.description || DEFAULT_DESCRIPTION;
  const keywords = routeMeta.keywords || DEFAULT_KEYWORDS;

  return {
    title,
    description,
    keywords,
    canonical,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical
  };
}

export function setPageSeo(pathname = '/') {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const meta = buildPageMetadata(pathname);
  document.title = meta.title;

  upsertMetaTag({ name: 'description' }, meta.description);
  upsertMetaTag({ name: 'keywords' }, meta.keywords);
  upsertMetaTag({ name: 'robots' }, 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  upsertMetaTag({ name: 'theme-color' }, '#0F172A');
  upsertMetaTag({ name: 'twitter:card' }, 'summary_large_image');
  upsertMetaTag({ name: 'twitter:title' }, meta.ogTitle);
  upsertMetaTag({ name: 'twitter:description' }, meta.ogDescription);
  upsertMetaTag({ name: 'twitter:image' }, `${SITE_URL}/og-image.svg`);
  upsertMetaTag({ property: 'og:title' }, meta.ogTitle);
  upsertMetaTag({ property: 'og:description' }, meta.ogDescription);
  upsertMetaTag({ property: 'og:type' }, 'website');
  upsertMetaTag({ property: 'og:url' }, meta.ogUrl);
  upsertMetaTag({ property: 'og:image' }, `${SITE_URL}/og-image.svg`);
  upsertMetaTag({ property: 'og:site_name' }, DEFAULT_TITLE);
  upsertMetaTag({ property: 'og:locale' }, 'en_US');

  upsertLinkTag({ rel: 'canonical', href: meta.canonical });
  upsertLinkTag({ rel: 'icon', href: '/favicon.ico' });

  const existingSchema = document.getElementById('trimurya-seo-schema');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schemaScript = document.createElement('script');
  schemaScript.id = 'trimurya-seo-schema';
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify([websiteSchema(), organizationSchema()]);
  document.head.appendChild(schemaScript);
}
