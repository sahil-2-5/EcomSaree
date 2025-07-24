import { useState } from "react";
import Button from "../../components/common/Button";
import { useProductContext } from "../../context/ProductContext";

const ProductForm = ({ onClose }) => {
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
    status: "draft", // Set default to "draft"
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const materialOptions = [
    "Silk",
    "Paithani Silk",
    "Banarasi Silk",
    "Cotton",
    "Georgette",
    "Chiffon",
    "Crepe",
    "Linen",
    "Wool",
    "Satin",
    "Velvet",
    "Denim",
    "Leather",
    "Polyester",
    "Rayon",
    "Spandex",
    "Cashmere",
    "Jersey",
    "Tulle",
    "Organza",
    "Taffeta",
    "Brocade",
  ];

  const occasionOptions = [
    "Wedding",
    "Party",
    "Casual",
    "Festival",
    "Office",
    "Formal",
    "Cocktail",
    "Beach",
    "Vacation",
    "Date Night",
    "Graduation",
    "Prom",
    "Bridal Shower",
    "Baby Shower",
    "Anniversary",
    "Business Meeting",
    "Interview",
    "Brunch",
    "Evening Out",
    "Gala",
  ];

  const colorOptions = [
    "Red",
    "Magenta & Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Black",
    "White",
    "Gray",
    "Pink",
    "Orange",
    "Brown",
    "Beige",
    "Navy",
    "Teal",
    "Peacock",
    "Maroon",
    "Burgundy",
    "Lavender",
    "Mint",
    "Olive",
    "Turquoise",
    "Gold",
    "Silver",
    "Rose Gold",
    "Charcoal",
    "Ivory",
  ];
  const statusOptions = ["draft", "active"]; // Changed order to show draft first

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject("Image load error");
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((previews) => {
        setPreviewImages((prev) => [...prev, ...previews]);
      })
      .catch((err) => console.error(err));

    e.target.value = "";
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
    data.append("status", formData.status);
    imageFiles.forEach((file) => data.append("images", file));

    await addProduct(data);
    alert("Product added successfully");
    onClose();
  };

  const handleDotClick = (index) => setCurrentSlide(index);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-30">
      <div className="flex items-center justify-center min-h-screen px-2 sm:px-4 py-6">
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-6xl bg-white border border-pink-400 rounded-xl shadow-xl p-4 sm:p-6 flex flex-col lg:flex-row gap-6"
        >
          <h2 className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl font-bold text-pink-600">
            Add New Product
          </h2>

          {/* Product Images */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg p-4 flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-pink-500 mb-2">
              Product Images
            </h3>
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
                key={imageFiles.length}
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {previewImages.length > 0 && (
              <>
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

                <div className="flex justify-center mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setImageFiles([]);
                      setPreviewImages([]);
                      setCurrentSlide(0);
                    }}
                    className="text-pink-500 text-sm font-medium hover:underline"
                  >
                    Clear All Images
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-semibold text-pink-500 mb-3">
                Basic Information
              </h3>
              <div className="flex flex-wrap gap-4">
                <input
                  name="title"
                  placeholder="Product Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-500"
                />
                <input
                  name="price"
                  placeholder="Original Price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full sm:w-[48%] p-2 border rounded focus:ring-2 focus:ring-pink-500"
                />
                <input
                  name="sellingPrice"
                  placeholder="Selling Price"
                  type="number"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  className="w-full sm:w-[48%] p-2 border rounded focus:ring-2 focus:ring-pink-500"
                />
                <div className="relative w-full sm:w-[48%]">
                  <input
                    name="offerPercentage"
                    type="number"
                    value={formData.offerPercentage}
                    readOnly
                    placeholder="Offer %"
                    className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
                <input
                  name="availableQuantity"
                  type="number"
                  placeholder="Quantity"
                  value={formData.availableQuantity}
                  onChange={handleChange}
                  className="w-full sm:w-[48%] p-2 border rounded focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-pink-500 mb-2">
                Product Description
              </h3>
              <textarea
                name="description"
                rows="3"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Filters */}
            <div>
              <h3 className="text-lg font-semibold text-pink-500 mb-2">
                Product Filters
              </h3>
              <div className="flex flex-wrap gap-4">
                <select
                  name="material"
                  value={formData.filter.material}
                  onChange={handleFilterChange}
                  className="w-full sm:w-[48%] p-2 border rounded focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select Material</option>
                  {materialOptions.map((mat) => (
                    <option key={mat}>{mat}</option>
                  ))}
                </select>

                <select
                  name="color"
                  value={formData.filter.color}
                  onChange={handleFilterChange}
                  className="w-full sm:w-[48%] p-2 border rounded focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select Color</option>
                  {colorOptions.map((col) => (
                    <option key={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm text-pink-600 mb-2">
                  Occasion
                </label>
                <div className="flex flex-wrap gap-4">
                  {occasionOptions.map((occ) => (
                    <label
                      key={occ}
                      className="text-sm flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        value={occ}
                        checked={formData.filter.occasion.includes(occ)}
                        onChange={handleOccasionChange}
                        className="accent-pink-500"
                      />
                      {occ}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Field */}
            <div>
              <h3 className="text-lg font-semibold text-pink-500 mb-2">
                Product Status
              </h3>
              <div className="flex flex-wrap gap-4">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full sm:w-[48%] p-2 border rounded focus:ring-2 focus:ring-pink-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="w-full sm:w-[48%] flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        inStock: e.target.checked,
                      }))
                    }
                    className="h-5 w-5 accent-pink-500"
                  />
                  <label htmlFor="inStock" className="text-sm text-gray-700">
                    In Stock
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-4">
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

export default ProductForm;