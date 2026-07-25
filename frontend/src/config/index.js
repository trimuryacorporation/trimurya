const IMPORT_MAP = {
  react: 'react',
  'react-dom': 'react-dom',
  'react-router-dom': 'react-router-dom',
  'react-hook-form': 'react-hook-form',
  'react-icons': 'react-icons',
  'axios': 'axios',
  'framer-motion': 'framer-motion',
  'aos': 'aos',
  'swiper': 'swiper'
};

export const FRONTEND_FEATURES = {
  darkMode: true,
  aos: true,
  chatAssistant: true,
  search: true,
  filters: true,
  pagination: true,
  auth: true
};

export const API_TIMEOUT = 12000;
export const TOKEN_KEY = 'trimurya_token';
export const ADMIN_KEY = 'trimurya_admin';
export const SETTINGS_KEY = 'trimurya_settings';

export function getApiBase() {
  if (import.meta.env.DEV) {
    return 'http://localhost:5000/api';
  }
  return import.meta.env.VITE_API_URL || '/api';
}

export function buildApiUrl(path) {
  return `${getApiBase()}${path}`;
}

export default { IMPORT_MAP, FRONTEND_FEATURES, API_TIMEOUT, TOKEN_KEY, ADMIN_KEY, SETTINGS_KEY, getApiBase, buildApiUrl };
