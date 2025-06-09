import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import saree7 from "../../assets/saree7.jpeg"
import saree8 from "../../assets/saree8.jpeg"
import saree9 from "../../assets/saree9.jpeg"

const TrendingSarees = () => {
  const trendingSarees = [
    {
      id: 1,
      name: 'Bandhani Print Saree',
      image: saree7,
      price: 4999,
      tag: 'Bestseller'
    },
    {
      id: 2,
      name: 'Patola Silk Saree',
      image: saree8,
      price: 29999,
      tag: 'Premium'
    },
    {
      id: 3,
      name: 'Georgette Designer Saree',
      image: saree9,
      price: 6999,
      tag: 'New Arrival'
    }
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 rounded-full mb-4 border border-pink-100">
              Hot Right Now
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Trending Sarees
            </h2>
          </div>
          <Link
            to="/shop?filter=trending"
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-pink-600 hover:text-white bg-white hover:bg-pink-600 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100 hover:border-transparent"
          >
            View Collection
            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {trendingSarees.map((saree) => (
            <Link 
              key={saree.id}
              to={`/shop?category=${saree.name.toLowerCase().replace(/ /g, '-')}`}
              className="group relative overflow-hidden rounded-2xl bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={saree.image}
                  alt={saree.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ease-out"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span 
                      className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                    >
                      {saree.tag}
                    </span>
                    <span className="w-px h-4 bg-white/30" aria-hidden="true" />
                    <span className="text-sm font-medium">₹{saree.price.toLocaleString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 leading-tight">{saree.name}</h3>
                  <div className="flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                    Explore Collection
                    <FiArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSarees;
