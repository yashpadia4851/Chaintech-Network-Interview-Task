import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared/Button";
import { Input } from "../../../shared/Input";
import { ThemeToggle } from "../../../shared/ThemeToggle";
import { useAuth } from "../useAuth";

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const { name = "", email = "", password = "", confirmPassword = "" } = watch();
  const passwordsMatch = password === confirmPassword;
  const isFormValid =
    Boolean(
      name?.trim() &&
        name.trim().length > 4 &&
        email?.trim() &&
        password?.trim() &&
        confirmPassword?.trim() &&
        passwordsMatch &&
        password.length >= 4 &&
        !/\s/.test(password)
    ) && !busy;

  async function onSubmit(data) {
    setError("");
    setBusy(true);
    try {
      const { confirmPassword: _, ...userData } = data;
      const res = registerUser(userData);
      if (!res.ok) {
        setError(res.error || "Registration failed.");
        return;
      }
      navigate("/login", { replace: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh bg-slate-100 transition-colors duration-300 dark:bg-neutral-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="mx-auto flex min-h-dvh max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/60 transition-colors duration-300 dark:bg-neutral-900 dark:ring-neutral-700 dark:shadow-black/30">
          <div className="text-center">
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-gray-100">
              Create account
            </div>
            <div className="mt-1 text-sm text-slate-600 dark:text-gray-400">
              Register to start shopping.
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Name"
              autoComplete="name"
              placeholder="Your name"
              required
              hint="More than 4 characters"
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name must be more than 4 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name must contain only letters",
                },
              })}
            />
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              hint="Minimum 4 characters, no spaces"
              placeholder="••••••••"
              required
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
                validate: (value) =>
                  !/\s/.test(value || "") || "Spaces are not allowed in password",
              })}
            />
            <Input
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match",
              })}
            />

            {error ? (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-800">
                {error}
              </div>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid}
            >
              {busy ? "Creating..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-slate-900 dark:text-gray-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
