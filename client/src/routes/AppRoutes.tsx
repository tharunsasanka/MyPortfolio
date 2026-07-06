import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminShortcut } from "@/components/common/AdminShortcut";
import { AdminDashboardPage } from "@/pages/AdminDashboardPage";
import { AdminLoginPage } from "@/pages/AdminLoginPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <AdminShortcut />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/secure-admin-portal" element={<AdminLoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}