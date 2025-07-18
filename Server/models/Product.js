const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const filterSchema = new mongoose.Schema(
  {
    material: {
      type: String,
      required: true,
      enum: ["Silk", "Cotton", "Georgette", "Chiffon", "Crepe"], 
    },
    occasion: {
      type: [String],
      required: true,
      enum: ["Wedding", "Party", "Casual", "Festival", "Office"], 
    },
    color: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    images: {
      type: [imageSchema],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    offerPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    filter: {
      type: filterSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "draft"],
      default: "draft",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
