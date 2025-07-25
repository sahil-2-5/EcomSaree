const mongoose = require("mongoose");

// Image sub-schema
const imageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    comment: {
      type: String,
      trim: true,
      required: [true, "Comment is required"],
    },
    images: {
      type: [imageSchema],
      default: [], // Optional field
    },
    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate reviews by same user on same product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
