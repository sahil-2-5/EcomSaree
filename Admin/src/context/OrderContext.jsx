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

  // Update Order Status (Admin only)
  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.put(
        `http://localhost:2525/admin/update-order-status/${orderId}`,
        { status },
        { withCredentials: true }
      );

      // Update local state
      setOrders(prev => prev.map(order => 
        order._id === orderId ? data.order : order
      ));
      
      if (currentOrder?._id === orderId) {
        setCurrentOrder(data.order);
      }

      return data.order;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                         err.message || 
                         'Failed to update order status';
      setError(errorMessage);
      throw new Error(errorMessage);
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