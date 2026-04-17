import orderModel from "../../model/orderModel/OrderModel.js";
import productModel from "../../model/productModel/ProductModel.js";
import UserModel from "../../model/userModel/UserModel.js";

const controller = {
  async createOrder(req, res) {
    try {
      const { items, mobileNumber, address, fullName, email, totalAmount, paymentId } = req.body;

      const userId = req.user.id;

      if (!items || !Array.isArray(items) || items.length === 0 ||
        !mobileNumber || !address || !fullName || !email || !totalAmount) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (!address.line1 || !address.city || !address.state || !address.pincode) {
        return res.status(400).json({ error: 'Incomplete address information' });
      }

      const orderId = '#ORD' + Math.floor(1000 + Math.random() * 9000); // Simple unique ID
      const paymentStatus = paymentId ? 'Paid' : 'Pending';
      const paymentMethod = paymentId ? 'Razorpay' : 'COD';

      const newOrder = new orderModel({
        userId,
        fullName,
        email,
        items,
        mobileNumber,
        address,
        totalAmount,
        transactionId: paymentId,
        orderId,
        paymentStatus,
        paymentMethod,
        orderType: paymentId ? 'Online' : 'COD',
        status: 'Confirmed'
      });

      await newOrder.save();

      return res.status(201).json({
        message: 'Order placed successfully',
        order: newOrder
      });

    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({
        error: 'Failed to place order',
        details: error.message
      });
    }
  },

  async getUserOrders(req, res) {
    try {
      const userId = req.user.id;

      const userOrders = await orderModel.find({ userId }).sort({ createdAt: -1 }).populate([
        {
          path: 'items.productId',
          model: productModel,
          select: 'name realprice price discountprice image',
          options: { strictPopulate: false },
        }
      ]);

      res.status(200).json(userOrders);
    } catch (error) {
      console.error("getUserOrders error:", error);
      res.status(500).json({ error: "Failed to fetch user orders", details: error.message });
    }
  },

  async getAllOrder(req, res) {
    try {
      const allOrders = await orderModel.find().sort({ createdAt: -1 }).populate([
        {
          path: 'userId',
          model: UserModel,
          select: 'name email',
        },
        {
          path: 'items.productId',
          model: productModel,
          select: 'name realprice price discountprice image',
          options: { strictPopulate: false }
        }
      ]);

      res.status(200).json(allOrders);
    } catch (error) {
      console.error("getAllOrder error:", error);
      res.status(500).json({ error: "Failed to fetch all orders", details: error.message });
    }
  },

  async getOrderById(req, res) {
    try {
      const { orderId } = req.params;

      const order = await orderModel.findById(orderId)
        .populate({
          path: 'items.productId',
          model: productModel,
          select: 'name realprice price discountprice image',
          options: { strictPopulate: false }
        });

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error("getOrderById error:", error);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  },

  async updateOrderStatus(req, res) {
    try {
      const orderId = req.params.id;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const order = await orderModel.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      order.status = status;
      await order.save();

      res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {

      console.error('Update status error:', error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }

};

export default controller;