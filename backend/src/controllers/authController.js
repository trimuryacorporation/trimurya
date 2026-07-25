import AppConfig from '../config/index.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, AppConfig.jwt.secret, { expiresIn: AppConfig.jwt.expiresIn });
}

export async function register(req, res, next) {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await user.comparePassword(req.body.password))) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    res.json({ success: true, token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
}
