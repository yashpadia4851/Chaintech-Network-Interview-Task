import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/Button";
import { useAuth } from "../../auth/hooks/useAuth";

export default function DashboardHome() {
  const { user } = useAuth();
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition-colors dark:bg-neutral-900 dark:ring-neutral-700 dark:shadow-black/25">
        <div className="text-sm font-medium text-slate-500 dark:text-gray-400">Dashboard</div>
        <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-gray-100">
          Welcome, {user?.name}
        </div>
        <div className="mt-2 text-sm text-slate-600 dark:text-gray-400">
          Browse products, manage your cart, and update your profile.
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button as={Link} to="/dashboard/products">
            Browse products
          </Button>
          <Button as={Link} to="/dashboard/cart" variant="secondary">
            View cart
          </Button>
        </div>
      </div>
    </div>
  );
}
