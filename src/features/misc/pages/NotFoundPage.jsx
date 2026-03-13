import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/ui/Button";
import { useAuth } from "../../auth/useAuth";

export default function NotFoundPage() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="mx-auto flex min-h-dvh max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
          <div className="text-sm font-medium text-slate-500">404</div>
          <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Page not found
          </div>
          <div className="mt-2 text-sm text-slate-600">
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
