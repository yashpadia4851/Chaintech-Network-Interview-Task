import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicOnlyRoute } from "./PublicOnlyRoute";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardLayout from "../features/dashboard/layout/DashboardLayout";
import DashboardHome from "../features/dashboard/pages/DashboardHome";
import ProductsPage from "../features/products/pages/ProductsPage";
import CartPage from "../features/cart/pages/CartPage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import NotFoundPage from "../features/misc/pages/NotFoundPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
