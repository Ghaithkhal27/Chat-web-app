import React from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { 

    Avatar,

  } from '@mui/material';
import { token } from "../util/token";


const ProfilePage: React.FC = () => {





    const getInitials = () => {
        return token?.userName.split(' ').map((n) => n[0]).join('').toUpperCase();
      };



 
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0353a4] to-[#7ae582] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 sm:p-12 space-y-8 mt-12">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
            <Avatar sx={{ 
              width: 100, 
              height: 100, 
              mb: 2,
              bgcolor: 'primary.main',
              fontSize: '2.5rem'
            }}>
              {getInitials()}
            </Avatar>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {token?.userName}
                <span className="ml-2 text-purple-600">✨</span>
              </h1>
              <p className="text-lg text-gray-600 flex items-center justify-center space-x-2">
                <EnvelopeIcon className="w-5 h-5 text-purple-500" />
                <span>{token?.userName}@gmail.com</span>
              </p>
            </div>
          </div>

          <div className="prose prose-lg text-center text-gray-700 max-w-none">
            
              "No bio available yet. Write something about yourself!"
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;