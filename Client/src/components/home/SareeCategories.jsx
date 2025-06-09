import React from 'react';
import { Link } from 'react-router-dom';
import saree6 from "../../assets/saree6.jpeg"
import saree7 from "../../assets/saree7.jpeg"
import saree8 from "../../assets/saree8.jpeg"
import saree9 from "../../assets/saree9.jpeg"

const SareeCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Silk Sarees',
      description: 'Traditional pure silk sarees',
      image: saree6,
      count: 156,
      color: 'from-purple-500'
    },
    {
      id: 2,
      name: 'Cotton Sarees',
      description: 'Comfortable daily wear sarees',
      image: saree7,
      count: 98,
      color: 'from-pink-500'
    },
    {
      id: 3,
      name: 'Designer Sarees',
      description: 'Contemporary designer collection',
      image: saree8,
      count: 72,
      color: 'from-red-500'
    },
    {
      id: 4,
      name: 'Bridal Sarees',
      description: 'Exclusive wedding collection',
      image: saree8,
      count: 45,
      color: 'from-orange-500'
    },
    {
      id: 5,
      name: 'Printed Sarees',
      description: 'Modern printed designs',
      image:saree7,
      count: 124,
      color: 'from-teal-500'
    },
    {
      id: 6,
      name: 'Handloom Sarees',
      description: 'Traditional handwoven sarees',
      image:saree9,
      count: 89,
      color: 'from-blue-500'
    }
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.02] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 rounded-full mb-4 border border-pink-100">
            Extensive Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Discover our wide range of sarees for every occasion,
            <br className="hidden sm:block" />
            from daily wear to special celebrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
              className="group relative overflow-hidden rounded-3xl bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ease-out"
                />
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-60 mix-blend-overlay group-hover:opacity-70 transition-all duration-500`}
                  aria-hidden="true"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white">
                        {category.count} Products
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{category.name}</h3>
                    <p className="text-white/90 font-medium mb-4 line-clamp-2">{category.description}</p>
                    <div className="flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                      Explore Collection
                      <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
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

export default SareeCategories;
