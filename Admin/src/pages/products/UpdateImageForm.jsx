import React, { useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import Button from "../../components/common/Button";

const UpdateImageForm = ({ product, onClose }) => {
  const { updateSingleImage } = useProductContext();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      e.target.value = ""; // Reset input to allow re-uploading same file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || selectedImageIndex === null) return;

    // Get the selected image from product.images
    const selectedImage = product.images[selectedImageIndex];

    if (!selectedImage || !selectedImage.id) {
      console.error("No image selected or selected image has no _id");
      alert("Please select a valid image to replace");
      return;
    }

    setLoading(true);
    try {
      // Call the updateSingleImage function from context
      const updatedProduct = await updateSingleImage(
        product._id,
        selectedImage.id,
        file
      );
      
      alert("Image updated successfully!");
      onClose(); // Close the modal after successful update
    } catch (err) {
      console.error("Image update failed:", err);
      alert(
        `Image update failed: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="relative bg-white rounded-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl p-4 sm:p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Update Product Images
        </h2>

        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Current Images Preview */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-pink-500 mb-6">
              Current Images
            </h3>

            {/* Main Selected Image */}
            <div className="w-full max-w-md aspect-[3/4] bg-gray-100 border border-pink-400 rounded-xl overflow-hidden">
              {product.images?.[selectedImageIndex]?.url ? (
                <img
                  src={product.images[selectedImageIndex].url}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-pink-500 text-sm px-4 text-center">
                  Select an image to replace
                </div>
              )}
            </div>

            {/* Thumbnails with arrows */}
            {product.images?.length > 0 && (
              <div className="mt-4 w-full max-w-md flex items-center gap-2 justify-center">
                <button
                  onClick={() =>
                    setThumbnailStart((prev) => Math.max(prev - 1, 0))
                  }
                  className="text-gray-500 hover:text-black disabled:opacity-30"
                  disabled={thumbnailStart === 0}
                >
                  &#8592;
                </button>

                <div className="flex gap-2 overflow-hidden">
                  {product.images
                    .slice(thumbnailStart, thumbnailStart + 3)
                    .map((img, idx) => {
                      const actualIdx = thumbnailStart + idx;
                      return (
                        <img
                          key={img._id || img.id}
                          src={img.url}
                          alt={`Thumb-${actualIdx}`}
                          onClick={() => {
                            setSelectedImageIndex(actualIdx);
                            if (actualIdx >= thumbnailStart + 3) {
                              setThumbnailStart(actualIdx - 2);
                            } else if (actualIdx < thumbnailStart) {
                              setThumbnailStart(actualIdx);
                            }
                          }}
                          className={`w-20 h-20 object-cover border rounded-md cursor-pointer ${
                            selectedImageIndex === actualIdx
                              ? "border-2 border-pink-500"
                              : "border-gray-300"
                          }`}
                        />
                      );
                    })}
                </div>

                <button
                  onClick={() =>
                    setThumbnailStart((prev) =>
                      Math.min(prev + 1, product.images.length - 3)
                    )
                  }
                  className="text-gray-500 hover:text-black disabled:opacity-30"
                  disabled={thumbnailStart + 3 >= product.images.length}
                >
                  &#8594;
                </button>
              </div>
            )}
          </div>

          {/* Right Column - New Image Upload */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-white rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-pink-500 mb-6 -mt-4">
                Upload New Image
              </h3>

              <div className="w-full max-w-md aspect-[3/4] relative bg-gray-100 border-dashed border-2 border-pink-400 rounded-lg flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-pink-500 text-center text-sm px-4">
                    Drag and drop or{" "}
                    <span className="text-pink-600 font-medium underline">
                      click to upload
                    </span>
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {preview && (
                <div className="w-full max-w-md mt-4 flex flex-col items-center">
                  <div className="flex justify-center">
                    <span className="w-2 h-2 mx-1 rounded-full bg-pink-500 scale-110"></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="mt-2 text-pink-500 text-sm font-medium hover:underline"
                  >
                    Clear Image
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={onClose} className="px-6 py-2">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!file || selectedImageIndex === null || loading}
                className="px-6 py-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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
      </div>
    </div>
  );
};

export default UpdateImageForm;
