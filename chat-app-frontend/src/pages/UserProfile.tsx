import React from 'react';
import {jwtDecode} from "jwt-decode";
import Navbar from '../components/Navbar';

const UserProfile: React.FC = () => {
  const token = localStorage.getItem('token');
  let userId: string | null = null;
  let userName: string | null = null;
  let userEmail: string | null = null;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    userId = decodedToken.userId;
    userName = decodedToken.userName;
    userEmail = decodedToken.email;
  }

  return (
    <div>
      <Navbar />
      <div className="user-profile p-6 bg-white rounded shadow-md max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
        <div className="mb-4">
          <p className="text-lg font-semibold">ID:</p>
          <p className="text-gray-700">{userId}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Name:</p>
          <p className="text-gray-700">{userName}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Email:</p>
          <p className="text-gray-700">{userEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;