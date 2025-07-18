import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    fetchCart,
    removeCartItem,
    updateCartItem,
    getCartTotal,
    checkout,
  } = useCartContext();

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loadCart = async () => {
    setIsLoading(true);
    const res = await fetchCart();
    if (!res.success) {
      setError(res.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (productId) => {
    setIsUpdating(true);
    const res = await removeCartItem(productId);
    if (!res.success) {
      alert(res.message);
    } else {
      await loadCart(); // 🔁 Refetch updated cart
    }
    setIsUpdating(false);
  };

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;
    setIsUpdating(true);
    const res = await updateCartItem(productId, newQty);
    if (!res.success) {
      alert(res.message);
    } else {
      await loadCart(); // 🔁 Refetch updated cart
    }
    setIsUpdating(false);
  };

  const handleCheckout = async () => {
    navigate("/cart");
  };

  if (isLoading) return <p className="text-center py-4">Loading cart...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => {
              const product = item?.product;
              if (!product) return null;

              return (
                <div
                  key={product._id}
                  className="flex items-center justify-between border p-4 rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        product.image ||
                        product.images?.[0]?.url ||
                        "https://via.placeholder.com/100"
                      }
                      alt={product.title}
                      className="w-16 h-16 rounded object-cover border"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.sellingPrice} x {item.quantity}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          disabled={isUpdating}
                          className="px-2 py-1 bg-gray-200 rounded text-sm"
                          onClick={() =>
                            handleQuantityChange(product._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button
                          disabled={isUpdating}
                          className="px-2 py-1 bg-gray-200 rounded text-sm"
                          onClick={() =>
                            handleQuantityChange(product._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-semibold text-gray-800">
                      {(product.sellingPrice * item.quantity).toFixed(2)}
                    </p>
                    <button
                      disabled={isUpdating}
                      className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
                      onClick={() => handleRemove(product._id)}
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-800">Total</h3>
            <p className="text-lg font-bold text-pink-600">
              {getCartTotal().toFixed(2)}
            </p>
          </div>

          <button
            disabled={isUpdating}
            className="mt-6 w-full bg-pink-600 text-white py-3 rounded-md text-sm font-medium hover:bg-pink-700 transition"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
