import { Outlet, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiMenu, FiX, FiChevronDown, FiCircle, FiGlobe, FiDatabase, FiCpu, FiServer, FiLayers, FiCloud } from 'react-icons/fi';
import { resolveIcon } from '../utils/iconResolver.js';
import Button from '../components/Button.jsx';

import TextLogo from '../components/TextLogo.jsx';
import Footer from '../components/Footer.jsx';
import { fetchPublished } from '../services/contentApi.js';
import SeoHead from '../components/SeoHead.jsx';

const iconNameMap = {
  'Services': 'FiLayers',
  'Industries': 'FiGlobe',
  'Projects': 'FiBriefcase',
  'Pricing': 'FiServer',
  'Our Company': 'FiGlobe',
};

function serviceSlug(title) {
  return title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const marketplaceLinks = [
  {
    label: 'AI Data',
    href: '#ai-data',
    submenu: [
      { label: 'Custom Data Sourcing', href: 'muryaai-training-data/ai-data-collection-services/', subtitle: 'Build Custom Datasets.' },
      { label: 'Data Annotation & Enhancement', href: 'muryaai-training-data/ai-data-annotation-services/', subtitle: 'Label and refine data.' },
      { label: 'Data Validation', href: 'muryaai-training-data/ai-data-validation-services', subtitle: 'Strengthen data quality.' },
      { label: 'RLHF', href: 'muryaai-training-data/rlhf/', subtitle: 'Enhance AI accuracy.' },
      { label: 'Data Licensing', href: 'muryaai-training-data/data-licensing/', subtitle: 'Access premium datasets effortlessly.' },
      { label: 'Crowd as a Service', href: 'muryaai-training-data/crowd-as-a-service/', subtitle: 'Scalable with global data.' }
    ]
  },
  {
    label: 'Build AI',
    href: '#build-ai',
    submenu: [
      { label: 'AI Agents', href: 'muryabuild-ai/ai-agents/', subtitle: 'Deploy intelligent AI assistants.' },
      { label: 'AI Digital Transformation', href: 'muryabuild-ai/ai-digital-transformation/', subtitle: 'Automate business growth.' },
      { label: 'Talent Augmentation', href: 'muryabuild-ai/talent-augmentation/', subtitle: 'Scale with AI expertise.' },
      { label: 'Model Evaluation', href: 'muryabuild-ai/model-evaluation/', subtitle: 'Assess and refine AI models.' }
    ]
  },
  {
    label: 'Solutions',
    href: '#solutions',
    submenu: [
      { heading: 'Use Cases', items: [
          { label: 'Computer Vision', href: 'muryause-cases/computer-vision-services-and-solutions/', subtitle: 'Detect, classify and analyze images.' },
          { label: 'Conversational AI', href: 'muryause-cases/conversational-ai-services-and-solutions/', subtitle: 'Enable smart human-like interactions.' },
          { label: 'Natural Language Processing (NLP)', href: 'muryause-cases/natural-language-processing-solutions/', subtitle: 'Decode and process language.' },
          { label: 'Sensor Fusion', href: 'muryause-cases/sensor-fusion-lidar/', subtitle: 'Integrate and enhance sensor data.' },
          { label: 'Generative AI', href: 'muryause-cases/generative-ai-services/', subtitle: 'Create AI-powered content.' },
          { label: 'Healthcare AI', href: 'muryause-cases/healthcare-ai-and-nlp-solutions/', subtitle: 'Get medical analysis with AI.' },
          { label: 'ADAS', href: 'muryause-cases/adas-training-data/', subtitle: 'Power advanced driver assistance.' }
        ]
      },
      { heading: 'Industries', items: [
          { label: 'Automotive', href: 'muryaindustries/automotive/', subtitle: 'Integrate AI for safer, smarter driving.' },
          { label: 'Healthcare', href: 'muryaindustries/healthcare/', subtitle: 'Power diagnostics with cutting-edge AI.' },
          { label: 'Retail/E-Commerce', href: 'muryaindustries/retail-e-commerce/', subtitle: 'Personalize shopping with AI intelligence.' },
          { label: 'AR/VR', href: 'muryaindustries/ar-vr/', subtitle: 'Build immersive experiences.' },
          { label: 'Geospatial', href: 'muryaindustries/geospatial/', subtitle: 'Map, track, and optimize locations.' },
          { label: 'Banking & Finance', href: 'muryaindustries/banking-finance/', subtitle: 'Automate risk, fraud, and transactions.' },
          { label: 'Defense', href: 'muryaindustries/defense/', subtitle: 'Strengthen national security with AI.' }
        ]
      },
      { heading: 'Capabilities', items: [
          { label: 'Managed Model Generation', href: 'muryacapabilities/ai-model-generation/', subtitle: 'Develop AI models built for you.' },
          { label: 'Model Validation', href: 'muryacapabilities/ai-model-validation/', subtitle: 'Test, improve, and optimize AI.' },
          { label: 'Enterprise AI', href: 'muryacapabilities/enterprise-ai-solutions/', subtitle: 'Scale business with AI-driven solutions.' },
          { label: 'Generative AI & LLM Augmentation', href: 'muryacapabilities/generative-ai-llm-augmentation/', subtitle: 'Boost AI’s creative potential.' },
          { label: 'Sensor Data Collection', href: 'muryacapabilities/sensor-data-collection/', subtitle: 'Capture real-time data insights.' },
          { label: 'Autonomous Vehicle', href: 'muryacapabilities/autonomous-vehicle/', subtitle: 'Train AI for self-driving efficiency.' }
        ]
      }
    ]
  },
  {
    label: 'Products',
    href: '#products',
    submenu: [
      { label: 'Data Marketplace', href: 'muryaproducts/data-marketplace/', subtitle: 'Explore premium AI-ready datasets.' },
      { label: 'Annotation Tool', href: 'muryaproducts/annotation-tool/', subtitle: 'Label data with precision and ease.' },
      { label: 'RLHF Tool', href: 'muryaproducts/rlhf-tool/', subtitle: 'Train AI with real human feedback.' },
      { label: 'Transcription Tool', href: 'muryaproducts/transcription-tool/', subtitle: 'Convert speech into flawless text.' }
    ]
  },
  { label: 'Pricing', href: '#', external: true },
  { label: 'Our Company', href: '#our-company' }
];

export default function MainLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMarketplace = location.pathname === '/marketplace' || location.pathname.startsWith('/marketplace/');

  const navLinks = [
    { label: 'Home', path: '/', icon: 'FiHome' },
    { label: 'About', path: '/about', icon: 'FiUsers' },
    { label: 'Services', path: '#services', icon: 'FiLayers' },
    { label: 'Industries', path: '#industries', icon: 'FiGlobe' },
    { label: 'Projects', path: '/projects', icon: 'FiFolder' },
  ];

  const navDropdowns = {
    Services: services.map((service) => ({ label: service.title, href: `/services/${serviceSlug(service.title)}`, icon: service.icon || 'FiLayers' })),
    Industries: industries.slice(0, 8).map((industry, index) => ({ label: industry.title, href: '/industries', icon: industry.icon || ['FiActivity', 'FiCloud', 'FiCpu', 'FiShield', 'FiTarget', 'FiTrendingUp', 'FiFilm', 'FiHeadphones'][index] })),
    Projects: [
      { label: 'AI Delivery Rollout', href: '/projects', icon: 'FiCpu' },
      { label: 'Service Website Redesign', href: '/projects', icon: 'FiGlobe' },
      { label: 'Digital Growth Engine', href: '/projects', icon: 'FiTrendingUp' },
      { label: 'Digital Transformation', href: '/projects', icon: 'FiBriefcase' },
      { label: 'HR Transformation', href: '/projects', icon: 'FiUsers' },
      { label: 'Retail Mobile App', href: '/projects', icon: 'FiLayers' }
    ]
  };

  useEffect(() => {
    Promise.all([fetchPublished('services'), fetchPublished('industries')])
      .then(([s, i]) => { setServices(s); setIndustries(i); });
  }, []);

  const toggleDropdown = (label) => setOpenDropdown((current) => (current === label ? null : label));

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 0);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const current = window.scrollY;
          if (current > lastScrollY && current > 100) {
            setHeaderVisible(false);
          } else if (current < lastScrollY) {
            setHeaderVisible(true);
          }
          setLastScrollY(current);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const iconMap = {
    'AI Data': 'FiDatabase',
    'Build AI': 'FiCpu',
    'Solutions': 'FiLayers',
    'Products': 'FiCloud',
    'Pricing': 'FiServer',
    'Our Company': 'FiGlobe',
  };

  return (
    <div className="min-h-screen bg-surface text-primary dark:bg-slate-950 dark:text-white">
      <SeoHead pathname={location.pathname} />
      <header className={`sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85 transition-transform duration-300 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 lg:px-8">
          <TextLogo compact />
          {!isMarketplace ? (
            <>
              <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
                {navLinks.map((link) => {
                  const hasDropdown = link.path.startsWith('#') && link.label in navDropdowns;

                  if (hasDropdown) {
                    return (
                      <div
                          key={link.path}
                          className="relative"
                          onMouseEnter={() => setOpenDropdown(link.label)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                        <Link
                          to={link.path}
                          onClick={(e) => e.preventDefault()}
                          onMouseEnter={() => setOpenDropdown(link.label)}
                          onFocus={() => setOpenDropdown(link.label)}
                          className="rounded-lg px-3 py-2 text-sm font-medium transition inline-flex items-center gap-1.5 text-slate-600 hover:text-[#061D5C] dark:text-slate-300"
                        >
                          {link.icon && (() => { const Icon = resolveIcon(link.icon); return <Icon size={16} />; })()}
                          {link.label.toUpperCase()}
                        </Link>

                        {openDropdown === link.label && (
                          <div
                            onMouseEnter={() => setOpenDropdown(link.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                            className="absolute top-full left-1/2 mt-3 w-[520px] max-w-[92vw] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,.15)] dark:border-slate-800 dark:bg-slate-950 z-50"
                          >
                            <div className="mb-4 border-b border-slate-100 pb-3">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">{link.label}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {navDropdowns[link.label].map((item) => {
                                const ItemIcon = resolveIcon(item.icon);
                                return (
                                  <Link
                                    key={item.label}
                                    to={item.href}
                                    onClick={() => setOpenDropdown(null)}
                                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-secondary dark:text-slate-200 dark:hover:bg-slate-900"
                                  >
                                    {ItemIcon && (
                                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-secondary group-hover:text-white dark:bg-slate-800 dark:text-slate-400">
                                        <ItemIcon size={16} />
                                      </span>
                                    )}
                                    <span className="leading-tight">{item.label}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="group relative flex items-center gap-2 px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 text-slate-600 hover:text-[#061D5C]"
                    >
                      {link.icon && (() => {
                        const Icon = resolveIcon(link.icon);
                        return (
                          <Icon
                            size={15}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                        );
                      })()}

                      <span>{link.label}</span>

                      <span className="absolute bottom-0 left-3 h-[2px] w-0 bg-yellow-500 transition-all duration-300 group-hover:w-[calc(100%-24px)]"></span>
                    </Link>
                  );
                })}
              </nav>
              <div className="flex shrink-0 items-center gap-2">
                <Button to="/marketplace" variant="ghost" className="hidden md:inline-flex">AI Data Marketplace</Button>
                <Button to="/contact" className="hidden md:inline-flex">Get Started</Button>
                <button className="focus-ring p-3 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open navigation">
                  {open ? <FiX /> : <FiMenu />}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="hidden flex-1 items-center justify-center gap-2 lg:flex">
                {marketplaceLinks.map((item) => {
                  const isGrouped = Array.isArray(item.submenu) && item.submenu.length > 0 && item.submenu[0]?.heading;
                  const description = item.label === 'AI Data'
                    ? 'High-quality compliant training data optimized for enterprise AI workflows.'
                    : item.label === 'Build AI'
                      ? 'Modern AI development, evaluation, and deployment tools built for scale.'
                      : item.label === 'Products'
                        ? 'Enterprise-grade products for annotation, transcription, RLHF and model tooling.'
                        : null;

                  const TopIcon = resolveIcon(iconMap[item.label]);

                  return (
                    <div key={item.label} className="relative">
                      <button
                        type="button"
                        onClick={() => toggleDropdown(item.label)}
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em]"
                      >
                        {TopIcon && <TopIcon className="h-4 w-4 text-slate-500" />}
                        <span className="ml-1">{item.label}</span>
                        {item.submenu ? <FiChevronDown className="h-3 w-3 text-slate-500 transition group-hover:text-secondary" /> : null}
                      </button>

                      {item.submenu && openDropdown === item.label && (
                        <div
                            onMouseEnter={() => setOpenDropdown(item.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                            className="
                              fixed
                              top-[78px]
                              left-1/2
                              -translate-x-1/2
                              z-[9999]
                              w-[980px]
                              max-w-[92vw]
                              rounded-[26px]
                              border
                              border-slate-200
                              bg-white
                              p-6
                              shadow-[0_25px_70px_rgba(15,23,42,.15)]
                              max-h-[65vh]
                              overflow-y-auto
                              pr-4
                              marketplace-dropdown
                            "
                          >
                          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                            <div className="max-w-2xl">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{item.label}</p>
                              {description && <p className="mt-3 text-[13px] leading-6 text-slate-600">{description}</p>}
                            </div>
                          </div>

                          {isGrouped ? (
                            <div className="mt-6 grid gap-5 md:grid-cols-3">
                              {item.submenu.map((group) => (
                                <div key={group.heading}>
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">{group.heading}</p>
                                  <div className="mt-4 space-y-3">
                                            {group.items.map((link) => (
                                              <a
                                                key={link.label}
                                                href={link.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group flex items-start gap-3 rounded-3xl bg-slate-50 px-4 py-4 transition hover:bg-white"
                                              >
                                                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                                  <FiCircle className="h-4 w-4" />
                                                </span>
                                                <div>
                                                  <p className="text-[14px] font-semibold text-slate-950 transition group-hover:text-secondary">{link.label}</p>
                                                  <p className="mt-1 text-xs leading-5 text-slate-500">{link.subtitle}</p>
                                                </div>
                                              </a>
                                            ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                              {item.submenu.map((link) => (
                                <a
                                  key={link.label}
                                  href={link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group flex items-center gap-3 rounded-[1.25rem] bg-slate-50 px-4 py-3 transition hover:bg-white"
                                >
                                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                    <FiCircle className="h-4 w-4" />
                                  </span>
                                  <div>
                                    <p className="text-[14px] font-semibold text-slate-950 transition group-hover:text-secondary">{link.label}</p>
                                    <p className="mt-1 text-xs leading-5 text-slate-500">{link.subtitle}</p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button to="/contact" className="hidden md:inline-flex">Get Started</Button>
                <button className="focus-ring p-3 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open navigation">
                  {open ? <FiX /> : <FiMenu />}
                </button>
              </div>
            </>
          )}
        </div>
         {open && (
           <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
             {isMarketplace ? (
               marketplaceLinks.map((item) => (
                 <a
                   key={item.label}
                   href={item.href}
                   target={item.external ? '_blank' : undefined}
                   rel={item.external ? 'noreferrer' : undefined}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 dark:text-slate-200"
                   onClick={() => setOpen(false)}
                 >
                   {item.label.toUpperCase()}
                 </a>
               ))
              ) : (
                <>
                  {navLinks.map((link) => {
                    const hasDropdown = link.path.startsWith('#') && link.label in navDropdowns;
                    if (hasDropdown && openDropdown !== link.label) {
                      return (
                        <button
                          key={link.path}
                          type="button"
                          onClick={() => setOpenDropdown(link.label)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-700 dark:text-slate-200"
                        >
                          <span className="flex items-center gap-2">
                            {link.icon && (() => { const Icon = resolveIcon(link.icon); return <Icon size={18} />; })()}
                            {link.label.toUpperCase()}
                          </span>
                          <FiChevronDown size={16} />
                        </button>
                      );
                    }
                    if (hasDropdown && openDropdown === link.label) {
                      return (
                        <div key={link.path}>
                          <button
                            type="button"
                            onClick={() => setOpenDropdown(null)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-secondary"
                          >
                            <span className="flex items-center gap-2">
                              {link.icon && (() => { const Icon = resolveIcon(link.icon); return <Icon size={18} />; })()}
                              {link.label.toUpperCase()}
                            </span>
                            <FiChevronDown size={16} className="rotate-180" />
                          </button>
                          <div className="ml-4 mt-1 space-y-1">
                            {navDropdowns[link.label].map((item) => {
                              const ItemIcon = resolveIcon(item.icon);
                              return (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  onClick={() => { setOpen(false); setOpenDropdown(null); }}
                                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300"
                                >
                                  {ItemIcon && <ItemIcon size={16} />}
                                  {item.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <Link key={link.path} to={link.path} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                        {link.icon && (() => { const Icon = resolveIcon(link.icon); return <Icon size={18} />; })()}
                        {link.label.toUpperCase()}
                      </Link>
                    );
                  })}
                </>
              )}
           </div>
         )}
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />

    </div>
  );
}
