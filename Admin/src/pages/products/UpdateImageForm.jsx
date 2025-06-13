import React, { useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import Button from "../../components/common/Button";

const UpdateImageForm = ({ product, onClose }) => {
  const { updateSingleImage } = useProductContext();
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleSelectImage = (imageId) => {
    // Only set the selected image if it's not already selected
    if (selectedImageId !== imageId) {
      setSelectedImageId(imageId);
      setFile(null);
      setPreview(null);
    } else {
      // If clicking the already selected image, deselect it
      setSelectedImageId(null);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedImageId) return;

    setLoading(true);
    try {
      await updateSingleImage(product._id, selectedImageId, file);
      alert("Image updated successfully");
      onClose();
    } catch (err) {
      console.error("Image update failed:", err);
      alert("Image update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Update Product Images
          </h2>
          <p className="text-gray-500 mt-1">
            Select an image to replace and upload a new one
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Selection Grid */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-pink-500 mb-4">
              Current Images
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.images.map((img) => (
                <div
                  key={img._id}
                  onClick={() => handleSelectImage(img._id)}
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedImageId === img._id
                      ? "border-pink-500 ring-2 ring-pink-300"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <div className="w-full aspect-[3/4]">
                    <img
                      src={img.url}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-200 ${
                      selectedImageId === img._id
                        ? "bg-opacity-30"
                        : "hover:bg-opacity-20"
                    }`}
                  >
                    {selectedImageId === img._id && (
                      <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Selected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload Section - Only shows when an image is selected */}
          {selectedImageId && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-pink-500 mb-4">
                Upload New Image
              </h3>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* File Upload */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose new image
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer">
                      <span className="sr-only">Choose image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="px-4 py-2 bg-white border border-pink-400 rounded-lg text-pink-600 hover:bg-pink-50 transition-colors">
                        Browse Files
                      </div>
                    </label>
                    {file && (
                      <span className="text-sm text-gray-500 truncate">
                        {file.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Preview */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="w-full max-w-xs aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No preview available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with buttons */}
        <div className="border-t border-gray-200 p-6 flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!file || loading}
            className="px-6 py-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Image"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateImageForm;