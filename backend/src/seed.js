import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import AppConfig from './config/index.js';
import User from './models/User.js';
import Setting from './models/Setting.js';
import GenericContent from './models/GenericContent.js';

dotenv.config({ override: true });

const seedAdmin = async () => {
  if (!AppConfig.admin.email || !AppConfig.admin.password) {
    console.log('Admin seeding skipped: ADMIN_EMAIL and ADMIN_PASSWORD are required.');
    return;
  }

  try {
    const existing = await User.findOne({ email: AppConfig.admin.email });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(AppConfig.admin.password, 12);
      await User.create({
        name: AppConfig.admin.name || 'Admin',
        email: AppConfig.admin.email,
        password: hashedPassword,
        role: 'admin',
        verified: true
      });
      console.log('Admin user seeded:', AppConfig.admin.email);
    } else {
      console.log('Admin user already exists:', AppConfig.admin.email);
    }
  } catch (error) {
    console.log('Admin seeding skipped:', error.message);
  }
};

const siteSettings = [
  { key: 'siteName', value: 'Trimurya Corporation', category: 'site', description: 'Website name displayed in header and SEO' },
  { key: 'siteUrl', value: 'https://www.trimuryacorporation.in', category: 'site', description: 'Primary website URL' },
  { key: 'siteDescription', value: 'Trimurya Corporation delivers enterprise AI, technology, recruitment, HR, digital marketing, telecom, call center, and media solutions for business growth.', category: 'site', description: 'Site description for SEO and meta tags' },
  { key: 'seoTitle', value: 'Trimurya Corporation', category: 'site', description: 'Default SEO title' },
  { key: 'seoDescription', value: 'Enterprise AI, technology, recruitment, HR, digital marketing, telecom, call center, and media services.', category: 'site', description: 'Default SEO description' },
  { key: 'seoKeywords', value: 'Trimurya Corporation, AI services, technology solutions, recruitment, HR services, digital marketing, telecom, call center, media services', category: 'site', description: 'Default SEO keywords' },
  { key: 'contactEmail', value: 'info@trimuryacorporation.in', category: 'contact', description: 'Primary contact email address' },
  { key: 'contactPhone', value: '+91 00000 00000', category: 'contact', description: 'Primary contact phone number' },
  { key: 'address', value: 'India', category: 'contact', description: 'Business address' },
  { key: 'linkedin', value: 'https://www.linkedin.com/', category: 'social', description: 'LinkedIn profile' },
  { key: 'facebook', value: 'https://www.facebook.com/', category: 'social', description: 'Facebook profile' },
  { key: 'instagram', value: 'https://www.instagram.com/', category: 'social', description: 'Instagram profile' }
];

