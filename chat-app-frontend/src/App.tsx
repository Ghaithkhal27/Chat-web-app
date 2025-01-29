import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";

const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const AllUsers = lazy(() => import("./pages/AllUsers"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

const ProtectedLayout = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedLayout />}>
              <Route element={<MainLayout />}>
                <Route path="/all-users" element={<AllUsers />} />
                <Route path="/chat/:id" element={<ChatPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route index element={<Navigate to="/all-users" replace />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
    </Router>
  );
};

export default App;
