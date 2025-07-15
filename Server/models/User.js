const mongoose = require("mongoose");
const addressSchema = require("./Address");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    agreedToTerms: {
      type: Boolean,
      required: [
        true,
        "You must agree to the Terms and Conditions and Privacy Policy",
      ],
      validate: {
        validator: function (value) {
          return value === true;
        },
        message: "Agreement to Terms & Privacy Policy is required",
      },
    },
    addresses: [addressSchema],
    orders: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
