import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { FiUser, FiShoppingBag, FiMapPin, FiCreditCard, FiPhone } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useAddressContext } from '../../context/AddressContext';

const Account = () => {
  const { user, loading: authLoading, updateProfile } = useAuth();
  const { 
    addresses, 
    loading: addressLoading, 
    addAddress, 
    updateAddress, 
    deleteAddress,
    setDefaultAddress,
    fetchAllAddresses
  } = useAddressContext();

  const [profile, setProfile] = useState({
    name: user?.firstName + ' ' + user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const tabs = [
    { name: 'Profile', icon: FiUser, component: ProfileTab },
    { name: 'Orders', icon: FiShoppingBag, component: OrdersTab },
    { name: 'Addresses', icon: FiMapPin, component: AddressesTab },
    { name: 'Payment Methods', icon: FiCreditCard, component: PaymentMethodsTab },
  ];

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.firstName + ' ' + user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await updateProfile(profile);
  };

  const isLoading = authLoading || addressLoading;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <Tab.Group>
        <div className="flex flex-col md:flex-row gap-8">
          <Tab.List className="flex flex-col space-y-1 md:w-64">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg focus:outline-none ${
                    selected
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="flex-1">
            <Tab.Panel className="bg-white rounded-lg shadow">
              <ProfileTab 
                profile={profile} 
                setProfile={setProfile} 
                handleSubmit={handleProfileUpdate} 
              />
            </Tab.Panel>
            <Tab.Panel className="bg-white rounded-lg shadow">
              <OrdersTab />
            </Tab.Panel>
            <Tab.Panel className="bg-white rounded-lg shadow">
              <AddressesTab 
                addresses={addresses}
                addAddress={addAddress}
                updateAddress={updateAddress}
                deleteAddress={deleteAddress}
                setDefaultAddress={setDefaultAddress}
                fetchAllAddresses={fetchAllAddresses}
              />
            </Tab.Panel>
            <Tab.Panel className="bg-white rounded-lg shadow">
              <PaymentMethodsTab />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

function ProfileTab({ profile, setProfile, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          disabled
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            <FiPhone className="h-4 w-4" />
          </span>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="focus:ring-pink-500 focus:border-pink-500 flex-1 block w-full rounded-none rounded-r-md border-gray-300 py-2 px-3"
            placeholder="Enter phone number"
          />
        </div>
      </div>
     
      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      >
        Update Profile
      </button>
    </form>
  );
}

function OrdersTab() {
  const orders = [
    {
      id: 'ORD123',
      date: '2023-05-01',
      total: '₹15,999',
      status: 'Delivered',
      items: 2,
    },
  ];

  return (
    <div className="p-6">
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {order.status}
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">{order.items} items</p>
              <p className="font-medium">{order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressesTab({ 
  addresses, 
  addAddress, 
  updateAddress, 
  deleteAddress,
  setDefaultAddress,
  fetchAllAddresses
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    country: 'India',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    isDefault: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAddress(editingId, formData);
      } else {
        await addAddress(formData);
      }
      resetForm();
      fetchAllAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleEdit = (address) => {
    setEditingId(address._id);
    setFormData({
      country: address.country,
      address: address.address,
      apartment: address.apartment || '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      phone: address.phone,
      isDefault: address.isDefault
    });
    setIsAdding(true);
  };

  const handleSetDefault = async (addressId) => {
    try {
      await setDefaultAddress(addressId);
      fetchAllAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      country: 'India',
      address: '',
      apartment: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      isDefault: false
    });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Your Addresses</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
        >
          {isAdding ? 'Cancel' : 'Add New Address'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                required
              >
                <option value="India">India</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                placeholder="House number and street name"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc. (optional)</label>
              <input
                type="text"
                value={formData.apartment}
                onChange={(e) => setFormData({...formData, apartment: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                placeholder="Apartment, suite, unit, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <FiPhone className="h-4 w-4" />
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="focus:ring-pink-500 focus:border-pink-500 flex-1 block w-full rounded-none rounded-r-md border-gray-300 py-2 px-3"
                  required
                />
              </div>
            </div>
            <div className="flex items-center md:col-span-2">
              <input
                type="checkbox"
                id="defaultAddress"
                checked={formData.isDefault}
                onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-700">
                Set as default address
              </label>
            </div>
          </div>
          <div className="mt-6 flex space-x-3">
            <button
              type="submit"
              className="bg-pink-600 text-white py-2 px-6 rounded-md hover:bg-pink-700 transition-colors"
            >
              {editingId ? 'Update Address' : 'Save Address'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="border border-gray-300 bg-white py-2 px-6 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {addresses.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <p className="text-gray-500">You haven't added any addresses yet</p>
            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          addresses.map((address) => (
            <div 
              key={address._id} 
              className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
                address.isDefault ? 'border-pink-500 bg-pink-50' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{address.country}</h3>
                    {address.isDefault && (
                      <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {address.address}
                    {address.apartment && `, ${address.apartment}`}
                    <br />
                    {address.city}, {address.state} {address.pincode}
                    <br />
                    Phone: {address.phone}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleEdit(address)}
                    className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                  {!address.isDefault && (
                    <>
                      <button 
                        onClick={() => handleSetDefault(address._id)}
                        className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                      >
                        Set Default
                      </button>
                      <button 
                        onClick={() => deleteAddress(address._id)}
                        className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function PaymentMethodsTab() {
  const cards = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/24',
    },
  ];

  return (
    <div className="p-6">
      <div className="space-y-4">
        {cards.map((card) => (
          <div key={card.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{card.type} ending in {card.last4}</p>
                <p className="text-sm text-gray-500">Expires {card.expiry}</p>
              </div>
              <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Account;