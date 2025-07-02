import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
const BannerContext = createContext();

// Provider
export const BannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all banners
  const fetchAllBanners = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:2525/user/banners", {
        withCredentials: true,
      });
      setBanners(res.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch banners on mount
  useEffect(() => {
    fetchAllBanners();
  }, []);

  return (
    <BannerContext.Provider
      value={{
        banners,
        loading,
        error,
        fetchAllBanners,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

// Hook to use the context
export const useBannerContext = () => useContext(BannerContext);
