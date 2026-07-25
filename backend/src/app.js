import AppConfig from './config/index.js';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRoutes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();

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

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Trimurya Corporation API is healthy', env: AppConfig.env });
});

app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
