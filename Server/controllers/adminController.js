const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const generateAdminToken = require("../utils/service/admin/generateAdminToken");
const adminSignupOTP = require("../utils/service/admin/adminSignupOTP");
const resetAdminPasswordOTP = require("../utils/service/admin/resetAdminPasswordOTP");

// exports.sendOtp = async (req, res) => {
//   const { email } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   let admin = await Admin.findOne({ email });
//   if (!admin) {
//     admin = await Admin.create({ email });
//   }
//   admin.otp = otp;
//   admin.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
//   await admin.save();

//   await sendAdminOTP(email, otp);

//   res.status(200).json({
//     success: true,
//     message: "OTP sent to your email",
//   });
// };

// exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   const admin = await Admin.findOne({ email });
//   if (!admin || admin.otp !== otp || Date.now() > admin.otpExpires) {
//     return res.status(400).json({ message: "Invalid or expired OTP" });
//   }

//   admin.otp = null;
//   admin.otpExpires = null;
//   await admin.save();

//   const token = generateAdminToken(admin._id);
//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });

//   res.status(200).json({
//     _id: admin._id,
//     email: admin.email,
//     token,
//     success: true,
//   });
// };

// exports.logoutAdmin = async (req, res) => {
//   // Remove the token from the client side (Frontend)
//   res.clearCookie("token");
//   res.status(200).json({
//     success: true,
//     message: "Logged out successfully, session cookie cleared",
//   });
// };

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, agreedToTerms } = req.body;
  try {
    if (!agreedToTerms) {
      return res.status(400).json({
        msg: "You must agree to the Terms and Conditions and Privacy Policy",
      });
    }

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const admin = new Admin({
      firstName,
      lastName,
      email,
      password: hash,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
      agreedToTerms,
    });

    await admin.save();

    await adminSignupOTP(email, otp);

    res.status(200).json({ msg: "OTP send to email" });
  } catch (err) {
    res.status(500).json({ msg: "Signup error", error: err.message });
  }
};

exports.verifySignupOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.otp !== otp || admin.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }
    admin.isVerified = true;
    admin.otp = null;
    admin.otpExpires = null;
    await admin.save();

    res.status(200).json({ msg: "Email varified successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Verification error", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

    if (!admin.isVerified) {
      return res.status(403).json({ msg: "Email not verified" });
    }

    const adminToken = generateAdminToken(admin._id);

    req.session.admin = {
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      isVerified: admin.isVerified,
      adminToken: adminToken,
    };

    res.cookie("token", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      ...req.session.admin,
      adminToken: adminToken,
      msg: "Login Successfully",
    });
  } catch (err) {
    res.status(500).json({ msg: "Login error", error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ msg: "Email not registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpires = Date.now() + 5 * 60 + 1000;
    await admin.save();

    await resetAdminPasswordOTP(email, otp);

    res.status(200).json({ msg: "Reset OTP send to email" });
  } catch (err) {
    res.status(500).json({ msg: "Error sending OTP", error: err.message });
  }
};

exports.verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.otp !== otp || admin.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }
    await admin.save();
    res
      .json(200)
      .json({ msg: "OTP verified. You can now reset your password." });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "OTP verification failed", error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const admin = await Admin.findOne({ email });

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.otp = null;
    admin.otpExpires = null;
    await admin.save();

    res.status(200).json({ msg: "Password reset successful" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error resetting password", error: err.message });
  }
};

exports.logoutAdmin = async (req, res) => {
  res.session.destroy((err) => {
    if (err) return res.status(500).json({ msg: "Logout failed" });
    res.clearCookie("connect.sid");
    res.status(200).json({ msg: "Logged out successfully" });
  });
};

exports.getSession = async (req, res) => {
  try {
    const admin = await Admin.findById(req.session.admin._id).select(
      "-password -otp -otpExpires"
    );
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    res.status(200).json({
      admin,
      success: true,
      msg: "Session retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({ msg: "Session error", error: err.message });
  }
};
