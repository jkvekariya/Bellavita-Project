import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

export const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ["ADMIN", "USER"], 
    default: "USER" 
  },
  addresses: [
    {
      fullName: String,
      email: String,
      line1: String,
      city: String,
      state: String,
      pincode: String,
    }
  ]
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcryptjs.hash(this.password, 10)
    next()
})

export default mongoose.model('user', userSchema)
