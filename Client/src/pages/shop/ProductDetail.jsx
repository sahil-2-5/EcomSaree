import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiMinus, FiPlus, FiHeart, FiShare2 } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import Button from "../../components/common/Button";
import ProductCard from "../../components/shop/ProductCard";
import { useProductContext } from "../../context/ProductContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { fetchProductById, loading, error } = useProductContext();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetched = await fetchProductById(id);
        if (fetched) {
          setProduct(fetched);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, []);

  if (loading || !product)
    return (
      <div className="p-10 text-center text-lg font-semibold">Loading...</div>
    );
  if (error)
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Error: {error}
      </div>
    );

  const relatedProducts = [
    // Add related products data here
  ];

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-gray-500 hover:text-pink-600">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-400 px-2">/</span>
            </li>
            <li>
              <a href="/shop" className="text-gray-500 hover:text-pink-600">
                Shop
              </a>
            </li>
            <li>
              <span className="text-gray-400 px-2">/</span>
            </li>
            <li className="text-gray-900 font-medium">{product.title}</li>
          </ol>
        </nav>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image Gallery */}
          <div className="mb-8 lg:mb-0 sticky top-24">
            <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-2xl mb-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={product.images[selectedImage].url}
                alt={product.title}
                className="h-full w-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-6">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`group aspect-h-4 aspect-w-3 overflow-hidden rounded-xl bg-white ${
                    selectedImage === index
                      ? "ring-2 ring-pink-500 ring-offset-2"
                      : "ring-1 ring-gray-200 hover:ring-pink-200"
                  } transition-all duration-300`}
                >
                  <img
                    src={image.url}
                    alt={`${product.title} ${index + 1}`}
                    className={`h-full w-full object-cover object-center transition-opacity duration-300 ${
                      selectedImage === index
                        ? "opacity-100"
                        : "group-hover:opacity-75"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 rounded-full mb-4 border border-pink-100">
              {product.filter.material}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center mb-6"></div>

            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-pink-600">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.sellingPrice && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ₹{product.sellingPrice.toLocaleString()}
                  </span>
                )}
                {product.offerPercentage && (
                  <span className="ml-3 text-sm font-medium text-green-600">
                    {product.offerPercentage}% off
                  </span>
                )}
              </div>
              {product.stock <= 5 && (
                <p className="mt-2 text-sm text-orange-600">
                  Only {product.availableQuantity} left in stock!
                </p>
              )}
            </div>

            <div className="prose prose-sm text-gray-600 mb-6">
              <p>{product.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center p-1 bg-gray-50 rounded-full w-fit">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      quantity <= 1
                        ? "text-gray-400"
                        : "text-gray-600 hover:text-pink-600 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-medium text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.availableQuantity}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      quantity >= product.stock
                        ? "text-gray-400"
                        : "text-gray-600 hover:text-pink-600 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-8 gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="col-span-6 h-12 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-lg hover:shadow-pink-200 transition-all duration-300"
                    disabled={product.availableQuantity === 0}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="col-span-1 h-12 border-2 border-pink-100 hover:border-pink-200 rounded-full hover:bg-pink-50 transition-all duration-300"
                  >
                    <FiHeart className="w-5 h-5 text-pink-600" />
                  </Button>
                  <Button
                    variant="outline"
                    className="col-span-1 h-12 border-2 border-pink-100 hover:border-pink-200 rounded-full hover:bg-pink-50 transition-all duration-300"
                  >
                    <FiShare2 className="w-5 h-5 text-pink-600" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Delivery & Returns */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/50 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 8l-8 5-8-5V6l8 5 8-5m0 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8l8 5 8-5z"
                  />
                </svg>
                Delivery & Returns
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Free delivery on orders above ₹999
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Delivery within 5-7 business days
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Easy 7-day returns
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Try & Buy available in select cities
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24 border-t border-gray-100 pt-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 rounded-full mb-4 border border-pink-100">
                Related Items
              </span>
              <h2 className="text-3xl font-bold text-gray-900">
                You May Also Like
              </h2>
            </div>
            <a
              href="/shop"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-pink-600 hover:text-white bg-white hover:bg-pink-600 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100 hover:border-transparent"
            >
              View More
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
