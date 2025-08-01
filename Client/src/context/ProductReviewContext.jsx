import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext"; // Import the AuthContext

const ProductReviewContext = createContext();

export const ProductReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [productReviews, setProductReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth(); // Get auth state from AuthContext

  // Create a new review (only if user is authenticated)
  const createReview = async (formData) => {
    if (!isAuthenticated) {
      toast.error("Please login to submit a review");
      return {
        success: false,
        message: "User not authenticated",
        isAuthError: true
      };
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:2525/user/reviews/create", 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Review submitted successfully");
        // Update the product reviews list with the new review
        setProductReviews(prev => [response.data.review, ...prev]);
        return {
          success: true,
          review: response.data.review
        };
      } else {
        toast.error(response.data.message || "Review submission failed");
        return {
          success: false,
          message: response.data.message
        };
      }
    } catch (error) {
      console.error("Create review error:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit review";
      toast.error(errorMessage);

      if (error.response?.status === 401) {
        return {
          success: false,
          message: errorMessage,
          isAuthError: true
        };
      }

      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  // Get all reviews for a product (no authentication required)
  const getReviewsByProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2525/user/reviews/product/${productId}`
        // Removed withCredentials since login is not required
      );

      if (response.data.success) {
        setProductReviews(response.data.reviews);
        return {
          success: true,
          reviews: response.data.reviews
        };
      } else {
        toast.error(response.data.message || "Failed to load product reviews");
        return {
          success: false,
          message: response.data.message
        };
      }
    } catch (error) {
      console.error("Get product reviews error:", error);
      const errorMessage = error.response?.data?.message || "Error fetching product reviews";
      toast.error(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  // Get all reviews (no authentication required)
  const getAllReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:2525/user/reviews/active"
        // Removed withCredentials since login is not required
      );

      if (response.data.success) {
        setReviews(response.data.reviews);
        return {
          success: true,
          reviews: response.data.reviews
        };
      } else {
        toast.error(response.data.message || "Failed to fetch all reviews");
        return {
          success: false,
          message: response.data.message
        };
      }
    } catch (error) {
      console.error("Get all reviews error:", error);
      const errorMessage = error.response?.data?.message || "Error fetching reviews";
      toast.error(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductReviewContext.Provider
      value={{
        reviews,
        productReviews,
        loading,
        createReview,
        getReviewsByProduct,
        getAllReviews,
      }}
    >
      {children}
    </ProductReviewContext.Provider>
  );
};

// Custom hook for consuming the context
export const useProductReviewContext = () => useContext(ProductReviewContext);