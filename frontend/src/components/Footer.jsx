import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowUp,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiUsers,
  FiGlobe,
  FiAward
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube, FaWhatsapp, FaGithub } from 'react-icons/fa6';
import TextLogo from './TextLogo.jsx';
import Button from './Button.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import { DEFAULT_SOCIAL_LINKS } from '../utils/seo.js';

const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'AI Project Management', href: '/services/ai-project-management' },
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Business Consultancy', href: '/services/business-consultancy' },
      { label: 'HR & Recruitment', href: '/services/hr-consultancy' },
      { label: 'Mobile App Development', href: '/services/mobile-app-development' },
      { label: 'Cloud Solutions', href: '/services/cloud-solutions' },
      { label: 'Cybersecurity', href: '/services/cybersecurity' }
    ]
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Process', href: '/careers/process' },
      { label: 'Open Positions', href: '/careers/open-positions' },
      { label: 'Case Studies', href: '/case_studies' },
      { label: 'Blog & Insights', href: '/blog' },
      { label: 'Industries', href: '/industries' },
      { label: 'Marketplace', href: '/marketplace' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'Partner With Us', href: '/partner_with_us' },
      { label: 'Request a Quote', href: '/request_quote' },
      { label: 'Schedule a Call', href: '/Schedule_Call' },
      { label: 'Client Support', href: '/Client_Support' },
      { label: 'Press & Media', href: '/Press_Media' }
    ]
  }
];

const defaultSocialLinks = [
  { label: 'LinkedIn', icon: FaLinkedinIn, href: DEFAULT_SOCIAL_LINKS.linkedin, key: 'linkedin' },
  { label: 'Twitter', icon: FaXTwitter, href: '#', key: 'twitter' },
  { label: 'Facebook', icon: FaFacebookF, href: '#', key: 'facebook' },
  { label: 'YouTube', icon: FaYoutube, href: '#', key: 'youtube' },
  { label: 'Instagram', icon: FaInstagram, href: DEFAULT_SOCIAL_LINKS.instagram, key: 'instagram' },
  { label: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/910000000000', key: 'whatsapp' },
  { label: 'GitHub', icon: FaGithub, href: '#', key: 'github' }
];

const trustBadges = [
  { label: 'ISO 27001', icon: FiShield },
  { label: 'SOC 2', icon: FiAward },
  { label: 'AWS Partner', icon: FiGlobe },
  { label: 'GDPR Ready', icon: FiUsers }
];

const footerStats = [
  { value: '7+', label: 'Years of Excellence' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '60+', label: 'Enterprise Clients' },
  { value: '99%', label: 'Client Satisfaction' }
];

function FooterLink({ children, to }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 text-[13px] font-semibold leading-6 text-slate-400 transition-colors duration-300 hover:text-secondary"
    >
      {children}
      <FiArrowRight size={10} className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  );
}

export default function Footer() {
  const settings = useSettings();
  const contactEmail = settings.contactEmail || 'info@trimuryacorporation.in';
  const contactPhone = settings.contactPhone || '+91 00000 00000';
  const address = settings.address || 'India';
  const siteName = settings.siteName || 'Trimurya Corporation';
  const social = settings.social || {};

  const socialLinks = defaultSocialLinks.map((s) => {
    const handle = social[s.key];
    if (s.key === 'whatsapp') return s;
    if (handle) return { ...s, href: handle.startsWith('http') ? handle : `https://${handle}` };
    return s;
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-slate-900 to-transparent" />
      <div className="relative bg-slate-900">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(242,178,24,1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,178,24,1) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-10 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex shrink-0 items-center w-[180px] sm:w-[220px]">
                <img
                  src="/assets/trimurya-logo-vector.svg"
                  alt={siteName}
                  className="block h-auto w-full object-contain brightness-0 invert"
                  decoding="async"
                />
              </Link>
              <p className="mt-6 text-[13px] leading-7 text-slate-400">
                A multi-service enterprise partner unifying <span className="text-slate-300">AI</span>, <span className="text-slate-300">web</span>, <span className="text-slate-300">cloud</span>, <span className="text-slate-300">talent</span>, and <span className="text-slate-300">strategy</span> under one platform. We help businesses move faster, scale smarter, and compete with confidence.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-2.5">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <span key={badge.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-slate-400 transition-colors hover:border-secondary/30 hover:text-secondary">
                      <Icon size={11} />
                      {badge.label}
                    </span>
                  );
                })}
              </div>
              <div className="mt-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Follow Us</p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    if (social.key !== 'whatsapp' && !social.href?.startsWith('http')) return null;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-slate-400 transition-all duration-300 hover:border-secondary/40 hover:bg-secondary hover:text-white"
                      >
                        <Icon size={14} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary mb-5">Navigation</h4>
              <div className="grid gap-3">
                {footerColumns[0].links.map((link) => (
                  <FooterLink key={link.label} to={link.href}>{link.label}</FooterLink>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-5">Quick Links</h4>
              <div className="grid gap-3">
                {footerColumns[1].links.map((link) => (
                  <FooterLink key={link.label} to={link.href}>{link.label}</FooterLink>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-5">Company</h4>
              <div className="grid gap-3">
                {footerColumns[2].links.map((link) => (
                  <FooterLink key={link.label} to={link.href}>{link.label}</FooterLink>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-5">Contact</h4>
              <div className="grid gap-4">
                <a href={`mailto:${contactEmail}`} className="group flex items-start gap-3 text-[13px] text-slate-400 transition-colors hover:text-secondary">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <FiMail size={13} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-300 transition-colors group-hover:text-secondary">{contactEmail}</p>
                    <p className="text-[11px] text-slate-500">Email us anytime</p>
                  </div>
                </a>
                <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="group flex items-start gap-3 text-[13px] text-slate-400 transition-colors hover:text-secondary">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <FiPhone size={13} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-300 transition-colors group-hover:text-secondary">{contactPhone}</p>
                    <p className="text-[11px] text-slate-500">Mon-Fri, 9am-6pm IST</p>
                  </div>
                </a>
                <div className="flex items-start gap-3 text-[13px] text-slate-400">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <FiMapPin size={13} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-300">{address}</p>
                    <p className="text-[11px] text-slate-500">Serving clients globally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid grid-cols-2 gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm md:grid-cols-4 lg:gap-8 lg:p-8">
            {footerStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl font-black text-secondary md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <p className="text-[12px] text-slate-500">
                &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-300">{siteName}</span>. All rights reserved.
              </p>
              <p className="text-[11px] text-slate-600">
                Create. Preserve. Transform.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <Link
                  key={link}
                  to="/privacy-policy"
                  className="text-[12px] text-slate-500 transition-colors hover:text-secondary"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <motion.button
        type="button"
        onClick={scrollToTop}
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="focus-ring fixed bottom-8 right-8 z-50 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white shadow-2xl shadow-accent/30 transition-all duration-300 hover:bg-accent hover:shadow-accent/50"
        aria-label="Back to top"
      >
        <FiArrowUp size={18} />
      </motion.button>
    </footer>
  );
}
