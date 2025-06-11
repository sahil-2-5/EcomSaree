const express = require("express");
const router = express.Router();
const {
  AuthAdminId,
  isAuthenticated,
} = require("../middlewares/authAdminMiddleware");
const { validateEmail } = require("../validators/userValidator");
const upload = require("../middlewares/multerMiddleware");

// const {
//   sendOtp,
//   verifyOtp,
//   logoutAdmin,
// } = require("../controllers/adminController");

const {
  signup,
  verifySignupOtp,
  login,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  logoutAdmin,
  getSession,
} = require("../controllers/adminController");

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  updateSingleImage,
  deleteProduct,
} = require("../controllers/productController");

const {
  createOrder,
  verifyPayment,
} = require("../controllers/orderController");

// Routes with `AuthAdminId` middleware require a valid token

// Admin Routes
// router.post("/login/send-otp", sendOtp);
// router.post("/login/verify-otp", verifyOtp);
// router.post("/logout", AuthAdminId, logoutAdmin);

// Admin Routes
router.post("/signup", signup);
router.post("signup/verify-otp", verifySignupOtp);
router.post("/login", login);
router.post("/forgot-password", validateEmail, forgotPassword);
router.post("/reset-password/verify-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);
router.post("/logout", AuthAdminId, logoutAdmin);
router.get("/session", isAuthenticated, getSession);

// Product Routes
router.post("/add-product", AuthAdminId, upload.array("images"), addProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/update-product/:id", AuthAdminId, upload.none(), updateProduct);
router.put(
  "/update-image/:productId/:imageId",
  AuthAdminId,
  upload.single("image"),
  updateSingleImage
);
router.delete("/delete-product/:id", AuthAdminId, deleteProduct);

// Order Routes
router.post("/create-order", AuthAdminId, createOrder);
router.post("/verify-payment", AuthAdminId, verifyPayment);

module.exports = router;
