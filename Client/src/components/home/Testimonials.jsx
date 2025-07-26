import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useProductReviewContext } from '../../context/ProductReviewContext';
import { FaStar } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

const TestimonialCard = ({ testimonial, onClick }) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-lg h-full cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
          <span className="text-xl font-semibold text-pink-600">
            {testimonial.user?.firstName?.charAt(0) || 'C'}
          </span>
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-gray-900">
            {testimonial.user.firstName || 'Customer'}
          </h4>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={16}
                className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 line-clamp-3">{testimonial.comment}</p>
    </div>
  );
};

const Testimonials = () => {
  const { reviews, getAllReviews, loading } = useProductReviewContext();
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllReviews();
  }, []);

  const filteredReviews = reviews.filter(review => review.comment && review.comment.trim() !== '');

  const handleCardClick = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReview(null);
  };

  return (
    <div className="bg-gray-50 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-600"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No testimonials available yet.</p>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {filteredReviews.map((review) => (
              <SwiperSlide key={review._id}>
                <TestimonialCard 
                  testimonial={review} 
                  onClick={() => handleCardClick(review)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Review Detail Modal with Horizontal Images */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedReview.user.firstName || 'Customer'}'s Review
                  </h3>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={20}
                        className={i < selectedReview.rating ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">{selectedReview.rating}/5</span>
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <p className="text-gray-700 mb-6 whitespace-pre-line">{selectedReview.comment}</p>
              
              {selectedReview.images?.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Customer Photos</h4>
                  <div className="flex space-x-4 overflow-x-auto pb-2 -mx-1">
                    {selectedReview.images.map((img, index) => (
                      <div key={index} className="flex-shrink-0 w-48 h-48 rounded-lg overflow-hidden">
                        <img
                          src={img.url}
                          alt={`Review ${index + 1}`}
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

export default Testimonials;