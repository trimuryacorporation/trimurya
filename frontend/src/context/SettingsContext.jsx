import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchSiteSettings } from '../services/settingsApi.js';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({ 
    siteName: 'Trimurya Corporation',
    siteUrl: 'https://www.trimuryacorporation.in',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    social: {},
    seo: { title: 'Trimurya Corporation', description: '', keywords: '' },
    loading: true 
  });

  useEffect(() => {
    let mounted = true;
    fetchSiteSettings().then((data) => {
      if (mounted) {
        setSettings((s) => ({ ...data, loading: false }));
      }
    }).catch(() => {
      if (mounted) setSettings((s) => ({ ...s, loading: false }));
    });
    return () => { mounted = false; };
  }, []);

  const value = useMemo(() => ({
    ...settings,
    updateSettings: (patch) => setSettings((s) => ({ ...s, ...patch })),
    refresh: () => fetchSiteSettings().then((data) => setSettings((s) => ({ ...data, loading: false })))
  }), [settings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useSettings must be used inside SettingsProvider');
  return value;
}
