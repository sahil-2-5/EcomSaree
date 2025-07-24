import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:2525/user/products");
      setProducts(res.data.products || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch product by ID
  const fetchProductById = async (productId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:2525/user/product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setError(null);
      return res.data.product;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch product");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch products by filter: material or occasion
  const fetchProductsByFilter = async (type, value) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:2525/user/products/filter/${type}/${value}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProducts(res.data.products || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch filtered products");
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
        fetchProductsByFilter, // Exported function
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
