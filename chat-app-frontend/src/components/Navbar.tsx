import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  ChatBubbleLeftEllipsisIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const logo = ["C","h","a","t","R","o","c","k","e","t"];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={"/home"}>
          <div className="flex items-center cursor-pointer">
          <motion.span  whileHover={{ y: -5 }}>
          <ChatBubbleLeftEllipsisIcon className="text-indigo-600 w-7 h-7 space-x-5" />
          </motion.span>
            
            {logo.map((l, i) => {
              return (
                <motion.span
                  key={i}
                  className="text-2xl font-bold text-indigo-600"
                  whileHover={{ y: -5 }}
                >
                  {l}
                </motion.span>
              );
            })}
          </div>
          </Link>

          <div className="flex items-center space-x-8">
            <NavItem to="/home" icon={HomeIcon} label="home" />
            <NavItem to="/profile" icon={FaUser} label="Profile" />
            <NavItem to="/all-users" icon={FaUsers} label="Community" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="group relative">
      <Link
        to={to}
        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
      >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{label}</span>
      </Link>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </motion.div>
  );
};

export default Navbar;
