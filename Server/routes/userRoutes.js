const express = require("express");
const router = express.Router();
const {
  AuthClientId,
  isAuthenticated,
} = require("../middlewares/authClientMiddleware");
const { validateEmail } = require("../validators/userValidator");
const upload = require("../middlewares/multerMiddleware");

// const {
//   sendOtp,
//   verifyOtp,
//   logoutUser,
// } = require("../controllers/userController");

const {
  signup,
  verifySignupOtp,
  login,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  updateProfile,
  logoutUser,
  getSession,
} = require("../controllers/userController");

const {
  getAddresses,
  addAddresses,
  setDefaultAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

const {
  getActiveProducts,
  getProductById,
  getProductsByFilter,
  searchProducts,
} = require("../controllers/productController");

const {
  addToCart,
  getCart,
  updateCartItem,
  deleteProductUsingId,
  clearCart,
  checkout,
} = require("../controllers/cartController");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");

const { getActiveBanners } = require("../controllers/bannerController");

const {
  createOrder,
  verifyPayment,
  getMyOrders,
} = require("../controllers/orderController");

const {
  createReview,
  getReviewsByProduct,
  getAllReviews,
  getActiveReviews
} = require("../controllers/productReviewController");

// Routes with `AuthClientId` middleware require a valid token

// User Routes
// router.post("/login/send-otp", validateEmail, sendOtp);
// router.post("/login/verify-otp", verifyOtp);
//router.post("/logout", AuthClientId, logoutUser);

// User Routes
router.post("/signup", signup);
router.post("/signup/verify-otp", verifySignupOtp);
router.post("/login", login);
router.post("/forgot-password", validateEmail, forgotPassword);
router.post("/reset-password/verify-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);
router.put("/update-profile", AuthClientId, updateProfile);
router.post("/logout", AuthClientId, logoutUser);
router.get("/session", isAuthenticated, getSession);

// Address Routes
router.get("/addresses", AuthClientId, getAddresses);
router.post("/add-address", AuthClientId, addAddresses);
router.put("/set-default-address", AuthClientId, setDefaultAddress);
router.put("/update-address/:addressId", AuthClientId, updateAddress);
router.delete("/delete-address/:addressId", AuthClientId, deleteAddress);

// Product Routes
router.get("/products", getActiveProducts);
router.get("/product/:id", getProductById);
router.get("/products/filter/:type/:value", getProductsByFilter);
router.get("/products/search/:query", searchProducts);

// Cart Routes
router.post("/cart/add", AuthClientId, addToCart);
router.get("/cart", AuthClientId, getCart);
router.put("/cart/update", AuthClientId, updateCartItem);
router.delete("/cart/clear", AuthClientId, clearCart);
router.delete("/cart/delete/:productId", AuthClientId, deleteProductUsingId);
router.post("/cart/checkout", AuthClientId, checkout);

// Wishlist Routes
router.post("/wishlist/add", AuthClientId, addToWishlist);
router.get("/wishlist", AuthClientId, getWishlist);
router.delete("/wishlist/remove/:productId", AuthClientId, removeFromWishlist);
router.delete("/wishlist/clear", AuthClientId, clearWishlist);

// Order Routes
router.post("/create-order", AuthClientId, createOrder);
router.post("/verify-payment", AuthClientId, verifyPayment);
router.get("/get-my-orders/:userId", AuthClientId, getMyOrders);

// Product Review Routes
router.post(
  "/reviews/create",
  AuthClientId,
  upload.array("images"),
  createReview
);
router.get("/reviews/product/:productId", getReviewsByProduct);
router.get("/reviews", getAllReviews);
router.get("/reviews/active", getActiveReviews);

// Banner Routes
router.get("/banners", getActiveBanners);

module.exports = router;
