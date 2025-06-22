import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart , fetchCart  } = useCart();
  const { addToWishlist, isInWishlist } = useWishlistContext();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await addToCart(product._id, 1);

    if (result.success) {
      await fetchCart();
      alert("Product added to cart successfully!");
    } else {
      alert(result.message || "Failed to add to cart");
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const result = await addToWishlist({
        id: product._id,
        title: product.title,
        price: product.price,
        sellingPrice: product.sellingPrice,
        color: product.filter.color,
        images: product.images[0].url,
      });

      if (result.success) {
        alert("Product added to wishlist successfully!");
      } else {
        alert(result.message || "Failed to add to wishlist");
      }
    } catch (error) {
      alert(error.message || "An error occurred while adding to wishlist");
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="block group">
      <motion.div
        className="relative bg-white overflow-hidden border border-gray-200 hover:border-pink-200 transition-all duration-300 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative h-[400px] overflow-hidden">
          {/* Product image with zoom effect */}
          <img
            src={product.images[0].url}
            alt={product.title}
            className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          />

          {/* View details overlay */}
          <div
            className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="bg-white/90 text-gray-900 px-6 py-2 text-sm font-medium">
              View Details
            </span>
          </div>

          {/* Action buttons */}
          <div
            className={`absolute inset-x-0 bottom-0 flex justify-between items-center p-2 bg-white/90 transition-all duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-colors duration-300"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className={`flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-300 ${
                isInWishlist(product._id)
                  ? "border-pink-200 bg-pink-50 text-pink-600"
                  : "border-gray-200 hover:border-pink-200 bg-white"
              }`}
              aria-label={
                isInWishlist(product._id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              <FiHeart
                className={`w-4 h-4 mr-2 ${
                  isInWishlist(product._id) ? "fill-current" : ""
                }`}
              />
              {isInWishlist(product._id) ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          {/* Product badges */}
          <div className="absolute left-0 top-4">
            {product.offerPercentage && (
              <span className="inline-block px-3 py-1 text-xs font-medium bg-pink-600 text-white">
                {product.offerPercentage}% OFF
              </span>
            )}
            {product.availableQuantity <= 5 &&
              product.availableQuantity > 0 && (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-red-500 text-white mt-1">
                  Only {product.availableQuantity} left
                </span>
              )}
            {product.availableQuantity === 0 && (
              <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-600 text-white mt-1">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-gray-500 uppercase">
              {product.filter.material}
            </span>
          </div>

          <div className="w-[200px]">
            <h3 className="text-base font-medium text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300 truncate">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              ₹{product.sellingPrice.toLocaleString()}
            </span>
            {product.price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
