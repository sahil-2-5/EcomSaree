import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const OrderContext = createContext();

// Custom Hook
export const useOrder = () => useContext(OrderContext);

// Provider Component
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Fetch All Orders (Admin only)
  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:2525/admin/orders", {
        withCredentials: true,
      });
      setOrders(res.data.orders || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Single Order by ID
  const fetchOrderById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/orders/${id}`, {
        withCredentials: true,
      });
      setCurrentOrder(res.data.order);
      setError(null);
      return res.data.order;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch order");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update Order Status (Admin only)
  const updateOrderStatus = async (id, status) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `/api/orders/${id}/status`,
        { status },
        { withCredentials: true }
      );

      // Update the order in the list
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? res.data.order : order))
      );

      // Update current order if it's the one being updated
      if (currentOrder?._id === id) {
        setCurrentOrder(res.data.order);
      }

      setError(null);
      return res.data.order;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order status");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of user's orders
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        loading,
        error,
        fetchAllOrders,
        fetchOrderById,
        updateOrderStatus,
        setCurrentOrder,
        setError,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);