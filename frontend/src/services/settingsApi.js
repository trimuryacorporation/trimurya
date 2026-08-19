import api from './api.js';
import config from '../config/index.js';
import { DEFAULT_SOCIAL_LINKS } from '../utils/seo.js';

export async function fetchSettings(category = null) {
  const params = category ? { category } : {};
  const { data } = await api.get('/settings', { params });
  return data.data || {};
}

export async function fetchSetting(key) {
  const { data } = await api.get(`/settings/${encodeURIComponent(key)}`);
  return data.data || null;
}

export async function updateSetting(key, value, category = 'general', description = '') {
  const { data } = await api.put('/settings', { key, value, category, description });
  return data.data || null;
}

export async function bulkUpdateSettings(settingsArray) {
  const { data } = await api.post('/settings/bulk', { settings: settingsArray });
  return data.data || [];
}

export async function deleteSetting(key) {
  const { data } = await api.delete(`/settings/${encodeURIComponent(key)}`);
  return data.data || null;
}

export async function fetchSiteSettings() {
  try {
    const [siteSettings, contactSettings, socialSettings] = await Promise.all([
      fetchSettings('site'),
      fetchSettings('contact'),
      fetchSettings('social')
    ]);
    const settings = { ...siteSettings, ...contactSettings, ...socialSettings };
    return {
      siteName: settings.siteName || 'Trimurya Corporation',
      siteUrl: settings.siteUrl || 'https://www.trimuryacorporation.in',
      siteDescription: settings.siteDescription || 'Trimurya Corporation delivers enterprise AI, technology, recruitment, HR, digital marketing, telecom, call center, and media solutions for business growth.',
      contactEmail: settings.contactEmail || 'collab@trimuryacorporation.in',
      contactPhone: settings.contactPhone || '+91 00000 00000',
      address: settings.address || 'India',
      social: {
        linkedin: settings.linkedin || DEFAULT_SOCIAL_LINKS.linkedin,
        twitter: settings.twitter || '',
        facebook: settings.facebook || '',
        instagram: settings.instagram || DEFAULT_SOCIAL_LINKS.instagram
      },
      seo: {
        title: settings.seoTitle || settings.siteName || 'Trimurya Corporation',
        description: settings.seoDescription || settings.siteDescription || '',
        keywords: settings.seoKeywords || ''
      }
    };
  } catch {
    return {
      siteName: 'Trimurya Corporation',
      siteUrl: 'https://www.trimuryacorporation.in',
      siteDescription: 'Trimurya Corporation delivers enterprise AI, technology, recruitment, HR, digital marketing, telecom, call center, and media solutions for business growth.',
      contactEmail: 'collab@trimuryacorporation.in',
      contactPhone: '+91 00000 00000',
      address: 'India',
      social: DEFAULT_SOCIAL_LINKS,
      seo: { title: 'Trimurya Corporation', description: '', keywords: '' }
    };
  }
}

export async function persistSettings(state) {
  const settingsToUpdate = [
    { key: 'siteName', value: state.siteName, category: 'site', description: 'Website name displayed in header and SEO' },
    { key: 'siteUrl', value: state.siteUrl, category: 'site', description: 'Primary website URL' },
    { key: 'siteDescription', value: state.siteDescription, category: 'site', description: 'Site description for SEO and meta tags' },
    { key: 'contactEmail', value: state.contactEmail, category: 'contact', description: 'Primary contact email address' },
    { key: 'contactPhone', value: state.contactPhone, category: 'contact', description: 'Primary contact phone number' },
    { key: 'address', value: state.address, category: 'contact', description: 'Business address' }
  ];
  
  if (state.social) {
    for (const [platform, handle] of Object.entries(state.social)) {
      if (handle) {
        settingsToUpdate.push({ key: platform, value: handle, category: 'social', description: `${platform} handle` });
      }
    }
  }
  
  return bulkUpdateSettings(settingsToUpdate);
}

export default { fetchSettings, fetchSetting, updateSetting, bulkUpdateSettings, deleteSetting, fetchSiteSettings, persistSettings };
