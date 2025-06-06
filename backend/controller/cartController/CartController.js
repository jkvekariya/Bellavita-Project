import cartModel from "../../model/cartModel/CartModel.js";
import ProductModel from "../../model/productModel/ProductModel.js";

const controller = {
  async getCart(req, res) {
    try {
      const cart = await cartModel
        .findOne({ userId: req.user.id })
        .populate("items.productId");

      res.status(200).json(cart || { items: [] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },  

  async addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({ success: false, error: "Missing fields" });
      }

      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, error: "Product not found" });
      }

      let cart = await cartModel.findOne({ userId: req.user.id });

      if (!cart) {
        cart = new cartModel({
          userId: req.user.id,
          items: [{ productId, quantity }],
        });
      } else {
        const itemIndex = cart.items.findIndex(
          (item) => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ productId, quantity });
        }
      }

      await cart.save();
      res.status(200).json({ success: true, message: "Product added to cart" });
    } catch (error) {
      console.error("Add to cart error:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },
  async updateCart(req, res) {
    const { productId, quantity } = req.body;
  
    if (!productId || typeof quantity !== 'number') {
      return res.status(400).json({ error: "Product ID and quantity are required" });
    }
  
    try {
      const cart = await cartModel.findOne({ userId: req.user.id });
  
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
  
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found in cart" });
      }
  
      cart.items[itemIndex].quantity = quantity;
  
      await cart.save();
  
      const updatedCart = await cartModel
        .findOne({ userId: req.user.id })
        .populate("items.productId");
  
      res.status(200).json({ items: updatedCart.items });
    } catch (err) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  },

  async removeFromCart(req, res) {
    try {
      const { productId } = req.body;
      const cart = await cartModel.findOne({ userId: req.user.id });
  
      if (!cart) return res.status(404).json({ error: "Cart not found" });
  
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
  
      await cart.save();
  
      const updatedCart = await cartModel.findById(cart._id).populate("items.productId");
  
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json({ error: "Error removing item from cart" });
    }
  },

  async clearCart(req, res) {
    try {
      await cartModel.findOneAndUpdate({ userId: req.user.id }, { items: [] });
      res.status(200).json({ message: 'Cart cleared' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getCartItemCount(req, res) {
    try {
      const cart = await cartModel.findOne({ userId: req.user.id });
      const count = cart ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
      res.status(200).json({ count });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

export default controller;