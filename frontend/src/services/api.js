import axios from 'axios';
import config from '../config/index.js';

const API_BASE = config.getApiBase();

const api = axios.create({
  baseURL: API_BASE,
  timeout: config.API_TIMEOUT
});

api.interceptors.request.use((requestConfig) => {
  const token = localStorage.getItem(config.TOKEN_KEY);
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
    requestConfig.headers['X-Admin-Token'] = token;
  }
  return requestConfig;
});

export default api;
