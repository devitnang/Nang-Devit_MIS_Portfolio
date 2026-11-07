"use client";

import React, { useEffect, useState } from "react";

/**
 * Top reading & scroll progress indicator bar
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-700 via-sky-500 to-[#0B2046] dark:from-blue-500 dark:via-sky-400 dark:to-cyan-300 transition-[width] duration-150 ease-out shadow-[0_0_10px_rgba(56,189,248,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
