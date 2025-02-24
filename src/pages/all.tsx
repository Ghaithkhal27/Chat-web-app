import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaSearch, FaUserSlash } from "react-icons/fa";
import { token } from "../util/token";
import { User, useUserStore } from "../zustandStore/useUserStore";

const AllUsers: React.FC = () => {
  const { getUsers, users } = useUserStore();
  const [searchInput, setSearchInput] = useState("");
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

  const filteredUsers = users.filter((user) => {
    return (
      user.id !== myId &&
      user.username.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navbar />
      
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Connect with Users
          </h1>
          
          <div className="join w-full">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                className="input input-lg w-full pl-12 pr-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 focus:border-emerald-400 focus:outline-none text-gray-100 placeholder-gray-400 transition-all"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filteredUsers.length + searchInput}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredUsers.length === 0 ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-8 rounded-xl bg-slate-700/30 backdrop-blur-md border border-slate-600/50"
              >
                <FaUserSlash className="mx-auto text-4xl text-gray-400 mb-4" />
                <p className="text-gray-400 text-xl font-medium">
                  No users found {searchInput && `for "${searchInput}"`}
                </p>
              </motion.div>
            ) : (
              filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="group"
                >
                  <div
                    onClick={() => handleUserClick(user)}
                    className="flex items-center p-4 bg-slate-700/30 backdrop-blur-md rounded-xl border border-slate-600/50 hover:border-emerald-400/30 cursor-pointer transition-all duration-300 hover:bg-slate-700/50 hover:shadow-lg"
                  >
                    <div className="avatar placeholder">
                      <div className="w-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.username}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="text-2xl text-slate-900">
                            {user.username[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-100">
                        {user.username}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {user.status || "Online"}
                      </p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="btn btn-sm btn-ghost text-emerald-400">
                        Message →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllUsers;