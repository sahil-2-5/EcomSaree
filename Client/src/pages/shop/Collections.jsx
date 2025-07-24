import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useProductContext } from '../../context/ProductContext';

const Collections = ({ categoryType, categoryValue }) => {
  const { products, loading, error } = useProductContext();
  const [categoryProducts, setCategoryProducts] = useState([]);

  // Material and occasion options
  const materialOptions = [
    "Silk",
    "Paithani Silk",
    "Banarasi Silk",
    "Cotton",
    "Georgette",
    "Chiffon",
    "Crepe",
    "Linen",
    "Wool",
    "Satin",
    "Velvet",
    "Denim",
    "Leather",
    "Polyester",
    "Rayon",
    "Spandex",
    "Cashmere",
    "Jersey",
    "Tulle",
    "Organza",
    "Taffeta",
    "Brocade",
  ];

  const occasionOptions = [
    "Wedding",
    "Party",
    "Casual",
    "Festival",
    "Office",
    "Formal",
    "Cocktail",
    "Beach",
    "Vacation",
    "Date Night",
    "Graduation",
    "Prom",
    "Bridal Shower",
    "Baby Shower",
    "Anniversary",
    "Business Meeting",
    "Interview",
    "Brunch",
    "Evening Out",
    "Gala",
  ];

  // Helper functions to get descriptions
  const getMaterialDescription = (material) => {
    const descriptions = {
      "Silk": "Luxurious silk sarees for special occasions",
      "Paithani Silk": "Traditional Maharashtrian silk sarees with peacock designs",
      "Banarasi Silk": "Exquisite handwoven silk sarees from Varanasi",
      "Cotton": "Comfortable cotton sarees for daily wear",
      "Georgette": "Lightweight and flowy georgette sarees",
      "Chiffon": "Elegant and sheer chiffon sarees",
      "Crepe": "Wrinkle-resistant crepe sarees with beautiful drape",
      "Linen": "Breathable linen sarees for summer",
      "Wool": "Warm woolen sarees for winter",
      "Satin": "Glossy satin sarees with rich texture",
      "Velvet": "Luxurious velvet sarees for royal look",
      "Denim": "Contemporary denim sarees for casual wear",
      "Leather": "Edgy leather sarees for bold fashion statements",
      "Polyester": "Easy-care polyester sarees",
      "Rayon": "Soft and comfortable rayon sarees",
      "Spandex": "Stretchy spandex blend sarees for perfect fit",
      "Cashmere": "Ultra-soft cashmere sarees for luxury",
      "Jersey": "Comfortable jersey sarees for everyday wear",
      "Tulle": "Dreamy tulle sarees for fairy-tale looks",
      "Organza": "Sheer and crisp organza sarees",
      "Taffeta": "Rustling taffeta sarees for special events",
      "Brocade": "Heavy brocade sarees with intricate designs",
    };
    return descriptions[material] || `Beautiful ${material} sarees for various occasions`;
  };

  const getOccasionDescription = (occasion) => {
    const descriptions = {
      "Wedding": "Exquisite bridal sarees for your special day",
      "Party": "Glamorous sarees for parties and events",
      "Casual": "Comfortable sarees for everyday wear",
      "Festival": "Traditional sarees for festive occasions",
      "Office": "Elegant sarees for professional settings",
      "Formal": "Sophisticated sarees for formal events",
      "Cocktail": "Chic sarees for cocktail parties",
      "Beach": "Lightweight sarees perfect for beach outings",
      "Vacation": "Easy-to-carry sarees for your vacations",
      "Date Night": "Romantic sarees for special evenings",
      "Graduation": "Elegant sarees for graduation ceremonies",
      "Prom": "Glamorous sarees for prom night",
      "Bridal Shower": "Beautiful sarees for bridal showers",
      "Baby Shower": "Comfortable yet stylish maternity sarees",
      "Anniversary": "Special sarees for anniversary celebrations",
      "Business Meeting": "Professional sarees for business meetings",
      "Interview": "Modest and elegant sarees for interviews",
      "Brunch": "Light and cheerful sarees for brunch dates",
      "Evening Out": "Stylish sarees for evening outings",
      "Gala": "Luxurious sarees for gala events",
    };
    return descriptions[occasion] || `Perfect sarees for ${occasion} occasions`;
  };

  // Generate all collections
  const generateCollections = () => {
    const materialCollections = materialOptions.map((material, index) => ({
      id: index + 1,
      name: `${material} Sarees`,
      description: getMaterialDescription(material),
      filterType: 'material',
      filterValue: material
    }));

    const occasionCollections = occasionOptions.map((occasion, index) => ({
      id: materialOptions.length + index + 1,
      name: `${occasion} Collection`,
      description: getOccasionDescription(occasion),
      filterType: 'occasion',
      filterValue: occasion
    }));

    return [...materialCollections, ...occasionCollections];
  };

  const collections = generateCollections();

  useEffect(() => {
    if (categoryType && categoryValue) {
      const filteredProducts = products.filter(product => {
        const productFilterValue = product.filter[categoryType];
        if (Array.isArray(productFilterValue)) {
          return productFilterValue.includes(categoryValue);
        }
        return productFilterValue === categoryValue;
      });
      setCategoryProducts(filteredProducts);
    }
  }, [categoryType, categoryValue, products]);

  // Function to get a cover image for a collection
  const getCollectionCoverImage = (collection) => {
    const matchingProducts = products.filter(product => {
      const productFilterValue = product.filter[collection.filterType];
      if (Array.isArray(productFilterValue)) {
        return productFilterValue.includes(collection.filterValue);
      }
      return productFilterValue === collection.filterValue;
    });
    
    return matchingProducts.length > 0 && matchingProducts[0].images.length > 0 
      ? matchingProducts[0].images[0].url 
      : 'https://via.placeholder.com/300x400?text=No+Image';
  };

  // Calculate item counts for each collection and filter out empty categories
  const collectionsWithCounts = collections
    .map(collection => {
      const matchingProducts = products.filter(product => {
        const productFilterValue = product.filter[collection.filterType];
        if (Array.isArray(productFilterValue)) {
          return productFilterValue.includes(collection.filterValue);
        }
        return productFilterValue === collection.filterValue;
      });
      
      return {
        ...collection,
        itemCount: matchingProducts.length,
        image: getCollectionCoverImage(collection),
        route: `/collections/${collection.filterType}/${collection.filterValue.toLowerCase()}`
      };
    })
    .filter(collection => collection.itemCount > 0);

  // If no specific category is selected, show all non-empty collections
  if (!categoryType || !categoryValue) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Collections</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections organized by material and occasion
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading collections...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : collectionsWithCounts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No collections available at the moment
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionsWithCounts.map((collection) => (
              <Link
                key={collection.id}
                to={collection.route}
                className="group block"
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
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
        )}
      </div>
    );
  }

  // Show category-specific products
  const selectedCollection = collections.find(
    c => c.filterType === categoryType && c.filterValue.toLowerCase() === categoryValue.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white pt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        {selectedCollection ? (
          <div className="flex flex-col mb-12">
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4 w-fit">
              {categoryType === 'material' ? 'Material' : 'Occasion'}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {selectedCollection.name}
            </h1>
            <p className="text-lg text-gray-600">{selectedCollection.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'} available
            </p>
          </div>
        ) : (
          <div className="flex flex-col mb-12">
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4 w-fit">
              Collection
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {categoryType === 'material' ? 'Material' : 'Occasion'} Collection
            </h1>
            <p className="text-lg text-gray-600">
              Discover our sarees filtered by {categoryType}
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : categoryProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No products found in this collection
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4]">
                  <img
                    src={product.images[0]?.url || "https://via.placeholder.com/300x400?text=No+Image"}
                    alt={product.title}
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
                    {product.title}
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.sellingPrice?.toLocaleString('en-IN')}
                    </span>
                    {product.price && product.price !== product.sellingPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{product.price?.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;