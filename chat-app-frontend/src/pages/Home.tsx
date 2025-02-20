import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiChatSmile3Fill } from 'react-icons/ri';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/home'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0353a4] to-[#7ae582] flex items-center justify-center px-4 py-10">
      <div className="text-center text-white space-y-8 animate-fade-in ">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Welcome to ChatRocket
        </h1>

        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          Connect with friends, family, or strangers in real-time. Fast, fun, and free chatting awaits you!
        </p>

        <button
          onClick={handleStartChat}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          <RiChatSmile3Fill className="h-6 w-6" />
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default Home