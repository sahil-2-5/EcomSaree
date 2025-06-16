import React from "react";

const LoadingSpinner = ({ fullScreen = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen w-screen" : "h-full w-full"
      }`}
    >
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 rounded-full border-4 border-pink-200"></div>
        
        {/* Inner spinning circle */}
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-pink-600 border-t-transparent animate-spin"></div>
        
        {/* Optional loading text */}
        {fullScreen && (
          <p className="mt-4 text-center text-gray-600 font-medium">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;