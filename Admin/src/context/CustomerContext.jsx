import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const CustomerContext = createContext();

// Custom Hook
export const useCustomer = () => useContext(CustomerContext);

// Provider Component
export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Customers with their order details
  const fetchAllCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:2525/admin/customer", {
        withCredentials: true,
      });
      setCustomers(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Customer By ID
  const fetchCustomerById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:2525/admin/customer/${id}`,
        {
          withCredentials: true,
        }
      );
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch customer");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update Customer Status
  const updateCustomerStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:2525/admin/customer/${id}/status`,
        { status },
        { withCredentials: true }
      );
      fetchAllCustomers(); // Refresh list
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update customer status"
      );
      throw err;
    }
  };

  // Get Customer Orders
  const fetchCustomerOrders = async (customerId) => {
    try {
      const res = await axios.get(
        `http://localhost:2525/admin/get-my-orders/${customerId}`,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(res.data);
      return res.data.orders || [];
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch customer orders"
      );
      return [];
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        loading,
        error,
        fetchAllCustomers,
        fetchCustomerById,
        updateCustomerStatus,
        fetchCustomerOrders,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);
