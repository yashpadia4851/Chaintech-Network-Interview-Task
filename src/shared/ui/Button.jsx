import React from "react";

export function Button({
  as: asComponent = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const Component = asComponent;

  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };

  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition px-4";

  return (
    <Component
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}