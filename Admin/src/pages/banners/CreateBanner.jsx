import React, { useState } from "react";

const CreateBanner = ({ onClose }) => {
  const [bannerImage, setBannerImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setBannerImage(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white p-6 rounded shadow border max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-pink-600">Banner Image & Preview</h2>
      
      <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 mb-6 text-center cursor-pointer hover:bg-pink-50">
        <input type="file" onChange={handleImageUpload} className="hidden" id="bannerImage" />
        <label htmlFor="bannerImage" className="flex flex-col items-center justify-center space-y-2">
          {bannerImage ? (
            <img src={bannerImage} alt="Preview" className="max-h-40 object-contain" />
          ) : (
            <>
              <svg className="w-10 h-10 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4-4-4-4m0 8h16m-8 8V4" />
              </svg>
              <p className="text-pink-600 font-medium">Drag and drop or click to upload banner image</p>
              <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB • Recommended: 1200×400px</p>
            </>
          )}
        </label>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="text-pink-600 font-medium">Banner Title</label>
            <input type="text" placeholder="Banner Title" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="text-pink-600 font-medium">Subtitle</label>
            <input type="text" placeholder="Subtitle" className="w-full border p-2 rounded" />
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="text-pink-600 font-medium">CTA Text (e.g., Shop Now)</label>
              <input type="text" placeholder="CTA Text" className="w-full border p-2 rounded" />
            </div>
            <div className="w-12">
              <label className="text-pink-600 font-medium">#</label>
              <input type="number" defaultValue="1" className="w-full border p-2 rounded" />
            </div>
          </div>

          <div>
            <label className="text-pink-600 font-medium">CTA Link</label>
            <input type="text" placeholder="CTA Link" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="text-pink-600 font-medium">Banner Description</label>
            <textarea placeholder="Banner Description" className="w-full border p-2 rounded h-28" />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="text-pink-600 font-medium">Banner Settings</label>
            <select className="w-full border p-2 rounded">
              <option>Featured</option>
              <option>New Arrival</option>
              <option>Trending</option>
            </select>
            <select className="w-full border p-2 rounded mt-2">
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>

          <div>
            <label className="text-pink-600 font-medium">Schedule</label>
            <input type="date" className="w-full border p-2 rounded mt-1" placeholder="Start Date" />
            <input type="date" className="w-full border p-2 rounded mt-2" placeholder="End Date" />
          </div>

          <div>
            <label className="text-pink-600 font-medium">Tags</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["Promotional", "Seasonal", "Trending", "Featured", "Limited Time"].map((tag) => (
                <label key={tag} className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* Actions */}
      <div className="mt-6 flex justify-end space-x-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-gray-300 text-gray-600">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
          Add Banner
        </button>
      </div>
    </div>
  );
};

export default CreateBanner;
