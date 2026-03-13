import React, { useMemo, useState } from "react";
import { Button } from "../../../shared/Button";
import { Input } from "../../../shared/Input";
import { useAuth } from "../../auth/useAuth";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const canSave = useMemo(() => {
    return form.name.trim().length > 0 && form.email.trim().length > 0 && !busy;
  }, [form, busy]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setBusy(true);
    try {
      const res = updateProfile({
        name: form.name,
        email: form.email,
        ...(form.password ? { password: form.password } : {}),
      });
      if (!res.ok) {
        setError(res.error || "Failed to update profile.");
        return;
      }
      setSuccess("Profile updated successfully.");
      setForm((f) => ({ ...f, password: "" }));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-2xl font-bold tracking-tight text-slate-900">
          Profile
        </div>
        <div className="mt-1 text-sm text-slate-600">
          Update your account information.
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={onSubmit}
        >
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <div className="sm:col-span-2">
            <Input
              label="Password"
              type="password"
              value={form.password}
              placeholder="Leave blank to keep current password"
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
            />
          </div>

          {error ? (
            <div className="sm:col-span-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
              {error}
            </div>
          ) : null}
          {success ? (
            <div className="sm:col-span-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 ring-1 ring-emerald-100">
              {success}
            </div>
          ) : null}

          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <Button type="submit" disabled={!canSave}>
              {busy ? "Saving..." : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setForm({
                  name: user?.name || "",
                  email: user?.email || "",
                  password: "",
                })
              }
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
