const Wishlist = require("../models/Wishlist");

exports.addToWishlist = async (req, res) => {
  const { wishlistItem } = req.body;
  const userId = req.user._id;

  try {
    // Validate required fields
    if (!wishlistItem?.product || !wishlistItem?.title) {
      return res.status(400).json({
        success: false,
        message: "Missing required product fields",
      });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    // Create new wishlist if doesn't exist
    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        items: [wishlistItem],
      });
    } else {
      // Check for existing product
      const exists = wishlist.items.some(
        (item) => item.product.toString() === wishlistItem.product
      );

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Product already in wishlist",
        });
      }

      // Add new item
      wishlist.items.push(wishlistItem);
    }

    await wishlist.save();

    // Return populated data
    const populatedWishlist = await Wishlist.findById(wishlist._id).populate(
      "items.product",
      "title price sellingPrice images"
    );

    return res.status(200).json({
      success: true,
      wishlist: populatedWishlist,
    });
  } catch (error) {
    console.error("Wishlist error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product",
      "title price sellingPrice images filter"
    );

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }

    const formattedWishlist = {
      _id: wishlist._id,
      user: wishlist.user,
      createdAt: wishlist.createdAt,
      updatedAt: wishlist.updatedAt,
      items: wishlist.items.map((item) => {
        const product = item.product;

        return {
          _id: item._id,
          product: {
            _id: product?._id || item.product, // in case populate fails
          },
          title: item.title,
          price: item.price,
          sellingPrice: item.sellingPrice,
          color: item.color,
          image: item.image,
          addedAt: item.addedAt,
        };
      }),
    };

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      ...formattedWishlist,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Find index of item with matching productId
    const itemIndex = wishlist.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    // Remove item by index
    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.clearWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { items: [] },
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({ message: "Wishlist cleared", wishlist });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};
