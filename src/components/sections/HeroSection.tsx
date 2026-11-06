"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo, socialLinks } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/ui/Icons";
import {
  FileText,
  Briefcase,
  ChevronRight,
  Database,
  Workflow,
  Code2,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";

export function HeroSection() {
  const getSocialIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return <LinkedinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "GitHub":
        return <GithubIcon className="w-4 h-4 text-slate-800 dark:text-slate-200" />;
      case "Telegram":
        return <TelegramIcon className="w-4 h-4 text-sky-500" />;
      case "Email":
        return <Mail className="w-4 h-4 text-[#D32F2F]" />;
      case "Phone":
        return <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-linear-to-b from-slate-50 via-white to-white dark:from-[#070D19] dark:via-[#080F1E] dark:to-[#080F1E]"
    >
      {/* Subtle Corporate Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Professional Identity & Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status / Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for System Analyst & Developer Roles</span>
            </div>

            {/* Main Greeting & Name */}
            <div>
              <p className="text-sm sm:text-base font-semibold tracking-wider uppercase text-[#D32F2F] dark:text-red-400 mb-1">
                Personal Portfolio &bull; Nang Devit
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#0B2046] dark:text-white leading-[1.15]">
                {personalInfo.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300">
                <span className="text-[#0B2046] dark:text-blue-400">System Analyst</span>
                <span className="text-[#D32F2F]">&bull;</span>
                <span className="text-slate-800 dark:text-slate-200">Data Analytics</span>
                <span className="text-[#D32F2F]">&bull;</span>
                <span className="text-[#0B2046] dark:text-blue-400">Software Developer</span>
              </div>
            </div>

            {/* Professional Summary */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {personalInfo.shortTagline} A Management Information Systems (MIS) senior at SETEC Institute specializing in translating business workflows into rock-solid enterprise databases (Oracle, MSSQL, PostgreSQL), scalable web and mobile software (C#, Next.js, Flutter), and actionable data analytics.
            </p>

            {/* Call to Actions (Primary Red + Secondary Corporate Navy) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={personalInfo.assets.cv}
                download={personalInfo.assets.cvFileName}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider bg-[#D32F2F] hover:bg-[#B71C1C] text-white shadow-xs hover:shadow transition-all duration-150 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider border-2 border-[#0B2046] text-[#0B2046] hover:bg-[#0B2046] hover:text-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-all duration-150"
              >
                <Briefcase className="w-4 h-4" />
                <span>View Projects</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Social Links Row */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2">
                Connect:
              </span>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#D32F2F] dark:hover:text-red-400 hover:border-[#D32F2F]/40 dark:hover:border-red-500/40 transition-colors shadow-2xs"
                  aria-label={`${s.name} Profile`}
                >
                  {getSocialIcon(s.name)}
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Corporate Profile Photo Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer Corporate Frame */}
              <div className="relative rounded-2xl p-3 bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 shadow-xl">
                {/* Red Accent Top Tag */}
                <div className="absolute -top-3 left-6 px-3 py-1 rounded bg-[#D32F2F] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                  SETEC Institute &bull; MIS
                </div>

                {/* Profile Image Frame */}
                <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Image
                    src={personalInfo.assets.avatar}
                    alt="Nang Devit - Professional Portrait"
                    fill
                    priority
                    className="object-cover object-top hover:scale-102 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B2046]/70 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Image Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-white/95 dark:bg-[#071228]/95 backdrop-blur-xs border border-white/40 dark:border-slate-800 text-slate-900 dark:text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-[#0B2046] dark:text-white">
                          Nang Devit
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Bachelor of Science in MIS
                        </p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Small Corporate Badges Underneath */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <Workflow className="w-4 h-4 mx-auto text-[#D32F2F] mb-1" />
                    <span className="block text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase">
                      Analysis
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <Database className="w-4 h-4 mx-auto text-[#0B2046] dark:text-blue-400 mb-1" />
                    <span className="block text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase">
                      Databases
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <Code2 className="w-4 h-4 mx-auto text-[#D32F2F] mb-1" />
                    <span className="block text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase">
                      Software
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
