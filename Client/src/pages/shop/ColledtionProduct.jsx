import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/shop/ProductCard";

const CollectionProduct = () => {
  const { filterType, filterValue } = useParams();
  const { fetchProductsByFilter, products, loading, error } = useProductContext();

  useEffect(() => {
    if (filterType && filterValue) {
      fetchProductsByFilter(filterType, filterValue);
    }
  }, [filterType, filterValue]);

  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-pink-50/30 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4">
            Filtered Collection
          </span>
          <h1 className="text-4xl font-bold text-gray-900 capitalize mb-2">
            {filterType}: {filterValue}
          </h1>
          <p className="text-gray-600">Browse sarees by selected criteria.</p>
        </div>

        {/* Product Display */}
        {loading ? (
          <div className="text-center text-gray-600 py-10">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            No products found for this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionProduct;
