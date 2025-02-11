import React, { useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { token } from "../util/token";
import { User, useUserStore } from "../zustandStore/useUserStore";







const AllUsers: React.FC = () => {
  const {getUsers,users}=useUserStore()
  
 
  const navigate = useNavigate();
  const myId = token?.userId 

  useEffect(() => {
    getUsers();
  }, []);
  

  const handleUserClick = (user: User) => {
    navigate(`/chat/${user.id}`, { 
      state: { 
        receiverName: user.username,
        profilePicture: user.profilePicture 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03045e] to-[#023e8a]">
      <Navbar />
      <div className="p-5 max-w-4xl mx-auto mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Connect with Users
        </h1>
        <motion.ul className="space-y-4">
          {users.filter(user => user.id !== myId).map((user, index) => (
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
      </div>
    </div>
  );
};

export default AllUsers;