  import React from 'react';
  import { Link } from 'react-router-dom';
  import { FiHeart, FiShoppingCart } from 'react-icons/fi';
  import saree1 from "../../assets/saree1.jpg"
  import saree2 from "../../assets/saree2.jpg"
  import saree3 from "../../assets/saree3.jpg"
  import saree4 from "../../assets/saree4.jpg"
  import saree5 from "../../assets/saree5.jpg"
  import saree6 from "../../assets/saree6.jpeg"
  import saree7 from "../../assets/saree7.jpeg"
  import saree8 from "../../assets/saree8.jpeg"
  import saree9 from "../../assets/saree9.jpeg"

const collections = [
  {
    id: 1,
    name: 'New Arrivals',
    description: 'Latest additions to our saree collection',
    image: saree1,
    itemCount: 24,
    category: 'new-arrivals',
  },
  {
    id: 2,
    name: 'Wedding Collection',
    description: 'Exquisite bridal sarees for your special day',
    image: saree2,
    itemCount: 36,
    category: 'wedding',
  },
  {
    id: 3,
    name: 'Silk Sarees',
    description: 'Traditional handwoven silk sarees',
    image: saree3,
    itemCount: 42,
    category: 'silk',
  },
  {
    id: 4,
    name: 'Designer Collection',
    description: 'Contemporary designer sarees',
    image: saree4,
    itemCount: 18,
    category: 'designer',
  },
  {
    id: 5,
    name: 'Casual Wear',
    description: 'Comfortable and stylish daily wear sarees',
    image: saree5,
    itemCount: 30,
    category: 'casual',
  },
  {
    id: 6,
    name: 'Party Wear',
    description: 'Glamorous sarees for special occasions',
    image: saree6,
    itemCount: 28,
    category: 'party',
  },
];

const categoryProducts = {
  wedding: [
    {
      id: 1,
      name: 'Bridal Banarasi Silk Saree',
      price: '₹45,999',
      originalPrice: '₹49,999',
      image: saree7,
    },
    {
      id: 2,
      name: 'Zari Woven Bridal Saree',
      price: '₹38,999',
      originalPrice: '₹42,999',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80',
    },
  ],
  silk: [
    {
      id: 3,
      name: 'Pure Kanjivaram Silk Saree',
      price: '₹25,999',
      originalPrice: '₹29,999',
      image: saree8,
    },
    {
      id: 4,
      name: 'Traditional Woven Silk Saree',
      price: '₹21,999',
      originalPrice: '₹24,999',
      image: 'https://images.unsplash.com/photo-1610030181087-540017dc9d61?auto=format&fit=crop&w=600&q=80',
    },
  ],
  designer: [
    {
      id: 5,
      name: 'Designer Party Wear Saree',
      price: '₹18,999',
      originalPrice: '₹21,999',
      image: saree9,
    },
    {
      id: 6,
      name: 'Embroidered Net Designer Saree',
      price: '₹16,499',
      originalPrice: '₹18,999',
      image: 'https://images.unsplash.com/photo-1624327208034-c2b5d1aa9934?auto=format&fit=crop&w=600&q=80',
    },
  ],
  casual: [
    {
      id: 7,
      name: 'Casual Cotton Silk Saree',
      price: '₹4,999',
      originalPrice: '₹5,999',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 8,
      name: 'Printed Casual Saree',
      price: '₹3,499',
      originalPrice: '₹4,499',
      image: 'https://images.unsplash.com/photo-1611667325944-1f7dc7cf6fcb?auto=format&fit=crop&w=600&q=80',
    },
  ],
  party: [
    {
      id: 9,
      name: 'Party Wear Georgette Saree',
      price: '₹8,999',
      originalPrice: '₹10,999',
      image: 'https://images.unsplash.com/photo-1610030181087-540017dc9d61?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 10,
      name: 'Sequin Work Party Saree',
      price: '₹9,499',
      originalPrice: '₹11,499',
      image: 'https://images.unsplash.com/photo-1612874746846-d236a5f9a279?auto=format&fit=crop&w=600&q=80',
    },
  ],
};


const Collections = ({ category }) => {
  // If no category is specified, show all collections
  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Collections</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections of beautiful sarees, from traditional to contemporary designs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.category}`}
              className="group block"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] ">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 flex items-end p-8">
                  <div className="text-white">
                    <h2 className="text-2xl font-bold mb-2">
                      {collection.name}
                    </h2>
                    <p className="text-sm font-medium text-white/80 mb-4">
                      {collection.description}
                    </p>
                    <div className="flex items-center text-xs font-medium">
                      <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                        {collection.itemCount} Items
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Show category-specific products
  const selectedCategory = collections.find((c) => c.category === category);
  const products = categoryProducts[category] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white pt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        {selectedCategory ? (
          <div className="flex flex-col mb-12">
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4 w-fit">
              Collection
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {selectedCategory.name}
            </h1>
            <p className="text-lg text-gray-600">{selectedCategory.description}</p>
          </div>
        ) : (
          <div className="flex flex-col mb-12">
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4 w-fit">
              Collections
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Our Saree Collections
            </h1>
            <p className="text-lg text-gray-600">
              Discover our exquisite range of handpicked sarees
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
              

              {/* Quick Actions */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-center space-x-4">
                  <button className="p-2 rounded-full bg-white text-gray-900 hover:bg-gray-100">
                    <FiHeart className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700">
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-gray-900">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Collections;
