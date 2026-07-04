import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const token = localStorage.getItem("admin_token");

  if (!token) {
    return <Navigate to="/secure-admin-portal" replace />;
  }

  return <Outlet />;
}