const Razorpay = require("razorpay");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/Order");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing token" });
    }

    const userId = req.user._id;

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: "Failed to create Razorpay order" });
    }

    res.status(200).json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Verify Razorpay Payment & Save Order
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      shippingAddress,
      totalAmount,
    } = req.body;

    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing token" });
    }

    const userId = req.user._id;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ error: "Invalid signature, payment verification failed" });
    }

    const newOrder = new Order({
      orderId: "ORDER-" + uuidv4().slice(0, 8).toUpperCase(),
      user: userId,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod: "razorpay",
      paymentStatus: "completed",
      orderStatus: "pending",
      isPaid: true,
      paidAt: new Date(),
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment verified and order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
