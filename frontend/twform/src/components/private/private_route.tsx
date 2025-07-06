import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("user:", user);
  console.log("loading:", loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
