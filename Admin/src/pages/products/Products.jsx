import { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiEye } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";
import Button from "../../components/common/Button";
import { useProductContext } from "../../context/ProductContext";
import AddProductForm from "./ProductForm";
import UpdateProductForm from "./UpdateProductForm";
import ProductPreview from "./ProductPreview";
import UpdateImageForm from "./UpdateImageForm";

const Products = () => {
  const { products, loading, error, deleteProduct } = useProductContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [imageToUpdate, setImageToUpdate] = useState(null); // Added

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (productId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      await deleteProduct(productId);
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <Button
            className="w-fit flex items-center"
            onClick={() => setShowAddForm(true)}
          >
            <FiPlus className="w-5 h-5 mr-2" />
            <p>Add Product</p>
          </Button>
        </div>

        {/* Product Table */}
        <div className="relative">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-10">
              <p className="text-gray-500 text-sm">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center py-10">
              <p className="text-red-500 text-sm">Error: {error}</p>
            </div>
          )}

          {/* Products Table */}
          {!loading && !error && (
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
                  {products.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center text-gray-500 py-6 text-sm"
                      >
                        No products found.
                      </td>
                    </tr>
                  )}

                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                        <img
                          src={product.images[0]?.url}
                          alt={product.title}
                          className="h-12 w-12 object-cover rounded border cursor-pointer"
                          onClick={() =>
                            setImageToUpdate({
                              product,
                              imageId: product.images[0]?._id,
                            })
                          }
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
                            backgroundColor: `${product.filter?.color?.toLowerCase()}20`,
                            color: `${product.filter?.color?.toLowerCase()}`,
                            borderColor: "#e5e7eb",
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
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-gray-600 hover:text-pink-600"
                          >
                            <FiEdit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
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
          )}

          {/* Preview Product Modal */}
          {previewProduct && (
            <ProductPreview
              product={previewProduct}
              onClose={() => setPreviewProduct(null)}
            />
          )}
        </div>
      </div>

      {/* Add Product Form Modal */}
      {showAddForm && (
        <AddProductForm onClose={() => setShowAddForm(false)} />
      )}

      {/* Update Product Form Modal */}
      {selectedProduct && (
        <UpdateProductForm
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Update Image Form Modal */}
      {imageToUpdate && (
        <UpdateImageForm
          product={imageToUpdate.product}
          imageId={imageToUpdate.imageId}
          onClose={() => setImageToUpdate(null)}
        />
      )}
    </AdminLayout>
  );
};

export default Products;
