import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiEye } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";
import Button from "../../components/common/Button";
import { useProductContext } from "../../context/ProductContext";

const ProductForm = ({ onClose, product = null }) => {
  const { addProduct } = useProductContext();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    sellingPrice: "",
    offerPercentage: "",
    availableQuantity: "",
    description: "",
    images: [],
    filter: {
      material: "",
      occasion: [],
      color: "",
    },
    inStock: true,
  });

  const [imageFiles, setImageFiles] = useState([]);

  const materialOptions = ["Silk", "Cotton", "Georgette", "Chiffon", "Crepe"];
  const occasionOptions = ["Wedding", "Party", "Casual", "Festival", "Office"];
  const colorOptions = ["Red", "Blue", "Green", "Yellow", "Purple"];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((previews) => {
      setPreviewImages(previews);
    });

    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "price" || name === "sellingPrice") {
      const price = name === "price" ? +value : +formData.price;
      const sellingPrice =
        name === "sellingPrice" ? +value : +formData.sellingPrice;
      if (price && sellingPrice) {
        const offer = (((price - sellingPrice) / price) * 100).toFixed(2);
        setFormData((prev) => ({
          ...prev,
          offerPercentage: offer,
        }));
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        [name]: value,
      },
    }));
  };

  const handleOccasionChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      const isSelected = prev.filter.occasion.includes(value);
      const newOccasions = isSelected
        ? prev.filter.occasion.filter((o) => o !== value)
        : [...prev.filter.occasion, value];
      return {
        ...prev,
        filter: {
          ...prev.filter,
          occasion: newOccasions,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("sellingPrice", formData.sellingPrice);
    data.append("offerPercentage", formData.offerPercentage);
    data.append("availableQuantity", formData.availableQuantity);
    data.append("inStock", formData.inStock);
    data.append("description", JSON.stringify(formData.description));
    data.append("filter", JSON.stringify(formData.filter));

    imageFiles.forEach((file) => data.append("images", file));

    await addProduct(data); // this should call axios POST
    alert("Product added successfully");
    onClose();
  };

  // Inside ProductForm component
  const [previewImages, setPreviewImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
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
                  name="title"
                  placeholder="Product Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="flex-1 min-w-[100%] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Original Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="flex-1 min-w-[45%] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <input
                  type="number"
                  name="sellingPrice"
                  placeholder="Selling Price"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  className="flex-1 min-w-[45%] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <div className="relative flex-1 min-w-[49%]">
                  <input
                    type="number"
                    name="offerPercentage"
                    placeholder="Offer Percentage"
                    value={formData.offerPercentage}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 text-gray-700 focus:outline-none"
                  />
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    %
                  </span>
                </div>

                <input
                  type="number"
                  name="availableQuantity"
                  placeholder="Available Quantity"
                  value={formData.availableQuantity}
                  onChange={handleChange}
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
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
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
                  <select
                    name="material"
                    value={formData.filter.material}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
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
                  <select
                    name="color"
                    value={formData.filter.color}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
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
                        checked={formData.filter.occasion.includes(occasion)}
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
  const { products, loading, error } = useProductContext();
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);

  // Sample products data

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);

  useEffect(() => {
    if (previewProduct) {
      setSelectedImageIndex(0); // reset on open
    }
  }, [previewProduct]);

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
        <div className="relative">
          {/* Product Table */}
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Material
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Color
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Occasion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                      <img
                        src={product.images[1]?.url}
                        alt={product.title}
                        className="h-12 w-12 object-cover rounded border"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {product.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.filter?.material || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${product.filter?.color?.toLowerCase()}20`, // Adds transparency
                          color: `${product.filter?.color?.toLowerCase()}`,
                          borderColor: "#e5e7eb", // light gray border
                        }}
                      >
                        {product.filter?.color || "Uncategorized"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.filter?.occasion?.join(", ") || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ₹{product.sellingPrice.toLocaleString()}
                      <span className="line-through ml-2 text-gray-400 text-xs">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          product.availableQuantity > 10
                            ? "bg-green-100 text-green-800"
                            : product.availableQuantity > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.availableQuantity} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setPreviewProduct(product)}
                          title="Preview"
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <FiEye className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-pink-600">
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-red-600">
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Preview Product Modal */}
          {previewProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="relative bg-white rounded-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl p-4 sm:p-6">
                {/* Close Button */}
                <button
                  onClick={() => setPreviewProduct(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
                >
                  &times;
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {previewProduct.title}
                </h2>

                {/* Content Wrapper (Image + Details) */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image Section */}
                  <div className="flex-1 flex flex-col items-center">
                    {/* Main Image */}
                    <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border">
                      <img
                        src={
                          previewProduct.images?.[selectedImageIndex || 0]?.url
                        }
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Thumbnails */}
                    <div className="mt-4 flex items-center gap-2 w-full justify-center">
                      {/* Left Arrow */}
                      <button
                        onClick={() =>
                          setThumbnailStart((prev) => Math.max(prev - 1, 0))
                        }
                        className="text-gray-500 hover:text-black disabled:opacity-30"
                        disabled={thumbnailStart === 0}
                      >
                        &#8592;
                      </button>

                      {/* Thumbnail Images */}
                      <div className="flex gap-2 overflow-hidden">
                        {previewProduct.images
                          .slice(thumbnailStart, thumbnailStart + 3)
                          .map((img, idx) => {
                            const actualIdx = thumbnailStart + idx;
                            return (
                              <img
                                key={img.id}
                                src={img.url}
                                alt={`Thumb-${actualIdx}`}
                                onClick={() => setSelectedImageIndex(actualIdx)}
                                className={`w-20 h-20 object-cover border rounded-md cursor-pointer ${
                                  selectedImageIndex === actualIdx
                                    ? "border-2 border-pink-500"
                                    : "border-gray-300"
                                }`}
                              />
                            );
                          })}
                      </div>

                      {/* Right Arrow */}
                      <button
                        onClick={() =>
                          setThumbnailStart((prev) =>
                            Math.min(prev + 1, previewProduct.images.length - 3)
                          )
                        }
                        className="text-gray-500 hover:text-black disabled:opacity-30"
                        disabled={
                          thumbnailStart + 3 >= previewProduct.images.length
                        }
                      >
                        &#8594;
                      </button>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 flex flex-col justify-start space-y-4 text-sm text-gray-700 break-words">
                    {/* Material */}
                    <div className="flex items-start gap-2">
                      <span className="w-28 font-semibold text-gray-900">
                        Material:
                      </span>
                      <span>{previewProduct.filter?.material || "—"}</span>
                    </div>

                    {/* Color */}
                    <div className="flex items-start gap-2">
                      <span className="w-28 font-semibold text-gray-900">
                        Color:
                      </span>
                      <span
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium"
                        style={{
                          backgroundColor: `${previewProduct.filter?.color?.toLowerCase()}20`,
                          color: `${previewProduct.filter?.color?.toLowerCase()}`,
                          borderColor: "#e5e7eb",
                        }}
                      >
                        {previewProduct.filter?.color || "—"}
                      </span>
                    </div>

                    {/* Occasion */}
                    <div className="flex items-start gap-2">
                      <span className="w-28 font-semibold text-gray-900">
                        Occasion:
                      </span>
                      <span>
                        {previewProduct.filter?.occasion?.join(", ") || "—"}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-start gap-2">
                      <span className="w-28 font-semibold text-gray-900">
                        Price:
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="text-green-600 font-bold text-lg">
                          ₹{previewProduct.sellingPrice.toLocaleString()}
                        </span>
                        <span className="line-through text-gray-400 text-sm">
                          ₹{previewProduct.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="flex items-start gap-2">
                      <span className="w-28 font-semibold text-gray-900">
                        Stock:
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          previewProduct.availableQuantity > 10
                            ? "bg-green-100 text-green-800"
                            : previewProduct.availableQuantity > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {previewProduct.availableQuantity} in stock
                      </span>
                    </div>

                    {/* Description */}
                    <div className="flex items-start gap-2">
                      <p>
                        {previewProduct.description ||
                          "No description available."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
