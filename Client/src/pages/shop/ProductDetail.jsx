import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiShare2, FiX } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import Button from "../../components/common/Button";
import ProductCard from "../../components/shop/ProductCard";
import { useProductContext } from "../../context/ProductContext";
import { useProductReviewContext } from "../../context/ProductReviewContext";
import { FaStar } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, fetchCart } = useCart();
  const { addToWishlist } = useWishlistContext();
  const { fetchProductById, products, loading, error } = useProductContext();
  const { productReviews, getReviewsByProduct, createReview } = useProductReviewContext();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetched = await fetchProductById(id);
        if (fetched) setProduct(fetched);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
    getReviewsByProduct(id);
  }, [id]);

  const handleAddToCart = async () => {
    const result = await addToCart(product._id, quantity);
    if (result.success) {
      await fetchCart();
      alert("Product added to cart successfully!");
    } else {
      alert(result.message || "Failed to add to cart");
    }
  };

  const handleWishlist = async () => {
    try {
      const result = await addToWishlist({
        id: product._id,
        title: product.title,
        price: product.price,
        sellingPrice: product.sellingPrice,
        color: product.filter?.color,
        images: product.images[0].url,
      });

      if (result.success) {
        alert("Product added to wishlist successfully!");
      } else {
        alert(result.message || "Failed to add to wishlist");
      }
    } catch (error) {
      alert(error.message || "An error occurred while adding to wishlist");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", product._id);
    formData.append("rating", rating);
    formData.append("comment", comment);
    images.forEach((img) => formData.append("images", img));
    await createReview(formData);
    setRating(0);
    setComment("");
    setImages([]);
    setFileInputKey(Date.now()); // Reset file input
    await getReviewsByProduct(product._id);
  };

  if (loading || !product)
    return <div className="p-10 text-center text-lg font-semibold">Loading...</div>;

  if (error)
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Error: {error}
      </div>
    );

  const relatedProducts = products
    .filter(
      (p) =>
        p._id !== product._id &&
        (p.filter?.color === product.filter?.color ||
          p.filter?.material === product.filter?.material ||
          (Array.isArray(p.filter?.occasion) &&
            p.filter.occasion.some((o) =>
              Array.isArray(product.filter?.occasion)
                ? product.filter.occasion.includes(o)
                : product.filter?.occasion === o
            )))
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><a href="/" className="text-gray-500 hover:text-pink-600">Home</a></li>
            <li><span className="text-gray-400 px-2">/</span></li>
            <li><a href="/shop" className="text-gray-500 hover:text-pink-600">Shop</a></li>
            <li><span className="text-gray-400 px-2">/</span></li>
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

            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-pink-600">
                  ₹{product.sellingPrice.toLocaleString()}
                </span>
                {product.price && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ₹{product.price.toLocaleString()}
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
                    onClick={handleWishlist}
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

            {/* Delivery Info */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/50 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 8l-8 5-8-5V6l8 5 8-5m0 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8l8 5 8-5z" />
                </svg>
                Delivery & Returns
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center"><Check /> Free delivery on orders above ₹999</li>
                <li className="flex items-center"><Check /> Delivery within 5–7 business days</li>
                <li className="flex items-center"><Check /> Easy 7-day returns</li>
                <li className="flex items-center"><Check /> Try & Buy available in select cities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Review Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Leave a Review</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <FaStar
                      size={24}
                      className={
                        (hover || rating) >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Images</label>
              <input
                key={fileInputKey}
                type="file"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files))}
                className="mt-1 block w-full text-sm text-gray-500"
                accept="image/*"
              />
            </div>

            <Button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-md">
              Submit Review
            </Button>
          </form>

          {/* Display Reviews */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            {productReviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <ul className="space-y-6">
                {productReviews.map((review) => (
                  <li 
                    key={review._id} 
                    className="border border-gray-100 p-4 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedReview(review)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-900">
                        {review.user.firstName || 'Anonymous'} 
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={16}
                            className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">
                  {selectedReview.user.firstName || 'Anonymous'}'s Review
                </h3>
                <button 
                  onClick={() => setSelectedReview(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={20}
                    className={i < selectedReview.rating ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-gray-600">{selectedReview.rating}/5</span>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedReview.comment}</p>
              
              {selectedReview.images?.length > 0 && (
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedReview.images.map((img, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img
                          src={img.url}
                          alt="review-img"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-sm text-gray-500">
                Reviewed on {new Date(selectedReview.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Check = () => (
  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

export default ProductDetail;