import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProductReviewContext = createContext();

export const ProductReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [productReviews, setProductReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create a new review
  const createReview = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:2525/user/reviews/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Review submitted successfully");
        return response.data.review;
      } else {
        toast.error(response.data.message || "Review submission failed");
      }
    } catch (error) {
      console.error("Create review error:", error);
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  // Get all reviews for a product
  const getReviewsByProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:2525/user/reviews/product/${productId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setProductReviews(response.data.reviews);
      } else {
        toast.error("Failed to load product reviews");
      }
    } catch (error) {
      console.error("Get product reviews error:", error);
      toast.error("Error fetching product reviews");
    } finally {
      setLoading(false);
    }
  };

  // Get all reviews (for admin/user dashboard etc.)
  const getAllReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:2525/user/reviews", {
        withCredentials: true,
      });

      if (response.data.success) {
        setReviews(response.data.reviews);
      } else {
        toast.error("Failed to fetch all reviews");
      }
    } catch (error) {
      console.error("Get all reviews error:", error);
      toast.error("Error fetching reviews");
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
