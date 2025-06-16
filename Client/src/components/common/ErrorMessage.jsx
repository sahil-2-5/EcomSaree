import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const ErrorMessage = ({ message, fullScreen = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "h-screen w-screen" : "h-full w-full"
      } p-4`}
    >
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
          <FiAlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;