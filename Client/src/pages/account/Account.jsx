import { useState, useEffect } from "react";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHeart, FaShoppingCart, FaBox, FaHome, FaUser } from "react-icons/fa";

import Profile from "../../pages/account/Profile";
import Addresses from "../../pages/account/Addresses";
import Orders from "../../pages/account/Orders";
import Wishlist from "../../pages/account/Wishlist";
import Cart from "../../pages/account/Cart";
import Settings from "../../pages/account/Settings";

import { useAuth } from "../../context/AuthContext";
import { useSearchParams } from "react-router-dom";

const Account = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = searchParams.get("tab") || "profile";

  const tabs = [
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "addresses", label: "Addresses", icon: <FaHome /> },
    { key: "orders", label: "Orders", icon: <FaBox /> },
    { key: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { key: "cart", label: "Cart", icon: <FaShoppingCart /> },
    { key: "settings", label: "Settings", icon: <IoSettingsOutline /> },
  ];

  const renderTab = () => {
    switch (currentTab) {
      case "profile":
        return <Profile />;
      case "addresses":
        return <Addresses />;
      case "orders":
        return <Orders />;
      case "wishlist":
        return <Wishlist />;
      case "cart":
        return <Cart />;
      case "settings":
        return <Settings />;
      default:
        return <Profile />;
    }
  };

  const handleTabClick = (key) => {
    setSearchParams({ tab: key });
  };

  if (!user) return <div className="text-center py-10">Loading user...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 mt-14 md:px-0">
      <div className="max-w-5xl mx-auto pt-10">
        <div className="flex items-center gap-4 border-b pb-6">
          <div>
            <h2 className="text-2xl font-semibold">{user.firstName}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MdOutlineEmail />
              <span>{user.email}</span>
              <FaCheckCircle className="text-green-500 ml-1" />
            </div>
            <div className="text-sm text-gray-400">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-start mt-6 mb-8 gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentTab === tab.key
                  ? "bg-pink-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-pink-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Component */}
        <div>{renderTab()}</div>
      </div>
    </div>
  );
};

export default Account;
