import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminPanel";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("General");

  const [formData, setFormData] = useState({
    storeName: "SareeShop",
    storeEmail: "admin@sareeshop.com",
    description: "Premium collection of traditional and designer sarees",
    currency: "Indian Rupee (₹)",
    timezone: "India Standard Time",

    paymentGateway: "Stripe",
    accountNumber: "",
    ifscCode: "",

    shippingMethod: "Standard",
    shippingRate: "Free",

    notifyOnOrder: true,
    notifyOnDispatch: false,

    enable2FA: false,
    adminPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
  };

  const tabs = ["General", "Payment", "Shipping", "Notifications", "Security"];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

        <div className="flex flex-wrap gap-2 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                activeTab === tab
                  ? "border-pink-600 text-pink-600"
                  : "border-transparent text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === "General" && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Store Information</h2>
            <p className="text-sm text-gray-500">Basic information about your store</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Store Email</label>
                <input
                  type="email"
                  name="storeEmail"
                  value={formData.storeEmail}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                >
                  <option>Indian Rupee (₹)</option>
                  <option>US Dollar ($)</option>
                  <option>Euro (€)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Timezone</label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                >
                  <option>India Standard Time</option>
                  <option>Pacific Standard Time</option>
                  <option>Greenwich Mean Time</option>
                </select>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={handleSave}
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === "Payment" && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Payment Settings</h2>
            <p className="text-sm text-gray-500">Configure your payment method</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Payment Gateway</label>
                <select
                  name="paymentGateway"
                  value={formData.paymentGateway}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                >
                  <option>Stripe</option>
                  <option>PayPal</option>
                  <option>Razorpay</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">IFSC Code</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                />
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={handleSave}
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Shipping Tab */}
        {activeTab === "Shipping" && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Shipping Settings</h2>
            <p className="text-sm text-gray-500">Setup your default shipping options</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Shipping Method</label>
                <select
                  name="shippingMethod"
                  value={formData.shippingMethod}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                >
                  <option>Standard</option>
                  <option>Express</option>
                  <option>Pickup</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Shipping Rate</label>
                <input
                  type="text"
                  name="shippingRate"
                  value={formData.shippingRate}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                />
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={handleSave}
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "Notifications" && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Notification Settings</h2>
            <p className="text-sm text-gray-500">Choose what events trigger email notifications</p>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="notifyOnOrder"
                  checked={formData.notifyOnOrder}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">Notify on new order</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="notifyOnDispatch"
                  checked={formData.notifyOnDispatch}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">Notify on order dispatch</span>
              </label>
            </div>
            <div className="text-right">
              <button
                onClick={handleSave}
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "Security" && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Security Settings</h2>
            <p className="text-sm text-gray-500">Update your security preferences</p>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="enable2FA"
                  checked={formData.enable2FA}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication</span>
              </label>
              <div>
                <label className="text-sm font-medium text-gray-700">Admin Password</label>
                <input
                  type="password"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded text-sm"
                />
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={handleSave}
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Settings;
