import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion,AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { token } from "../util/token";
import { User, useUserStore } from "../zustandStore/useUserStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const AllUsers: React.FC = () => {
  const { getUsers, users } = useUserStore();
  const [searchInput, setsearchInput] = useState("");

  const navigate = useNavigate();
  const myId = token?.userId;

  useEffect(() => {
    getUsers();
  }, []);

  const handleUserClick = (user: User) => {
    navigate(`/chat/${user.id}`, {
      state: {
        receiverName: user.username,
        profilePicture: user.profilePicture,
      },
    });
  };
  const filtredUser = users.filter((user) => {
    return user.id !== myId && user.username.toLowerCase().includes(searchInput.toLowerCase());
  });
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0353a4] to-[#7ae582]">
      <Navbar />
      <div className="p-5 max-w-4xl mx-auto mt-[60px]"> 
      <div className="relative bg-[#023e7d]/80 backdrop-blur-lg rounded-xl p-4 shadow-xl">

        <div className="flex items-center gap-4 " >
              <MagnifyingGlassIcon className="w-6 h-6 text-purple-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full bg-transparent text-white focus:outline-none placeholder-gray-400
                  text-lg font-medium"
                value={searchInput}
                onChange={(e) => setsearchInput(e.target.value)}
              />
            </div>
            </div>
        

        <h1 className="text-4xl font-bold mb-8 text-center text-white"></h1>
        <AnimatePresence mode="wait">
        <motion.ul className="space-y-4">
          {filtredUser.map((user, index) => (
            <motion.li
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => handleUserClick(user)}
            >
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white/50"
                />
              ) : (
                <FaUserCircle className="w-12 h-12 text-white/80 mr-4" />
              )}
              <span className="text-xl font-semibold text-white">
                {user.username}
              </span>
            </motion.li>
          ))}
        </motion.ul>
        {filtredUser.length === 0 && (
            <div className="p-8 text-center text-gray-500">No users found</div>
          )}
      </AnimatePresence>

      </div>
    </div>
  );
};

export default AllUsers;
