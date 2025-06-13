import React, { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import ProductCard from "../../components/shop/ProductCard";

import { useProductContext } from "../../context/ProductContext";

const Shop = () => {
  const { products, loading, error } = useProductContext();

  const [filters, setFilters] = useState({
    price: "",
    color: [],
    material: [],
    occasion: [],
  });
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = {
    color: ["Red", "Blue", "Green", "Pink", "Yellow", "Purple"],
    material: ["Silk", "Cotton", "Georgette", "Chiffon", "Crepe"],
    occasion: ["Wedding", "Party", "Casual", "Festival", "Office"],
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: Array.isArray(prev[category])
        ? prev[category].includes(value)
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value]
        : value,
    }));
  };

  const filterByPrice = (price, selectedRange) => {
    if (!selectedRange) return true;
    const [min, max] = selectedRange.split("-");
    if (selectedRange === "10000+") return price > 10000;
    return price >= parseInt(min) && price <= parseInt(max);
  };

  const filteredProducts = products
    .filter((product) => {
      const { sellingPrice, color, material, occasion } = filters;
      return (
        filterByPrice(product.sellingPrice, sellingPrice) &&
        (color.length === 0 || color.includes(product.filter.color)) &&
        (material.length === 0 || material.includes(product.filter.material)) &&
        (occasion.length === 0 ||
          occasion.some((selected) =>
            Array.isArray(product.filter.occasion)
              ? product.filter.occasion.includes(selected)
              : product.filter.occasion === selected
          ))
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return a.sellingPrice - b.sellingPrice;
        case "price-high-low":
          return b.sellingPrice - a.sellingPrice;
        case "popularity":
          return b.sellingPrice - a.sellingPrice; // Dummy popularity logic
        case "newest":
        default:
          return b._id - a._id; // Newest last added first
      }
    });

  const FilterSection = ({ title, options, category }) => (
    <div className="py-6 border-b border-gray-200 last:border-b-0">
      <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center group cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filters[category].includes(option)}
              onChange={() => handleFilterChange(category, option)}
              className="h-4 w-4 border-2 border-gray-300 text-pink-600 focus:ring-0 rounded-none group-hover:border-pink-400"
            />
            <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  const PriceFilter = () => (
    <div className="py-6 border-b border-gray-200">
      <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
        Price Range
      </h3>
      <select
        value={filters.price}
        onChange={(e) => handleFilterChange("price", e.target.value)}
        className="w-full border border-gray-200 bg-white py-2 pl-3 pr-8 hover:border-pink-200 focus:outline-none focus:border-pink-500"
      >
        <option value="">All Prices</option>
        <option value="0-1000">Under ₹1,000</option>
        <option value="1000-5000">₹1,000 - ₹5,000</option>
        <option value="5000-10000">₹5,000 - ₹10,000</option>
        <option value="10000+">Above ₹10,000</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4">
              Collection
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              All Sarees
            </h1>
            <p className="text-gray-600">
              Discover our exclusive collection of handpicked sarees
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-200 bg-white hover:border-pink-200 focus:outline-none focus:border-pink-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="popularity">Most Popular</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden inline-flex items-center px-4 py-2 border border-gray-200 bg-white hover:border-pink-200"
            >
              <FiFilter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 border border-gray-200 bg-white p-6">
              <PriceFilter />
              <FilterSection
                title="Colors"
                options={filterOptions.color}
                category="color"
              />
              <FilterSection
                title="Materials"
                options={filterOptions.material}
                category="material"
              />
              <FilterSection
                title="Occasions"
                options={filterOptions.occasion}
                category="occasion"
              />
            </div>
          </div>

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-gray-600 text-center py-20">
                No products match your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id + product.name}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                <PriceFilter />
                <FilterSection
                  title="Colors"
                  options={filterOptions.color}
                  category="color"
                />
                <FilterSection
                  title="Materials"
                  options={filterOptions.material}
                  category="material"
                />
                <FilterSection
                  title="Occasions"
                  options={filterOptions.occasion}
                  category="occasion"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
