import express from "express";
import { createRazorpayOrder } from "../../controller/orderController/razorpayController.js";
import GetUser from "../../Middlewear/getUser.js"

const router = express.Router();

router.post("/create-order",GetUser, createRazorpayOrder);

export default router;