const pageSeeds = [
  {
    title: 'About Trimurya Corporation',
    slug: 'about',
    summary: 'Learn about our mission, values, and how we help businesses grow with AI, technology, and talent.',
    seoTitle: 'About Trimurya Corporation',
    seoDescription: 'Learn about Trimurya Corporation, our mission, and how we help businesses grow.',
    seoKeywords: 'about Trimurya Corporation, AI company, technology services, business transformation',
    heroImage: '/hero-images/image01.svg',
    sections: [
      {
        type: 'hero',
        eyebrow: 'About Us',
        title: 'A partner for AI, technology, and business execution.',
        copy: 'We help organizations move faster with practical delivery, stronger systems, and an experienced team that understands business outcomes.',
        image: '/hero-images/image01.svg',
        primaryAction: { label: 'Contact Us', href: '/contact' },
        secondaryAction: { label: 'View Services', href: '/services' },
        metrics: [
          { value: '200+', label: 'Projects' },
          { value: '60+', label: 'Clients' },
          { value: '8+', label: 'Service Lines' },
          { value: '99%', label: 'Focus on Quality' }
        ]
      },
      {
        type: 'cards',
        eyebrow: 'What we do',
        title: 'Cross-functional teams for modern businesses',
        copy: 'We combine strategy and execution so clients can move from idea to outcome without juggling multiple vendors.',
        columns: 3,
        items: [
          { title: 'AI Delivery', copy: 'Structured project delivery for AI, automation, and product initiatives.', icon: 'FiCpu' },
          { title: 'Web Experience', copy: 'Fast, polished websites that support credibility and SEO.', icon: 'FiGlobe' },
          { title: 'Talent Solutions', copy: 'HR, recruitment, and operations support that helps teams scale.', icon: 'FiUsers' }
        ]
      },
      {
        type: 'content',
        eyebrow: 'Our approach',
        title: 'We keep execution simple and accountable',
        paragraphs: [
          'Every engagement starts with clarity: the goal, the timeline, the risks, and the people involved.',
          'From there we build a realistic roadmap, communicate progress, and keep the delivery moving with measurable checkpoints.'
        ]
      },
      {
        type: 'cta',
        eyebrow: 'Let us help',
        title: 'Need a partner who can execute?'
      }
    ]
  },
  {
    title: 'Contact Trimurya Corporation',
    slug: 'contact',
    summary: 'Reach out to discuss your next project, request a quote, or schedule a strategy call.',
    seoTitle: 'Contact Trimurya Corporation',
    seoDescription: 'Contact Trimurya Corporation to discuss your project or request a consultation.',
    seoKeywords: 'contact Trimurya Corporation, business enquiry, AI consultation, recruitment enquiry',
    heroImage: '/hero-images/image02.svg',
    sections: [
      {
        type: 'hero',
        eyebrow: 'Contact',
        title: 'Start the conversation with our team.',
        copy: 'Tell us what you are building and we will help shape the next steps.',
        image: '/hero-images/image02.svg',
        primaryAction: { label: 'Request Quote', href: '/request_quote' },
        secondaryAction: { label: 'Schedule Call', href: '/Schedule_Call' },
        metrics: [
          { value: '24-48h', label: 'Reply Time' },
          { value: 'Email', label: 'Primary Support' },
          { value: 'India', label: 'Global Delivery' },
          { value: 'Fast', label: 'Onboarding' }
        ]
      },
      {
        type: 'cards',
        eyebrow: 'Ways to reach us',
        title: 'Choose the channel that fits your team',
        columns: 3,
        items: [
          { title: 'Email', copy: 'Send your project details and we will respond with a next-step plan.', icon: 'FiMail' },
          { title: 'Call', copy: 'Book a live discussion for urgent or strategic opportunities.', icon: 'FiPhone' },
          { title: 'Form', copy: 'Use our request form for a structured brief and timeline.', icon: 'FiFileText' }
        ]
      },
      {
        type: 'cta',
        eyebrow: 'Next step',
        title: 'Tell us what you need and we will take it from there.',
        primaryAction: { label: 'Get Started', href: '/request_quote' },
        secondaryAction: { label: 'Open Support', href: '/Client_Support' }
      }
    ]
  },
  {
    title: 'Partner With Us',
    slug: 'partner_with_us',
    summary: 'Explore partnership models that create shared growth and delivery leverage.',
    seoTitle: 'Partner With Us | Trimurya Corporation',
    seoDescription: 'Discover Trimurya Corporation partnership models and co-growth opportunities.',
    seoKeywords: 'partner with us, strategic alliance, joint go-to-market, technology integration',
    heroImage: '/hero-images/image03.svg',
    sections: [
      {
        type: 'hero',
        eyebrow: 'Partnerships',
        title: 'Build growth together with a practical partnership model.',
        copy: 'We work with firms that want to co-sell, co-build, or extend delivery capacity without adding complexity.',
        image: '/hero-images/image03.svg',
        primaryAction: { label: 'Talk Partnerships', href: '/contact' },
        secondaryAction: { label: 'View Models', href: '/partner_with_us/models' }
      },
      {
        type: 'cards',
        eyebrow: 'Models',
        title: 'Ways we collaborate',
        columns: 3,
        items: [
          { title: 'Strategic Alliance', copy: 'Joint market positioning and shared growth targets.', icon: 'FiShield' },
          { title: 'Technology Integration', copy: 'Connect products and services for a smoother customer journey.', icon: 'FiCpu' },
          { title: 'Channel & Referral', copy: 'Expand reach with a simple revenue-sharing structure.', icon: 'FiTrendingUp' }
        ]
      }
    ]
  },
  {
    title: 'Request a Quote',
    slug: 'request_quote',
    summary: 'Request a tailored proposal and cost estimate for your upcoming project.',
    seoTitle: 'Request a Quote | Trimurya Corporation',
    seoDescription: 'Request a quote from Trimurya Corporation for your project or service need.',
    seoKeywords: 'request quote, proposal, pricing, Trimurya Corporation',
    heroImage: '/hero-images/image04.svg',
    sections: [
      {
        type: 'hero',
        eyebrow: 'Quote',
        title: 'Request a proposal that fits your scope and timeline.',
        copy: 'Share your requirements and we will come back with a practical delivery plan.',
        image: '/hero-images/image04.svg',
        primaryAction: { label: 'Contact Us', href: '/contact' },
        secondaryAction: { label: 'Schedule Call', href: '/Schedule_Call' }
      },
      {
        type: 'steps',
        eyebrow: 'Process',
        title: 'What happens next',
        items: [
          { step: '01', title: 'Share your brief', copy: 'Tell us the project size, goals, and preferred timeline.' },
          { step: '02', title: 'We review', copy: 'Our team maps the scope and identifies the best delivery plan.' },
          { step: '03', title: 'Proposal', copy: 'You receive a structured quote with milestones and next steps.' }
        ]
      }
    ]
  },
  {
    title: 'Schedule a Call',
    slug: 'Schedule_Call',
    summary: 'Book a direct call with our team to discuss your requirements.',
    seoTitle: 'Schedule a Call | Trimurya Corporation',
    seoDescription: 'Book a strategy call with Trimurya Corporation.',
    seoKeywords: 'schedule call, strategy call, consultation, Trimurya Corporation',
    heroImage: '/hero-images/image05.svg',
    sections: [
      {
        type: 'hero',
        eyebrow: 'Schedule',
        title: 'Book time with a senior advisor.',
        copy: 'Use the call to clarify goals, timing, and fit before committing to a larger engagement.',
        image: '/hero-images/image05.svg',
        primaryAction: { label: 'Contact Us', href: '/contact' }
      },
      {
        type: 'steps',
        eyebrow: 'Call flow',
        title: 'Simple and fast',
        items: [
          { step: '01', title: 'Confirm', copy: 'Choose a slot and submit the details.' },
          { step: '02', title: 'Prepare', copy: 'We review your project before the meeting.' },
          { step: '03', title: 'Discuss', copy: 'We talk through the plan and answer your questions.' }
        ]
      }
    ]
  },
  {
    title: 'Client Support',
    slug: 'Client_Support',
    summary: 'Client support, FAQs, and service resources in one place.',
    seoTitle: 'Client Support | Trimurya Corporation',
    seoDescription: 'Find client support resources, FAQs, and contact options.',
    seoKeywords: 'client support, faq, help desk, Trimurya Corporation',
    heroImage: '/hero-images/image06.svg',
    sections: [
      {
        type: 'hero',
        eyebrow: 'Support',
        title: 'Everything clients need in one place.',
        copy: 'Find the right support path, learn from FAQs, and reach the team quickly when needed.',
        image: '/hero-images/image06.svg',
        primaryAction: { label: 'Email Support', href: 'mailto:info@trimuryacorporation.in' },
        secondaryAction: { label: 'View FAQs', href: '/Client_Support/faq' }
      },
      {
        type: 'cards',
        eyebrow: 'Help options',
        title: 'Choose the support route that fits the issue',
        columns: 3,
        items: [
          { title: 'Email & Ticketing', copy: 'Track requests and keep a clean support history.', icon: 'FiMail' },
          { title: 'Dedicated Account Manager', copy: 'A named point of contact for client coordination.', icon: 'FiUsers' },
          { title: 'Escalation Desk', copy: 'Fast routing for urgent issues and priority matters.', icon: 'FiShield' }
        ]
      }
    ]
  },
  {
    title: 'Press & Media',
    slug: 'Press_Media',
    summary: 'Latest press releases, media kits, and company milestones.',
    seoTitle: 'Press & Media | Trimurya Corporation',
    seoDescription: 'Access press releases, media resources, and company updates.',
    seoKeywords: 'press media, press release, media kit, company news',
    heroImage: '/hero-images/image07.svg',
    sections: [
      {
        type: 'hero',
        eyebrow: 'Media',
        title: 'News, milestones, and media assets.',
        copy: 'Everything press teams need to cover our company and track what is happening next.',
        image: '/hero-images/image07.svg',
        primaryAction: { label: 'Media Kit', href: '/Press_Media/media-kit' }
      },
      {
        type: 'cards',
        eyebrow: 'Coverage',
        title: 'What is available',
        columns: 3,
        items: [
          { title: 'Press Releases', copy: 'Official announcements and company updates.', icon: 'FiFileText' },
          { title: 'Media Kit', copy: 'Brand assets, logos, and company facts.', icon: 'FiAward' },
          { title: 'Milestones', copy: 'A quick overview of key company milestones.', icon: 'FiTrendingUp' }
        ]
      }
    ]
  }
];

