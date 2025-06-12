import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:2525/admin/products");
      setProducts(res.data.products || []);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data.product;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch product");
      return null;
    }
  };

  const addProduct = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:2525/admin/add-product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setProducts((prev) => [...prev, res.data.product]);
      return res.data.product;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:2525/admin/delete-product/${productId}`,
        {
          withCredentials: true,
        }
      );
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId, updateData) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:2525/admin/update-product/${productId}`,
        updateData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? res.data.product : p))
      );
      return res.data.product;
    } catch (err) {
      setError("Failed to update product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSingleImage = async (productId, imageId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.put(
        `${BASE_URL}/image/${productId}/${imageId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? res.data.product : p))
      );
      return res.data.product;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update image");
      throw err;
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
        getProductById,
        addProduct,
        updateProduct,
        updateSingleImage,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);