import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";

const SareeCategories = () => {
  const { products, loading, error } = useProductContext();

  const materialOptions = [
    "Silk", "Paithani Silk", "Banarasi Silk", "Cotton", "Georgette", "Chiffon",
    "Crepe", "Linen", "Wool", "Satin", "Velvet", "Denim", "Leather", "Polyester",
    "Rayon", "Spandex", "Cashmere", "Jersey", "Tulle", "Organza", "Taffeta", "Brocade",
  ];

  const occasionOptions = [
    "Wedding", "Party", "Casual", "Festival", "Office", "Formal", "Cocktail", "Beach",
    "Vacation", "Date Night", "Graduation", "Prom", "Bridal Shower", "Baby Shower",
    "Anniversary", "Business Meeting", "Interview", "Brunch", "Evening Out", "Gala",
  ];

  const getMaterialDescription = (material) => {
    const descriptions = {
      Silk: "Luxurious silk sarees for special occasions",
      "Paithani Silk": "Traditional Maharashtrian silk sarees with peacock designs",
      "Banarasi Silk": "Exquisite handwoven silk sarees from Varanasi",
      Cotton: "Comfortable cotton sarees for daily wear",
      Georgette: "Lightweight and flowy georgette sarees",
      Chiffon: "Elegant and sheer chiffon sarees",
      Crepe: "Wrinkle-resistant crepe sarees with beautiful drape",
      Linen: "Breathable linen sarees for summer",
      Wool: "Warm woolen sarees for winter",
      Satin: "Glossy satin sarees with rich texture",
      Velvet: "Luxurious velvet sarees for royal look",
      Denim: "Contemporary denim sarees for casual wear",
      Leather: "Edgy leather sarees for bold fashion statements",
      Polyester: "Easy-care polyester sarees",
      Rayon: "Soft and comfortable rayon sarees",
      Spandex: "Stretchy spandex blend sarees for perfect fit",
      Cashmere: "Ultra-soft cashmere sarees for luxury",
      Jersey: "Comfortable jersey sarees for everyday wear",
      Tulle: "Dreamy tulle sarees for fairy-tale looks",
      Organza: "Sheer and crisp organza sarees",
      Taffeta: "Rustling taffeta sarees for special events",
      Brocade: "Heavy brocade sarees with intricate designs",
    };
    return descriptions[material] || `Beautiful ${material} sarees for various occasions`;
  };

  const getOccasionDescription = (occasion) => {
    const descriptions = {
      Wedding: "Exquisite bridal sarees for your special day",
      Party: "Glamorous sarees for parties and events",
      Casual: "Comfortable sarees for everyday wear",
      Festival: "Traditional sarees for festive occasions",
      Office: "Elegant sarees for professional settings",
      Formal: "Sophisticated sarees for formal events",
      Cocktail: "Chic sarees for cocktail parties",
      Beach: "Lightweight sarees perfect for beach outings",
      Vacation: "Easy-to-carry sarees for your vacations",
      "Date Night": "Romantic sarees for special evenings",
      Graduation: "Elegant sarees for graduation ceremonies",
      Prom: "Glamorous sarees for prom night",
      "Bridal Shower": "Beautiful sarees for bridal showers",
      "Baby Shower": "Comfortable yet stylish maternity sarees",
      Anniversary: "Special sarees for anniversary celebrations",
      "Business Meeting": "Professional sarees for business meetings",
      Interview: "Modest and elegant sarees for interviews",
      Brunch: "Light and cheerful sarees for brunch dates",
      "Evening Out": "Stylish sarees for evening outings",
      Gala: "Luxurious sarees for gala events",
    };
    return descriptions[occasion] || `Perfect sarees for ${occasion} occasions`;
  };

  const getDisplayImage = (matchingProducts, index) => {
    if (!matchingProducts.length) return null;
    const selectedProduct = matchingProducts[index % matchingProducts.length];
    return selectedProduct?.images?.find((img) => img.url)?.url || null;
  };

  const generateCollectionsWithCount = () => {
    const materialCollections = materialOptions.map((material, index) => {
      const matching = products.filter((p) => {
        const val = p.filter?.material;
        return Array.isArray(val) ? val.includes(material) : val === material;
      });

      const imageUrl = getDisplayImage(matching, index);

      return {
        name: `${material} Sarees`,
        description: getMaterialDescription(material),
        count: matching.length,
        route: `/collections/material/${material.toLowerCase()}`,
        image: imageUrl || "https://via.placeholder.com/300x400?text=No+Image",
      };
    });

    const occasionCollections = occasionOptions.map((occasion, index) => {
      const matching = products.filter((p) => {
        const val = p.filter?.occasion;
        return Array.isArray(val) ? val.includes(occasion) : val === occasion;
      });

      const imageUrl = getDisplayImage(matching, index);

      return {
        name: `${occasion} Collection`,
        description: getOccasionDescription(occasion),
        count: matching.length,
        route: `/collections/occasion/${occasion.toLowerCase()}`,
        image: imageUrl || "https://via.placeholder.com/300x400?text=No+Image",
      };
    });

    return [...materialCollections, ...occasionCollections]
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  };

  const topCategories = generateCollectionsWithCount();

  return (
    <section className="relative overflow-hidden py-24">
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

        {loading ? (
          <div className="text-center py-12">Loading categories...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {topCategories.map((cat, index) => (
                <Link
                  key={index}
                  to={cat.route}
                  className="group relative overflow-hidden rounded-3xl bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 opacity-60 mix-blend-overlay group-hover:opacity-70 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white">
                            {cat.count} Products
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                          {cat.name}
                        </h3>
                        <p className="text-white/90 font-medium mb-4 line-clamp-2">
                          {cat.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                          Explore Collection
                          <svg
                            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/collections"
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
              >
                See All Collections
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SareeCategories;
