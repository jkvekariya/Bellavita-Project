import express from "express";
import cartController from "../../controller/cartController/CartController.js";
import getUser from "../../Middlewear/getUser.js";

const router = express.Router();

router.get("/get", getUser, cartController.getCart);
router.post("/add", getUser, cartController.addToCart);
router.post("/update", getUser, cartController.updateCart);
router.delete("/remove", getUser, cartController.removeFromCart);
router.delete("/clear", getUser, cartController.clearCart);
router.get("/getCartCount", getUser, cartController.getCartItemCount);

export default router;