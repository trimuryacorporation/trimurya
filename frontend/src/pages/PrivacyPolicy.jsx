import { useState, useEffect } from 'react';
import { FiCheckCircle, FiClock, FiLock, FiMail, FiShield, FiUsers, FiX } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';
import heroBackground from '../assets/ai-hero.png';

const TABS = [
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'terms', label: 'Terms of Service' },
  { key: 'cookies', label: 'Cookie Policy' }
];

function PrivacyContent({ activeTab }) {
  if (activeTab === 'privacy') {
    return (
      <div className="space-y-10">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">1. Information We Collect</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Trimurya Corporation collects information you provide directly to us, such as when you fill out a contact form, request a quote, schedule a call, or communicate with our team. This may include your name, email address, phone number, company name, job title, and any other details you choose to provide.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits. This data helps us improve site performance, security, and user experience.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">2. How We Use Your Information</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            We use the information we collect to provide, maintain, and improve our services; to communicate with you about your inquiries, projects, and account activities; to send you relevant updates, proposals, and marketing communications (where permitted); and to comply with legal obligations.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              'Respond to service inquiries and support requests',
              'Deliver contracted services and manage client relationships',
              'Send product updates, industry insights, and event invitations',
              'Analyze usage patterns to improve digital experiences',
              'Prevent fraud, unauthorized access, and security incidents',
              'Comply with applicable laws and regulatory requirements'
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <FiCheckCircle className="mt-0.5 flex-shrink-0 text-secondary" size={18} />
                <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">3. Data Sharing and Disclosure</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our website, conducting business, or servicing you, provided they agree to keep this information confidential. We may also disclose information when required by law, to protect our rights or property, or to ensure the safety of our clients and team.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">4. Data Security and Retention</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            We implement industry-standard security measures, including encryption, access controls, and regular security audits, to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">5. Your Rights and Choices</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            You have the right to access, correct, or delete your personal data held by us. You may also object to or restrict certain processing activities, and request data portability where applicable. To exercise these rights, please contact us at privacy@trimuryacorporation.in. We will respond to your request within 30 days.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">6. Third-Party Services</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party services you interact with.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">7. Children&apos;s Privacy</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">8. Changes to This Policy</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a revised effective date.
          </p>
        </div>
      </div>
    );
  }

  if (activeTab === 'terms') {
    return (
      <div className="space-y-10">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">1. Acceptance of Terms</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            By accessing or using any service offered by Trimurya Corporation, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use our services.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">2. Services Overview</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Trimurya Corporation provides enterprise AI, technology, recruitment, HR, digital marketing, telecom, call center, and media solutions. All services are provided subject to the terms of individual service agreements, proposals, or statements of work executed between Trimurya Corporation and the client.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">3. User Obligations</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            You agree to use our services only for lawful purposes and in accordance with these terms. You must not attempt to gain unauthorized access to any portion of our services, interfere with the proper working of our systems, or engage in any activity that disrupts or damages our infrastructure.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              'Provide accurate and complete information when requested',
              'Maintain the confidentiality of account credentials',
              'Notify us promptly of any unauthorized use of your account',
              'Comply with all applicable laws and regulations',
              'Respect intellectual property rights of Trimurya and third parties',
              'Use our services in a manner consistent with professional standards'
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <FiCheckCircle className="mt-0.5 flex-shrink-0 text-secondary" size={18} />
                <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">4. Intellectual Property</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            All content, trademarks, logos, and intellectual property displayed on our website or provided as part of our services are the exclusive property of Trimurya Corporation or its licensors. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">5. Limitation of Liability</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            To the fullest extent permitted by law, Trimurya Corporation shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or in connection with your use of our services.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">6. Indemnification</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            You agree to indemnify and hold harmless Trimurya Corporation, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of our services or violation of these terms.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">7. Governing Law and Dispute Resolution</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            These terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these terms or our services shall be resolved through good-faith negotiation, and if necessary, through arbitration or the courts of competent jurisdiction in India.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">8. Changes to Terms</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of our services following the posting of revised terms constitutes your acceptance of the updated terms.
          </p>
        </div>
      </div>
    );
  }

  if (activeTab === 'cookies') {
    return (
      <div className="space-y-10">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">1. What Are Cookies</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and deliver relevant content. Cookies may be &quot;session&quot; cookies (deleted when you close your browser) or &quot;persistent&quot; cookies (retained for a set period).
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">2. How We Use Cookies</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Trimurya Corporation uses cookies to enhance your browsing experience, analyze site traffic, personalize content, and improve our services. We use cookies to remember your preferences, understand how you interact with our website, and ensure security.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">3. Types of Cookies We Use</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="pb-3 pr-4 font-black text-primary dark:text-white">Cookie Type</th>
                  <th className="pb-3 pr-4 font-black text-primary dark:text-white">Purpose</th>
                  <th className="pb-3 font-black text-primary dark:text-white">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-700 dark:text-slate-200">Essential</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">Required for core website functionality, security, and accessibility.</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">Session</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-700 dark:text-slate-200">Performance</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">Collect anonymous data about site usage to help us improve performance.</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">Persistent</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-700 dark:text-slate-200">Functional</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">Remember your preferences, settings, and personalization choices.</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">Persistent</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-700 dark:text-slate-200">Marketing</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">Deliver relevant content and measure the effectiveness of campaigns.</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">Persistent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">4. Managing Cookies</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Most web browsers allow you to manage cookies through their settings. You can set your browser to refuse cookies, alert you when cookies are being sent, or delete existing cookies. Please note that disabling certain cookies may impact the functionality and performance of our website.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            For more information on how to manage cookies in specific browsers, visit:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><span className="font-semibold">Google Chrome:</span> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
            <li><span className="font-semibold">Mozilla Firefox:</span> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
            <li><span className="font-semibold">Safari:</span> Preferences &gt; Privacy &gt; Cookies and website data</li>
            <li><span className="font-semibold">Microsoft Edge:</span> Settings &gt; Cookies and site permissions</li>
          </ul>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-2xl font-black text-primary dark:text-white">5. Updates to This Policy</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            We may update this Cookie Policy periodically to reflect changes in technology, legislation, or our data practices. We encourage you to review this page regularly to stay informed about our use of cookies.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default function PrivacyPolicy() {
  const [activeTab, setActiveTab] = useState('privacy');
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.section;
            setVisibleSections(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden bg-primary" data-section="hero">
        <div className="absolute inset-0">
          <img src={heroBackground} alt="Privacy and security" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(242,178,24,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,122,18,0.08),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <FiShield className="text-secondary" size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Legal & Compliance</span>
            </div>
            <h1 className="mt-8 text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
              Privacy, Transparency & Trust
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-200 md:text-lg lg:text-xl">
              At Trimurya Corporation, we are committed to protecting your privacy, being transparent about our practices, and handling your data with the highest standards of security and integrity.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {[
                { icon: FiLock, label: 'Enterprise-Grade Security' },
                { icon: FiShield, label: 'GDPR & SOC 2 Aligned' },
                { icon: FiCheckCircle, label: 'Transparent Practices' }
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <badge.icon className="text-secondary" size={18} />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <FiClock size={14} />
            <span>Last updated: July 25, 2026</span>
            <span className="hidden sm:inline">|</span>
            <span>Effective date: July 25, 2026</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-[73px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95" data-section="tabs">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap rounded-lg px-5 py-3 text-sm font-bold transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/25'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24" data-section="content">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 rounded-[32px] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
              <div>
                <h2 className="text-3xl font-black text-primary dark:text-white lg:text-4xl">
                  {TABS.find((t) => t.key === activeTab)?.label}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {activeTab === 'privacy'
                    ? 'Learn how Trimurya Corporation collects, uses, and protects your personal information. We are committed to transparency and the highest standards of data protection.'
                    : activeTab === 'terms'
                    ? 'Understand the terms and conditions governing your use of Trimurya Corporation services. Please read these terms carefully before engaging with us.'
                    : 'Discover how we use cookies and similar technologies to enhance your experience, improve our services, and protect your privacy.'}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { icon: FiLock, text: 'Encrypted Data' },
                    { icon: FiUsers, text: 'User Controlled' },
                    { icon: FiShield, text: 'Compliant' }
                  ].map((item) => (
                    <span key={item.text} className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary dark:bg-secondary/20">
                      <item.icon size={12} />
                      {item.text}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[28px] shadow-2xl">
                <img src={heroBackground} alt="Enterprise security" className="h-[280px] w-full object-cover lg:h-[320px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-8 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Our Commitment</p>
                  <p className="mt-3 text-lg font-black lg:text-xl">
                    {activeTab === 'privacy'
                      ? 'Your data is protected with enterprise-grade security and handled with complete transparency.'
                      : activeTab === 'terms'
                      ? 'Clear, fair terms designed to protect both parties and foster long-term partnerships.'
                      : 'Respectful use of technology to enhance your experience while safeguarding your choices.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <PrivacyContent activeTab={activeTab} />

          {/* Key Points Summary */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeTab === 'privacy' && [
              { icon: FiShield, title: 'Data Protection', copy: 'We implement robust security controls to safeguard your personal information from unauthorized access, alteration, or disclosure.' },
              { icon: FiUsers, title: 'User Control', copy: 'You retain full control over your personal data. You can request access, correction, or deletion at any time.' },
              { icon: FiLock, title: 'Encryption', copy: 'All sensitive data is encrypted in transit and at rest using industry-standard protocols and best practices.' }
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-lg dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-black text-primary dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.copy}</p>
              </div>
            ))}
            {activeTab === 'terms' && [
              { icon: FiCheckCircle, title: 'Fair Agreements', copy: 'Every engagement is governed by clear, mutually agreed-upon terms that define scope, deliverables, and expectations.' },
              { icon: FiShield, title: 'Mutual Protection', copy: 'Our terms are designed to protect both Trimurya Corporation and our clients, ensuring a balanced and fair relationship.' },
              { icon: FiUsers, title: 'Ethical Standards', copy: 'We operate with the highest ethical standards, respecting intellectual property, confidentiality, and professional conduct.' }
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-lg dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-black text-primary dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.copy}</p>
              </div>
            ))}
            {activeTab === 'cookies' && [
              { icon: FiLock, title: 'Minimal Collection', copy: 'We only use cookies that are necessary for website functionality, performance, and delivering relevant experiences.' },
              { icon: FiUsers, title: 'Your Choices', copy: 'You have full control over cookies through your browser settings. Essential cookies cannot be disabled.' },
              { icon: FiCheckCircle, title: 'No Hidden Tracking', copy: 'We are transparent about every cookie we use. We do not deploy hidden tracking mechanisms or third-party surveillance.' }
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-lg dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-black text-primary dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-28" data-section="cta">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,178,24,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,122,18,0.1),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <FiMail className="text-secondary" size={16} />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Questions or Concerns</span>
          </div>
          <h2 className="mt-8 text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
            We&apos;re here to help
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
            If you have any questions about our privacy practices, terms of service, or cookie policy, our team is ready to assist you. Your trust is our highest priority.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" className="bg-secondary shadow-2xl shadow-secondary/30 hover:bg-secondary/80 hover:shadow-secondary/50 text-base px-8 py-4">
              Contact Our Team
            </Button>
            <Button to="mailto:privacy@trimuryacorporation.in" variant="ghost" className="border-white/20 bg-white/10 text-white hover:bg-white/20 text-base px-8 py-4">
              Email Privacy Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
