import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";
import Layout from "./components/layout/Layout";

// User Pages
import Home from "./pages/Home";
import Shop from "./pages/shop/Shop";
import Collections from "./pages/shop/Collections";
import NewArrivals from "./pages/shop/NewArrivals";
import ProductDetail from "./pages/shop/ProductDetail";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/cart/Checkout";
import OrderConfirmation from "./pages/cart/OrderConfirmation";
import Wishlist from "./pages/wishlist/Wishlist";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Account Pages
import Account from "./pages/account/Account";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgotOtp from "./pages/auth/ForgotOtp";
import ResetPassword from "./pages/auth/ResetPassword";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const wrapInLayout = (element) => {
    return isAdminRoute ? element : <Layout>{element}</Layout>;
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <Routes>
              {/* User Routes */}
              <Route path="/" element={wrapInLayout(<Home />)} />
              <Route path="/shop" element={wrapInLayout(<Shop />)} />
              <Route
                path="/collections"
                element={wrapInLayout(<Collections />)}
              />
              <Route
                path="/collections/new-arrivals"
                element={wrapInLayout(<NewArrivals />)}
              />
              <Route
                path="/collections/wedding"
                element={wrapInLayout(<Collections category="wedding" />)}
              />
              <Route
                path="/collections/silk"
                element={wrapInLayout(<Collections category="silk" />)}
              />
              <Route
                path="/collections/designer"
                element={wrapInLayout(<Collections category="designer" />)}
              />
              <Route
                path="/collections/casual"
                element={wrapInLayout(<Collections category="casual" />)}
              />
              <Route
                path="/collections/party"
                element={wrapInLayout(<Collections category="party" />)}
              />
              <Route
                path="/product/:id"
                element={wrapInLayout(<ProductDetail />)}
              />
              <Route path="/cart" element={wrapInLayout(<Cart />)} />
              <Route path="/checkout" element={wrapInLayout(<Checkout />)} />
              <Route
                path="/order-confirmation"
                element={wrapInLayout(<OrderConfirmation />)}
              />
              <Route path="/wishlist" element={wrapInLayout(<Wishlist />)} />

              {/* Auth Routes */}
              <Route path="/login" element={wrapInLayout(<Login />)} />
              <Route path="/register" element={wrapInLayout(<Register />)} />
              <Route path="/forgot-password" element={wrapInLayout(<ForgotPassword/>)} />
              <Route path="/verify-otp" element={wrapInLayout(<VerifyOtp/>)} />
              <Route path="/forgot-otp" element={wrapInLayout(<ForgotOtp/>)} />
              <Route path="/reset-password" element={wrapInLayout(<ResetPassword/>)} />

              {/* Account Routes */}
              <Route path="/account" element={wrapInLayout(<Account />)} />

              {/* Admin Routes */}
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/orders" element={<Orders />} />
            </Routes>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
