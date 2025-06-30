import React, { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

const EditBanner = ({ banner, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: banner.title || "",
    subtitle: banner.subtitle || "",
    ctaText: banner.ctaText || "",
    ctaPosition: banner.ctaPosition || 1,
    description: banner.description || "",
    bannerType: banner.bannerType || "Featured",
    status: banner.status || "Draft",
    startDate: banner.startDate || "",
    endDate: banner.endDate || "",
    tags: banner.tags || []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleTagToggle = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.includes(tag)
        ? formData.tags.filter(t => t !== tag)
        : [...formData.tags, tag]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call update function
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl">
      {/* Header */}
      <div className="bg-gradient-to-r p-4 text-pink-600">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Edit Banner</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FiX className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Banner Title"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Subtitle"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                <input
                  type="text"
                  name="ctaText"
                  value={formData.ctaText}
                  onChange={handleChange}
                  placeholder="CTA Text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <select
                  name="ctaPosition"
                  value={formData.ctaPosition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none"
                >
                  {[1, 2, 3, 4, 5].map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Banner description..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Type</label>
                <div className="relative">
                  <select
                    name="bannerType"
                    value={formData.bannerType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none"
                  >
                    <option>Featured</option>
                    <option>New Arrival</option>
                    <option>Trending</option>
                    <option>Seasonal</option>
                    <option>Promotional</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none"
                  >
                    <option>Draft</option>
                    <option>Active</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      errors.startDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.startDate && <p className="text-sm text-red-600">{errors.startDate}</p>}
                </div>
                <div>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    min={formData.startDate}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      errors.endDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.endDate && <p className="text-sm text-red-600">{errors.endDate}</p>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["Promotional", "Seasonal", "Trending", "Featured", "Limited", "New"].map((tag) => (
                  <label
                    key={tag}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                      formData.tags.includes(tag)
                        ? "bg-pink-100 text-pink-700 border border-pink-300"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                      className="hidden"
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Actions */}
        <div className="pt-5 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-pink-600 text-white rounded-md text-sm font-medium hover:bg-pink-700"
          >
            Update Banner
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBanner;
