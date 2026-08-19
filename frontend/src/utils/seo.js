export const SITE_URL = 'https://www.trimuryacorporation.in';
export const DEFAULT_TITLE = 'Trimurya Corporation';

export const DEFAULT_SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/trimuryacorporation/',
  instagram: 'https://www.instagram.com/trimuryacorporation/'
};

export const SOCIAL_PROFILE_URLS = Object.values(DEFAULT_SOCIAL_LINKS);

export const BRAND_ALIASES = [
  'Trimurya Corporation India',
  'Trimurya Corporation AI',
  'trimuryacorporation'
];

export const CORE_SERVICE_KEYWORDS = [
  'AI services company',
  'AI solutions company India',
  'AI data collection',
  'AI data annotation',
  'AI model training support',
  'AI automation services',
  'data annotation services India',
  'AI data services India',
  'website design company India',
  'website development company India',
  'custom website development',
  'web application development',
  'software development company India',
  'SaaS development company',
  'mobile app development company'
];

export const DEFAULT_DESCRIPTION = 'Trimurya Corporation India delivers AI data collection, data annotation, AI automation, model training support, software, SaaS, website and mobile app development.';
export const DEFAULT_KEYWORDS = [
  'Trimurya Corporation',
  'Trimurya Corporation India',
  'Trimurya Corporation AI',
  'Trimurya Corporation website design',
  'Trimurya Corporation AI services',
  'Trimurya Corporation software development',
  ...CORE_SERVICE_KEYWORDS
].join(', ');

const ROUTE_METADATA = {
  '/': {
    title: 'AI Services & Software Development Company India',
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS
  },
  '/about': {
    title: 'About Trimurya Corporation',
    description: 'Learn about Trimurya Corporation India, an AI services and software development company delivering automation, websites, SaaS, mobile apps, and AI data services.',
    keywords: `about Trimurya Corporation, Trimurya Corporation India, Trimurya Corporation AI, ${DEFAULT_KEYWORDS}`
  },
  '/services': {
    title: 'AI, Data, Website & Software Services',
    description: 'Explore AI services, AI data collection, data annotation, model training support, automation, website development, SaaS, and mobile app development.',
    keywords: DEFAULT_KEYWORDS
  },
  '/industries': {
    title: 'Industries',
    description: 'Trimurya Corporation delivers AI solutions, software development, web applications, and automation services for healthcare, finance, retail, SaaS, and more.',
    keywords: `industry AI solutions, automotive AI, healthcare AI, retail technology, fintech solutions, ${DEFAULT_KEYWORDS}`
  },
  '/projects': {
    title: 'Projects',
    description: 'See Trimurya Corporation projects across AI automation, data services, software development, website design, web applications, SaaS, and mobile apps.',
    keywords: `technology projects, AI implementation, digital transformation projects, ${DEFAULT_KEYWORDS}`
  },
  '/marketplace': {
    title: 'AI Data Collection & Annotation Services',
    description: 'Browse Trimurya Corporation AI data services for data collection, data annotation, training data, model training support, and AI automation.',
    keywords: `AI marketplace, data marketplace, training data, model tooling, ${DEFAULT_KEYWORDS}`
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
    description: 'Contact Trimurya Corporation for AI services, AI data collection, data annotation, model training support, website development, SaaS, and mobile apps.',
    keywords: `contact Trimurya Corporation, business enquiry, AI consultation, website development enquiry, ${DEFAULT_KEYWORDS}`
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
    description: "Read Trimurya Corporation's privacy policy, terms of service, and cookie policy to understand how we protect and use your data.",
    keywords: 'privacy policy, terms of service, cookie policy, Trimurya Corporation data protection, GDPR compliance'
  }
};

function normalizePath(pathname = '/') {
  const safePath = pathname || '/';
  const trimmed = safePath.replace(/\/+$/, '') || '/';
  return trimmed === '' ? '/' : trimmed;
}

