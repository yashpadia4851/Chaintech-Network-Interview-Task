import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/Button";
import { ThemeToggle } from "../../../shared/ThemeToggle";
import { useAuth } from "../../auth/hooks/useAuth";

export default function NotFoundPage() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-dvh bg-slate-50 transition-colors duration-300 dark:bg-neutral-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="mx-auto flex min-h-dvh max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200 transition-colors duration-300 dark:bg-neutral-900 dark:ring-neutral-700 dark:shadow-black/30">
          <div className="text-sm font-medium text-slate-500 dark:text-gray-400">404</div>
          <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-gray-100">
            Page not found
          </div>
          <div className="mt-2 text-sm text-slate-600 dark:text-gray-400">
            The page you’re trying to open doesn’t exist.
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button as={Link} to={isAuthenticated ? "/dashboard" : "/login"}>
              Go to {isAuthenticated ? "dashboard" : "login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
