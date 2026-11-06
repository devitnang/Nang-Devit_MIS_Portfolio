import React from "react";

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  center = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        center ? "text-center max-w-3xl mx-auto" : "max-w-2xl"
      }`}
    >
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3.5 border ${
          center ? "mx-auto" : ""
        } bg-slate-50 border-slate-200 text-[#0B2046] dark:bg-slate-900/80 dark:border-slate-800 dark:text-blue-300`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#0B2046] dark:bg-blue-400" />
        {badge}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0B2046] dark:text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-0.5 w-16 bg-[#0B2046] dark:bg-blue-500 ${
          center ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
