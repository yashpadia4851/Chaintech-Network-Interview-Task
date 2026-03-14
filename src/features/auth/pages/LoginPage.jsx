import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../../../shared/Button";
import { Input } from "../../../shared/Input";
import { ThemeToggle } from "../../../shared/ThemeToggle";
import { useAuth } from "../hooks/useAuth";

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
  const hasErrors = Object.keys(errors || {}).length > 0;
  const isFormValid =
    Boolean(
      email?.trim() &&
        password?.trim() &&
        password.length >= 4 &&
        !/\s/.test(password),
    ) && !hasErrors;

  function onSubmit(data) {
    setError("");
    const res = login(data);

    if (!res.ok) {
      toast.error(res.error || "Login failed.");
      return;
    }

    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="min-h-dvh bg-slate-100 transition-colors duration-300 dark:bg-neutral-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="mx-auto flex min-h-dvh max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/60 transition-colors duration-300 dark:bg-neutral-900 dark:ring-neutral-700 dark:shadow-black/30">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-gray-100">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/,
                  message: "Invalid email format",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
                validate: (value) =>
                  !/\s/.test(value || "") ||
                  "Spaces are not allowed in password",
              })}
            />

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={!isFormValid}>
              Login
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-slate-900 dark:text-gray-200"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
