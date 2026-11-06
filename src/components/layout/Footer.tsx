"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { personalInfo } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/ui/Icons";
import {
  Mail,
  Phone,
  Send,
  Globe,
  ArrowUp,
  MapPin,
  FileText,
  ShieldCheck,
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 dark:bg-[#060B14] text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Banner Accent */}
      <div className="h-1 bg-linear-to-r from-[#0B2046] via-[#D32F2F] to-[#0B2046]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Identity & Professional Tag */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#D32F2F] text-white flex items-center justify-center font-bold text-base shadow-xs">
                ND
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-tight">
                  {personalInfo.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  System Analyst &bull; MIS Senior
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Bridging business operational logic with scalable software systems, enterprise database architectures, and data-driven analytical decision support.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#D32F2F] shrink-0" />
              <span>Phnom Penh, Cambodia</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Available for Technical Positions & Roles</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { name: "Home", href: "#home" },
                { name: "About Me", href: "#about" },
                { name: "Technical Skills", href: "#skills" },
                { name: "Featured Projects", href: "#projects" },
                { name: "Professional Experience", href: "#experience" },
                { name: "Academic Education", href: "#education" },
                { name: "Contact & Inquiries", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all text-slate-400"
                  >
                    &rsaquo; {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Direct Contact Information */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Contact Channels
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#D32F2F] group-hover:scale-110 transition-transform" />
                  <span className="truncate">{personalInfo.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#D32F2F] group-hover:scale-110 transition-transform" />
                  <span>{personalInfo.contact.displayPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors group"
                >
                  <TelegramIcon className="w-4 h-4 text-[#D32F2F] group-hover:scale-110 transition-transform" />
                  <span>Telegram (@{personalInfo.contact.telegramUsername})</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors group"
                >
                  <Globe className="w-4 h-4 text-[#D32F2F] group-hover:scale-110 transition-transform" />
                  <span>{personalInfo.contact.displayWebsite}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Professional Profiles & CV */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Professional Networks
            </h4>
            <div className="space-y-3">
              <a
                href={personalInfo.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-md bg-slate-800/80 hover:bg-slate-800 hover:text-white transition-all text-xs"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn / devitnang</span>
              </a>

              <a
                href={personalInfo.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-md bg-slate-800/80 hover:bg-slate-800 hover:text-white transition-all text-xs"
              >
                <GithubIcon className="w-4 h-4 text-slate-200" />
                <span>GitHub / devitnang</span>
              </a>

              <a
                href={personalInfo.assets.cv}
                download={personalInfo.assets.cvFileName}
                className="flex items-center justify-between p-2 rounded-md bg-[#D32F2F]/15 border border-[#D32F2F]/30 hover:bg-[#D32F2F]/25 text-white transition-all text-xs font-semibold"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D32F2F]" />
                  Curriculum Vitae (PDF)
                </span>
                <span className="text-[10px] uppercase tracking-wider bg-[#D32F2F] px-1.5 py-0.5 rounded text-white">
                  Download
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; 2026 Nang Devit. All rights reserved.
          </p>

          <p className="text-center sm:text-right">
            Custom Domain:{" "}
            <a
              href="https://www.nangdevit.xyz"
              className="text-slate-400 hover:text-[#D32F2F] transition-colors underline underline-offset-2"
            >
              www.nangdevit.xyz
            </a>
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
