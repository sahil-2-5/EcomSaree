import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Fashion Blogger',
    image: '/images/testimonials/priya.jpg',
    content:
      'The quality of sarees from this shop is exceptional. The customer service is outstanding, and the delivery was prompt. Highly recommended!',
  },
  {
    id: 2,
    name: 'Meera Patel',
    role: 'Regular Customer',
    image: '/images/testimonials/meera.jpg',
    content:
      'I love the variety of sarees available here. The collection is trendy yet traditional, and the prices are very reasonable.',
  },
  {
    id: 3,
    name: 'Anjali Desai',
    role: 'Wedding Planner',
    image: '/images/testimonials/anjali.jpg',
    content:
      'As a wedding planner, I often recommend this shop to my clients. The bridal collection is stunning, and they never disappoint!',
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">{testimonial.content}</p>
      <div className="mt-4 flex text-pink-500">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
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
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
