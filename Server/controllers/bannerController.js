const Banner = require("../models/Banner");
const { v4: uuidv4 } = require("uuid");
const uploadToCloudinary = require("../uploads/cloudinaryStorage");

// Create Banner
exports.createBanner = async (req, res) => {
  try {
    // 1. Validate image upload
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No banner images uploaded",
      });
    }

    // 2. Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const uploaded = await uploadToCloudinary(file.buffer, "banners");
        return {
          id: uploaded.public_id || uuidv4(),
          url: uploaded.secure_url || uploaded.url,
          filename: file.originalname,
        };
      })
    );

    // 3. Convert comma-separated string tags to array
    const parsedTags = Array.isArray(req.body.tags)
      ? req.body.tags
      : typeof req.body.tags === "string"
      ? req.body.tags.split(",").map((tag) => tag.trim())
      : [];

    // 4. Build banner object
    const newBanner = new Banner({
      title: req.body.title,
      subTitle: req.body.subTitle,
      description: req.body.description,
      type: req.body.type,
      ctaText: req.body.ctaText,
      ctaLink: req.body.ctaLink,
      status: req.body.status || "draft",
      position: req.body.position ? parseInt(req.body.position) : 1,
      startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
      endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
      tags: parsedTags,
      images: uploadedImages,
      admin: req.admin._id || null,
    });

    // 5. Save and respond
    const savedBanner = await Banner.create(newBanner);

    return res.status(201).json({
      success: true,
      message: "Banner added successfully",
      data: savedBanner,
    });
  } catch (error) {
    console.error("Add Banner Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding banner",
      error: error.message,
    });
  }
};

// Get All Banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ position: 1 });
    return res.status(200).json({ success: true, data: banners });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Single Banner by ID
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }
    return res.status(200).json({ success: true, data: banner });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Banner
exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    const updates = req.body;

    // If image updated
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, "banners");
      updates.images = {
        id: uuidv4(),
        url: result.secure_url,
      };
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
      }
    );

    return res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    console.error("Update Banner Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateSingleBannerImage = async (req, res) => {
  try {
    const { bannerId, imageId } = req.params;

    // Check if file is present
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // Find the banner
    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // Find the index of the image to update
    const imageIndex = banner.images.findIndex((img) => img.id === imageId);
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Image not found in banner",
      });
    }

    // Upload new image to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, "banners");

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

    // Replace the old image object
    const newImage = {
      id: uuidv4(),
      url: newUrl,
      filename: req.file.originalname,
    };

    banner.images[imageIndex] = newImage;

    // Save updated banner
    const updatedBanner = await banner.save();

    return res.status(200).json({
      success: true,
      message: "Banner image updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    console.error("Update Banner Image Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating banner image",
      error: error.message,
    });
  }
};

// Delete Banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    await banner.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
