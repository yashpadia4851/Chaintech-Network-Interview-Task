import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared/Button";
import { Input } from "../../../shared/Input";
import { useAuth } from "../useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: { email: "", password: "" } });

  const { email = "", password = "" } = watch();
  const isFormValid = Boolean(email?.trim() && password?.trim());

  function onSubmit(data) {
    setError("");
    const res = login(data);

    if (!res.ok) {
      setError(res.error || "Login failed.");
      return;
    }

    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="mx-auto flex min-h-dvh max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-600">
              Login to access your dashboard.
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              error={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid}
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-slate-900"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
