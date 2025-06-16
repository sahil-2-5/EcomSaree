import {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:2525/user/products");
      setProducts(res.data.products || []);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (productId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:2525/user/products/${productId}`
      );
      setCurrentProduct(res.data.product);
      setError(null);
      return res.data.product; // Return the product for immediate use
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch product");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchAllProducts,
        fetchProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
