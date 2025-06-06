import express from "express";
import WishlistController from "../../controller/wishlistController/WishlistController.js";
import getUser from "../../Middlewear/getUser.js";

const router = express.Router();

router.get("/get", getUser, WishlistController.getwishlist);
router.post("/add", getUser, WishlistController.addTowishlist);
router.delete("/remove", getUser, WishlistController.removeFromwishlist);
router.delete("/clear", getUser, WishlistController.clearwishlist);
router.get("/getCartCount", getUser, WishlistController.getwishlistItemCount);

export default router;
