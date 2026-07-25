import AppConfig from '../config/index.js';
import jwt from 'jsonwebtoken';

function getTokenFromReq(req) {
  const authHeader = req.headers.authorization || req.headers['x-admin-token'];
  const cookieHeader = req.headers.cookie || '';
  let token = null;

  if (authHeader) {
    token = authHeader.startsWith('Bearer ') || authHeader.startsWith('Token ')
      ? authHeader.split(' ')[1]
      : authHeader;
  }

  if (!token) {
    const cookieMatch = cookieHeader.split(';').find((c) => c.trim().startsWith('trimurya_token='));
    if (cookieMatch) {
      token = cookieMatch.split('=')[1]?.trim();
    }
  }

  return token;
}

export function protect(req, res, next) {
  const token = getTokenFromReq(req);

  if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });

  try {
    req.user = jwt.verify(token, AppConfig.jwt.secret);
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
    next();
  };
}
