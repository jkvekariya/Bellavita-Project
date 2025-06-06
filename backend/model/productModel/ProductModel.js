import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  realprice: { type: Number, required: true },
  discountprice: { type: Number, required: true },
  image: [String ],
  collection: {type: String},
  category: { type: String },
  condition: { type: String },
  rating: { type: String },
  reviews: { type: String},
  benefits: [String],
  howtouse:[String ],
  allingredients:[String ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('products', productSchema);


