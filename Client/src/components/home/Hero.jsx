import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useBannerContext } from "../../context/BannerContext";
import Button from "../common/Button";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Hero = () => {
  const { banners, loading, error } = useBannerContext();
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) => {
        const updated = { ...prevIndexes };
        banners.forEach((banner, i) => {
          const nextIndex =
            ((prevIndexes[i] ?? 0) + 1) % (banner.images?.length || 1);
          updated[i] = nextIndex;
        });
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center text-white">
        Loading banners...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="relative h-[700px] mt-16 bg-gray-900 overflow-hidden">
      {/* Full-width Marquee Banner Titles */}
      {banners.length > 0 && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-black/70 backdrop-blur-sm py-3 overflow-hidden border-b border-purple-900/30">
          <div className="relative w-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            
            <div className="marquee-track">
              <div className="marquee-content">
                {/* Repeat each title 3 times */}
                {[...Array(3)].map((_, repeatIndex) => (
                  banners.map((banner, index) => (
                    <span 
                      key={`marquee-${banner._id}-${index}-${repeatIndex}`} 
                      className="marquee-item"
                    >
                      <span className="inline-block px-2 py-1 bg-purple-900/30 rounded-md mx-2">
                        {banner.title}
                      </span>
                      <span className="mx-4 text-purple-400 animate-pulse">◆</span>
                    </span>
                  ))
                ))}
              </div>
              {/* Duplicate for seamless looping */}
              <div className="marquee-content" aria-hidden="true">
                {[...Array(3)].map((_, repeatIndex) => (
                  banners.map((banner, index) => (
                    <span 
                      key={`marquee-duplicate-${banner._id}-${index}-${repeatIndex}`} 
                      className="marquee-item"
                    >
                      <span className="inline-block px-2 py-1 bg-purple-900/30 rounded-md mx-2">
                        {banner.title}
                      </span>
                      <span className="mx-4 text-purple-400 animate-pulse">◆</span>
                    </span>
                  ))
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} !w-2 !h-2 !bg-white opacity-60 mx-1"></span>`,
        }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {banners.map((banner, i) => {
          const activeImage =
            banner.images?.[currentImageIndexes[i] ?? 0]?.url || "";

          return (
            <SwiperSlide key={banner._id}>
              {({ isActive }) => (
                <div className="relative h-full w-full">
                  {/* Background Image with overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={activeImage}
                      alt={banner.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/30 to-black/90" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
                  </div>

                  {/* Banner Content */}
                  <div
                    className={`relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="flex flex-col justify-center h-full">
                      <div className="max-w-2xl text-white">
                        {banner.type && (
                          <span className="group inline-block px-6 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/25 backdrop-blur-sm relative overflow-hidden">
                            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                            <span className="mr-2 animate-bounce inline-block">✨</span>
                            {banner.type.toUpperCase()}
                          </span>
                        )}

                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up [text-shadow:_0_4px_20px_rgba(0,0,0,0.4)]">
                          {banner.title}
                        </h1>

                        {banner.description && (
                          <p className="text-xl text-gray-200 mb-12 animate-fade-in-up [animation-delay:200ms] max-w-xl">
                            {banner.description}
                          </p>
                        )}

                        <div className="flex gap-4">
                          <Link to="/collections">
                            <Button
                              variant="primary"
                              size="lg"
                              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 animate-fade-in-up [animation-delay:400ms]"
                            >
                              {banner.ctaText || "Shop Now"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom CSS Animations */}
      <style jsx>{`
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .marquee-track {
          display: flex;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }

        .marquee-content {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: space-around;
          min-width: 100%;
          animation: marquee ${banners.length * 15}s linear infinite;
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          color: white;
          font-size: 0.95rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;