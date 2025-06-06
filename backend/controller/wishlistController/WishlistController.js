import WishlistModel from "../../model/wishlistModel/WishlistModel.js";
import ProductModel from "../../model/productModel/ProductModel.js";

const WishlistController = {
  async getwishlist(req, res) {
    try {
      const wishlist = await WishlistModel.findOne({ userId: req.user.id }).populate("items.productId");
      res.status(200).json(wishlist || { items: [] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async addTowishlist(req, res) {
    try {
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({ success: false, error: "Missing productId" });
      }

      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, error: "Product not found" });
      }

      let wishlist = await WishlistModel.findOne({ userId: req.user.id });

      if (!wishlist) {
        wishlist = new WishlistModel({
          userId: req.user.id,
          items: [{ productId }],
        });
      } else {
        const alreadyExists = wishlist.items.find(
          (item) => item.productId.toString() === productId
        );

        if (alreadyExists) {
          return res.status(409).json({ success: false, error: "Product already in wishlist" });
        }

        wishlist.items.push({ productId });
      }

      await wishlist.save();
      res.status(200).json({ success: true, message: "Product added to wishlist" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },

  async removeFromwishlist(req, res) {
    try {
      const { productId } = req.body;
      const wishlist = await WishlistModel.findOne({ userId: req.user.id });

      if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });

      wishlist.items = wishlist.items.filter(
        (item) => item.productId.toString() !== productId
      );

      await wishlist.save();

      const updatedWishlist = await WishlistModel.findById(wishlist._id).populate("items.productId");

      res.status(200).json(updatedWishlist);
    } catch (err) {
      res.status(500).json({ error: "Error removing item from wishlist" });
    }
  },

  async clearwishlist(req, res) {
    try {
      await WishlistModel.findOneAndUpdate({ userId: req.user.id }, { items: [] });
      res.status(200).json({ message: "Wishlist cleared" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getwishlistItemCount(req, res) {
    try {
      const wishlist = await WishlistModel.findOne({ userId: req.user.id });
      const count = wishlist ? wishlist.items.length : 0;
      res.status(200).json({ count });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default WishlistController;
