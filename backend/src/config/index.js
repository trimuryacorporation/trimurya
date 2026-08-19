import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '..', '.env'), override: true });

const ENV = process.env.NODE_ENV || 'development';

export const AppConfig = {
  env: ENV,
  server: {
    port: Number(process.env.PORT) || 5000,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    corsOrigins: (process.env.CORS_ORIGINS || '').split(',').filter(Boolean),
    maxPortRetries: Number(process.env.MAX_PORT_RETRIES) || 10
  },
  db: {
    uri: process.env.MONGO_URI
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  },
  uploads: {
    dir: process.env.UPLOADS_DIR || 'uploads',
    maxSizeMB: Number(process.env.UPLOADS_MAX_SIZE_MB) || 10
  },
  admin: {
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    registrationKey: process.env.ADMIN_REGISTRATION_KEY
  },
  content: {
    defaultStatus: process.env.CONTENT_DEFAULT_STATUS || 'published',
    defaultRole: process.env.DEFAULT_USER_ROLE || 'candidate',
    resourceTypes: process.env.CONTENT_RESOURCE_TYPES ? process.env.CONTENT_RESOURCE_TYPES.split(',').filter(Boolean) : [
      'services', 'industries', 'projects', 'clients',
      'team', 'blogs', 'jobs', 'applications', 'resumes',
      'testimonials', 'gallery', 'newsletter', 'appointments',
      'meetings', 'tickets', 'notifications', 'seo', 'settings',
      'analytics', 'activity-logs', 'stats', 'values', 'nav-links', 'pages',
      'videos', 'hero-slides', 'case_studies', 'press-releases'
    ],
    dashboardSummaryTypes: process.env.DASHBOARD_SUMMARY_TYPES ? process.env.DASHBOARD_SUMMARY_TYPES.split(',').filter(Boolean) : [
      'projects', 'services', 'blogs', 'industries', 'case_studies',
      'testimonials', 'team', 'clients', 'press-releases', 'values', 'stats', 'pages'
    ],
    applicationStatuses: (process.env.APPLICATION_STATUSES || 'new,reviewed,shortlisted,rejected,hired').split(',').filter(Boolean),
    contactStatuses: (process.env.CONTACT_STATUSES || 'new,contacted,closed').split(',').filter(Boolean),
    contentStatuses: (process.env.CONTENT_STATUSES || 'draft,published,archived').split(',').filter(Boolean)
  }
};

export default AppConfig;
