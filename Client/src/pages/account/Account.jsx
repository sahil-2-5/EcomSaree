import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FiUser, FiShoppingBag, FiHeart, FiMapPin, FiCreditCard } from 'react-icons/fi';

const Account = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 1234567890',
  });

  const tabs = [
    { name: 'Profile', icon: FiUser, component: ProfileTab },
    { name: 'Orders', icon: FiShoppingBag, component: OrdersTab },
    { name: 'Wishlist', icon: FiHeart, component: WishlistTab },
    { name: 'Addresses', icon: FiMapPin, component: AddressesTab },
    { name: 'Payment Methods', icon: FiCreditCard, component: PaymentMethodsTab },
  ];

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
            {tabs.map((tab, idx) => (
              <Tab.Panel key={idx} className="bg-white rounded-lg shadow">
                <tab.component profile={profile} setProfile={setProfile} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

function ProfileTab({ profile, setProfile }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Update profile
  };

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
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
        />
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
    // Add more orders
  ];

  return (
    <div className="p-6">
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
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

function WishlistTab() {
  const wishlist = [
    {
      id: 1,
      name: 'Banarasi Silk Saree',
      price: '₹15,999',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: 'Kanjivaram Silk Saree',
      price: '₹18,999',
      image: 'https://images.unsplash.com/photo-1610030181087-540017dc9d61?auto=format&fit=crop&w=600&q=80',
    },
    // Add more items
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
            <h3 className="mt-4 font-medium">{item.name}</h3>
            <p className="text-gray-900 font-semibold mt-1">{item.price}</p>
            <button className="mt-4 w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressesTab() {
  const addresses = [
    {
      id: 1,
      type: 'Home',
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
    // Add more addresses
  ];

  return (
    <div className="p-6">
      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{address.type}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.pincode}
                </p>
              </div>
              <button className="text-pink-600 hover:text-pink-700">Edit</button>
            </div>
          </div>
        ))}
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
    // Add more cards
  ];

  return (
    <div className="p-6">
      <div className="space-y-4">
        {cards.map((card) => (
          <div key={card.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{card.type} ending in {card.last4}</p>
                <p className="text-sm text-gray-500">Expires {card.expiry}</p>
              </div>
              <button className="text-pink-600 hover:text-pink-700">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Account;
