// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const register = async (adminData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:2525/admin/signup",
        adminData,
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
      "http://localhost:2525/admin/signup/verify-otp",
      formData
    );
    return res.data;
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:2525/admin/login",
        { email, password },
        { withCredentials: true }
      );
      const { adminToken } = res.data;
      localStorage.setItem("adminToken", adminToken);
      setAdmin(res.data);
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
        "http://localhost:2525/admin/logout",
        {},
        { withCredentials: true }
      );
      setAdmin(null);
      localStorage.removeItem("adminToken");
    } catch (err) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    const res = await axios.post(
      "http://localhost:2525/admin/forgot-password",
      {
        email,
      }
    );
    return res.data;
  };

  const verifyResetOtp = async (formData) => {
    const res = await axios.post(
      "http://localhost:2525/admin/forgot-password/verify-otp",
      formData
    );
    return res.data;
  };

  const resetPassword = async (formData) => {
    const res = await axios.post(
      "http://localhost:2525/admin/reset-password",
      formData
    );
    return res.data;
  };

  // Load user session on page load
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("http://localhost:2525/admin/session", {
          withCredentials: true,
        });
        setAdmin(res.data.admin);
      } catch (err) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        error,
        isAuthenticated: !!admin,
        login,
        logout,
        register,
        verifyOtp,
        forgotPassword,
        verifyResetOtp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
