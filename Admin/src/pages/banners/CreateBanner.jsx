import React, { useState, useEffect } from "react";
import { FiUpload, FiX, FiChevronDown } from "react-icons/fi";

const CreateBanner = ({ onClose }) => {
  const [bannerImages, setBannerImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: "Festive Sale",
    subtitle: "Up to 60% Off",
    ctaText: "Shop Now",
    ctaPosition: 1,
    description: "Celebrate with style. Limited time only!",
    bannerType: "Featured",
    status: "Draft",
    startDate: "",
    endDate: "",
    tags: []
  });
  const [errors, setErrors] = useState({});

  // Auto-rotate images every 3 seconds if there are multiple images
  useEffect(() => {
    if (bannerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [bannerImages.length]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024);
    
    if (validFiles.length !== files.length) {
      setErrors({...errors, image: "Some files were too large (max 10MB)"});
    } else {
      setErrors({...errors, image: ""});
    }
    
    const newImages = validFiles.map(file => URL.createObjectURL(file));
    setBannerImages([...bannerImages, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...bannerImages];
    newImages.splice(index, 1);
    setBannerImages(newImages);
    if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(Math.max(0, newImages.length - 1));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    if (errors[name]) setErrors({...errors, [name]: ""});
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
    
    if (bannerImages.length === 0) newErrors.image = "At least one banner image is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit logic here
    console.log("Form submitted:", { ...formData, bannerImages });
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl">
      {/* Header */}
      <div className="bg-gradient-to-r p-4 text-pink-600 ">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Create New Banner</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Image Upload & Preview Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <FiUpload className="mr-2 text-pink-600" />
            Banner Images & Preview
          </h3>
          
          <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all 
            ${errors.image ? "border-red-500 bg-red-50" : "border-pink-300 hover:border-pink-400 hover:bg-pink-50"}`}>
            <input 
              type="file" 
              onChange={handleImageUpload} 
              className="hidden" 
              id="bannerImage" 
              accept="image/*"
              multiple
            />
            <label htmlFor="bannerImage" className="flex flex-col items-center justify-center space-y-3">
              {bannerImages.length > 0 ? (
                <div className="w-full">
                  {/* Single banner preview with all images rotating */}
                  <div className="relative w-full h-64 rounded-md overflow-hidden">
                    {bannerImages.map((image, index) => (
                      <div 
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <img 
                          src={image} 
                          alt={`Banner ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 p-6 flex flex-col justify-center items-start">
                          <div className="text-left max-w-lg">
                            <h4 className="font-bold text-white text-2xl mb-2">{formData.title}</h4>
                            <p className="text-white text-lg mb-3">{formData.subtitle}</p>
                            <p className="text-white text-sm mb-4">{formData.description}</p>
                            <button className="px-4 py-2 bg-pink-600 text-white rounded-md text-sm hover:bg-pink-700">
                              {formData.ctaText}
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        >
                          <FiX className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation dots */}
                  <div className="flex justify-center space-x-2 mt-4">
                    {bannerImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-pink-600' : 'bg-gray-300'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                    <FiUpload className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-pink-600 font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB • Recommended: 1200×400px
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      You can upload multiple images for a slideshow
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Summer Sale 2024"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Up to 50% off on all items"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* CTA Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CTA Text
                </label>
                <input
                  type="text"
                  name="ctaText"
                  value={formData.ctaText}
                  onChange={handleChange}
                  placeholder="Shop Now"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  name="ctaPosition"
                  value={formData.ctaPosition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 appearance-none"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description about the banner campaign..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Banner Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Type
                </label>
                <div className="relative">
                  <select
                    name="bannerType"
                    value={formData.bannerType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 appearance-none"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 appearance-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Schedule */}
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
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                      errors.startDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                  )}
                </div>
                <div>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    min={formData.startDate}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                      errors.endDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
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

        {/* Form Actions */}
        <div className=" pt-5 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Create Banner
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBanner;