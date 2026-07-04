import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminDashboardPage } from "@/pages/AdminDashboardPage";
import { AdminLoginPage } from "@/pages/AdminLoginPage";
import { HomePage } from "@/pages/HomePage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/secure-admin-portal" element={<AdminLoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}