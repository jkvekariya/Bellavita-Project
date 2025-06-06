import razorpay from "../../config/razorpay.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, mobileNumber, } = req.body;

    if (!amount || !mobileNumber ) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const options = {
      amount: amount * 100, 
      currency,
      receipt: receipt || `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};