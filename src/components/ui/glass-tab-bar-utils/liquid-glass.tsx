"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  shadow?: boolean;
  bezel?: number;
  tint?: string;
}

export const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  (
    {
      asChild = false,
      shadow = true,
      bezel,
      tint,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const combinedStyle: React.CSSProperties = {
      ...style,
      ...(tint ? { backgroundColor: tint } : {}),
    };

    const glassClasses = cn(
      "backdrop-blur-2xl transition-all duration-300",
      shadow
        ? "bg-white/80 dark:bg-[#0B1528]/85 border border-white/50 dark:border-white/10 shadow-xl shadow-slate-900/10 dark:shadow-black/60"
        : "bg-white/90 dark:bg-white/15 border border-white/70 dark:border-white/20 shadow-xs",
      className
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
        style?: React.CSSProperties;
      }>;
      return React.cloneElement(child, {
        className: cn(glassClasses, child.props.className),
        style: { ...combinedStyle, ...child.props.style },
      });
    }

    return (
      <div
        ref={ref}
        className={glassClasses}
        style={combinedStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidGlass.displayName = "LiquidGlass";
