const Review = require("../models/ProductReview");
const uploadToCloudinary = require("../uploads/cloudinaryStorage");
const { v4: uuidv4 } = require("uuid");


exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    let imageUrls = [];

    // Handle uploaded files if any
    if (req.files && req.files.length > 0) {
      imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const uploaded = await uploadToCloudinary(file.buffer, "reviews");
          return {
            id: uploaded.public_id || uuidv4(),
            url: uploaded.secure_url || uploaded.url,
          };
        })
      );
    }

    const newReview = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
      images: imageUrls,
    });

    const savedReview = await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review: savedReview,
    });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};


exports.getReviewsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const reviews = await Review.find({ product: productId })
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};


exports.updateReviewStatus = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const { status } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { status },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review status updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update review status",
      error: error.message,
    });
  }
};


exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};


exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("product", "title price");

    res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};
