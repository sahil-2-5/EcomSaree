import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import Button from "../../components/common/Button";

const EditBannerImage = ({ banner, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

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
    if (!file) return;

    setLoading(true);
    try {
      // TODO: Replace with actual API call to update banner image
      console.log("Updating banner image with file:", file);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Banner image updated successfully!");
      onClose(); // Close the modal after successful update
    } catch (err) {
      console.error("Banner image update failed:", err);
      alert(`Banner image update failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="relative bg-white rounded-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl p-4 sm:p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Banner Image
        </h2>

        {/* Content Wrapper */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Current Banner Image */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Current Banner
            </h3>

            <div className="w-full aspect-[3/1] bg-gray-100 border border-gray-300 rounded-xl overflow-hidden">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>
                <span className="font-medium">Title:</span> {banner.title}
              </p>
              <p>
                <span className="font-medium">Position:</span> {banner.position}
              </p>
            </div>
          </div>

          {/* Right Column - New Banner Upload */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-white rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Upload New Banner
              </h3>

              <div className="w-full aspect-[3/1] relative bg-gray-100 border-dashed border-2 border-blue-400 rounded-lg flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-center text-sm px-4">
                    Drag and drop or{" "}
                    <span className="text-blue-600 font-medium underline">
                      click to upload
                    </span>
                    <p className="mt-2 text-xs text-gray-400">
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
                    <span className="w-2 h-2 mx-1 rounded-full bg-blue-500 scale-110"></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="mt-2 text-blue-500 text-sm font-medium hover:underline"
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
                disabled={!file || loading}
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
