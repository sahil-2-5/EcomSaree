import { useState, useEffect } from "react";

const ProductPreview = ({ product, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setThumbnailStart(0);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="relative bg-white rounded-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl p-4 sm:p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {product.title}
        </h2>

        {/* Content Wrapper (Image + Details) */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="flex-1 flex flex-col items-center">
            {/* Main Image */}
            <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border">
              <img
                src={product.images?.[selectedImageIndex || 0]?.url}
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
                {product.images
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
                    Math.min(prev + 1, product.images.length - 3)
                  )
                }
                className="text-gray-500 hover:text-black disabled:opacity-30"
                disabled={thumbnailStart + 3 >= product.images.length}
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
              <span>{product.filter?.material || "—"}</span>
            </div>

            {/* Color */}
            <div className="flex items-start gap-2">
              <span className="w-28 font-semibold text-gray-900">Color:</span>
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium"
                style={{
                  backgroundColor: `${product.filter?.color?.toLowerCase()}20`,
                  color: `${product.filter?.color?.toLowerCase()}`,
                  borderColor: "#e5e7eb",
                }}
              >
                {product.filter?.color || "—"}
              </span>
            </div>

            {/* Occasion */}
            <div className="flex items-start gap-2">
              <span className="w-28 font-semibold text-gray-900">
                Occasion:
              </span>
              <span>
                {product.filter?.occasion?.join(", ") || "—"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-start gap-2">
              <span className="w-28 font-semibold text-gray-900">Price:</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="text-green-600 font-bold text-lg">
                  {product.sellingPrice.toLocaleString()}/-
                </span>
                <span className="line-through text-gray-400 text-sm">
                  {product.price.toLocaleString()}/-
                </span>
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-start gap-2">
              <span className="w-28 font-semibold text-gray-900">Stock:</span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  product.availableQuantity > 10
                    ? "bg-green-100 text-green-800"
                    : product.availableQuantity > 0
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.availableQuantity} in stock
              </span>
            </div>

            {/* Description */}
            <div className="flex items-start gap-2">
              <p>
                {product.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;