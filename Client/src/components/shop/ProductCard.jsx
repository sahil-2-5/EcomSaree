import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle wishlist
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
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
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* View details overlay */}
        <div
          className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="bg-white/90 text-gray-900 px-6 py-2 text-sm font-medium">
            View Details
          </span>
        </div>

        {/* Action buttons */}
        <div
          className={`absolute inset-x-0 bottom-0 flex justify-between items-center p-4 bg-white/90 transition-all duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
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
            className="flex items-center px-4 py-2 border border-gray-200 hover:border-pink-200 bg-white text-sm font-medium transition-colors duration-300"
            aria-label="Add to wishlist"
          >
            <FiHeart className="w-4 h-4 mr-2 text-pink-600" />
            Wishlist
          </button>
        </div>

        {/* Product badges */}
        <div className="absolute left-0 top-4">
          {product.discount && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-pink-600 text-white">
              {product.discount}% OFF
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-orange-600 text-white mt-1">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-600 text-white mt-1">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase">{product.material}</span>
        </div>

        <h3 className="text-base font-medium text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.div>
    </Link>
  );
};

export default ProductCard;
