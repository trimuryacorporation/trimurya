import AppConfig from '../config/index.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, AppConfig.jwt.secret, { expiresIn: AppConfig.jwt.expiresIn });
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    verified: user.verified
  };
}

function isAdminRegistrationAllowed(req) {
  const registrationKey = AppConfig.admin.registrationKey;
  if (!registrationKey) return true;
  return req.body.adminKey === registrationKey || req.headers['x-admin-key'] === registrationKey;
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const role = req.body.role || 'candidate';
    const existing = await User.findOne({ email: String(email).toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      verified: false
    });

    res.status(201).json({ success: true, token: signToken(user), user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
}

export async function registerAdmin(req, res, next) {
  try {
    if (!isAdminRegistrationAllowed(req)) {
      return res.status(403).json({ success: false, message: 'Invalid admin registration key' });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const normalizedEmail = String(email).toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      existing.name = name;
      existing.password = password;
      existing.role = 'admin';
      existing.verified = true;
      await existing.save();
      return res.status(200).json({ success: true, token: signToken(existing), user: sanitizeUser(existing) });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: 'admin',
      verified: true
    });

    res.status(201).json({ success: true, token: signToken(user), user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: String(req.body.email).toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(req.body.password))) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    res.json({ success: true, token: signToken(user), user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
}
