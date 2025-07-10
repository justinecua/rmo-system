import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import LoadingSpinner from "../ui/loadingspinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
