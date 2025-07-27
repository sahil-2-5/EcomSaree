import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductReviewContext = createContext();

export const ProductReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch all reviews (GET /reviews)
  const fetchReviews = async () => {
   try {
      setLoading(true);
      const response = await axios.get("http://localhost:2525/admin/reviews", {
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

  // ✅ Update review status (PUT /reviews/:reviewId/status)
  const updateReviewStatus = async (reviewId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:2525/admin/reviews/${reviewId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  // ✅ Delete review (DELETE /reviews/:reviewId)
  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:2525/admin/reviews/${reviewId}`, {
        withCredentials: true,
      });
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.error("Review delete failed", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <ProductReviewContext.Provider
      value={{
        reviews,
        loading,
        error,
        fetchReviews,
        updateReviewStatus,
        deleteReview,
      }}
    >
      {children}
    </ProductReviewContext.Provider>
  );
};

export const useProductReviewContext = () => useContext(ProductReviewContext);
