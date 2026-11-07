"use client";

import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
      className="py-16 md:py-24 bg-white dark:bg-[#080F1E] border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Organizational & Professional Record"
            title="Professional Experience"
            subtitle="Documented field and organizational coordination experience demonstrating operational precision, statutory compliance, and leadership in high-integrity environments."
          />
        </ScrollReveal>

        {/* Clean Line-Based Timeline Table (No outer box outline, clean dividing lines only) */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
          {experiences.map((exp, idx) => (
            <ScrollReveal
              key={exp.id}
              animation="fade-up"
              delay={idx * 100}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Organization Info Column (Left 4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white p-1 border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs">
                    <Image
                      src={exp.logo}
                      alt={`${exp.organization} Logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#0B2046] dark:text-blue-300 block mb-0.5">
                      {exp.type} &bull; {exp.year}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2046] dark:text-white leading-tight">
                      {exp.position}
                    </h3>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pl-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400" />
                    <span>{exp.organization}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.period}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.location}</span>
                  </p>
                </div>
              </div>

              {/* Responsibilities & Applied Skills Column (Right 8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200 flex items-center gap-2 mb-3">
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

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Core Competencies:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {exp.skillsApplied.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded text-xs font-medium bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-b border-slate-300 dark:border-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
