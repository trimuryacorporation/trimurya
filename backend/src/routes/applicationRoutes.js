import express from 'express';
import Application from '../models/Application.js';
import { createApplication, listApplications, getSingleApplication, updateApplication, deleteApplication } from '../controllers/applicationController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    await createApplication(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get('/', protect, authorize('admin', 'employee'), async (req, res, next) => {
  try {
    await listApplications(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', protect, authorize('admin', 'employee'), async (req, res, next) => {
  try {
    await getSingleApplication(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, authorize('admin', 'employee'), async (req, res, next) => {
  try {
    await updateApplication(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, authorize('admin', 'employee'), async (req, res, next) => {
  try {
    await deleteApplication(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;
