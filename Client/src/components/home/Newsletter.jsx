import React from 'react';
import Button from '../common/Button';

const Newsletter = () => {
  return (
    <div className="bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay updated with our latest collections, exclusive offers, and styling tips.
            Subscribe now and get 10% off on your first order!
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500"
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates
              from our company.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
