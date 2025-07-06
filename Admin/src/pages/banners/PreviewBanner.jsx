import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const PreviewBanner = ({ bannerImages, formData, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (bannerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === bannerImages.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [bannerImages]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Banner Preview</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        
          {/* Banner Display */}
          <div className="w-full">
            {bannerImages.length > 0 ? (
              <>
                <div className="relative w-full h-64 rounded-md overflow-hidden bg-gray-100">
                  {bannerImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay content */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 p-6 flex flex-col justify-center items-start">
                        <div className="text-left max-w-lg">
                          <h4 className="font-bold text-white text-2xl mb-2">
                            {formData?.title || ""}
                          </h4>
                          <p className="text-white text-lg mb-3">
                            {formData?.subtitle || ""}
                          </p>
                          <p className="text-white text-sm mb-4">
                            {formData?.description || ""}
                          </p>
                          {formData?.ctaText && (
                            <button className="px-4 py-2 bg-pink-600 text-white rounded-md text-sm hover:bg-pink-700">
                              {formData.ctaText}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center space-x-2 mt-4">
                  {bannerImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex
                          ? "bg-pink-600"
                          : "bg-gray-300"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                No images uploaded for preview
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewBanner;
