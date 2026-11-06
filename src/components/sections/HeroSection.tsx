"use client";

import React from "react";
import Image from "next/image";
import { personalInfo, socialLinks } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/ui/Icons";
import { Mail, Phone } from "lucide-react";

export function HeroSection() {
  const getSocialIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return <LinkedinIcon className="w-5 h-5" />;
      case "GitHub":
        return <GithubIcon className="w-5 h-5" />;
      case "Telegram":
        return <TelegramIcon className="w-5 h-5" />;
      case "Email":
        return <Mail className="w-5 h-5" />;
      case "Phone":
        return <Phone className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-linear-to-b from-slate-50 via-white to-white dark:from-[#070D19] dark:via-[#080F1E] dark:to-[#080F1E] flex items-center justify-center min-h-[70vh]"
    >
      {/* Subtle Corporate Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 dark:opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full p-1.5 bg-gradient-to-b from-[#0B2046] via-slate-200 to-[#D32F2F] dark:from-[#0F2756] dark:via-slate-700 dark:to-[#D32F2F] shadow-xl">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-2 border-white dark:border-[#080F1E]">
              <Image
                src={personalInfo.assets.avatar}
                alt="Nang Devit"
                fill
                priority
                className="object-cover object-top hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 210px, 240px"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B2046] dark:text-white mb-2">
          {personalInfo.name}
        </h1>

        {/* Major Only */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[#0B2046] dark:text-blue-300 font-bold text-sm sm:text-base md:text-lg mb-8 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
          <span>Major: Management Information Systems (MIS)</span>
        </div>

        {/* Contact Icons Only */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target={s.url.startsWith("http") ? "_blank" : undefined}
              rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="p-3 sm:p-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-[#D32F2F] dark:hover:bg-[#D32F2F] hover:border-[#D32F2F] dark:hover:border-[#D32F2F] transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              title={`${s.name}: ${s.label}`}
              aria-label={s.name}
            >
              {getSocialIcon(s.name)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
