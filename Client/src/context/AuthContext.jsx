// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:2525/user/signup",
        userData,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (formData) => {
    const res = await axios.post(
      "http://localhost:2525/user/signup/verify-otp",
      formData
    );
    return res.data;
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:2525/user/login",
        { email, password },
        { withCredentials: true }
      );
      const  {clientToken}  = res.data;
      localStorage.setItem("clientToken", clientToken);
      setUser(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:2525/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      localStorage.removeItem("clientToken");
    } catch (err) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    const res = await axios.post("http://localhost:2525/user/forgot-password", {
      email,
    });
    return res.data;
  };

  const verifyResetOtp = async (formData) => {
    const res = await axios.post(
      "http://localhost:2525/user/reset-password/verify-otp",
      formData
    );
    return res.data;
  };

  const resetPassword = async (formData) => {
    const res = await axios.post(
      "http://localhost:2525/user/reset-password",
      formData
    );
    return res.data;
  };
  
const updateProfile = async (formData) => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.put(
      "http://localhost:2525/user/update-profile",
      formData,
      { withCredentials: true }
    );

    const updatedUser = res.data.updatedUser; // ✅ coming from your controller
    setUser(updatedUser); // ✅ update context state
    return updatedUser;
  } catch (err) {
    setError(err.response?.data?.msg || "Profile update failed");
    throw err;
  } finally {
    setLoading(false);
  }
};

  // Load user session on page load
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("http://localhost:2525/user/session", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        verifyOtp,
        forgotPassword,
        verifyResetOtp,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
