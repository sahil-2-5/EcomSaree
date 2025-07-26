import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";

// User Pages
import Home from "../pages/Home";
import Shop from "../pages/shop/Shop";
import Collections from "../pages/shop/Collections";
import ProductDetail from "../pages/shop/ProductDetail";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/cart/Checkout";
import OrderConfirmation from "../pages/cart/OrderConfirmation";
import Wishlist from "../pages/wishlist/Wishlist";
import GetAddress from "../pages/cart/GetAddress";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ForgotOtp from "../pages/auth/ForgotOtp";
import ResetPassword from "../pages/auth/ResetPassword";

// Account Pages
import Account from "../pages/account/Account";
import CollectionProduct from "../pages/shop/ColledtionProduct";

const RoutesPath = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const wrapInLayout = (element) => {
    return isAdminRoute ? element : <Layout>{element}</Layout>;
  };

  return (
    <>
      <Routes>
        {/* User Routes with Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/shop"
          element={
            <Layout>
              <Shop />
            </Layout>
          }
        />
        <Route
          path="/collections"
          element={
            <Layout>
              <Collections />
            </Layout>
          }
        />
        <Route
          path="/collections/:filterType/:filterValue"
          element={
            <Layout>
              <CollectionProduct />
            </Layout>
          }
        />

        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <Layout>
              <OrderConfirmation />
            </Layout>
          }
        />
         <Route
          path="/getaddress"
          element={
            <Layout>
              <GetAddress />
            </Layout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Layout>
              <Wishlist />
            </Layout>
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Layout>
              <ForgotPassword />
            </Layout>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <Layout>
              <VerifyOtp />
            </Layout>
          }
        />
        <Route
          path="/forgot-otp"
          element={
            <Layout>
              <ForgotOtp />
            </Layout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Layout>
              <ResetPassword />
            </Layout>
          }
        />

        {/* Account Routes */}
        <Route
          path="/account"
          element={
            <Layout>
              <Account />
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default RoutesPath;
