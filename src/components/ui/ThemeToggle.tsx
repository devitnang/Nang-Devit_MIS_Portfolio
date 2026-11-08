"use client";

import { useId, useSyncExternalStore } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const subscribeToNothing = () => () => {};
const getMountedSnapshot = () => true;
const getServerMountedSnapshot = () => false;

export const SwitchToggleThemeDemo = () => {
  const id = useId();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    getMountedSnapshot,
    getServerMountedSnapshot,
  );

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const setIsDark = (val: boolean) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.add("theme-transitioning");
      window.setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 450);
    }
    setTheme(val ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className="group inline-flex items-center gap-2 select-none">
        <span
          id={`${id}-light`}
          className="cursor-pointer text-left text-sm font-medium text-foreground/50"
          aria-controls={id}
        >
          <SunIcon className="size-4" aria-hidden="true" />
        </span>

        <Switch
          id={id}
          checked={false}
          aria-labelledby={`${id}-light ${id}-dark`}
          aria-label="Toggle between dark and light mode"
          disabled
        />

        <span
          id={`${id}-dark`}
          className="cursor-pointer text-right text-sm font-medium text-foreground/50"
          aria-controls={id}
        >
          <MoonIcon className="size-4" aria-hidden="true" />
        </span>
      </div>
    );
  }

  return (
    <div className="group inline-flex items-center gap-2 select-none">
      <span
        id={`${id}-light`}
        className={cn(
          "cursor-pointer text-left text-sm font-medium transition-colors hover:text-foreground",
          isDark && "text-foreground/50",
        )}
        aria-controls={id}
        onClick={() => setIsDark(false)}
        title="Switch to Light Mode"
      >
        <SunIcon className="size-4" aria-hidden="true" />
      </span>

      <Switch
        id={id}
        checked={isDark}
        onCheckedChange={setIsDark}
        aria-labelledby={`${id}-light ${id}-dark`}
        aria-label="Toggle between dark and light mode"
      />

      <span
        id={`${id}-dark`}
        className={cn(
          "cursor-pointer text-right text-sm font-medium transition-colors hover:text-foreground",
          isDark || "text-foreground/50",
        )}
        aria-controls={id}
        onClick={() => setIsDark(true)}
        title="Switch to Dark Mode"
      >
        <MoonIcon className="size-4" aria-hidden="true" />
      </span>
    </div>
  );
};

export const ThemeToggle = SwitchToggleThemeDemo;
export default SwitchToggleThemeDemo;
