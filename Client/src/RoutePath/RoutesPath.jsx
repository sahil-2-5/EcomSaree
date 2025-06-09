import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Shop from '../pages/shop/Shop';
import ProductDetail from '../pages/shop/ProductDetail';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/cart/Checkout';
import OrderConfirmation from '../pages/cart/OrderConfirmation';
import Dashboard from '../pages/admin/Dashboard';
import Products from '../pages/admin/Products';
import Orders from '../pages/admin/Orders';

const RoutesPath = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const wrapInLayout = (element) => {
    return isAdminRoute ? element : <Layout>{element}</Layout>;
  };

  return (
    <>
      {/* User Routes */}
      <Route path="/" element={wrapInLayout(<Home />)} />
      <Route path="/shop" element={wrapInLayout(<Shop />)} />
      <Route path="/product/:id" element={wrapInLayout(<ProductDetail />)} />
      <Route path="/cart" element={wrapInLayout(<Cart />)} />
      <Route path="/checkout" element={wrapInLayout(<Checkout />)} />
      <Route path="/order-confirmation" element={wrapInLayout(<OrderConfirmation />)} />

      {/* Admin Routes */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/orders" element={<Orders />} />
    </>
  );
};

export default RoutesPath;
