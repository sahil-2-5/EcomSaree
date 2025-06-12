import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

const LoginRequired = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md w-full text-center">
        <FiLogIn className="w-12 h-12 mx-auto text-pink-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
        <p className="text-gray-600 mb-6">
          You must be logged in as an admin to access this page.
        </p>
        <Link
          to="/admin/login"
          className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default LoginRequired;
