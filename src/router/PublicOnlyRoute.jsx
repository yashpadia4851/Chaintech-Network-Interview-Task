import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export function PublicOnlyRoute({ redirectTo = "/dashboard" }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}
