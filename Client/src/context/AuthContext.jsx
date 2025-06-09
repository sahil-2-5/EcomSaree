import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/user/signup', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        agreedToTerms: userData.agreedToTerms,
      });

      return response.data.mes;
    }catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      // Implement your login logic here
      // For now, we'll just simulate a successful login
      setUser({
        id: 1,
        email,
        name: 'Test User',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      // Implement your profile update logic here
      setUser({ ...user, ...userData });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
