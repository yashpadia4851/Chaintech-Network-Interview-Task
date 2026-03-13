import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { useAuth } from "../useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const canSubmit = useMemo(
    () =>
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.password.length >= 4 &&
      !busy,
    [form, busy],
  );

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = register(form);
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

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <Input
              label="Name"
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              hint="Minimum 4 characters"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm((form) => ({ ...form, password: e.target.value }))
              }
            />

            {error ? (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
                {error}
              </div>
            ) : null}

            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {busy ? "Creating..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-slate-900 underline underline-offset-4"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
