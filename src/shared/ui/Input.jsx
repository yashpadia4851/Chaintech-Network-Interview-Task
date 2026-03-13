import React from "react";

export const Input = React.forwardRef(function Input(
  { label, hint, error, className = "", ...props },
  ref,
) {
  return (
    <label className={`block ${className}`}>
      {label ? (
        <span className="mb-1 block text-sm font-medium text-slate-800">
          {label}
        </span>
      ) : null}
      <input
        ref={ref}
        className={[
          "h-10 w-full rounded-lg bg-white px-3 text-sm text-slate-900 ring-1 ring-inset",
          error
            ? "ring-red-300 focus:ring-2 focus:ring-red-300"
            : "ring-slate-200 focus:ring-2 focus:ring-slate-400",
          "outline-none placeholder:text-slate-400",
        ].join(" ")}
        {...props}
      />
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
});

