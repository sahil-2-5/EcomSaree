import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import saree1 from "../../assets/saree1.jpg"
import saree2 from "../../assets/saree2.jpg"
import saree3 from "../../assets/saree3.jpg"

const Wishlist = () => {
  // TODO: Get from WishlistContext
  const wishlistItems = [
    {
      id: 1,
      name: 'Banarasi Silk Saree',
      price: '₹15,999',
      originalPrice: '₹18,999',
      image: saree1,
      color: 'Pink',
      inStock: true,
    },
    {
      id: 2,
      name: 'Kanjivaram Silk Saree',
      price: '₹18,999',
      originalPrice: '₹21,999',
      image: saree2,
      color: 'Blue',
      inStock: true,
    },
    {
      id: 3,
      name: 'Designer Party Wear Saree',
      price: '₹12,999',
      originalPrice: '₹14,999',
      image: saree3,
      color: 'Red',
      inStock: false,
    },
  ];

  const handleRemoveFromWishlist = (id) => {
    // TODO: Implement remove from wishlist
    console.log('Remove from wishlist:', id);
  };

  const handleAddToCart = (id) => {
    // TODO: Implement add to cart
    console.log('Add to cart:', id);
  };

  if (wishlistItems.length === 0) {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">{wishlistItems.length} items saved to your wishlist</p>
        </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 hover:border-pink-200 transition-all duration-300"
          >
            <div className="relative aspect-w-2 aspect-[3/4] ">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="absolute top-4 right-4 p-3 bg-white/90 border border-gray-200 hover:border-pink-200 transition-colors duration-300"
              >
                <FiTrash2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-1">
                <span className="text-xs text-gray-500 uppercase">{item.color}</span>
              </div>
              
              <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-lg font-semibold text-gray-900">{item.price}</span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {item.originalPrice}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {item.inStock ? (
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-colors duration-300"
                  >
                    <FiShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                ) : (
                  <div className="w-full px-4 py-2 bg-gray-100 text-gray-400 text-sm font-medium text-center">
                    Out of Stock
                  </div>
                )}
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
