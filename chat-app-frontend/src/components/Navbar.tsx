import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaUsers, FaSignOutAlt, FaBars, FaTimes, FaComments } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animation variants for Framer Motion
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <nav className="w-full bg-gradient-to-r from-[#03045e] to-[#023e8a] p-4 shadow-lg z-50 fixed top-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with Chat Icon */}
        <Link
          to="/"
          className="text-white text-2xl font-bold flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
        >
          <FaComments className="text-3xl text-[#9d4edd]" />
          <span>ChatApp</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/AllUsers"
              className="text-white font-semibold hover:text-[#9d4edd] transition duration-300 ease-in-out flex items-center space-x-2"
            >
              <FaUsers className="inline-block" />
              <span>All Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-white font-semibold hover:text-[#9d4edd] transition duration-300 ease-in-out flex items-center space-x-2"
            >
              <FaUser className="inline-block" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-white font-semibold hover:text-[#9d4edd] transition duration-300 ease-in-out flex items-center space-x-2"
            >
              <FaSignOutAlt className="inline-block" />
              <span>Logout</span>
            </button>
          </li>
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="text-white md:hidden focus:outline-none hover:scale-110 transition-transform duration-300"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#03045e] mt-4 p-4 rounded-lg shadow-lg"
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/AllUsers"
                  className="text-white font-semibold hover:text-[#9d4edd] transition duration-300 ease-in-out flex items-center space-x-2"
                  onClick={toggleMobileMenu}
                >
                  <FaUsers className="inline-block" />
                  <span>All Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-white font-semibold hover:text-[#9d4edd] transition duration-300 ease-in-out flex items-center space-x-2"
                  onClick={toggleMobileMenu}
                >
                  <FaUser className="inline-block" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="text-white font-semibold hover:text-[#9d4edd] transition duration-300 ease-in-out flex items-center space-x-2"
                >
                  <FaSignOutAlt className="inline-block" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;