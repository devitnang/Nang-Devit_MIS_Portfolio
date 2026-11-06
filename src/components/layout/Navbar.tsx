"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { personalInfo } from "@/data/portfolioData";
import { Menu, X, FileText, Send, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 dark:bg-[#080F1E]/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 dark:border-slate-800/80"
          : "bg-white dark:bg-[#080F1E] border-b border-slate-200 dark:border-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo / Monogram */}
          <Link
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Nang Devit - Home"
          >
            <div className="relative w-10 h-10 rounded-lg bg-white dark:bg-[#0F2756] p-1 border border-slate-200 dark:border-slate-700 shadow-2xs group-hover:border-[#D32F2F] dark:group-hover:border-[#D32F2F] transition-colors duration-200 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/images/logo/mylogo_1.png"
                alt="Nang Devit Logo"
                fill
                className="object-contain p-0.5"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#0B2046] dark:text-white leading-none group-hover:text-[#D32F2F] dark:group-hover:text-red-400 transition-colors">
                NANG DEVIT
              </span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">
                System Analyst &bull; MIS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold tracking-wide transition-all duration-150 relative ${
                    isActive
                      ? "text-[#D32F2F] dark:text-red-400 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:text-[#0B2046] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D32F2F] dark:bg-red-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />

            <a
              href={personalInfo.assets.cv}
              download={personalInfo.assets.cvFileName}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold uppercase tracking-wider border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Download Curriculum Vitae (PDF)"
            >
              <FileText className="w-3.5 h-3.5 text-[#D32F2F]" />
              <span>CV</span>
            </a>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-[#D32F2F] hover:bg-[#B71C1C] text-white shadow-xs hover:shadow transition-all duration-150 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact Me</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#D32F2F]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0B2046] dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1528] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-red-50 dark:bg-red-950/40 text-[#D32F2F] dark:text-red-400 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      isActive ? "text-[#D32F2F]" : "text-slate-400"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
            <a
              href={personalInfo.assets.cv}
              download={personalInfo.assets.cvFileName}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <FileText className="w-4 h-4 text-[#D32F2F]" />
              <span>Download Full CV (PDF)</span>
            </a>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-[#D32F2F] text-white hover:bg-[#B71C1C]"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

