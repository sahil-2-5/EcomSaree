import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:2525/user/cart", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to fetch cart");
      }

      setCart(response.data.cart.items || []);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:2525/user/cart/add",
        { productId, quantity },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { success, message, cart } = response.data;

      // Update cart only if item was newly added
      if (success) {
        setCart(cart.items);
      }

      // Always return the backend's message
      return { success, message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        "http://localhost:2525/user/cart/update",
        { productId, quantity },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = response.data;

      if (!data?.success) {
        throw new Error(data?.message || "Update failed");
      }

      // Update cart items in context or state
      setCart(data.cart.items);

      return {
        success: true,
        message: "Cart updated successfully",
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;

      // Set error state (optional, for displaying on UI)
      setError(errorMessage);

      // Return error to component (important for toast, alert, etc.)
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove this item from your cart?"
      );

      const response = await axios.delete(
        `http://localhost:2525/user/cart/delete/${productId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to remove item");
      }

      setCart(response.data.cart.items);
      return { success: true, message: "Item removed" };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        "http://localhost:2525/user/cart/clear",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to clear cart");
      }

      setCart([]);
      return { success: true, message: "Cart cleared" };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const checkout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:2525/user/cart/checkout",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Checkout failed");
      }

      setCart([]);
      return { success: true, message: "Checkout successful" };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.product.sellingPrice * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
        checkout,
        fetchCart,
        getTotalItems,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
