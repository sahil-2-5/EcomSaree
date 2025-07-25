import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import {
  FiMenu,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiSearch,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useProductContext } from "../../context/ProductContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const { isAuthenticated, user, logout } = useAuth();
  const { searchProductsByQuery } = useProductContext();
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

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setFilteredResults([]);
        return;
      }
      try {
        const results = await searchProductsByQuery(searchQuery);
        setFilteredResults(results?.slice(0, 6) || []);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const debounce = setTimeout(fetchSearchResults, 250);
    return () => clearTimeout(debounce);
  }, [searchQuery, searchProductsByQuery]);

  const handleSearchSelect = (productId) => {
    setSearchQuery("");
    setFilteredResults([]);
    navigate(`/product/${productId}`);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-pink-600">
            BalajiPaithani
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-gray-700 hover:text-pink-600">
              Shop
            </Link>
            <Link to="/collections" className="text-gray-700 hover:text-pink-600">
              Collections
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center relative w-1/3">
            <input
              type="text"
              placeholder="Search sarees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-pink-500 bg-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            {filteredResults.length > 0 && (
              <div className="absolute z-50 top-12 w-full bg-white rounded-md shadow-lg border max-h-64 overflow-auto">
                {filteredResults.map((item) => (
                  <div
                    key={item._id}
                    onMouseDown={() => handleSearchSelect(item._id)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-pink-50 cursor-pointer"
                  >
                    <img
                      src={item?.images?.[0]?.url}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="text-sm text-gray-700 truncate w-[200px]">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Icons */}
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
                  <FiUser className="w-6 h-6" />
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-in"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
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
                <Link to="/login" className="text-gray-700 hover:text-pink-600 text-sm font-medium">
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

          {/* Mobile menu button */}
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

      {/* Mobile Dropdown */}
      <Transition
        show={isMenuOpen}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t">
          <div className="px-4 pt-4 pb-3 space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {filteredResults.length > 0 && (
                <div className="bg-white rounded-md shadow max-h-64 overflow-auto border mt-2 z-50 absolute w-full">
                  {filteredResults.map((item) => (
                    <div
                      key={item._id}
                      onMouseDown={() => handleSearchSelect(item._id)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-pink-50 cursor-pointer"
                    >
                      <img
                        src={item?.images?.[0]?.url}
                        alt={item.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="text-sm text-gray-700 truncate w-[200px]">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/shop" className="block px-3 py-2 text-gray-700 hover:text-pink-600">
              Shop
            </Link>
            <Link to="/collections" className="block px-3 py-2 text-gray-700 hover:text-pink-600">
              Collections
            </Link>

            {isAuthenticated ? (
              <>
                <div className="flex items-center px-3 py-2 text-gray-700">
                  <FiUser className="w-5 h-5 mr-2" />
                  {user?.firstName || "My Account"}
                </div>
                {accountLinks.map((item) =>
                  item.onClick ? (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-pink-600"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-3 py-2 text-gray-700 hover:text-pink-600"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-pink-600">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 text-pink-600 bg-pink-50 rounded-md">
                  Register Now
                </Link>
              </>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;
