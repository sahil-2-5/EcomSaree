import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useWishlistContext } from '../../context/WishlistContext';

const Wishlist = () => {
  const { 
    wishlist, 
    loading, 
    error, 
    fetchWishlist, 
    removeFromWishlist,
    clearWishlist 
  } = useWishlistContext();
  
  const [removingId, setRemovingId] = useState(null);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    setRemovingId(productId);
    try {
      await removeFromWishlist(productId);
    } finally {
      setRemovingId(null);
    }
  };

  const handleClearWishlist = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your entire wishlist?"
    );
    if (!confirmClear) return;

    setIsClearing(true);
    try {
      await clearWishlist();
    } finally {
      setIsClearing(false);
    }
  };

  const handleAddToCart = async (product) => {
    // Your add to cart implementation
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading wishlist</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchWishlist}
            className="inline-flex items-center px-6 py-2 border border-gray-200 bg-white hover:border-pink-200 text-pink-600 text-sm font-medium transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4">Wishlist</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
            <p className="text-lg text-gray-600 mb-8">Browse our collections and add your favorite items to the wishlist!</p>
            <Link
              to="/collections"
              className="inline-flex items-center px-8 py-3 border border-gray-200 bg-white hover:border-pink-200 hover:bg-pink-600 hover:text-white text-pink-600 text-sm font-medium transition-all duration-300"
            >
              Browse Collections
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white pt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4 w-fit">My Items</span>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-600">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
            </div>
            <button
              onClick={handleClearWishlist}
              disabled={isClearing}
              className="flex items-center justify-center sm:justify-start px-4 py-2 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-red-600 text-sm font-medium transition-colors duration-300 w-full sm:w-auto"
            >
              {isClearing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full mr-2"></div>
                  Clearing...
                </>
              ) : (
                <>
                  <FiTrash2 className="w-4 h-4 mr-2" />
                  Clear All Items
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => (
            <div
              key={item.product._id}
              className="bg-white border border-gray-200 hover:border-pink-200 transition-all duration-300 group relative"
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={item.image || '/default-product.jpg'}
                  alt={item.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <button
                  onClick={() => handleRemoveFromWishlist(item.product._id)}
                  disabled={removingId === item.product._id}
                  className={`absolute top-4 right-4 p-3 bg-white/90 border transition-colors duration-300 ${
                    removingId === item.product._id 
                      ? 'border-gray-300 cursor-wait' 
                      : 'border-gray-200 hover:border-pink-200'
                  }`}
                  aria-label="Remove from wishlist"
                >
                  {removingId === item.product._id ? (
                    <div className="animate-spin w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full"></div>
                  ) : (
                    <FiTrash2 className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>

              <div className="p-6">
                <div className="mb-1">
                  <span className="text-xs text-gray-500 uppercase">{item.color}</span>
                </div>
                
                <Link to={`/product/${item.product._id}`}>
                  <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2 hover:text-pink-600 transition-colors">
                    {item.title}
                  </h3>
                </Link>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{item.sellingPrice.toLocaleString()}
                  </span>
                  {item.price > item.sellingPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{item.price.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-colors duration-300"
                  >
                    <FiShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                  <Link 
                    to={`/product/${item.product._id}`} 
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 hover:border-pink-200 text-gray-700 text-sm font-medium transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;