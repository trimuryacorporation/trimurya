import Setting from '../models/Setting.js';

export async function getSettings(req, res, next) {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const settings = await Setting.find(query).sort('category key');
    const result = {};
    for (const item of settings) {
      result[item.key] = item.value;
    }
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getSetting(req, res, next) {
  try {
    const item = await Setting.findOne({ key: req.params.key });
    if (!item) return res.status(404).json({ success: false, message: 'Setting not found' });
    res.json({ success: true, data: { key: item.key, value: item.value, category: item.category, description: item.description } });
  } catch (error) {
    next(error);
  }
}

export async function upsertSetting(req, res, next) {
  try {
    const { key, value, category = 'general', description = '' } = req.body;
    if (!key) return res.status(400).json({ success: false, message: 'Setting key is required' });
    const item = await Setting.findOneAndUpdate(
      { key },
      { value, category, description },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, data: { key: item.key, value: item.value, category: item.category, description: item.description } });
  } catch (error) {
    next(error);
  }
}

export async function bulkUpsertSettings(req, res, next) {
  try {
    const { settings } = req.body;
    if (!Array.isArray(settings)) return res.status(400).json({ success: false, message: 'settings array is required' });
    const results = [];
    for (const s of settings) {
      const { key, value, category = 'general', description = '' } = s;
      if (!key) continue;
      const item = await Setting.findOneAndUpdate(
        { key },
        { value, category, description },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      results.push({ key: item.key, value: item.value });
    }
    res.status(201).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
}

export async function deleteSetting(req, res, next) {
  try {
    const item = await Setting.findOneAndDelete({ key: req.params.key });
    if (!item) return res.status(404).json({ success: false, message: 'Setting not found' });
    res.json({ success: true, data: { key: item.key } });
  } catch (error) {
    next(error);
  }
}
