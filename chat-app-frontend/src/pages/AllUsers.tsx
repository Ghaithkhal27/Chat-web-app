import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { token } from "../util/token";
import { User, useUserStore } from "../zustandStore/useUserStore";

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
    <div className="min-h-screen bg-gradient-to-br from-[#03045e] to-[#023e8a]">
      <Navbar />
      <div className="p-5 max-w-4xl mx-auto mt-[70px]"> 
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
        />

        <h1 className="text-4xl font-bold mb-8 text-center text-white"></h1>
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
      </div>
    </div>
  );
};

export default AllUsers;
