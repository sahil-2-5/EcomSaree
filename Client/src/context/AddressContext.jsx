import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllAddresses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:2525/user/addresses", {
        withCredentials: true,
      });
      setAddresses(res.data.addresses || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (addressData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:2525/user/add-address",
        addressData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAddresses(res.data.addresses);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error adding address");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async (addressId) => {
    setLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:2525/user/set-default-address",
        { addressId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAddresses(res.data.addresses);
      setError(null);
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Error setting default address"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (addressId, updatedData) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:2525/user/update-address/${addressId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAddresses(res.data.addresses);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update address");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `http://localhost:2525/user/delete-address/${addressId}`,
        {
          withCredentials: true,
        }
      );
      setAddresses(res.data.addresses);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting address");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAddresses();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        error,
        fetchAllAddresses,
        addAddress,
        setDefaultAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => useContext(AddressContext);