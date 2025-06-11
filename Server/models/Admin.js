const mongoose = require("mongoose");
const productSchema = require("./Product");

const adminSchema = new mongoose.Schema(
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
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'  
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
