import express from 'express';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { getSettings, getSetting, upsertSetting, bulkUpsertSettings, deleteSetting } from '../controllers/settingController.js';

const router = express.Router();

router.get('/', getSettings);
router.get('/:key', getSetting);
router.post('/', protect, authorize('admin'), upsertSetting);
router.put('/', protect, authorize('admin'), upsertSetting);
router.post('/bulk', protect, authorize('admin'), bulkUpsertSettings);
router.delete('/:key', protect, authorize('admin'), deleteSetting);

export default router;
