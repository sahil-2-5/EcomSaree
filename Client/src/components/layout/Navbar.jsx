import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import {
  FiMenu,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const collections = [
  { name: "New Arrivals", href: "/collections/new-arrivals" },
  { name: "Wedding Collection", href: "/collections/wedding" },
  { name: "Silk Sarees", href: "/collections/silk" },
  { name: "Designer Collection", href: "/collections/designer" },
  { name: "Casual Wear", href: "/collections/casual" },
  { name: "Party Wear", href: "/collections/party" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const accountLinks = [
    { name: "My Profile", href: "/account" },
    { name: "Logout", onClick: handleLogout },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-pink-600">
              BalajiPaithani
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-gray-700 hover:text-pink-600">
              Shop
            </Link>

            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-gray-700 hover:text-pink-600">
                Collections
                <FiChevronDown className="ml-1 w-4 h-4" />
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    {collections.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            to={item.href}
                            className={`${
                              active
                                ? "bg-gray-100 text-pink-600"
                                : "text-gray-700"
                            } flex px-4 py-2 text-sm`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Link
              to="/collections/new-arrivals"
              className="text-gray-700 hover:text-pink-600"
            >
              New Arrivals
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sarees..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/wishlist" className="text-gray-700 hover:text-pink-600">
              <FiHeart className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-pink-600">
              <FiShoppingCart className="w-6 h-6" />
            </Link>

            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center text-gray-700 hover:text-pink-600">
                  <FiUser className="w-6 h-6 mr-1" />
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      {accountLinks.map((item) =>
                        item.onClick ? (
                          <button
                            key={item.name}
                            onClick={item.onClick}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-pink-600 hover:bg-gray-100"
                          >
                            {item.name}
                          </button>
                        ) : (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-pink-600 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        )
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-pink-600 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-pink-600"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isMenuOpen}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {() => (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated ? (
                <div className="mb-4 border-b border-gray-200 pb-2">
                  <div className="flex items-center px-3 py-2 text-gray-700">
                    <FiUser className="w-5 h-5 mr-2" />
                    <span className="font-medium">
                      {user?.firstName || "My Account"}
                    </span>
                  </div>
                  {accountLinks.map((item) =>
                    item.onClick ? (
                      <button
                        key={item.name}
                        onClick={item.onClick}
                        className="block w-full text-left px-3 py-2 text-gray-700 hover:text-pink-600 rounded-md hover:bg-pink-50 transition duration-200 ml-8 text-sm"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-3 py-2 text-gray-700 hover:text-pink-600 rounded-md hover:bg-pink-50 transition duration-200 ml-8 text-sm"
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
              ) : (
                <div className="mt-4 border-t border-gray-200 pt-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-pink-600 rounded-md hover:bg-pink-50 transition duration-200"
                  >
                    <div className="flex items-center">
                      <FiUser className="w-5 h-5 mr-2" />
                      <span>Login</span>
                    </div>
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-pink-600 hover:text-pink-700 rounded-md bg-pink-50 hover:bg-pink-100 transition duration-200 mt-1"
                  >
                    <span className="font-medium">Register Now</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Navbar;
