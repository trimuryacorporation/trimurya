import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true, trim: true, maxlength: 100 },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    category: { type: String, index: true, trim: true, maxlength: 50, default: 'general' },
    description: { type: String, trim: true, maxlength: 500 }
  },
  { timestamps: true }
);

settingSchema.index({ category: 1, key: 1 }, { unique: true, sparse: true });

export default mongoose.model('Setting', settingSchema);
