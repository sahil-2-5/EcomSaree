import React from "react";
import { Routes, Route } from "react-router-dom";

// Admin Pages
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";

const RoutesPath = () => {
  return (
    <>
      <Routes>
        {/* Admin Routes (without Layout) */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/orders" element={<Orders />} />
      </Routes>
    </>
  );
};

export default RoutesPath;
