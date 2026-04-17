import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: String },
  comment: { type: String },
  status: { type: String, enum: ['Processing', 'Resolved', 'Rejected'], default: 'Processing' }
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);