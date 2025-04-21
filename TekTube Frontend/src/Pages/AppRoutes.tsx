import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { JSX, useEffect } from "react";
import { useSelector } from "react-redux";
import Explore from "../Explore/Explore";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: any) => state.user);
  const location = useLocation();

  useEffect(() => {
    if (!user && location.pathname === "/profile") {
      window.location.href = "/login"; // Redirect to login on logout
    }
  }, [user, location]);

  return children;
};

const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/explore" element={user ? <Explore /> : <Navigate to="/login" />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/login" element={user ? <Navigate to="/explore" /> : <SignUpPage />} />
        
        {/* Protect Profile Page */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
