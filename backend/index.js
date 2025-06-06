import dotenv from "dotenv";
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

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

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
app.use("/payment",RazorpayRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

process.on("uncaughtException", (error) => {
  console.log("Error---->", error.stack);
})

process.on("unhandledRejection", (err) => {
  console.log("Err---->", err.stack);
})