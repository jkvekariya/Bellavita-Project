import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: String },
  comment: { type: String }
}, { timestamps: true });

export default  mongoose.model('Contact', contactSchema);