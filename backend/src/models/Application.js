import AppConfig from '../config/index.js';
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true },
    jobTitle: { type: String, required: true },
    department: { type: String, required: true },
    jobType: { type: String, required: true },
    location: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeUrl: { type: String },
    coverLetter: { type: String },
    experience: { type: String },
    skills: { type: String },
    status: { type: String, enum: AppConfig.content.applicationStatuses || ['new', 'reviewed', 'shortlisted', 'rejected', 'hired'], default: 'new' },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

applicationSchema.index({ jobId: 1, email: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
