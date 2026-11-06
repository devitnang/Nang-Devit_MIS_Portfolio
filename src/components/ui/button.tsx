import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonVariantOptions {
  variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: ButtonVariantOptions = {}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const variantStyles = {
    default:
      "bg-[#0B2046] text-white shadow-xs hover:bg-[#07152E] dark:bg-blue-600 dark:hover:bg-blue-700",
    outline:
      "border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
    ghost:
      "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0B2046] dark:hover:text-white",
    secondary:
      "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700",
    link: "text-[#0B2046] dark:text-blue-400 underline-offset-4 hover:underline",
  }[variant];

  const sizeStyles = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-6 text-sm",
    icon: "h-9 w-9 p-0",
  }[size];

  return cn(baseStyles, variantStyles, sizeStyles, className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantOptions {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
