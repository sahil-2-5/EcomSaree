const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
      type: [imageSchema],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    type: {
      type: String,
      required: true,
      enum: ["new-arrival", "sale", "trending", "featured", "festive"],
    },
    ctaText: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "draft"],
      default: "draft",
    },
    position: {
      type: Number,
      default: 1,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    tags: {
      type: [String],
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

module.exports = mongoose.model("Banner", bannerSchema);
