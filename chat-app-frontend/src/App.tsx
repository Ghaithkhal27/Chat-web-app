import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";


// Lazy-loaded components
const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const AllUsers = lazy(() => import("./pages/AllUsers"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/all-users" replace />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/chat/:id" element={<ChatPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route index element={<Navigate to="/all-users" replace />} />
            </Route>

            <Route
              path="*"
              element={<Navigate to={localStorage.getItem("token") ? "/all-users" : "/login"} replace />}
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;