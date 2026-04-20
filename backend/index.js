import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cors from "cors"
import userRouter from "./router/userRouter/UserRouter.js";
import productRouter from "./router/productRouter/ProductRouter.js";
import cartRouter from "./router/cartRouter/CartRouter.js";
import orderRouter from "./router/orderRouter/OrderRouter.js";
import wishlistRouter from "./router/wishlistRouter/WishlistRouter.js";
import contactRouter from "./router/contactRouter/ContactRouter.js";
import RazorpayRoutes from "./router/orderRouter/RazorpayRoutes.js";


console.log("🔥 SERVER FILE IS RUNNING hello");

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "https://bellavita-55va7mdx8-jkvekariyas-projects.vercel.app",
     "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


console.log("MongoDB URL:", process.env.URL);


mongoose.connect(process.env.URL)
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(4000, () => {
      console.log("Server Running on port 4000...");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/signup", userRouter);
app.use("/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/contact", contactRouter);
app.use("/payment", RazorpayRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

process.on("uncaughtException", (error) => {
  console.log("Error---->", error.stack);
})

process.on("unhandledRejection", (err) => {
  console.log("Err---->", err.stack);
})