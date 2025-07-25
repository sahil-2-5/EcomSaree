import React, { useState } from "react";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, fetchCart } = useCart();
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

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const result = await addToWishlist({
        id: product._id,
        title: product.title || product.name,
        price: product.price,
        sellingPrice: product.sellingPrice,
        color: product.filter?.color,
        images: product.images?.[0]?.url,
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
    <Link to={`/product/${product._id}`}>
      <div
        className="group relative overflow-hidden bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[3/4] overflow-hidden relative">
          <img
            src={
              product.image ||
              product.images?.[0]?.url ||
              "https://via.placeholder.com/300x400?text=No+Image"
            }
            alt={product.name}
            className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
            <button
              onClick={handleAddToWishlist}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-pink-50 transform hover:scale-110 transition-all duration-300 hover:shadow-pink-500/20"
              aria-label="Add to wishlist"
            >
              <FiHeart
                className={`w-5 h-5 ${
                  isInWishlist(product._id) ? "text-pink-600 fill-current" : "text-pink-600"
                }`}
              />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-pink-50 transform hover:scale-110 transition-all duration-300 hover:shadow-pink-500/20"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="w-5 h-5 text-pink-600" />
            </button>
          </div>
        </div>
        <div className="p-6 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 text-xs font-medium bg-pink-50 text-pink-800 rounded-md border border-pink-100">
              {product.material || product.filter?.material || "Saree"}
            </span>
            {product.offerPercentage && (
              <span className="px-2.5 py-0.5 text-xs font-medium bg-green-50 text-green-800 rounded-md border border-green-100">
                {product.offerPercentage}% off
              </span>
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1 leading-snug truncate">
            {product.name || product.title}
          </h3>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-semibold text-gray-900">
              ₹{product.sellingPrice?.toLocaleString()}
            </span>
            {product.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.price?.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <Link
              to={`/product/${product._id}`}
              className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors duration-300"
            >
              View Details
            </Link>
            <button
              className="p-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-full transition-colors duration-300"
              aria-label="Quick view"
            >
              <FiEye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedProducts = () => {
  const { products = [] } = useProductContext();

  const latestProducts = [...products]
    .filter((p) => p.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-sm font-medium text-pink-600 tracking-wide uppercase mb-3 block">
              New Arrivals
            </span>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Fresh Picks for You
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-pink-600 hover:text-white bg-white hover:bg-pink-600 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-200 hover:border-transparent"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestProducts.length > 0 ? (
            latestProducts.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No new products available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
