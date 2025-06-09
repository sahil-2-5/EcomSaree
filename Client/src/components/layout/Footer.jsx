import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">SareeShop</h3>
            <p className="text-gray-400 leading-relaxed">
              Discover the finest collection of traditional and contemporary sarees,
              crafted with love and attention to detail. Each piece tells a story of
              heritage and elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium tracking-wider text-gray-400 uppercase mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-pink-500">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-400 hover:text-pink-500">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-pink-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-pink-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-pink-500">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-pink-500">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-pink-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-pink-500">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <form className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 px-4 py-1 bg-pink-600 text-sm font-medium rounded-md hover:bg-pink-700 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="flex space-x-5">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} SareeShop. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">Terms of Service</Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
