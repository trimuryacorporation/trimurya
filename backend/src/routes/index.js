import express from 'express';
import authRoutes from './authRoutes.js';
import applicationRoutes from './applicationRoutes.js';
import contactRoutes from './contactRoutes.js';
import contentRoutes from './contentRoutes.js';
import userRoutes from './userRoutes.js';
import settingRoutes from './settingRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/applications', applicationRoutes);
router.use('/contact', contactRoutes);
router.use('/settings', settingRoutes);
router.use('/', contentRoutes);
router.use('/users', userRoutes);

export default router;
