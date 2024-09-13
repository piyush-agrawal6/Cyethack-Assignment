import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((store) => store.auth);
  const isAuthenticated = Boolean(token);

  // Redirect to dashboard if already authenticated
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PrivateRoute;
