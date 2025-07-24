import { useState } from "react";
import Button from "../../components/common/Button";
import { useProductContext } from "../../context/ProductContext";

const UpdateProductForm = ({ onClose, product }) => {
  const { updateProduct } = useProductContext();

  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    sellingPrice: product.sellingPrice,
    offerPercentage: product.offerPercentage,
    availableQuantity: product.availableQuantity,
    description: product.description,
    images: product.images,
    filter: {
      material: product.filter?.material || "",
      occasion: product.filter?.occasion || [],
      color: product.filter?.color || "",
    },
    inStock: product.inStock,
    status: product.status || "draft",
  });

  const materialOptions = [
    "Silk",
    "Paithani Silk",
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
  const statusOptions = ["draft", "active"];

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
    data.append("status", formData.status);
    data.append("description", JSON.stringify(formData.description));
    data.append("filter", JSON.stringify(formData.filter));

    await updateProduct(product._id, data);
    alert("Product updated successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-30">
      <div className="flex items-center justify-center min-h-screen px-2 sm:px-4 py-6">
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-6xl bg-white border border-pink-400 rounded-xl shadow-xl p-4 sm:p-6 flex flex-col gap-6"
        >
          <h2 className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl font-bold text-pink-600">
            Update Product
          </h2>

          {/* Right Column */}
          <div className="w-full flex flex-col gap-4">
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

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Product</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
