import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import Button from '../common/Button';
import saree1 from "../../assets/saree1.jpg"
import saree2 from "../../assets/saree2.jpg"
import saree3 from "../../assets/saree3.jpg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const heroSlides = [
  {
    image: saree1,
    title: 'Elegant Silk Sarees',
    description: 'Discover our exquisite collection of handwoven silk sarees',
    tag: 'New Arrivals'
  },
  {
    image: saree2,
    title: 'Wedding Collection',
    description: 'Make your special day memorable with our bridal saree collection',
    tag: 'Bridal Wear'
  },
  {
    image: saree3,
    title: 'Designer Sarees',
    description: 'Contemporary designs meet traditional craftsmanship',
    tag: 'Trending'
  }
];

const Hero = () => {
  return (
    <div className="relative h-[700px] bg-gray-900 overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        speed={1000}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + ' !w-2 !h-2 !bg-white opacity-60 mx-1"></span>';
          },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className="relative h-full w-full">
                <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/30 to-black/90" />
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
                </div>
                
                <div className={`relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex flex-col justify-center h-full">
                    <div className="max-w-2xl text-white">
                      <span className="group inline-block px-6 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/25 backdrop-blur-sm relative overflow-hidden">
                        <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                        <span className="mr-2 animate-bounce inline-block">✨</span>
                        {slide.tag}
                      </span>
                      <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up [text-shadow:_0_4px_20px_rgba(0,0,0,0.4)]">
                        {slide.title}
                      </h1>
                      <p className="text-xl text-gray-200 mb-12 animate-fade-in-up [animation-delay:200ms] max-w-xl">
                        {slide.description}
                      </p>
                      <div className="flex gap-4">
                        <Link to="/collections">
                          <Button
                            variant="primary"
                            size="lg"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 animate-fade-in-up [animation-delay:400ms]"
                          >
                            Shop Now
                          </Button>
                        </Link>
                        <Link to="/collections/new-arrivals">
                          <Button
                            variant="secondary"
                            size="lg"
                            className="border-2 border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 animate-fade-in-up [animation-delay:500ms]"
                          >
                            New Arrivals
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Social Proof */}
      <div className="absolute bottom-8 left-8 z-10 flex items-center space-x-4 animate-fade-in-up [animation-delay:600ms]">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/100?img=${i}`}
              alt="Customer"
              className="w-10 h-10 rounded-full border-2 border-white/20"
            />
          ))}
        </div>
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <p className="text-white text-sm">50+ people shopping now</p>
        </div>
      </div>

      {/* Floating Offer Card */}
      <div className="absolute bottom-8 right-8 z-10 overflow-hidden animate-float">
        <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-pink-500/25 group">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
        <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform">
          <p className="text-white font-medium text-lg flex items-center gap-2">
            <span className="text-pink-500">🎉</span> Limited Time Offer
          </p>
          <p className="text-white text-3xl font-bold mt-1">
            Up to 40% Off
          </p>
          <p className="text-white/80 text-lg mt-1">On Premium Sarees</p>
        </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
