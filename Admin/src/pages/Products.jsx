import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import AdminLayout from "../components/admin/AdminPanel";
import Button from "../components/common/Button";

const ProductForm = ({ onClose, product = null }) => {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      material: "",
      price: "",
      originalPrice: "",
      description: "",
      stock: "",
      category: "",
      images: [],
    }
  );

  const materialOptions = ["Silk", "Cotton", "Georgette", "Chiffon", "Crepe"];
  const occasionOptions = ["Wedding", "Party", "Casual", "Festival", "Office"];
  const colorOptions = ["Red", "Blue", "Green", "Yellow", "Purple"];

  const [originalPrice, setOriginalPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [offerPercentage, setOfferPercentage] = useState("");

  const [selectedOccasions, setSelectedOccasions] = useState([]);

  const handleOccasionChange = (e) => {
    const value = e.target.value;
    setSelectedOccasions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleOriginalPriceChange = (value) => {
    setOriginalPrice(value);
    if (value && sellingPrice) {
      const offer = (((value - sellingPrice) / value) * 100).toFixed(2);
      setOfferPercentage(offer);
    }
  };

  const handleSellingPriceChange = (value) => {
    setSellingPrice(value);
    if (originalPrice && value) {
      const offer = (((originalPrice - value) / originalPrice) * 100).toFixed(
        2
      );
      setOfferPercentage(offer);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  // Inside ProductForm component
  const [previewImages, setPreviewImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    const previews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          onClick={onClose}
        />

        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-6xl bg-white border border-pink-400 rounded-lg shadow-lg p-6 flex flex-col lg:flex-row gap-6"
        >
          <h2 className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-pink-600 hover:text-pink-500">
            Add New Product
          </h2>

          {/* Product Images */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg p-4 flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-pink-500 mb-2">
              Product Images
            </h3>

            {/* Upload Box */}
            <div className="relative border-dashed border-2 border-pink-400 rounded-lg w-full aspect-[2/3] flex items-center justify-center">
              {previewImages.length === 0 ? (
                <span className="text-pink-500 text-center text-sm">
                  Drag and drop or{" "}
                  <span className="text-pink-600 font-medium cursor-pointer">
                    click to upload
                  </span>
                </span>
              ) : (
                <div className="absolute inset-0">
                  <img
                    src={previewImages[currentSlide]}
                    alt={`Preview ${currentSlide}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}

              <input
                onChange={handleMultipleImages}
                type="file"
                accept="image/*"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Dot Indicator */}
            {previewImages.length > 0 && (
              <div className="flex justify-center mt-3">
                {previewImages.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`w-2 h-2 mx-1 rounded-full cursor-pointer transition-all duration-300 ${
                      currentSlide === idx
                        ? "bg-pink-500 scale-110"
                        : "bg-pink-300"
                    }`}
                  ></span>
                ))}
              </div>
            )}

            {/* Clear Button */}
            {previewImages.length > 0 && (
              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImages([]);
                    setFormData((prev) => ({ ...prev, images: [] }));
                    setCurrentSlide(0);
                  }}
                  className="text-pink-500 text-sm font-medium hover:underline"
                >
                  Clear All Images
                </button>
              </div>
            )}
          </div>

          {/* Right Column Sections */}
          <div className="w-full lg:w-2/3 flex flex-col gap-2">
            {/* Basic Info */}
            <div className="p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-pink-500 mb-4">
                Basic Information
              </h3>
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Product Title"
                  className="flex-1 min-w-[100%] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <input
                  type="number"
                  placeholder="Original Price"
                  value={originalPrice}
                  onChange={(e) =>
                    handleOriginalPriceChange(parseFloat(e.target.value))
                  }
                  className="flex-1 min-w-[45%] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <input
                  type="number"
                  placeholder="Selling Price"
                  value={sellingPrice}
                  onChange={(e) =>
                    handleSellingPriceChange(parseFloat(e.target.value))
                  }
                  className="flex-1 min-w-[45%] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <div className="relative flex-1 min-w-[49%]">
                  <input
                    type="number"
                    placeholder="Offer Percentage"
                    value={offerPercentage}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 text-gray-700 focus:outline-none"
                  />
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    %
                  </span>
                </div>

                <input
                  type="number"
                  placeholder="Available Quantity"
                  className="flex-1 min-w-[45%] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-pink-500 mb-4">
                Product Description
              </h3>
              <textarea
                placeholder="Product Information"
                rows={3}
                className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
            </div>

            {/* Filters */}
            <div className="p-4 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-pink-500 mb-4">
                Product Filters
              </h3>

              {/* Material & Color Dropdowns */}
              <div className="flex flex-wrap gap-4 justify-between">
                {/* Material Dropdown */}
                <div className="w-[100%] md:w-[45%]">
                  <label className="block text-sm font-medium text-pink-600 mb-4">
                    Select Material
                  </label>
                  <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="">Select material</option>
                    {materialOptions.map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color Dropdown */}
                <div className="w-[100%] md:w-[45%]">
                  <label className="block text-sm font-medium text-pink-600 mb-4">
                    Select Color
                  </label>
                  <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="">Select color</option>
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Occasion Checkboxes */}
              <div className="w-full mb-4">
                <label className="block text-sm font-medium text-pink-600 mt-5">
                  Select Occasion
                </label>
                <div className="border rounded p-2 max-h-40 overflow-y-auto mt-4 flex gap-8">
                  {occasionOptions.map((occasion) => (
                    <label
                      key={occasion}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        value={occasion}
                        checked={selectedOccasions.includes(occasion)}
                        onChange={handleOccasionChange}
                        className="accent-pink-500"
                      />
                      <span>{occasion}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Product</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Banarasi Silk Saree",
      material: "Pure Silk",
      price: 15999,
      originalPrice: 19999,
      stock: 10,
      category: "silk",
      image: "/images/saree1.jpg",
    },
    // Add more products...
  ];

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = (productId) => {
    // Implement delete logic here
    console.log("Delete product:", productId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <Button
            className="w-1/ flex items-center"
            onClick={() => setShowForm(true)}
          >
            <FiPlus className="w-5 h-5 mr-2" />
            <p>Add Product</p>
          </Button>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.material}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-gray-600 hover:text-pink-600"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default Products;
