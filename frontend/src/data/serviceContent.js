const CORE_BENEFITS = [
  {
    title: 'Outcome-first execution',
    copy: 'Every engagement is planned around a measurable business outcome instead of a loose task list.',
    icon: 'FiTarget'
  },
  {
    title: 'Scalable delivery',
    copy: 'We shape each service so it can grow with the business without creating long-term technical debt.',
    icon: 'FiTrendingUp'
  },
  {
    title: 'Trusted collaboration',
    copy: 'You get clear communication, visible milestones, and a team that keeps progress moving forward.',
    icon: 'FiUsers'
  },
  {
    title: 'Enterprise readiness',
    copy: 'Security, quality, and support are built into the process from discovery through launch.',
    icon: 'FiShield'
  }
];

const CORE_PROCESS = [
  { step: '01', title: 'Discovery', copy: 'We align on goals, scope, audiences, risks, and the business context before work begins.' },
  { step: '02', title: 'Strategy', copy: 'We convert the brief into a practical roadmap with milestones, owners, and delivery checkpoints.' },
  { step: '03', title: 'Build', copy: 'We execute in visible sprints and keep stakeholders updated with progress that is easy to follow.' },
  { step: '04', title: 'Optimize', copy: 'We refine the service after launch so it keeps performing as the business grows.' }
];

const createFaqs = (title) => ([
  { q: `How do we start ${title.toLowerCase()}?`, a: 'We begin with a discovery call, define the scope, and map the delivery plan around your goals.' },
  { q: 'Can the scope be customized?', a: 'Yes. Every service can be tailored to your timeline, budget, and internal workflow.' },
  { q: 'Do you provide post-launch support?', a: 'Yes. We stay available after delivery to support improvements, maintenance, and scaling.' }
]);

const createTestimonials = (title) => ([
  { quote: `The ${title.toLowerCase()} work felt organized, transparent, and easy to manage from day one.`, author: 'Project Lead', role: 'Operations', company: 'Enterprise Client' },
  { quote: 'Communication stayed sharp and the team kept our priorities moving without friction.', author: 'Business Owner', role: 'Founder', company: 'Growth Client' },
  { quote: 'We got a practical result that gave us a strong base to scale from.', author: 'Department Head', role: 'Strategy', company: 'Corporate Client' }
]);

const createService = ({
  title,
  slug,
  icon,
  summary,
  longDescription,
  items,
  features,
  outcomes,
  technologies,
  related,
  heroStats
}) => ({
  title,
  slug,
  icon,
  summary,
  longDescription,
  items,
  features,
  outcomes,
  technologies,
  related,
  heroStats,
  benefits: CORE_BENEFITS,
  process: CORE_PROCESS,
  testimonials: createTestimonials(title),
  faqs: createFaqs(title)
});

