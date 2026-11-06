"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personalInfo } from "@/data/portfolioData";
import {
  Workflow,
  BarChart3,
  Code2,
  GraduationCap,
  Target,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";
import Link from "next/link";

export function AboutSection() {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case "Workflow":
        return <Workflow className="w-6 h-6 text-[#D32F2F]" />;
      case "BarChart3":
        return <BarChart3 className="w-6 h-6 text-[#0B2046] dark:text-blue-400" />;
      case "Code2":
        return <Code2 className="w-6 h-6 text-[#D32F2F]" />;
      default:
        return <Layers className="w-6 h-6 text-[#D32F2F]" />;
    }
  };

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-white dark:bg-[#080F1E] border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Professional Background & Profile"
          title="About Nang Devit"
          subtitle="A dedicated technologist bridging business operational needs with robust system architecture, database engineering, and analytical data intelligence."
        />

        {/* Narrative Grid: Background, Objectives, Educational Context */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Professional Background & Personal Introduction */}
          <div className="p-6 sm:p-7 rounded-xl bg-slate-50 dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0B2046] dark:bg-[#0F2756] text-white flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B2046] dark:text-white">
                    Personal Introduction
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Profile & Philosophy
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                I am a disciplined and inquisitive professional who believes that technology delivers its highest value when anchored in deep operational understanding. My focus lies in designing clear, reliable systems that simplify complex institutional workflows.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether modeling complex database relationships in third normal form or writing full-stack code, I maintain a methodical, quality-first standard.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D32F2F]">
                Core Mindset: Precision &bull; Integrity &bull; Adaptability
              </span>
            </div>
          </div>

          {/* Card 2: Educational Foundation (SETEC MIS) */}
          <div className="p-6 sm:p-7 rounded-xl bg-slate-50 dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0B2046] dark:bg-[#0F2756] text-white flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B2046] dark:text-white">
                    Academic Foundation
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    SETEC Institute &bull; Year 4
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Pursuing a Bachelor of Science in <strong>Management Information Systems (MIS)</strong> at SETEC Institute. The MIS discipline has provided me with a unique dual vantage point: understanding the language of business managers and the code of engineers.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D32F2F] shrink-0" />
                  <span>Systems Analysis & Structured Design (SAD)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D32F2F] shrink-0" />
                  <span>Enterprise Database Architecture (Oracle, MSSQL)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D32F2F] shrink-0" />
                  <span>ERP Frameworks & Decision Support Systems</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <Link
                href="#education"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B2046] dark:text-blue-400 hover:text-[#D32F2F] dark:hover:text-red-400 transition-colors"
              >
                <span>View Academic Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Career Objectives & Goals */}
          <div className="p-6 sm:p-7 rounded-xl bg-slate-50 dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0B2046] dark:bg-[#0F2756] text-white flex items-center justify-center">
                  <Target className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B2046] dark:text-white">
                    Career Objectives
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Professional Growth & Aspiration
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                To contribute to high-integrity enterprises, financial institutions, and innovative technology companies as a <strong>System Analyst</strong> or <strong>Software Developer</strong>.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Committed to architecting secure systems, elevating data quality, designing seamless interfaces, and collaborating effectively across business and engineering units.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D32F2F] hover:underline"
              >
                <span>Discuss Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* The 3 Core Pillars: System Analysis, Data Analytics, Software Development */}
        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#0B2046] dark:text-white">
                Core Competency Pillars
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Detailed breakdown of primary technical and analytical specializations.
              </p>
            </div>
            <Shield className="w-5 h-5 text-slate-400 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personalInfo.corePillars.map((pillar) => (
              <div
                key={pillar.id}
                className="p-6 rounded-xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 hover:border-[#D32F2F]/40 dark:hover:border-red-500/40 transition-all shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {pillar.badge}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#0B2046] dark:text-white mb-2">
                  {pillar.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {pillar.description}
                </p>

                <div className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Key Strengths:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {pillar.competencies.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D32F2F] shrink-0 mt-0.5" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
