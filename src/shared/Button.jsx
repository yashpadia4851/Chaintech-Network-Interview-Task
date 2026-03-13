import React from "react";

export function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {

  const variants = {
    primary:
      "bg-slate-800 text-white shadow-sm hover:bg-slate-700 hover:shadow transition-colors",
    secondary:
      "bg-white text-slate-800 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-colors",
    danger: "bg-red-600 text-white shadow-sm hover:bg-red-700 transition-colors",
    ghost: "bg-transparent text-slate-800 hover:bg-slate-100 transition-colors",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };

  const base =
    "inline-flex cursor-pointer items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <Component
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}