import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import the AuthContext

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth(); // Get auth state from AuthContext

  // Fetch cart when component mounts and when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Clear cart when user is not authenticated
      setCart([]);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart([]);
      return { success: false, message: "User not authenticated" };
    }

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
      
      // Clear cart if unauthorized
      if (err.response?.status === 401) {
        setCart([]);
      }
      
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      return {
        success: false,
        message: "Please login to add items to cart",
        isAuthError: true,
      };
    }

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

      if (success) {
        setCart(cart.items);
      }

      return { success, message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      
      if (err.response?.status === 401) {
        setCart([]);
      }
      
      return { 
        success: false, 
        message: errorMessage,
        isAuthError: err.response?.status === 401
      };
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!isAuthenticated) {
      return {
        success: false,
        message: "Please login to update cart",
        isAuthError: true,
      };
    }

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

      setCart(data.cart.items);

      return {
        success: true,
        message: "Cart updated successfully",
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      
      if (err.response?.status === 401) {
        setCart([]);
      }
      
      return {
        success: false,
        message: errorMessage,
        isAuthError: err.response?.status === 401
      };
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (productId) => {
    if (!isAuthenticated) {
      return {
        success: false,
        message: "Please login to modify cart",
        isAuthError: true,
      };
    }

    setLoading(true);
    setError(null);

    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove this item from your cart?"
      );
      if (!confirmDelete) return { success: false, message: "Cancelled" };

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

      setCart(response.data.cart?.items);
      return { success: true, message: "Item removed" };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      
      if (err.response?.status === 401) {
        setCart([]);
      }
      
      return {
        success: false,
        message: errorMessage,
        isAuthError: err.response?.status === 401
      };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      return {
        success: false,
        message: "Please login to modify cart",
        isAuthError: true,
      };
    }

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
      
      if (err.response?.status === 401) {
        setCart([]);
      }
      
      return {
        success: false,
        message: errorMessage,
        isAuthError: err.response?.status === 401
      };
    } finally {
      setLoading(false);
    }
  };

  const checkout = async () => {
    if (!isAuthenticated) {
      return {
        success: false,
        message: "Please login to checkout",
        isAuthError: true,
      };
    }

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
      
      if (err.response?.status === 401) {
        setCart([]);
      }
      
      return {
        success: false,
        message: errorMessage,
        isAuthError: err.response?.status === 401
      };
    } finally {
      setLoading(false);
    }
  };

  const getTotalItems = () => {
    if (!isAuthenticated) return 0;
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    if (!isAuthenticated) return 0;
    return cart.reduce((total, item) => {
      return total + (item.product?.sellingPrice || 0) * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        isAuthenticated, // Expose auth state to components
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