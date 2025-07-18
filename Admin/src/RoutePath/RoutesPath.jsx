import { Routes, Route } from "react-router-dom";

// Admin Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Products from "../pages/products/Products";
import Orders from "../pages/orders/Orders";
import Customers from "../pages/customers/Customers";
import Banners from "../pages/banners/Banners";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/settings/Settings";

import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotOtp from "../auth/ForgotOtp";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import VerifyOtp from "../auth/VerifyOtp";

const RoutesPath = () => {
  return (
    <>
      <Routes>
        {/* Admin Routes (without Layout) */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/banners" element={<Banners />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/forgot-otp" element={<ForgotOtp />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route path="/admin/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </>
  );
};

export default RoutesPath;
