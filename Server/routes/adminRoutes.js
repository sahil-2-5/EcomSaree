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
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  updateSingleBannerImage,
  deleteBanner,
} = require("../controllers/bannerController");

// Routes with `AuthAdminId` middleware require a valid token

// Admin Routes
// router.post("/login/send-otp", sendOtp);
// router.post("/login/verify-otp", verifyOtp);
// router.post("/logout", AuthAdminId, logoutAdmin);

// Admin Routes
router.post("/signup", signup);
router.post("/signup/verify-otp", verifySignupOtp);
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
  upload.single("file"),
  updateSingleImage
);
router.delete("/delete-product/:id", AuthAdminId, deleteProduct);

// Banner Routes
router.post(
  "/create-banner",
  AuthAdminId,
  upload.array("images"),
  createBanner
);
router.get("/banners", getAllBanners);
router.get("/banner/:id", AuthAdminId, getBannerById);
router.put("/update-banner/:id", AuthAdminId, upload.none(), updateBanner);
router.put(
  "/update-banner-image/:bannerId/:imageId",
  AuthAdminId,
  upload.single("file"),
  updateSingleBannerImage
);
router.delete("/delete-banner/:id", AuthAdminId, deleteBanner);

module.exports = router;
