import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginRequired from "../../pages/LoginRequired";
import {
  FiHome,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiImage,
  FiPackage,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiX,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const menuItems = [
    { icon: FiHome, label: "Dashboard", path: "/admin" },
    { icon: FiBox, label: "Products", path: "/admin/products" },
    { icon: FiShoppingBag, label: "Orders", path: "/admin/orders" },
    { icon: FiUsers, label: "Customers", path: "/admin/customers" },
    { icon: FiImage, label: "Banners", path: "/admin/banners" },
    { icon: FiPackage, label: "Inventory", path: "/admin/inventory" },
    { icon: FiBarChart2, label: "Reports", path: "/admin/reports" },
    { icon: FiSettings, label: "Settings", path: "/admin/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <Link to="/admin" className="text-xl font-bold text-pink-600">
              SareeShop Admin
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                    isActive(item.path)
                      ? "bg-pink-50 text-pink-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

const AdminPanel = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:2525/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
      navigate("/admin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
              >
                <FiMenu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/admin/login"
                    className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <FiLogIn className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                  <Link
                    to="/admin/register"
                    className="flex items-center px-3 py-1 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-colors"
                  >
                    <FiUserPlus className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Register</span>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-1 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-colors"
                >
                  <FiLogOut className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}

              {/* Notification and Profile - hidden on small screens */}
              <div className="hidden md:flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Notifications</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <div className="relative">
                  <button className="flex items-center space-x-2">
                    <img
                      src="/images/admin-avatar.jpg"
                      alt="Admin"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                      Admin
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {isAuthenticated ? children : <LoginRequired />}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
