import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import AppConfig from './config/index.js';
import User from './models/User.js';

dotenv.config({ override: true });

const seedAdmin = async () => {
  if (!AppConfig.admin.email || !AppConfig.admin.password) {
    console.log('Admin seeding skipped: ADMIN_EMAIL and ADMIN_PASSWORD are required.');
    return;
  }

  try {
    const existing = await User.findOne({ email: AppConfig.admin.email });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(AppConfig.admin.password, 12);
      await User.create({
        name: AppConfig.admin.name || 'Admin',
        email: AppConfig.admin.email,
        password: hashedPassword,
        role: 'admin',
        verified: true
      });
      console.log('Admin user seeded:', AppConfig.admin.email);
    } else {
      console.log('Admin user already exists:', AppConfig.admin.email);
    }
  } catch (error) {
    console.log('Admin seeding skipped:', error.message);
  }
};

const runSeed = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB. Starting seed...');
    await seedAdmin();
    console.log('Seeding completed.');
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
};

runSeed();
