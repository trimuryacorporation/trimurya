export const FALLBACK_PROJECTS = [
  {
    title: 'AI Delivery Rollout',
    slug: 'ai-delivery-rollout',
    client: 'Enterprise Operations Team',
    industry: 'Technology',
    type: 'AI Project Management',
    date: '2026-06-14',
    duration: '12 Weeks',
    teamSize: '8',
    summary: 'Structured the client\'s AI program with milestones, stakeholders, and delivery governance.',
    challenge: 'The team had multiple AI ideas but no delivery structure, causing delays and unclear ownership.',
    solution: 'We introduced a delivery roadmap, weekly checkpoints, and a practical implementation plan aligned to business goals.',
    results: 'The client launched the first phase on schedule and gained a repeatable operating model for future AI work.',
    tech: ['AI', 'Roadmapping', 'Operations', 'MVP'],
    metrics: [
      { label: 'Launch readiness', value: '96%' },
      { label: 'Stakeholder alignment', value: 'High' }
    ],
    testimonial: {
      quote: 'Trimurya made the delivery process predictable and easy to manage.',
      author: 'Program Lead',
      role: 'Operations',
      company: 'Enterprise Operations Team'
    },
    related: ['service-website-redesign', 'digital-growth-engine']
  },
  {
    title: 'Service Website Redesign',
    slug: 'service-website-redesign',
    client: 'B2B Services Division',
    industry: 'Professional Services',
    type: 'Website Development',
    date: '2026-05-22',
    duration: '8 Weeks',
    teamSize: '6',
    summary: 'Built a faster, clearer, SEO-friendly website focused on conversions and credibility.',
    challenge: 'The existing website was slow, hard to navigate, and not aligned with current service messaging.',
    solution: 'We redesigned the structure, improved performance, and optimized the site for search and conversions.',
    results: 'Organic visibility improved and the sales team reported better inbound lead quality.',
    tech: ['React', 'Vite', 'SEO', 'Performance'],
    metrics: [
      { label: 'Speed score', value: '95+' },
      { label: 'Lead quality', value: 'Improved' }
    ],
    testimonial: {
      quote: 'The redesign finally gave our services the presence they deserved.',
      author: 'Marketing Director',
      role: 'Growth',
      company: 'B2B Services Division'
    },
    related: ['ai-delivery-rollout', 'digital-growth-engine']
  },
  {
    title: 'Digital Growth Engine',
    slug: 'digital-growth-engine',
    client: 'Growth Marketing Team',
    industry: 'Marketing',
    type: 'Digital Marketing',
    date: '2026-04-18',
    duration: '10 Weeks',
    teamSize: '5',
    summary: 'Unified SEO, content, and paid campaigns into one measurable growth system.',
    challenge: 'Campaigns were fragmented and reporting was inconsistent across channels.',
    solution: 'We built a single funnel, unified tracking, and a content plan tied to business outcomes.',
    results: 'Traffic and lead quality both improved while reporting became simpler for leadership.',
    tech: ['SEO', 'Analytics', 'Paid Media', 'Content'],
    metrics: [
      { label: 'Traffic growth', value: '+48%' },
      { label: 'Lead volume', value: '+31%' }
    ],
    testimonial: {
      quote: 'The strategy finally connected marketing activity to real business impact.',
      author: 'Head of Growth',
      role: 'Marketing',
      company: 'Growth Marketing Team'
    },
    related: ['ai-delivery-rollout', 'service-website-redesign']
  },
  {
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    client: 'Strategy & Operations Group',
    industry: 'Consulting',
    type: 'Business Consultancy',
    date: '2026-03-30',
    duration: '14 Weeks',
    teamSize: '7',
    summary: 'Mapped business processes and introduced a practical transformation roadmap for the client.',
    challenge: 'The team needed a clearer transformation plan that balanced ambition with operational reality.',
    solution: 'We created a phased roadmap, owner map, and KPI framework for implementation.',
    results: 'Leadership gained alignment and the first two workstreams moved into execution.',
    tech: ['Process Mapping', 'KPI Design', 'Change Management'],
    metrics: [
      { label: 'Programs launched', value: '3' },
      { label: 'Alignment score', value: 'High' }
    ],
    testimonial: {
      quote: 'The roadmap gave us the clarity to move forward with confidence.',
      author: 'Strategy Head',
      role: 'Operations',
      company: 'Strategy & Operations Group'
    },
    related: ['ai-delivery-rollout', 'digital-growth-engine']
  },
  {
    title: 'HR Transformation',
    slug: 'hr-transformation',
    client: 'People Operations',
    industry: 'Human Resources',
    type: 'HR Consultancy',
    date: '2026-02-25',
    duration: '9 Weeks',
    teamSize: '4',
    summary: 'Improved hiring flow, workforce planning, and onboarding operations.',
    challenge: 'Recruitment and onboarding processes were manual and hard to scale.',
    solution: 'We standardized the hiring workflow and introduced clear HR operating practices.',
    results: 'Time-to-hire dropped and internal coordination became much easier.',
    tech: ['Recruitment', 'HR Ops', 'Onboarding'],
    metrics: [
      { label: 'Time-to-hire', value: '-36%' },
      { label: 'Onboarding', value: 'Simplified' }
    ],
    testimonial: {
      quote: 'The new process removed a lot of friction from hiring and onboarding.',
      author: 'HR Manager',
      role: 'People Ops',
      company: 'People Operations'
    },
    related: ['service-website-redesign', 'digital-growth-engine']
  },
  {
    title: 'Retail Mobile App',
    slug: 'retail-mobile-app',
    client: 'Omnichannel Retail Brand',
    industry: 'Retail',
    type: 'Mobile App Development',
    date: '2026-01-12',
    duration: '11 Weeks',
    teamSize: '6',
    summary: 'Launched a mobile shopping experience focused on speed, usability, and repeat purchases.',
    challenge: 'The brand needed a native-feeling mobile experience to support customer retention.',
    solution: 'We delivered a responsive app prototype, checkout flow, and engagement features optimized for mobile.',
    results: 'Mobile conversions improved and users spent more time inside the app.',
    tech: ['React Native', 'UX', 'Payments', 'Analytics'],
    metrics: [
      { label: 'Conversion lift', value: '+22%' },
      { label: 'Engagement', value: 'Up' }
    ],
    testimonial: {
      quote: 'The app gave us a much stronger mobile storefront.',
      author: 'Product Lead',
      role: 'Digital',
      company: 'Omnichannel Retail Brand'
    },
    related: ['service-website-redesign', 'ai-delivery-rollout']
  }
];

export function normalizeProject(project) {
  return {
    ...project,
    tech: Array.isArray(project.tech) ? project.tech : typeof project.tech === 'string' ? project.tech.split(',').map((item) => item.trim()).filter(Boolean) : [],
    metrics: Array.isArray(project.metrics) ? project.metrics : [],
    related: Array.isArray(project.related) ? project.related : [],
    type: project.type || 'Project',
    industry: project.industry || 'Enterprise',
    date: project.date || '',
    duration: project.duration || '',
    teamSize: project.teamSize || '',
    summary: project.summary || '',
    challenge: project.challenge || '',
    solution: project.solution || '',
    results: project.results || ''
  };
}
