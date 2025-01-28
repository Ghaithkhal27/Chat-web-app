import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion"; // For animations
import { FaUserCircle } from "react-icons/fa"; // For fallback avatar

interface User {
  id: string;
  username: string;
  profilePicture: string | null;
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const token = localStorage.getItem("token");
  let myId: string | null = null;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    myId = decodedToken.userId;
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleClick = (id: string, name: string) => {
    navigate(`/chat/${id}/${name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03045e] to-[#023e8a]">
      <Navbar />
      <div className="p-5 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center mt-[80px] text-white">
        
        </h1>
        <motion.ul className="space-y-4">
          {users
            .filter((user) => user.id !== myId)
            .map((user, index) => (
              <motion.li
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-center p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg hover:bg-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => handleClick(user.id, user.username)}
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