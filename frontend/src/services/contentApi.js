import api from './api.js';

export async function fetchPublished(type, params = {}) {
  const { data } = await api.get(`/${type}/public`, { params });
  return data.data || [];
}

export async function fetchPublishedBySlug(type, slug) {
  const { data } = await api.get(`/${type}/public`, { params: { slug } });
  return data.data?.[0] || null;
}

export async function fetchPageBySlug(slug) {
  return fetchPublishedBySlug('pages', slug);
}

export async function fetchAdminList(type) {
  const { data } = await api.get(`/${type}`);
  return data.data || [];
}

export async function createContent(type, payload) {
  const { data } = await api.post(`/${type}`, { ...payload, type });
  return data.data;
}

export async function updateContent(type, id, payload) {
  const { data } = await api.put(`/${type}/${id}`, { ...payload, type });
  return data.data;
}

export async function deleteContent(type, id) {
  const { data } = await api.delete(`/${type}/${id}`);
  return data.data;
}

export async function fetchDashboardSummary() {
  const { data } = await api.get('/dashboard/summary');
  return data.data;
}
