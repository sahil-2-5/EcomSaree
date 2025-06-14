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
  const { products, loading, error, deleteProduct } = useProductContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [imageToUpdate, setImageToUpdate] = useState(null);

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

        {/* Product Cards */}
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

          {/* Products Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-6 text-sm">
                  No products found.
                </div>
              )}

              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  {/* Discount badge */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                      {product.discountPercentage}% OFF
                    </div>
                  )}

                  {/* Image container - increased height */}
                  <div className="relative h-12vh group flex-shrink-0">
                    <img
                      src={product.images[0]?.url || '/placeholder-product.jpg'}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:opacity-75"
                    />
                    
                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col items-center justify-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-20">
                      <button
                        onClick={() => setPreviewProduct(product)}
                        className="bg-white text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors"
                      >
                        <FiEye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setImageToUpdate({
                            product,
                            imageId: product.images[0]?._id,
                            imageUrl: product.images[0]?.url
                          })}
                          className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                          title="Edit Image"
                        >
                          <FiImage className="w-4 h-4 text-gray-800" />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                          title="Edit Product"
                        >
                          <FiEdit2 className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                          title="Delete Product"
                        >
                          <FiTrash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex-grow flex flex-col">
                    {/* Product type */}
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      {product.category}
                    </div>
                    
                    {/* Product title */}
                    <h3 className="text-md font-medium text-gray-900 mb-2 line-clamp-2 flex-grow">
                      {product.title}
                    </h3>
                    
                    {/* Price and stock in same row */}
                    <div className="flex justify-between items-center mt-auto">
                      <div>
                        {product.offerPercentage > 0 ? (
                          <>
                            <span className="text-gray-500 line-through mr-2">
                              {product.price.toLocaleString()}/-
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              {product.sellingPrice.toLocaleString()}/-
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            {product.sellingPrice.toLocaleString()}/-
                          </span>
                        )}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        product.availableQuantity > 5 
                          ? 'bg-green-100 text-green-800' 
                          : product.availableQuantity > 0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.availableQuantity > 5 
                          ? `Stock: ${product.availableQuantity}` 
                          : product.availableQuantity > 0 
                            ? `Low: ${product.availableQuantity}` 
                            : 'Out of Stock'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview Product Modal */}
        {previewProduct && (
          <ProductPreview
            product={previewProduct}
            onClose={() => setPreviewProduct(null)}
          />
        )}

        {/* Add Product Form Modal */}
        {showAddForm && <AddProductForm onClose={() => setShowAddForm(false)} />}

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
            currentImageUrl={imageToUpdate.imageUrl}
            onClose={() => setImageToUpdate(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;