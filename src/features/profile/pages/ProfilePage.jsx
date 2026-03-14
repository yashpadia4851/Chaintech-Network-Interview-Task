import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../../../shared/Button";
import { Input } from "../../../shared/Input";
import { useAuth } from "../../auth/hooks/useAuth";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      newPassword: "",
    },
  });

  const initialPasswordRef = useRef(user?.password || "");

  const { name = "", email = "", password = "", newPassword = "" } = watch();
  const hasErrors = Object.keys(errors || {}).length > 0;
  const isFormValid =
    Boolean(name.trim() && email.trim()) && !busy && !hasErrors;

  async function onSubmit(values) {
    setBusy(true);
    try {
      const payload = {
        name: values.name,
        email: values.email,
      };

      if (values.newPassword && values.newPassword.trim()) {
        payload.password = values.newPassword;
      }

      const res = updateProfile(payload);
      if (!res.ok) {
        toast.error(res.error || "Failed to update profile.");
        return;
      }
      toast.success("Profile updated successfully.");
      navigate("/dashboard", { replace: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-gray-100">
          Profile
        </div>
        <div className="mt-1 text-sm text-slate-600 dark:text-gray-400">
          Update your account information.
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200/60 transition-colors dark:bg-neutral-900 dark:ring-neutral-700/60 dark:shadow-black/25">
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Name"
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
            required
            autoComplete="email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/,
                message: "Invalid email",
              },
            })}
          />
          <div className="sm:col-span-2 space-y-1.5">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  value === initialPasswordRef.current ||
                  "Password is not matching with the old one",
              })}
            />
            <p className="text-xs text-slate-500 dark:text-gray-400">
              This is your current password. Do not change it here.
            </p>
          </div>
          <div className="sm:col-span-2">
            <Input
              label="New password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.newPassword?.message}
              {...register("newPassword")}
            />
            <p className="text-xs text-slate-500 dark:text-gray-400">
              Leave this field empty if you do not want to change your password.
            </p>
          </div>

          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <Button type="submit" disabled={!isFormValid}>
              {busy ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