export const SERVICE_FALLBACKS = [
  createService({
    title: 'AI Project Management',
    slug: 'ai-project-management',
    icon: 'FiCpu',
    summary: 'Plan and deliver AI initiatives with clear milestones, governance, and measurable execution.',
    longDescription: 'We help teams turn AI ideas into structured programs with realistic timelines, visible ownership, and delivery discipline that keeps stakeholders aligned.',
    items: ['Roadmapping', 'Governance', 'Stakeholders', 'Delivery'],
    features: [
      'AI program planning and milestone setup',
      'Delivery governance and accountability',
      'Stakeholder communication and reporting',
      'Risk tracking and dependency management',
      'Launch preparation and post-launch review'
    ],
    outcomes: [
      'Clear AI delivery roadmap',
      'Better stakeholder alignment',
      'Faster launch readiness',
      'Lower delivery risk'
    ],
    technologies: ['AI Planning', 'Agile Delivery', 'Operations', 'Automation'],
    related: ['website-development', 'cloud-solutions', 'cybersecurity'],
    heroStats: [
      { value: '24/7', label: 'Program visibility' },
      { value: 'Fast', label: 'Delivery cycles' },
      { value: 'Enterprise', label: 'Ready execution' },
      { value: 'SEO', label: 'Optimized presence' }
    ]
  }),
  createService({
    title: 'Website Development',
    slug: 'website-development',
    icon: 'FiGlobe',
    summary: 'Build fast, conversion-focused websites that support credibility, SEO, and lead generation.',
    longDescription: 'We design and develop modern websites that feel polished, load quickly, and give your business a strong digital presence that is ready to scale.',
    items: ['UI/UX', 'Performance', 'SEO', 'Conversion'],
    features: [
      'Custom website design and development',
      'Mobile-first responsive layouts',
      'Technical SEO and structured metadata',
      'Performance optimization and accessibility',
      'Content structure built for conversions'
    ],
    outcomes: [
      'Stronger first impression',
      'Better search visibility',
      'Higher conversion quality',
      'Improved page speed'
    ],
    technologies: ['React', 'Vite', 'SEO', 'Performance'],
    related: ['digital-marketing', 'ai-project-management', 'cloud-solutions'],
    heroStats: [
      { value: 'Fast', label: 'Load times' },
      { value: 'SEO', label: 'Ready structure' },
      { value: 'Mobile', label: 'First design' },
      { value: 'Lead', label: 'Focused UX' }
    ]
  }),
  createService({
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: 'FiTrendingUp',
    summary: 'Create measurable growth with SEO, content, paid media, and conversion-led campaign planning.',
    longDescription: 'We unify SEO, content, and paid campaigns into one growth system so marketing activity connects directly to traffic, leads, and revenue.',
    items: ['SEO', 'Content', 'Ads', 'Analytics'],
    features: [
      'SEO strategy and content planning',
      'Paid media and campaign optimization',
      'Analytics setup and conversion tracking',
      'Landing pages designed for lead capture',
      'Reporting tied to business outcomes'
    ],
    outcomes: [
      'Improved organic visibility',
      'More qualified inbound leads',
      'Clear campaign reporting',
      'Better conversion flow'
    ],
    technologies: ['SEO', 'Analytics', 'Paid Media', 'Content Strategy'],
    related: ['website-development', 'business-consultancy', 'mobile-app-development'],
    heroStats: [
      { value: 'Growth', label: 'Campaign focus' },
      { value: 'SEO', label: 'Organic reach' },
      { value: 'Paid', label: 'Media control' },
      { value: 'Lead', label: 'Quality improvement' }
    ]
  }),
  createService({
    title: 'Business Consultancy',
    slug: 'business-consultancy',
    icon: 'FiBriefcase',
    summary: 'Turn strategy into execution with practical roadmaps, operating clarity, and transformation support.',
    longDescription: 'We help leadership teams simplify decision-making, organize priorities, and move from strategy slides to operating reality with a repeatable framework.',
    items: ['Strategy', 'Operations', 'Growth', 'Execution'],
    features: [
      'Business transformation roadmaps',
      'Operating model and process mapping',
      'KPI design and performance tracking',
      'Leadership alignment and planning',
      'Go-to-market and scale support'
    ],
    outcomes: [
      'Clearer strategy execution',
      'Reduced operational friction',
      'Better owner alignment',
      'Improved growth planning'
    ],
    technologies: ['Process Mapping', 'KPI Design', 'Change Management', 'Planning'],
    related: ['ai-project-management', 'hr-consultancy', 'cloud-solutions'],
    heroStats: [
      { value: 'Roadmap', label: 'Structured planning' },
      { value: 'Ops', label: 'Workflow clarity' },
      { value: 'KPI', label: 'Performance focus' },
      { value: 'Scale', label: 'Growth readiness' }
    ]
  }),
  createService({
    title: 'HR Consultancy',
    slug: 'hr-consultancy',
    icon: 'FiUsers',
    summary: 'Build hiring, onboarding, and people operations that support team growth and performance.',
    longDescription: 'We help organizations improve hiring flow, workforce planning, and onboarding so teams can scale without losing clarity or culture.',
    items: ['Hiring', 'Onboarding', 'Workforce', 'Culture'],
    features: [
      'Hiring workflow and role planning',
      'Candidate screening and selection support',
      'Onboarding and employee journey design',
      'Workforce planning and role clarity',
      'People process and policy improvements'
    ],
    outcomes: [
      'Faster hiring cycles',
      'Cleaner onboarding',
      'Better team coordination',
      'More scalable HR operations'
    ],
    technologies: ['Recruitment', 'HR Ops', 'Onboarding', 'Workforce Planning'],
    related: ['business-consultancy', 'mobile-app-development', 'cybersecurity'],
    heroStats: [
      { value: 'People', label: 'Operations focus' },
      { value: 'Hiring', label: 'Workflow improvement' },
      { value: 'Onboard', label: 'Process clarity' },
      { value: 'Scale', label: 'Team growth' }
    ]
  }),
  createService({
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    icon: 'FiLayers',
    summary: 'Design and ship mobile experiences that are fast, usable, and ready to support repeat engagement.',
    longDescription: 'We create mobile experiences that feel native, support retention, and turn complex workflows into simple user journeys on iOS and Android.',
    items: ['UX', 'Prototype', 'Build', 'Launch'],
    features: [
      'Mobile app strategy and UX planning',
      'Prototype and flow design',
      'Cross-platform development support',
      'Checkout, onboarding, and engagement features',
      'Testing and release readiness'
    ],
    outcomes: [
      'Better mobile engagement',
      'Simpler user journeys',
      'Higher conversion quality',
      'Ready-for-launch builds'
    ],
    technologies: ['React Native', 'UX', 'Payments', 'Analytics'],
    related: ['website-development', 'cloud-solutions', 'ai-project-management'],
    heroStats: [
      { value: 'Mobile', label: 'First design' },
      { value: 'UX', label: 'Journey clarity' },
      { value: 'Build', label: 'Release readiness' },
      { value: 'Grow', label: 'Retention focus' }
    ]
  }),
  createService({
    title: 'Cloud Solutions',
    slug: 'cloud-solutions',
    icon: 'FiCloud',
    summary: 'Design cloud foundations that are scalable, resilient, and aligned with business operations.',
    longDescription: 'We help organizations plan, migrate, and optimize cloud environments so they can improve reliability, reduce friction, and support modern delivery.',
    items: ['Migration', 'Architecture', 'Ops', 'Security'],
    features: [
      'Cloud architecture planning and assessment',
      'Migration support and environment setup',
      'Monitoring and reliability improvements',
      'Security, access, and governance setup',
      'Operational optimization and scale support'
    ],
    outcomes: [
      'More resilient infrastructure',
      'Simpler scaling and support',
      'Better cloud governance',
      'Improved platform efficiency'
    ],
    technologies: ['AWS', 'Cloud Architecture', 'DevOps', 'Security'],
    related: ['cybersecurity', 'website-development', 'ai-project-management'],
    heroStats: [
      { value: 'Cloud', label: 'Architecture focus' },
      { value: 'Ops', label: 'Reliability' },
      { value: 'Secure', label: 'Governance' },
      { value: 'Scale', label: 'Growth ready' }
    ]
  }),
  createService({
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    icon: 'FiShield',
    summary: 'Strengthen digital trust with practical security planning, monitoring, and risk reduction.',
    longDescription: 'We help teams protect systems, reduce attack surface, and build a security posture that supports modern digital operations without slowing the business down.',
    items: ['Risk', 'Access', 'Monitoring', 'Response'],
    features: [
      'Security review and risk assessment',
      'Access control and policy recommendations',
      'Monitoring and incident response planning',
      'Cloud and application hardening support',
      'Security hygiene and governance improvements'
    ],
    outcomes: [
      'Reduced security risk',
      'Stronger access control',
      'Better incident readiness',
      'Improved trust posture'
    ],
    technologies: ['Security', 'Monitoring', 'Governance', 'Cloud Hardening'],
    related: ['cloud-solutions', 'website-development', 'business-consultancy'],
    heroStats: [
      { value: 'Risk', label: 'Reduction focus' },
      { value: 'Access', label: 'Control improvement' },
      { value: 'Monitor', label: 'Incident readiness' },
      { value: 'Trust', label: 'Security posture' }
    ]
  })
];

export function getFallbackServices() {
  return [...SERVICE_FALLBACKS];
}

export function getFallbackService(slug) {
  return SERVICE_FALLBACKS.find((service) => service.slug === slug) || null;
}