function humanizeSegment(segment) {
  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function buildFallbackMetadata(pathname) {
  const normalizedPath = normalizePath(pathname);
  const segments = normalizedPath.split('/').filter(Boolean);

  if (segments.length === 0) {
    return ROUTE_METADATA['/'];
  }

  if (segments[0] === 'services' && segments[1]) {
    const serviceLabel = humanizeSegment(segments[1]);
    return {
      title: `${serviceLabel} Services`,
      description: `Explore ${serviceLabel} services from Trimurya Corporation for modern business growth and digital transformation.`,
      keywords: `${serviceLabel}, Trimurya Corporation, business solutions, ${DEFAULT_KEYWORDS}`
    };
  }

  const title = humanizeSegment(segments[segments.length - 1]);
  return {
    title,
    description: `${title} information and resources from Trimurya Corporation.`,
    keywords: `${title}, Trimurya Corporation`
  };
}

function getRouteMetadata(pathname = '/') {
  const normalizedPath = normalizePath(pathname);
  return ROUTE_METADATA[normalizedPath] || buildFallbackMetadata(normalizedPath);
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

export function pageTitle(title, siteName = DEFAULT_TITLE) {
  return `${title} | ${siteName}`;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Trimurya Corporation',
    legalName: 'Trimurya Corporation',
    alternateName: BRAND_ALIASES,
    slogan: 'Empowering Businesses Through Innovation, Technology & Talent',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.svg`,
    description: DEFAULT_DESCRIPTION,
    sameAs: SOCIAL_PROFILE_URLS,
    areaServed: ['India', 'Global'],
    knowsAbout: CORE_SERVICE_KEYWORDS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Trimurya Corporation services',
      itemListElement: [
        'AI data collection',
        'AI data annotation',
        'AI model training support',
        'AI automation services',
        'website design',
        'website development',
        'custom web application development',
        'software development',
        'SaaS development',
        'mobile app development'
      ].map((serviceName) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: serviceName,
          provider: {
            '@type': 'Organization',
            name: 'Trimurya Corporation',
            url: SITE_URL
          }
        }
      }))
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi']
    }
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Trimurya Corporation',
    alternateName: BRAND_ALIASES,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'en-IN',
    publisher: {
      '@type': 'Organization',
      name: 'Trimurya Corporation',
      url: SITE_URL
    },
    about: CORE_SERVICE_KEYWORDS.map((keyword) => ({
      '@type': 'Thing',
      name: keyword
    }))
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function itemListSchema(items, listName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName || 'Trimurya Corporation Items',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.url,
      name: item.name,
      description: item.description
    }))
  };
}

export function articleSchema(title, description, image, datePublished, authorName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || `${SITE_URL}/og-image.svg`,
    datePublished: datePublished || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: authorName || 'Trimurya Corporation'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Trimurya Corporation',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.svg`
      }
    }
  };
}

export function jobPostingSchema(job) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted || new Date().toISOString(),
    employmentType: job.employmentType || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Trimurya Corporation',
      sameAs: SITE_URL
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location || 'India',
        addressCountry: 'IN'
      }
    }
  };
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function localBusinessSchema(contact = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Trimurya Corporation',
    image: `${SITE_URL}/og-image.svg`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    sameAs: SOCIAL_PROFILE_URLS,
    areaServed: ['India', 'Global'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  };

  if (contact.telephone) schema.telephone = contact.telephone;
  if (contact.email) schema.email = contact.email;
  if (contact.address) schema.address.streetAddress = contact.address;

  return schema;
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.longDescription || service.summary || service.description || '',
    serviceType: service.title,
    keywords: service.seoKeywords || [service.title, service.label, ...CORE_SERVICE_KEYWORDS].filter(Boolean).join(', '),
    provider: {
      '@type': 'Organization',
      name: 'Trimurya Corporation',
      url: SITE_URL
    },
    areaServed: service.areaServed || ['India', 'Global']
  };
}

export function buildPageMetadata(pathname = '/', overrides = {}) {
  const routeMeta = getRouteMetadata(pathname);
  const siteTitle = overrides.siteTitle || DEFAULT_TITLE;
  const siteUrl = overrides.siteUrl || SITE_URL;
  const normalizedPath = normalizePath(pathname);
  const canonicalPath = normalizedPath === '/' ? '/' : normalizedPath;
  const canonical = overrides.canonical || `${siteUrl}${canonicalPath}`;
  const titleBase = overrides.title || routeMeta.title;
  const title = pageTitle(titleBase, siteTitle);
  const description = overrides.description || routeMeta.description || DEFAULT_DESCRIPTION;
  const keywords = overrides.keywords || routeMeta.keywords || DEFAULT_KEYWORDS;

  return {
    title,
    description,
    keywords,
    canonical,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    image: overrides.image || `${siteUrl}/og-image.svg`,
    siteTitle,
    siteUrl
  };
}

export function setPageSeo(pathname = '/', overrides = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const meta = buildPageMetadata(pathname, overrides);
  document.title = meta.title;

  upsertMetaTag({ name: 'description' }, meta.description);
  upsertMetaTag({ name: 'keywords' }, meta.keywords);
  upsertMetaTag({ name: 'robots' }, 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  upsertMetaTag({ name: 'theme-color' }, '#0F172A');
  upsertMetaTag({ name: 'twitter:card' }, 'summary_large_image');
  upsertMetaTag({ name: 'twitter:title' }, meta.ogTitle);
  upsertMetaTag({ name: 'twitter:description' }, meta.ogDescription);
  upsertMetaTag({ name: 'twitter:image' }, meta.image);
  upsertMetaTag({ property: 'og:title' }, meta.ogTitle);
  upsertMetaTag({ property: 'og:description' }, meta.ogDescription);
  upsertMetaTag({ property: 'og:type' }, 'website');
  upsertMetaTag({ property: 'og:url' }, meta.ogUrl);
  upsertMetaTag({ property: 'og:image' }, meta.image);
  upsertMetaTag({ property: 'og:site_name' }, meta.siteTitle);
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
