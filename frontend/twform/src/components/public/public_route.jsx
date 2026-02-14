import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import LoadingSpinner from "../ui/loadingspinner";
import { getDashboardPath } from "../../utils/roleMap";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (user && user.user_type) {
    const dashboardPath = getDashboardPath(user.user_type);
    if (dashboardPath) return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default PublicRoute;
