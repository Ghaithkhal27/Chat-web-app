import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaUser,
  FaTimes, 
  FaBars
} from 'react-icons/fa';
import { 
  RiChatSmile3Fill,
  RiLogoutCircleRLine 
} from 'react-icons/ri';
import { 
  FiLogOut 
} from 'react-icons/fi';
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

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hover: { scale: 1.05, originX: 0 },
    tap: { scale: 0.95 }
  };

  const logoVariants = {
    hover: { rotate: [0, -10, 10, 0], transition: { duration: 0.6 } }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-[#03045e] to-[#023e8a] p-4 shadow-lg z-50 fixed top-0">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          whileHover="hover"
          variants={logoVariants}
        >
          <Link
            to="/AllUsers"
            className="text-white text-2xl font-bold flex items-center space-x-2"
          >
            <RiChatSmile3Fill className="text-4xl text-[#9d4edd] animate-pulse-slow" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9d4edd] to-[#c77dff]">
              ChatVerse
            </span>
          </Link>
        </motion.div>

        <ul className="hidden md:flex space-x-6 items-center">
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/all-users"
              className="text-white font-semibold hover:text-[#9d4edd] transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <FaUsers className="text-xl" />
              <span>Community</span>
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/profile"
              className="text-white font-semibold hover:text-[#9d4edd] transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <FaUser className="text-xl" />
              <span>Profile</span>
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#ff6b6b] to-[#ff8787] px-6 py-2 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <FiLogOut className="text-xl transition-transform group-hover:translate-x-1" />
              <span>Logout</span>
            </button>
          </motion.li>
        </ul>

        <motion.button
          onClick={toggleMobileMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-white md:hidden focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#03045e] mt-4 p-4 rounded-lg shadow-xl backdrop-blur-sm"
          >
            <ul className="flex flex-col space-y-4">
              <motion.li
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/AllUsers"
                  className="text-white font-semibold flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10"
                  onClick={toggleMobileMenu}
                >
                  <FaUsers className="text-xl" />
                  <span>Community</span>
                </Link>
              </motion.li>
              <motion.li
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/profile"
                  className="text-white font-semibold flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10"
                  onClick={toggleMobileMenu}
                >
                  <FaUser className="text-xl" />
                  <span>Profile</span>
                </Link>
              </motion.li>
              <motion.li
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="w-full flex items-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-[#ff6b6b] to-[#ff8787] text-white font-semibold justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <RiLogoutCircleRLine className="text-xl" />
                  <span>Logout</span>
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;