const serviceSeeds = [
  {
    title: 'AI Project Management',
    slug: 'ai-project-management',
    summary: 'Plan and deliver AI initiatives with clear milestones, governance, and measurable execution.',
    longDescription: 'We help teams turn AI ideas into structured programs with realistic timelines, visible ownership, and delivery discipline.',
    icon: 'FiCpu',
    items: ['Roadmapping', 'Governance', 'Stakeholders', 'Delivery'],
    features: [
      'AI program planning and milestone setup',
      'Delivery governance and accountability',
      'Stakeholder communication and reporting',
      'Risk tracking and dependency management'
    ],
    outcomes: ['Clear AI delivery roadmap', 'Better stakeholder alignment', 'Faster launch readiness', 'Lower delivery risk'],
    technologies: ['AI Planning', 'Agile Delivery', 'Operations', 'Automation'],
    related: ['website-development', 'cloud-solutions', 'cybersecurity']
  },
  {
    title: 'Website Development',
    slug: 'website-development',
    summary: 'Build fast, conversion-focused websites that support credibility, SEO, and lead generation.',
    longDescription: 'We design and develop modern websites that feel polished, load quickly, and give your business a strong digital presence.',
    icon: 'FiGlobe',
    items: ['UI/UX', 'Performance', 'SEO', 'Conversion'],
    features: [
      'Custom website design and development',
      'Mobile-first responsive layouts',
      'Technical SEO and structured metadata',
      'Performance optimization and accessibility'
    ],
    outcomes: ['Stronger first impression', 'Better search visibility', 'Higher conversion quality', 'Improved page speed'],
    technologies: ['React', 'Vite', 'SEO', 'Performance'],
    related: ['digital-marketing', 'ai-project-management', 'cloud-solutions']
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    summary: 'Create measurable growth with SEO, content, paid media, and conversion-led campaign planning.',
    longDescription: 'We unify SEO, content, and paid campaigns into one growth system so activity connects directly to traffic, leads, and revenue.',
    icon: 'FiTrendingUp',
    items: ['SEO', 'Content', 'Ads', 'Analytics'],
    features: [
      'SEO strategy and content planning',
      'Paid media and campaign optimization',
      'Analytics setup and conversion tracking',
      'Landing pages designed for lead capture'
    ],
    outcomes: ['Improved organic visibility', 'More qualified inbound leads', 'Clear campaign reporting', 'Better conversion flow'],
    technologies: ['SEO', 'Analytics', 'Paid Media', 'Content Strategy'],
    related: ['website-development', 'business-consultancy', 'mobile-app-development']
  },
  {
    title: 'Business Consultancy',
    slug: 'business-consultancy',
    summary: 'Turn strategy into execution with practical roadmaps, operating clarity, and transformation support.',
    longDescription: 'We help leadership teams simplify decision-making, organize priorities, and move from strategy slides to operating reality.',
    icon: 'FiBriefcase',
    items: ['Strategy', 'Operations', 'Growth', 'Execution'],
    features: [
      'Business transformation roadmaps',
      'Operating model and process mapping',
      'KPI design and performance tracking',
      'Leadership alignment and planning'
    ],
    outcomes: ['Clearer strategy execution', 'Reduced operational friction', 'Better owner alignment', 'Improved growth planning'],
    technologies: ['Process Mapping', 'KPI Design', 'Change Management', 'Planning'],
    related: ['ai-project-management', 'hr-consultancy', 'cloud-solutions']
  },
  {
    title: 'HR Consultancy',
    slug: 'hr-consultancy',
    summary: 'Build hiring, onboarding, and people operations that support team growth and performance.',
    longDescription: 'We help organizations improve hiring flow, workforce planning, and onboarding so teams can scale without losing clarity or culture.',
    icon: 'FiUsers',
    items: ['Hiring', 'Onboarding', 'Workforce', 'Culture'],
    features: [
      'Hiring workflow and role planning',
      'Candidate screening and selection support',
      'Onboarding and employee journey design',
      'Workforce planning and role clarity'
    ],
    outcomes: ['Faster hiring cycles', 'Cleaner onboarding', 'Better team coordination', 'More scalable HR operations'],
    technologies: ['Recruitment', 'HR Ops', 'Onboarding', 'Workforce Planning'],
    related: ['business-consultancy', 'mobile-app-development', 'cybersecurity']
  },
  {
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    summary: 'Design and ship mobile experiences that are fast, usable, and ready to support repeat engagement.',
    longDescription: 'We create mobile experiences that feel native, support retention, and turn complex workflows into simple user journeys.',
    icon: 'FiLayers',
    items: ['UX', 'Prototype', 'Build', 'Launch'],
    features: [
      'Mobile app strategy and UX planning',
      'Prototype and flow design',
      'Cross-platform development support',
      'Checkout, onboarding, and engagement features'
    ],
    outcomes: ['Better mobile engagement', 'Simpler user journeys', 'Higher conversion quality', 'Ready-for-launch builds'],
    technologies: ['React Native', 'UX', 'Payments', 'Analytics'],
    related: ['website-development', 'cloud-solutions', 'ai-project-management']
  },
  {
    title: 'Cloud Solutions',
    slug: 'cloud-solutions',
    summary: 'Design cloud foundations that are scalable, resilient, and aligned with business operations.',
    longDescription: 'We help organizations plan, migrate, and optimize cloud environments so they can improve reliability and support modern delivery.',
    icon: 'FiCloud',
    items: ['Migration', 'Architecture', 'Ops', 'Security'],
    features: [
      'Cloud architecture planning and assessment',
      'Migration support and environment setup',
      'Monitoring and reliability improvements',
      'Security, access, and governance setup'
    ],
    outcomes: ['More resilient infrastructure', 'Simpler scaling and support', 'Better cloud governance', 'Improved platform efficiency'],
    technologies: ['AWS', 'Cloud Architecture', 'DevOps', 'Security'],
    related: ['cybersecurity', 'website-development', 'ai-project-management']
  },
  {
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    summary: 'Strengthen digital trust with practical security planning, monitoring, and risk reduction.',
    longDescription: 'We help teams protect systems, reduce attack surface, and build a security posture that supports modern digital operations.',
    icon: 'FiShield',
    items: ['Risk', 'Access', 'Monitoring', 'Response'],
    features: [
      'Security review and risk assessment',
      'Access control and policy recommendations',
      'Monitoring and incident response planning',
      'Cloud and application hardening support'
    ],
    outcomes: ['Reduced security risk', 'Stronger access control', 'Better incident readiness', 'Improved trust posture'],
    technologies: ['Security', 'Monitoring', 'Governance', 'Cloud Hardening'],
    related: ['cloud-solutions', 'website-development', 'business-consultancy']
  }
];

const projectSeeds = [
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

const seedPage = async (page) => {
  await GenericContent.findOneAndUpdate(
    { type: 'pages', slug: page.slug },
    { ...page, type: 'pages', status: 'published' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

const seedSettings = async () => {
  for (const setting of siteSettings) {
    await Setting.findOneAndUpdate(
      { key: setting.key },
      setting,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
};

const seedProjects = async () => {
  for (const project of projectSeeds) {
    await GenericContent.findOneAndUpdate(
      { type: 'projects', slug: project.slug },
      { ...project, type: 'projects', status: 'published' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
};

const seedServices = async () => {
  for (const service of serviceSeeds) {
    await GenericContent.findOneAndUpdate(
      { type: 'services', slug: service.slug },
      { ...service, type: 'services', status: 'published' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
};

const runSeed = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB. Starting seed...');
    await seedAdmin();
    await seedSettings();
    for (const page of pageSeeds) {
      await seedPage(page);
    }
    await seedServices();
    await seedProjects();
    console.log('Seeding completed.');
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
};

runSeed();
