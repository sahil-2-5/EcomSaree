const Razorpay = require("razorpay");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/Order");
const User = require("../models/User");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const { amount, items, shippingAddress } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing token" });
    }

    const userId = req.user._id;

    // Step 1: Create Razorpay Order
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      return res.status(500).json({ error: "Failed to create Razorpay order" });
    }

    // Step 2: Save order in MongoDB
    const localOrder = {
      orderId: razorpayOrder.id, // Razorpay order ID
      user: userId,
      items: items || [],
      shippingAddress: shippingAddress || {},
      totalAmount: amount,
      paymentStatus: "pending",
      orderStatus: "pending",
      paymentMethod: "razorpay",
      isPaid: false,
    };

    // Step 4: Respond with Razorpay order and local DB order
    res.status(200).json({
      success: true,
      razorpayOrder,
      localOrder,
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

    await User.findByIdAndUpdate(userId, {
      $push: { orders: newOrder.orderId },
    });

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

// ✅ Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("user", "name email") // Include basic user info
      .populate({
        path: "items.product",
        model: "Product",
        select:
          "images title price sellingPrice offerPercentage description filter", // Select the fields you want
      });

    res.status(200).json({
      success: true,
      count: orders.length, // Include count of orders
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// ✅ Get orders for logged-in user
exports.getMyOrders = async (req, res) => {
  try {
    // Get user ID from URL parameters
    const userId = req.params.userId;

    // Validate the user ID
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'items.product', // assuming your Order schema has an 'items' array with 'product' references
        select: 'title images.url' // only get the title and image URLs
      });

    // Optionally, you might want to transform the data to make it more client-friendly
    const transformedOrders = orders.map(order => ({
      ...order.toObject(),
      items: order.items.map(item => ({
        ...item,
        product: {
          title: item.product?.title,
          imageUrl: item.product?.images[0]?.url // get the first image URL
        }
      }))
    }));

    res.status(200).json({
      success: true,
      count: orders.length,
      orders: transformedOrders, // or just 'orders' if you don't want to transform
    });
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if the user is authorized to view this order
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You can only view your own orders" });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order by ID:", error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Unauthorized: Admin access required" });
    }

    const { status } = req.body;
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid order status" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.orderStatus = status;

    // Update deliveredAt date if status is delivered
    if (status === "delivered") {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
