import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiImage, FiFilter, FiX, FiCheck } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";
import Button from "../../components/common/Button";
import { useProductContext } from "../../context/ProductContext";
import AddProductForm from "./ProductForm";
import UpdateProductForm from "./UpdateProductForm";
import ProductPreview from "./ProductPreview";
import UpdateImageForm from "./UpdateImageForm";

const Products = () => {
  const { products, deleteProduct } = useProductContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [imageToUpdate, setImageToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: "",
    colors: [],
    materials: [],
    occasions: []
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Get unique values for filters
  const colors = [...new Set(products.map(p => p.filter.color))];
  const materials = ["Silk", "Cotton", "Georgette", "Chiffon", "Crepe"];
  const occasions = ["Wedding", "Party", "Casual", "Festival", "Office"];
  const priceRanges = [
    { label: "All Prices", value: "" },
    { label: "Under ₹1,000", value: "0-999" },
    { label: "₹1,000 - ₹5,000", value: "1000-5000" },
    { label: "₹5,000 - ₹10,000", value: "5000-10000" },
    { label: "Above ₹10,000", value: "10000-999999" }
  ];

  useEffect(() => {
    // Apply filters whenever products or filter values change
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(
        product => product.sellingPrice >= min && product.sellingPrice <= max
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      result = result.filter(
        product => filters.colors.includes(product.filter.color)
      );
    }

    // Apply material filter
    if (filters.materials.length > 0) {
      result = result.filter(
        product => filters.materials.includes(product.filter.material)
      );
    }

    // Apply occasion filter
    if (filters.occasions.length > 0) {
      result = result.filter(
        product => filters.occasions.some(occ => product.filter.occasion.includes(occ))
      );
    }

    setFilteredProducts(result);
  }, [products, searchTerm, filters]);

  const handleDelete = async (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      await deleteProduct(productId);
      alert("Product deleted successfully.");
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    return statusLower === "active"
      ? "bg-green-500 text-white"
      : "bg-violet-500 text-white";
  };

  // Calculate product metrics
  const totalProducts = filteredProducts.length;
  const activeProducts = filteredProducts.filter(
    (p) => p.status?.toLowerCase() === "active"
  ).length;
  const draftProducts = filteredProducts.filter(
    (p) => p.status?.toLowerCase() === "draft"
  ).length;
  const totalInventoryValue = filteredProducts.reduce(
    (sum, product) => sum + (product.sellingPrice * product.availableQuantity),
    0
  );

  const resetFilters = () => {
    setFilters({
      priceRange: "",
      colors: [],
      materials: [],
      occasions: []
    });
    setSearchTerm("");
  };

  const toggleFilter = (filterType, value) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button
            className="flex items-center"
            onClick={() => setShowAddForm(true)}
          >
            <FiPlus className="mr-2" />
            Add Product
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="text-xl font-bold">{totalProducts}</h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Active Products</p>
            <h2 className="text-xl font-bold text-green-600">
              {activeProducts}
            </h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Draft Products</p>
            <h2 className="text-xl font-bold text-yellow-500">
              {draftProducts}
            </h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Total Value</p>
            <h2 className="text-xl font-bold text-blue-600">
              {totalInventoryValue.toLocaleString()} /-
            </h2>
          </div>
        </div>

        {/* Search/Filter */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              className="border px-4 py-2 rounded w-full pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
          
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter />
            Filters
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">PRICE RANGE</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div 
                      key={range.value}
                      className={`flex items-center p-2 rounded cursor-pointer ${filters.priceRange === range.value ? 'bg-pink-100' : 'hover:bg-gray-100'}`}
                      onClick={() => setFilters({...filters, priceRange: range.value})}
                    >
                      <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${filters.priceRange === range.value ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
                        {filters.priceRange === range.value && <FiCheck className="text-white text-xs" />}
                      </div>
                      <span>{range.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-medium mb-3">COLORS</h3>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div 
                      key={color}
                      className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleFilter('colors', color)}
                    >
                      <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${filters.colors.includes(color) ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
                        {filters.colors.includes(color) && <FiCheck className="text-white text-xs" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-4 h-4 rounded-full inline-block"
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></span>
                        <span>{color}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <h3 className="font-medium mb-3">MATERIALS</h3>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <div 
                      key={material}
                      className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleFilter('materials', material)}
                    >
                      <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${filters.materials.includes(material) ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
                        {filters.materials.includes(material) && <FiCheck className="text-white text-xs" />}
                      </div>
                      <span>{material}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Occasions */}
              <div>
                <h3 className="font-medium mb-3">OCCASIONS</h3>
                <div className="space-y-2">
                  {occasions.map((occasion) => (
                    <div 
                      key={occasion}
                      className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleFilter('occasions', occasion)}
                    >
                      <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${filters.occasions.includes(occasion) ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
                        {filters.occasions.includes(occasion) && <FiCheck className="text-white text-xs" />}
                      </div>
                      <span>{occasion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex items-center gap-1"
              >
                <FiX /> Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(filters.priceRange || filters.colors.length > 0 || filters.materials.length > 0 || filters.occasions.length > 0) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Active filters:</span>
            {filters.priceRange && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {priceRanges.find(r => r.value === filters.priceRange)?.label}
                <button
                  onClick={() => setFilters({...filters, priceRange: ""})}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {filters.colors.map(color => (
              <span key={color} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <span 
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: color.toLowerCase() }}
                ></span>
                {color}
                <button
                  onClick={() => toggleFilter('colors', color)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            ))}
            {filters.materials.map(material => (
              <span key={material} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {material}
                <button
                  onClick={() => toggleFilter('materials', material)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            ))}
            {filters.occasions.map(occasion => (
              <span key={occasion} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {occasion}
                <button
                  onClick={() => toggleFilter('occasions', occasion)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                <th className="p-4">Product</th>
                <th className="p-4">Material</th>
                <th className="p-4">Color</th>
                <th className="p-4">Occasions</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          product.images[0]?.url || "/placeholder-product.jpg"
                        }
                        className="w-10 h-10 object-cover rounded"
                        alt="product"
                      />
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-xs text-gray-400">
                          Created:{" "}
                          {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{product.filter.material}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-4 h-4 rounded-full inline-block"
                        style={{ backgroundColor: product.filter.color.toLowerCase() }}
                      ></span>
                      {product.filter.color}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {product.filter.occasion.map(occ => (
                        <span key={occ} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {occ}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-medium">₹{product.sellingPrice}</td>
                  <td className="p-4">
                    {product.availableQuantity <= 0 ? (
                      <span className="text-red-600 font-semibold">
                        {product.availableQuantity}
                      </span>
                    ) : product.availableQuantity < 10 ? (
                      <span className="text-orange-500 font-semibold">
                        {product.availableQuantity}
                      </span>
                    ) : (
                      product.availableQuantity
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadge(
                        product.status
                      )}`}
                    >
                      {product.status || "Draft"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3 text-gray-600">
                      <FiEye
                        className="cursor-pointer hover:text-blue-600"
                        title="View"
                        onClick={() => setPreviewProduct(product)}
                      />
                      <FiImage
                        className="cursor-pointer hover:text-purple-600"
                        title="Edit Image"
                        onClick={() =>
                          setImageToUpdate({
                            product,
                            imageId: product.images[0]?._id,
                            imageUrl: product.images[0]?.url,
                          })
                        }
                      />
                      <FiEdit2
                        className="cursor-pointer hover:text-yellow-600"
                        title="Edit"
                        onClick={() => setSelectedProduct(product)}
                      />
                      <FiTrash2
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleDelete(product._id)}
                        title="Delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No products found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Forms & Modals */}
        {showAddForm && (
          <AddProductForm onClose={() => setShowAddForm(false)} />
        )}

        {selectedProduct && (
          <UpdateProductForm
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        {previewProduct && (
          <ProductPreview
            product={previewProduct}
            onClose={() => setPreviewProduct(null)}
          />
        )}

        {imageToUpdate && (
          <UpdateImageForm
            product={imageToUpdate.product}
            imageId={imageToUpdate.imageId}
            currentImageUrl={imageToUpdate.imageUrl}
            onClose={() => setImageToUpdate(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;