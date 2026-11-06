"use client";

import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experienceData";
import {
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Building2,
} from "lucide-react";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-16 md:py-24 bg-slate-50 dark:bg-[#070D19] border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Organizational & Professional Record"
          title="Professional Experience"
          subtitle="Documented field and organizational coordination experience demonstrating operational precision, statutory compliance, and leadership in high-integrity environments."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative p-6 sm:p-8 rounded-xl bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-[#0B2046] dark:bg-blue-600 rounded-b" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  {/* Organization Logo */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white p-2 border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs">
                    <Image
                      src={exp.logo}
                      alt={`${exp.organization} Official Logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 text-[#0B2046] dark:text-blue-300">
                        {exp.type}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Year {exp.year}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#0B2046] dark:text-white">
                      {exp.position}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>{exp.organization}</span>
                    </p>
                  </div>
                </div>

                {/* Metadata Badge */}
                <div className="sm:text-right space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex sm:justify-end items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex sm:justify-end items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities List */}
              <div className="space-y-4">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />
                  <span>Key Responsibilities & Operational Contributions</span>
                </h4>

                <ul className="space-y-2.5">
                  {exp.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applied Skills Footer */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Core Competencies Demonstrated:
                </span>
                <div className="flex flex-wrap gap-2">
                  {exp.skillsApplied.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
