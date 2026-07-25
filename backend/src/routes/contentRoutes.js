import express from 'express';
import GenericContent from '../models/GenericContent.js';
import User from '../models/User.js';
import { createContent, listContent, getSingleContent, updateContent, deleteContent } from '../controllers/contentController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import AppConfig from '../config/index.js';

const router = express.Router();

const DEFAULT_RESOURCE_TYPES = [
  'services', 'industries', 'projects', 'clients',
  'team', 'blogs', 'jobs', 'applications', 'resumes',
  'testimonials', 'gallery', 'newsletter', 'appointments',
  'meetings', 'tickets', 'notifications', 'seo', 'settings',
  'analytics', 'activity-logs', 'stats', 'values', 'nav-links',
  'videos', 'hero-slides', 'case_studies', 'press-releases'
];

const resourceTypes = Array.isArray(AppConfig.content.resourceTypes) && AppConfig.content.resourceTypes.length > 0
  ? AppConfig.content.resourceTypes
  : DEFAULT_RESOURCE_TYPES;

for (const resource of resourceTypes) {
  router.get(`/${resource}`, protect, authorize('admin', 'employee'), async (req, res, next) => {
    try {
      const result = await listContent(resource);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  router.get(`/${resource}/public`, async (req, res) => {
    try {
      const filters = { status: AppConfig.content.defaultStatus };
      if (req.query.slug) filters.slug = req.query.slug;
      const result = await listContent(resource, filters);
      res.json(result);
    } catch (error) {
      console.error(`Public fetch failed for ${resource}:`, error.message);
      res.json({ success: true, data: [] });
    }
  });

  router.get(`/${resource}/:id`, protect, authorize('admin', 'employee'), async (req, res, next) => {
    try {
      const result = await getSingleContent(resource, req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  router.post(`/${resource}`, protect, authorize('admin'), async (req, res, next) => {
    try {
      const result = await createContent(resource, req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  });

  router.put(`/${resource}/:id`, protect, authorize('admin'), async (req, res, next) => {
    try {
      const result = await updateContent(resource, req.params.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  router.delete(`/${resource}/:id`, protect, authorize('admin'), async (req, res, next) => {
    try {
      const result = await deleteContent(resource, req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });
}

router.get('/dashboard/summary', async (req, res) => {
  try {
    const supportedTypes = AppConfig.content.dashboardSummaryTypes || [
      'projects', 'services', 'blogs', 'industries', 'case_studies',
      'testimonials', 'team', 'clients', 'press-releases', 'values', 'stats'
    ];
    const countPromises = supportedTypes.map(type => GenericContent.countDocuments({ type }));
    const usersPromise = User.countDocuments();
    const counts = await Promise.all([...countPromises, usersPromise]);

    const summary = {};
    supportedTypes.forEach((type, i) => {
      summary[type] = counts[i];
    });
    summary.users = counts[counts.length - 1];

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.json({ success: true, data: { projects: 0, services: 0, blogs: 0, industries: 0, users: 0 } });
  }
});

export default router;
