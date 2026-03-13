import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared/Button";
import { Input } from "../../../shared/Input";
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
    Boolean(name?.trim() && email?.trim() && password?.trim() && confirmPassword?.trim() && passwordsMatch) && !busy;

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
    <div className="min-h-dvh bg-slate-50">
      <div className="mx-auto flex min-h-dvh max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="text-center">
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              Create account
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Register to start shopping.
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Name"
              autoComplete="name"
              placeholder="Your name"
              required
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
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
              hint="Minimum 4 characters"
              placeholder="••••••••"
              required
              error={errors.password?.message}
              {...register("password", { required: "Password is required" })}
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
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
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

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-slate-900"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
