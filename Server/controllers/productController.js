const Product = require("../models/Product");
const { v4: uuidv4 } = require("uuid");
const uploadToCloudinary = require("../uploads/cloudinaryStorage");

exports.addProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const uploaded = await uploadToCloudinary(file.buffer, "products");
        return {
          id: uploaded.public_id || uuidv4(),
          url: uploaded.secure_url || uploaded.url,
          filename: file.originalname, 
        };
      })
    );

    const filter = req.body.filter ? JSON.parse(req.body.filter) : null;
    if (!filter) {
      return res.status(400).json({
        success: false,
        message: "Filter data is required",
      });
    }

    // Build product object
    const productData = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      sellingPrice: parseFloat(req.body.sellingPrice),
      offerPercentage: parseFloat(req.body.offerPercentage),
      availableQuantity: parseInt(req.body.availableQuantity),
      inStock: req.body.inStock === "false" ? false : true,
      description: JSON.parse(req.body.description),
      images: imageUrls,
      filter:
        typeof req.body.filter === "string"
          ? JSON.parse(req.body.filter)
          : req.body.filter,
      admin: req.admin._id, // authenticated admin
      status: req.body.status || "draft", // Default status for new products
    };

    // Save to DB
    const product = await Product.create(productData);

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    
    // If status is specified in query, filter by that status
    if (status) {
      if (!['active', 'draft'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status value. Must be either 'active' or 'draft'",
        });
      }
      filter.status = status;
    } 
    // If no status specified, fetch all products (both active and draft)
    // No need to set filter.status in this case

    const products = await Product.find(filter);
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

exports.getActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'active' });
    
    res.status(200).json({
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching active products",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

exports.getProductsByFilter = async (req, res) => {
  try {
    const { type, value } = req.params;

    if (!type || !value) {
      return res.status(400).json({
        success: false,
        message: "Missing type or value in params",
      });
    }

    let filter = {
      status: "active", // Only fetch active products
    };

    if (type === "material") {
      filter["filter.material"] = { $regex: new RegExp(`^${value}$`, "i") }; // case-insensitive exact match
    } else if (type === "occasion") {
      filter["filter.occasion"] = { $regex: new RegExp(`^${value}$`, "i") }; // case-insensitive match in array
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid filter type. Must be 'material' or 'occasion'",
      });
    }

    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 🛡️ Parse and sanitize form fields
    const {
      title,
      price,
      sellingPrice,
      offerPercentage,
      availableQuantity,
      inStock,
      description,
      filter,
      status, // Add status field
    } = req.body;

    const parsedDescription =
      typeof description === "string" ? JSON.parse(description) : description;
    const parsedFilter =
      typeof filter === "string" ? JSON.parse(filter) : filter;

    const updatedData = {
      title,
      price: parseFloat(price),
      sellingPrice: parseFloat(sellingPrice),
      offerPercentage: parseFloat(offerPercentage),
      availableQuantity: parseInt(availableQuantity),
      inStock: inStock === "false" ? false : true,
      description: parsedDescription,
      filter: parsedFilter,
      status, // Include status in update
    };

    // 🛠️ Update in DB
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateSingleImage = async (req, res) => {
  try {
    const { productId, imageId } = req.params;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const imageIndex = product.images.findIndex((img) => img.id === imageId);
    if (imageIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found in product" });
    }

    // Upload new image to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, "products");

    // Extract URL safely depending on what uploadToCloudinary returns
    let newUrl = "";
    if (typeof uploadResult === "string") {
      newUrl = uploadResult;
    } else if (uploadResult && typeof uploadResult.url === "string") {
      newUrl = uploadResult.url;
    } else {
      return res.status(500).json({
        success: false,
        message: "Invalid upload result from Cloudinary",
      });
    }

    const newImage = {
      id: uuidv4(),
      url: newUrl,
    };

    // Replace old image
    product.images[imageIndex] = newImage;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating image",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};