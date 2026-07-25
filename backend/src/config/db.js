import mongoose from 'mongoose';

export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.log('MongoDB skipped: MONGO_URI is not configured.');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected.');
  } catch (error) {
    console.log(`MongoDB connection failed: ${error.message}`);
    console.log('Server will start without database connection.');
  }
}
