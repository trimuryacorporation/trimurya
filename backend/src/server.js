import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import AppConfig from './config/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });

import app from './app.js';
import connectDB from './config/db.js';
import mongoose from 'mongoose';
import User from './models/User.js';

async function ensureAdmin() {
  if (mongoose.connection.readyState !== 1) {
    console.log('Admin seeding skipped: MongoDB not connected.');
    return;
  }

  try {
    const existing = await User.findOne({ email: AppConfig.admin.email });
    if (!existing) {
      await User.create({ name: AppConfig.admin.name, email: AppConfig.admin.email, password: AppConfig.admin.password, role: 'admin', verified: true });
      console.log('Admin user seeded successfully (email:', AppConfig.admin.email, ')');
    }
  } catch (error) {
    console.log('Admin seeding skipped:', error.message);
  }
}

function startServer(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Trimurya API running on http://localhost:${port}`);
      resolve(server);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        reject(new Error(`EADDRINUSE:${port}`));
      } else {
        reject(err);
      }
    });
  });
}

async function tryStart() {
  await connectDB();
  await ensureAdmin();

  let port = AppConfig.server.port;
  let server;
  let lastErr;
  const maxRetries = AppConfig.server.maxPortRetries;

  while (port < AppConfig.server.port + maxRetries) {
    try {
      server = await startServer(port);
      return;
    } catch (err) {
      lastErr = err;
      if (!String(err.message).includes(`EADDRINUSE:${port}`)) {
        console.log('Failed to start server:', err.message);
        process.exit(1);
      }
      console.log(`Port ${port} busy, trying next...`);
      port++;
    }
  }

  console.log('Failed to start server: all checked ports are busy.');
  process.exit(1);
}

tryStart().catch((error) => {
  console.log('Failed to start server:', error.message);
  process.exit(1);
});
