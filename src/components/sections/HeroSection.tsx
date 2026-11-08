"use client";

import React from "react";
import Image from "next/image";
import { personalInfo } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/ui/Icons";
import { Mail, ChevronDown } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { Parallax, ParallaxBackground } from "@/components/ui/Parallax";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4.5rem)] h-[calc(100dvh-3.5rem)] md:h-[calc(100vh-4.5rem)] min-h-[500px] flex flex-col items-center justify-center py-12 md:py-20 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080F1E] transition-colors"
    >
      {/* Ambient Parallax Multi-Plane Depth Background */}
      <ParallaxBackground />

      {/* Foreground Content with Subtle Parallax Depth */}
      <Parallax speed={-0.08} className="w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-hero-card">
          {/* Top Block: Avatar on left + Name & Socials on right */}
          <div className="inline-flex items-center justify-center gap-4 sm:gap-6 text-left">
            {/* Circular Avatar with Floating Breathing Animation */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 border-2 border-slate-200/90 dark:border-slate-700 shadow-sm bg-slate-100 dark:bg-slate-800 animate-avatar-float">
              <Image
                src="/assets/images/nangdevit.png"
                alt="Nang Devit"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 96px, 112px"
              />
            </div>

            {/* Name & Socials Column */}
            <div className="flex flex-col justify-center">
              {/* Name + Blue Verified Checkmark Badge with Pop-in Animation */}
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B2046] dark:text-white">
                  Nang Devit
                </h1>

                {/* Verified Scalloped Badge with Shimmer & Entrance Animation */}
                <VerifiedBadge
                  size={24}
                  className="shrink-0 animate-badge-pop sm:scale-110 origin-left"
                  title="Verified MIS Professional"
                  aria-label="Verified MIS Professional"
                />
              </div>

              {/* Social Icons row with Staggered Entrance */}
              <div className="flex items-center gap-3 sm:gap-3.5 mt-2 text-slate-500 dark:text-slate-400">
                {/* GitHub */}
                <a
                  href={personalInfo.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors animate-social-0 hover:scale-110"
                  title="GitHub"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0A66C2] transition-colors animate-social-1 hover:scale-110"
                  title="LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="hover:text-[#0B2046] dark:hover:text-blue-400 transition-colors animate-social-2 hover:scale-110"
                  title={`Email: ${personalInfo.contact.email}`}
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                {/* Telegram */}
                <a
                  href={personalInfo.contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0088cc] transition-colors animate-social-3 hover:scale-110"
                  title="Telegram"
                  aria-label="Telegram Channel"
                >
                  <TelegramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Subtitle Underneath with Slide Up Reveal */}
          <div className="mt-6 sm:mt-8 animate-subtitle-reveal">
            <p className="text-base sm:text-lg md:text-xl font-normal text-slate-600 dark:text-slate-400">
              <strong className="font-bold text-[#0B2046] dark:text-blue-400">
                Management Information Systems
              </strong>{" "}
              — SETEC Institute (Year 4)
            </p>
          </div>
        </div>
      </Parallax>

      {/* Subtle Scroll Down Indicator on Desktop with Float Animation */}
      <a
        href="#skills"
        aria-label="Scroll to Skills & Technologies"
        className="hidden md:inline-flex absolute bottom-6 left-1/2 p-2 rounded-full text-slate-400 hover:text-[#0B2046] dark:hover:text-blue-400 transition-colors animate-scroll-indicator"
      >
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
}
