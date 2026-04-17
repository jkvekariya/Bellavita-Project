import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],

    mobileNumber: { type: String, required: true },
    address: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    totalAmount: { type: Number, required: true },
    orderId: { type: String, unique: true, sparse: true }, // sparse allows nulls for existing docs if any
    paymentMethod: { type: String, default: 'Online' },
    paymentStatus: { type: String, default: 'Pending' },
    transactionId: { type: String },
    orderType: { type: String, default: 'Online' },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned', 'Refunded'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
