import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user && user.user_type) {
    const dashboardPath = `/${user.user_type
      .toLowerCase()
      .replace(" ", "_")}/dashboard`;
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default PublicRoute;
