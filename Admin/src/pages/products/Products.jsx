import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiImage, FiFilter, FiX } from "react-icons/fi";
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
    category: "",
    status: "",
    minPrice: "",
    maxPrice: ""
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.filter.material))];

  useEffect(() => {
    // Apply filters whenever products or filter values change
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(
        product => product.filter.material === filters.category
      );
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(
        product => product.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Apply price range filter
    if (filters.minPrice) {
      result = result.filter(
        product => product.sellingPrice >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      result = result.filter(
        product => product.sellingPrice <= Number(filters.maxPrice)
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

  // Calculate product counts based on filtered products
  const totalProducts = filteredProducts.length;
  const activeProducts = filteredProducts.filter(
    (p) => p.status?.toLowerCase() === "active"
  ).length;
  const draftProducts = filteredProducts.filter(
    (p) => p.status?.toLowerCase() === "draft"
  ).length;
  const outOfStockProducts = filteredProducts.filter(
    (p) => p.availableQuantity <= 0
  ).length;

  const resetFilters = () => {
    setFilters({
      category: "",
      status: "",
      minPrice: "",
      maxPrice: ""
    });
    setSearchTerm("");
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
            <p className="text-sm text-gray-500">Out of Stock</p>
            <h2 className="text-xl font-bold text-red-500">
              {outOfStockProducts}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full border rounded p-2"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full border rounded p-2"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  className="w-full border rounded p-2"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  className="w-full border rounded p-2"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                />
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
        {(filters.category || filters.status || filters.minPrice || filters.maxPrice) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Active filters:</span>
            {filters.category && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Category: {filters.category}
                <button
                  onClick={() => setFilters({ ...filters, category: "" })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {filters.status && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Status: {filters.status}
                <button
                  onClick={() => setFilters({ ...filters, status: "" })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {filters.minPrice && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Min: ₹{filters.minPrice}
                <button
                  onClick={() => setFilters({ ...filters, minPrice: "" })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {filters.maxPrice && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Max: ₹{filters.maxPrice}
                <button
                  onClick={() => setFilters({ ...filters, maxPrice: "" })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Sales</th>
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
                  <td className="p-4 font-medium">₹{product.sellingPrice}</td>
                  <td className="p-4">
                    {product.availableQuantity < 10 ? (
                      <span className="text-red-600 font-semibold">
                        {product.availableQuantity}
                      </span>
                    ) : (
                      product.availableQuantity
                    )}
                  </td>
                  <td className="p-4">{product.sales || 0}</td>
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