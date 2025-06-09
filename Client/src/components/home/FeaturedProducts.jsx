import React, { useState } from 'react';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import saree1 from "../../assets/saree1.jpg"
import saree2 from "../../assets/saree2.jpg"
import saree3 from "../../assets/saree3.jpg"
import saree5 from "../../assets/saree5.jpg"
import saree6 from "../../assets/saree6.jpeg"
import saree7 from "../../assets/saree7.jpeg"
import saree8 from "../../assets/saree8.jpeg"
import saree9 from "../../assets/saree9.jpeg"
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link to={""}>
    <div 
      className="group relative overflow-hidden bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
          <button 
            className="p-3 bg-white rounded-full shadow-lg hover:bg-pink-50 transform hover:scale-110 transition-all duration-300 hover:shadow-pink-500/20"
            aria-label="Add to wishlist"
          >
            <FiHeart className="w-5 h-5 text-pink-600" />
          </button>
          <button 
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
            {product.material}
          </span>
          {product.discount && (
            <span className="px-2.5 py-0.5 text-xs font-medium bg-green-50 text-green-800 rounded-md border border-green-100">
              {product.discount}% off
            </span>
          )}
        </div>
        <Link to={`/product/${product.id}`} className="block group-hover:opacity-75 transition-opacity duration-300">
          <h3 className="text-lg font-medium text-gray-900 mb-1 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-semibold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </Link>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Link 
            to={`/product/${product.id}`}
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
  const products = [
    {
      id: 1,
      name: 'Royal Banarasi Silk Saree',
      material: 'Pure Silk',
      price: 15999,
      originalPrice: 19999,
      discount: 20,
      image: saree1,
    },
    {
      id: 2,
      name: 'Traditional Kanjivaram Silk',
      material: 'Silk',
      price: 24999,
      originalPrice: 29999,
      discount: 17,
      image: saree2,
    },
    {
      id: 3,
      name: 'Elegant Cotton Saree',
      material: 'Cotton',
      price: 3999,
      originalPrice: 4999,
      discount: 20,
      image: saree3,
    },
    {
      id: 4,
      name: 'Designer Chanderi Silk',
      material: 'Chanderi Silk',
      price: 8999,
      originalPrice: 11999,
      discount: 25,
      image: saree5,
    },
    {
      id: 1,
      name: 'Banarasi Silk Saree',
      material: 'Pure Silk',
      price: 15999,
      originalPrice: 19999,
      discount: 20,
      image: saree6,
    },
    {
      id: 2,
      name: 'Kanjivaram Silk Saree',
      material: 'Silk',
      price: 24999,
      originalPrice: 29999,
      discount: 17,
      image: saree7,
    },
    {
      id: 3,
      name: 'Designer Cotton Saree',
      material: 'Cotton',
      price: 3999,
      originalPrice: 4999,
      discount: 20,
      image: saree8,
    },
    {
      id: 4,
      name: 'Chanderi Silk Saree',
      material: 'Chanderi Silk',
      price: 8999,
      originalPrice: 11999,
      discount: 25,
      image: saree9,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-sm font-medium text-pink-600 tracking-wide uppercase mb-3 block">Handpicked for You</span>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">Featured Collections</h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-pink-600 hover:text-white bg-white hover:bg-pink-600 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-200 hover:border-transparent"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
