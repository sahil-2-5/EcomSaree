import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import the AuthContext

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth(); // Get auth state

  // Fetch wishlist on initial load and when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      // Clear wishlist when user is not authenticated
      setWishlist([]);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return { success: false, message: "User not authenticated" };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:2525/user/wishlist", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Invalid response format");
      }

      setWishlist(response.data.items || []);
      return { success: true, data: response.data };
    } catch (err) {
      let errorMessage = err.response?.data?.message || err.message;
      if (err.response?.status === 401) {
        errorMessage = "Session expired. Please login again.";
        localStorage.removeItem("clientToken");
      } else if (err.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please try again.";
      }

      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        isAuthError: err.response?.status === 401,
      };
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productData) => {
    if (!isAuthenticated) {
      return {
        success: false,
        message: "Please login to add items to wishlist",
        isAuthError: true,
      };
    }

    setLoading(true);
    setError(null);

    try {
      if (!productData?.id || !productData?.title || !productData?.images) {
        throw new Error("Missing required product data");
      }

      const wishlistItem = {
        product: productData.id,
        title: productData.title,
        price: productData.price,
        sellingPrice: productData.sellingPrice,
        color: productData.color,
        image: productData.images,
      };

      const response = await axios.post(
        "http://localhost:2525/user/wishlist/add",
        {
          wishlistItem,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to update wishlist");
      }

      setWishlist((prev) => [...prev, wishlistItem]);

      return {
        success: true,
        data: response.data,
        message: "Added to wishlist successfully",
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);

      if (err.response?.status === 401) {
        localStorage.removeItem("clientToken");
        window.location.href = "/login";
      }

      return {
        success: false,
        message: errorMessage,
        isAuthError: err.response?.status === 401,
      };
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated) {
      return {
        success: false,
        message: "Please login to modify wishlist",
        isAuthError: true,
      };
    }

    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove this item from your wishlist?"
      );
      if (!confirmDelete) return;

      const response = await axios.delete(
        `http://localhost:2525/user/wishlist/remove/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setWishlist(response.data.wishlist.items);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to remove from wishlist";
      return { success: false, message: errorMessage };
    }
  };

  const clearWishlist = async () => {
    if (!isAuthenticated) {
      return {
        success: false,
        message: "Please login to modify wishlist",
        isAuthError: true,
      };
    }

    try {
      const response = await axios.delete(
        "http://localhost:2525/user/wishlist/clear",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setWishlist(response.data.wishlist.items);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to clear wishlist";
      return { success: false, message: errorMessage };
    }
  };

  const isInWishlist = (productId) => {
    if (!isAuthenticated) return false;
    return wishlist.some((item) => item.product._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        fetchWishlist,
        isAuthenticated, // Also expose auth state for components to check
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);