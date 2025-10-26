import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAuthorized } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login with return url
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isAuthorized) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace state={{ error: "Access denied" }} />;
  }

  return children;
};

export default ProtectedRoute;