import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ChatPage from './pages/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';
import AllUsers from './pages/AllUsers';
import UserProfile from './pages/UserProfile';


const App: React.FC = () => {
  return (
    <Router>
   
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/profile" element={<UserProfile />} />
          
          <Route
            path="/chat/:id/:name"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
     
    </Router>
  );
};

export default App;