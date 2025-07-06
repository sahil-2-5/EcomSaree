import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const BannerContext = createContext();

// Custom Hook
export const useBanner = () => useContext(BannerContext);

// Provider Component
export const   BannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Banners
  const fetchAllBanners = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:2525/admin/banners");
      setBanners(res.data.data || []);
      setError(null); 
    } catch (err) {
      setError("Failed to fetch banners.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Banner By ID
  const fetchBannerById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:2525/admin/banners/${id}`);
      return res.data.data;
    } catch (err) {
      console.error("Error fetching banner:", err);
      return null;
    }
  };

  // Create Banner
  const createBanner = async (formData) => {
    try {
      const res = await axios.post("http://localhost:2525/admin/create-banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      fetchAllBanners(); // Refresh list
      return res.data;
    } catch (err) {
      console.error("Error creating banner:", err);
      throw err;
    }
  };

  // Update Banner
  const updateBanner = async (id, updateData) => {
    try {
      const res = await axios.put(`http://localhost:2525/admin/update-banner/${id}`, updateData,{ 
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      fetchAllBanners();
      return res.data;
    } catch (err) {
      console.error("Error updating banner:", err);
      throw err;
    }
  };

  // Update Single Banner Image
  const updateSingleBannerImage = async (bannerId, imageId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("No authentication token found in cookies");
    }

    try {
      const res = await axios.put(
        `http://localhost:2525/admin/update-banner-image/${bannerId}/${imageId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      fetchAllBanners();
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update banner image");
      throw err;
    }
  };

  // Delete Banner
  const deleteBanner = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:2525/admin/delete-banner/${id}` ,
      {
        withCredentials : true ,
      }
    );
      if (res.data.success) {
        setBanners((prev) => prev.filter((banner) => banner._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Initial fetch
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
        fetchBannerById,
        createBanner,
        updateBanner,
        updateSingleBannerImage,
        deleteBanner,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBannerContext = () => useContext(BannerContext);
