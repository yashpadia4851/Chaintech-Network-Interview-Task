import React, { forwardRef, useState } from "react";

const EyeIcon = () => (
  <svg className="size-4 text-slate-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="size-4 text-slate-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

export const Input = forwardRef(function Input(
  { label, hint, error, required, className = "", type = "text", ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`block ${className}`}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-slate-800 dark:text-gray-200">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          className={`h-10 w-full rounded-lg bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition-colors dark:bg-neutral-800 dark:text-gray-100 dark:placeholder:text-gray-500 ${
            isPassword ? "pr-10" : ""
          } ${
            error
              ? "ring-1 ring-red-300 focus:ring-2 focus:ring-red-300 dark:ring-red-500"
              : "ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400 dark:ring-neutral-600 dark:focus:ring-neutral-500"
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-500"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {!error && hint && <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">{hint}</p>}
    </div>
  );
});