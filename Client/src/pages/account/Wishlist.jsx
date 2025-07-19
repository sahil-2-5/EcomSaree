import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useWishlistContext } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Wishlist = () => {
  const {
    wishlist,
    loading,
    error,
    fetchWishlist,
    removeFromWishlist,
  } = useWishlistContext();

  const { addToCart } = useCart();

  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      alert("Removed from wishlist");
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  const handleAddToCart = async (item) => {
    const productId = item.product?._id || item._id;
    setProcessingId(productId);

    try {
      const res = await addToCart(productId, 1);
      if (res.success) {
        alert("Added to cart successfully");
        await removeFromWishlist(productId); // Optional
      } else {
        alert(res.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while adding to cart.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaHeart className="text-pink-500" /> My Wishlist
      </h2>

      {loading ? (
        <p className="text-center py-6">Loading wishlist...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : wishlist.length === 0 ? (
        <p className="text-sm text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item, index) => {
            const productId = item.product?._id || item._id;

            return (
              <div
                key={index}
                className="flex items-center justify-between border p-4 rounded-md shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.title}
                    className="w-16 h-16 rounded object-cover border"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-through">
                      {item.price} /-
                    </p>
                    <p className="text-sm text-pink-600 font-semibold">
                      {item.sellingPrice} /-
                    </p>
                    <p className="text-xs text-gray-400">Color: {item.color}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={processingId === productId}
                    className={`px-3 py-2 rounded text-sm flex items-center gap-1 transition ${
                      processingId === productId
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-pink-600 text-white hover:bg-pink-700"
                    }`}
                  >
                    <FaShoppingCart />
                    {processingId === productId ? "Adding..." : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => handleRemove(productId)}
                    className="px-3 py-2 bg-gray-100 text-gray-600 rounded text-sm flex items-center gap-1 hover:bg-gray-200"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
