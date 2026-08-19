import express from 'express';
import { body } from 'express-validator';
import { login, register, registerAdmin } from '../controllers/authController.js';
import validate from '../validators/validate.js';

const router = express.Router();

const nameRule = body('name').trim().notEmpty().withMessage('Name is required');
const emailRule = body('email').trim().isEmail().normalizeEmail().withMessage('Valid email is required');
const passwordRule = body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters');

router.post('/register', [nameRule, emailRule, passwordRule, validate], register);
router.post('/admin/register', [nameRule, emailRule, passwordRule, validate], registerAdmin);
router.post('/login', [emailRule, passwordRule, validate], login);
router.post('/forgot-password', (req, res) => res.json({ success: true, message: 'Password reset flow ready' }));
router.post('/verify-email', (req, res) => res.json({ success: true, message: 'Email verification flow ready' }));
router.post('/verify-otp', (req, res) => res.json({ success: true, message: 'OTP verification flow ready' }));

export default router;
