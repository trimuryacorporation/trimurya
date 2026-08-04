import AppConfig from './config/index.js';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRoutes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDistPath = join(__dirname, '..', '..', 'frontend', 'dist');
const frontendIndexPath = join(frontendDistPath, 'index.html');

app.use(helmet());
app.use(cors({
  origin: AppConfig.server.corsOrigins.length > 0 ? AppConfig.server.corsOrigins : (AppConfig.env === 'development' ? true : [AppConfig.server.clientUrl]),
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: `${AppConfig.uploads.maxSizeMB}mb` }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(AppConfig.uploads.dir));
if (existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Trimurya Corporation API is healthy', env: AppConfig.env });
});

app.use('/api', apiRoutes);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }

  if (existsSync(frontendIndexPath)) {
    return res.sendFile(frontendIndexPath);
  }

  return next();
});

app.use(notFound);
app.use(errorHandler);

export default app;
