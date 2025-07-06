import React, { useState } from "react";
import Button from "../../components/common/Button";
import { useBanner } from "../../context/BannerContext"; // Adjust the import path as needed

const EditBannerImage = ({ banner, onClose }) => {
  const { updateSingleBannerImage } = useBanner();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
    if (!file || !banner.images?.[selectedImageIndex]?.id) return;

    setLoading(true);
    try {
      // Call the updateSingleBannerImage function from context
      await updateSingleBannerImage(
        banner._id,
        banner.images[selectedImageIndex].id,
        file
      );
      
      alert("Banner image updated successfully!");
      onClose(); // Close the modal after successful update
    } catch (err) {
      console.error("Banner image update failed:", err);
      alert(
        `Banner image update failed: ${err.response?.data?.message || err.message}`
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
          Update Banner Images
        </h2>

        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Current Images Preview */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-pink-500 mb-6">
              Current Banner Images
            </h3>

            {/* Main Selected Image */}
            <div className="w-full aspect-[3/1] bg-gray-100 border border-pink-400 rounded-xl overflow-hidden">
              {banner.images?.[selectedImageIndex]?.url ? (
                <img
                  src={banner.images[selectedImageIndex].url}
                  alt="Selected Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-pink-500 text-sm px-4 text-center">
                  Select an image to replace
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {banner.images?.length > 0 && (
              <div className="mt-4 w-full flex flex-wrap gap-2 justify-center">
                {banner.images.map((img, idx) => (
                  <img
                    key={img._id || img.id}
                    src={img.url}
                    alt={`Banner-thumb-${idx}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 object-cover border rounded-md cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-2 border-pink-500"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - New Image Upload */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-white rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-pink-500 mb-6 -mt-4">
                Upload New Image
              </h3>

              <div className="w-full aspect-[3/1] relative bg-gray-100 border-dashed border-2 border-pink-400 rounded-lg flex items-center justify-center overflow-hidden">
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
                    <p className="mt-2 text-xs text-pink-400">
                      Recommended size: 1200×400px (3:1 aspect ratio)
                    </p>
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
                <div className="w-full mt-4 flex flex-col items-center">
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
                disabled={!file || !banner.images?.[selectedImageIndex]?.id || loading}
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
                  "Update Banner"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBannerImage;