import GenericContent from '../models/GenericContent.js';

const ARRAY_FIELDS = new Set([
  'items',
  'features',
  'outcomes',
  'technologies',
  'related',
  'tags',
  'services',
  'values',
  'images'
]);

const JSON_FIELDS = new Set([
  'process',
  'faqs',
  'benefits',
  'testimonials',
  'heroStats',
  'metrics',
  'sections',
  'stats'
]);

function normalizeValue(key, value) {
  if (value == null) return value;

  if (JSON_FIELDS.has(key)) {
    if (Array.isArray(value) || typeof value === 'object') return value;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) return [];
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed.split(',').map((item) => item.trim()).filter(Boolean);
      }
    }
  }

  if (ARRAY_FIELDS.has(key)) {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      return value.split(',').map((item) => item.trim()).filter(Boolean);
    }
  }

  return value;
}

function flatten(item) {
  const obj = item.toObject ? item.toObject() : item;
  if (obj && obj.metadata) {
    const { metadata, ...rest } = obj;
    const merged = { ...rest, ...metadata };
    return Object.fromEntries(Object.entries(merged).map(([key, value]) => [key, normalizeValue(key, value)]));
  }
  return Object.fromEntries(Object.entries(obj || {}).map(([key, value]) => [key, normalizeValue(key, value)]));
}

export async function listContent(type, filters = {}) {
  const query = { type };
  if (filters.status) query.status = filters.status;
  if (filters.slug) query.slug = filters.slug;
  const items = await GenericContent.find(query).sort('-createdAt');
  return { success: true, data: items.map(flatten) };
}

export async function getSingleContent(type, id) {
  const item = await GenericContent.findOne({ _id: id, type });
  if (!item) throw new Error('Content not found');
  return { success: true, data: flatten(item) };
}

export async function createContent(type, body) {
  const { metadata, ...rest } = body;
  const item = await GenericContent.create({ ...rest, type, metadata: metadata || rest });
  return { success: true, data: flatten(item) };
}

export async function updateContent(type, id, body) {
  const { metadata, ...rest } = body;
  const item = await GenericContent.findOneAndUpdate(
    { _id: id, type },
    { ...rest, metadata: metadata || rest },
    { new: true, strict: false }
  );
  if (!item) throw new Error('Content not found');
  return { success: true, data: flatten(item) };
}

export async function deleteContent(type, id) {
  const item = await GenericContent.findOneAndDelete({ _id: id, type });
  if (!item) throw new Error('Content not found');
  return { success: true, data: flatten(item) };
}
