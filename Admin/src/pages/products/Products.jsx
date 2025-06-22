import { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiImage } from "react-icons/fi";
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
    return status === "Active"
      ? "bg-black text-white"
      : "bg-gray-100 text-gray-700";
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
            <h2 className="text-xl font-bold">{products.length}</h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Active Products</p>
            <h2 className="text-xl font-bold text-green-600">
              {products.filter((p) => p.status === "Active").length}
            </h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Draft Products</p>
            <h2 className="text-xl font-bold text-yellow-500">
              {products.filter((p) => p.status === "Draft").length}
            </h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Out of Stock</p>
            <h2 className="text-xl font-bold text-red-500">
              {products.filter((p) => p.stock === 0).length}
            </h2>
          </div>
        </div>

        {/* Search/Filter */}
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="border px-4 py-2 rounded w-full md:w-1/3"
          />
          <select className="border px-3 py-2 rounded">
            <option>Category</option>
          </select>
          <select className="border px-3 py-2 rounded">
            <option>Status</option>
          </select>
          <button className="border px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm">
            Export
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Sales</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
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
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">{product.filter.material}</td>
                  <td className="p-4 font-medium">₹{product.sellingPrice}</td>
                  <td className="p-4">
                    {product.stock < 10 ? (
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
              {products.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No products found.
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
