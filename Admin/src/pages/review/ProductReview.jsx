import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminPanel';
import { useProductReviewContext } from '../../context/ProductReviewContext';

const ProductReview = () => {
  const {
    reviews,
    loading,
    error,
    fetchReviews,
    updateReviewStatus,
    deleteReview
  } = useProductReviewContext();

  const [statusUpdateId, setStatusUpdateId] = useState(null);

  const handleStatusChange = async (reviewId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'draft' : 'active';
    setStatusUpdateId(reviewId);
    
    try {
      await updateReviewStatus(reviewId, newStatus);
      fetchReviews();
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setStatusUpdateId(null);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        fetchReviews();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  if (loading && !reviews.length) return <div className="text-center py-8">Loading reviews...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6">

        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={review.images?.[0]?.url || '/images/default-product.png'} 
                            alt={review.product.title || 'Product'} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {review.product.title || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {review.product?.price || 'N/A'} /-
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {review.user?.firstName || 'Anonymous'}
                        {review.user?.lastName && ` ${review.user.lastName}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        {review.user?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {review.comment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {review.images?.length > 0 ? (
                        <div className="flex space-x-1">
                          {review.images.slice(0, 2).map((img, i) => (
                            <img
                              key={i}
                              src={img.url}
                              alt={`Review ${i + 1}`}
                              className="h-10 w-10 rounded object-cover"
                            />
                          ))}
                          {review.images.length > 2 && (
                            <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-xs">
                              +{review.images.length - 2}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No images</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        review.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleStatusChange(review._id, review.status)}
                        disabled={statusUpdateId === review._id}
                        className={`p-1 rounded ${
                          review.status === 'active' ? 
                            'text-gray-500 hover:bg-gray-50' : 
                            'text-green-500 hover:bg-green-50'
                        }`}
                        title={review.status === 'active' ? 'Set to Draft' : 'Publish'}
                      >
                        {statusUpdateId === review._id ? (
                          <span className="animate-spin">...</span>
                        ) : review.status === 'active' ? (
                          <FiX className="h-4 w-4" />
                        ) : (
                          <FiCheck className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProductReview;