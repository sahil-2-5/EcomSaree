import React from 'react';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import toast from 'react-hot-toast';
import saree1 from "../../assets/saree1.jpg"
import saree2 from "../../assets/saree2.jpg"
import saree3 from "../../assets/saree3.jpg"
import saree4 from "../../assets/saree4.jpg"
import saree5 from "../../assets/saree5.jpg"
import saree6 from "../../assets/saree6.jpeg"
import saree7 from "../../assets/saree7.jpeg"
import saree8 from "../../assets/saree8.jpeg"
import saree9 from "../../assets/saree9.jpeg"

const NewArrivals = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const products = [
    {
      id: 1,
      name: 'Designer Banarasi Silk Saree',
      price: '₹15,999',
      originalPrice: '₹18,999',
      image: saree1,
      isNew: true,
      discount: '15% OFF',
    },
    {
      id: 2,
      name: 'Bridal Kanjivaram Silk Saree',
      price: '₹25,999',
      originalPrice: '₹29,999',
      image: saree2,
      isNew: true,
      discount: '13% OFF',
    },
    {
      id: 3,
      name: 'Party Wear Designer Saree',
      price: '₹12,999',
      originalPrice: '₹14,999',
      image: saree3,
      isNew: true,
      discount: '13% OFF',
    },
    {
      id: 4,
      name: 'Handloom Cotton Silk Saree',
      price: '₹8,999',
      originalPrice: '₹10,999',
      image: saree4,
      isNew: true,
      discount: '18% OFF',
    },
    {
      id: 5,
      name: 'Printed Georgette Saree',
      price: '₹6,999',
      originalPrice: '₹8,999',
      image: saree5,
      isNew: true,
      discount: '22% OFF',
    },
    {
      id: 6,
      name: 'Designer Chiffon Saree',
      price: '₹9,999',
      originalPrice: '₹11,999',
      image: saree6,
      isNew: true,
      discount: '17% OFF',
    },
    {
      id: 7,
      name: 'Embroidered Art Silk Saree',
      price: '₹7,999',
      originalPrice: '₹9,999',
      image: saree7,
      isNew: true,
      discount: '20% OFF',
    },
    {
      id: 8,
      name: 'Zari Work Silk Saree',
      price: '₹19,999',
      originalPrice: '₹22,999',
      image: saree2,
      isNew: true,
      discount: '13% OFF',
    },
    {
      id: 9,
      name: 'Designer Wedding Saree',
      price: '₹32,999',
      originalPrice: '₹36,999',
      image: saree9,
      isNew: true,
      discount: '11% OFF',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h1>
        <p className="text-lg text-gray-600">
          Discover our latest collection of stunning sarees
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div className="relative aspect-[3/4]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* New Tag */}
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  New
                </span>
              </div>

              {/* Discount Tag */}
              {product.discount && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {product.discount}
                  </span>
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => {
                      if (isInWishlist(product.id)) {
                        removeFromWishlist(product.id);
                        toast.success('Removed from wishlist');
                      } else {
                        addToWishlist(product);
                        toast.success('Added to wishlist');
                      }
                    }}
                    className={`p-2 rounded-full ${isInWishlist(product.id) ? 'bg-pink-600 text-white' : 'bg-white text-gray-900'} hover:bg-gray-100`}
                  >
                    <FiHeart className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      toast.success('Added to cart');
                    }}
                    className="p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-gray-900">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
