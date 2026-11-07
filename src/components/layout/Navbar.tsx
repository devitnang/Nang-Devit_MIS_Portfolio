"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScroll } from "@/components/ui/use-scroll";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { personalInfo } from "@/data/portfolioData";
import { GlassTabBar, GlassTabBarItem } from "@/components/ui/glass-tab-bar";
import {
  FileText,
  Send,
  Home,
  Layers,
  FolderGit2,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export function Header() {
  const scrolled = useScroll(10);
  const [activeSection, setActiveSection] = useState("home");

  const links = [
    { label: "Home", href: "#home", id: "home", icon: <Home className="w-5 h-5" /> },
    { label: "Skills", href: "#skills", id: "skills", icon: <Layers className="w-5 h-5" /> },
    { label: "Projects", href: "#projects", id: "projects", icon: <FolderGit2 className="w-5 h-5" /> },
    { label: "Experience", href: "#experience", id: "experience", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Education", href: "#education", id: "education", icon: <GraduationCap className="w-5 h-5" /> },
    { label: "Contact", href: "#contact", id: "contact", icon: <Send className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => link.id);
      const scrollPosition = window.scrollY + 140;

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
  }, [links]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* =========================================================================
          PC & iPad Top Header (Unchanged, sticky floating enterprise bar)
          ========================================================================= */}
      <header
        className={cn(
          "sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out",
          {
            "bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow":
              scrolled,
          }
        )}
      >
        <nav
          className={cn(
            "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
            {
              "md:px-2": scrolled,
            }
          )}
        >
          {/* Brand Logo & Name */}
          <Link
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Nang Devit - Home"
            onClick={() => scrollToSection("home")}
          >
            <div className="relative w-8 h-8 rounded-md bg-white dark:bg-[#0F2756] p-0.5 border border-slate-200 dark:border-slate-700 shadow-2xs group-hover:border-[#0B2046] dark:group-hover:border-blue-400 transition-colors flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/images/logo/mylogo_1.png"
                alt="Nang Devit Logo"
                fill
                className="object-contain p-0.5"
                sizes="32px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-[#0B2046] dark:text-white leading-none">
                NANG DEVIT
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-0.5">
                MIS
              </span>
            </div>
          </Link>

          {/* PC & iPad Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "text-xs font-semibold px-2.5 py-1 transition-colors relative cursor-pointer",
                    isActive &&
                      "text-[#0B2046] dark:text-blue-400 font-bold bg-slate-100/80 dark:bg-slate-800/80"
                  )}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#0B2046] dark:bg-blue-400 rounded-full" />
                  )}
                </a>
              );
            })}

            <div className="flex items-center gap-1.5 ml-1 border-l border-slate-200 dark:border-slate-800 pl-2">
              <ThemeToggle />

              <a
                href={personalInfo.assets.cv}
                download={personalInfo.assets.cvFileName}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "text-xs font-semibold h-8 px-2.5 gap-1.5",
                })}
                title="Download CV (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400" />
                <span>CV</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className={buttonVariants({
                  variant: "default",
                  size: "sm",
                  className: "text-xs font-bold h-8 px-3 gap-1.5",
                })}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Mobile Top Controls: Theme toggle & CV download */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <a
              href={personalInfo.assets.cv}
              download={personalInfo.assets.cvFileName}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "text-xs font-semibold h-8 px-2.5 gap-1",
              })}
              title="Download CV (PDF)"
            >
              <FileText className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400" />
              <span>CV</span>
            </a>
          </div>
        </nav>
      </header>

      {/* =========================================================================
          Mobile View Floating Liquid Glass Tab Bar (iOS style sliding indicator)
          ========================================================================= */}
      <aside
        aria-label="Mobile Navigation"
        className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden w-auto max-w-[96vw] pointer-events-auto"
      >
        <GlassTabBar
          value={activeSection}
          onValueChange={(val) => scrollToSection(val)}
          className="shadow-2xl shadow-slate-950/20 dark:shadow-black/70 border border-white/40 dark:border-white/10"
        >
          {links.map((tab) => (
            <GlassTabBarItem
              key={tab.id}
              value={tab.id}
              icon={tab.icon}
              label={tab.label}
              onClick={() => scrollToSection(tab.id)}
            />
          ))}
        </GlassTabBar>
      </aside>
    </>
  );
}

// Export both Navbar and Header for seamless backward compatibility
export const Navbar = Header;
