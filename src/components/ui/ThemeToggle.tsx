"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useId } from "react";

/**
 * Real Fluid SVG Dark/Light Switch UI.
 * Single continuous stadium path with sliding liquid stroke ring knob,
 * matching the exact physics and geometry of the demonstration video.
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const inputId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const toggleTheme = () => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.add("theme-transitioning");
      window.setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 550);
    }
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="theme-switch-wrapper">
        <div
          aria-hidden="true"
          className="theme-switch opacity-60 animate-pulse pointer-events-none"
        >
          <svg viewBox="0 0 212.4992 84.4688" overflow="visible">
            <path
              pathLength={360}
              fill="none"
              stroke="currentColor"
              d="M 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 A 42.24 42.24 90 0 0 84.4992 42.2496 A 42.24 42.24 90 0 0 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 L 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 A 42.24 42.24 90 0 0 128 42.2496 A 42.24 42.24 90 0 0 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 L 42.2496 0"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-switch-wrapper">
      <input
        id={inputId}
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      />
      <label
        className="theme-switch"
        htmlFor={inputId}
        data-checked={isDark ? "true" : "false"}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <svg viewBox="0 0 212.4992 84.4688" overflow="visible">
          <path
            pathLength={360}
            fill="none"
            stroke="currentColor"
            d="M 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 A 42.24 42.24 90 0 0 84.4992 42.2496 A 42.24 42.24 90 0 0 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 L 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 A 42.24 42.24 90 0 0 128 42.2496 A 42.24 42.24 90 0 0 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 L 42.2496 0"
          />
        </svg>
      </label>
    </div>
  );
}

export default ThemeToggle;
