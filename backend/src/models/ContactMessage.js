import AppConfig from '../config/index.js';
import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    service: String,
    message: { type: String, required: true },
    type: { type: String, enum: ['contact', 'quote', 'support'], default: 'contact' },
    budget: String,
    timeline: String,
    company: String,
    status: { type: String, enum: AppConfig.content.contactStatuses || ['new', 'contacted', 'closed'], default: 'new' }
  },
  { timestamps: true }
);

export default mongoose.model('ContactMessage', contactMessageSchema);
