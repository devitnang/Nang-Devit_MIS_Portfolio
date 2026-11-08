"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Grid2X2Plus } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
  FacebookIcon,
} from "@/components/ui/Icons";
import { personalInfo } from "@/data/portfolioData";

export function MinimalFooter() {
  const year = 2026;

  const navigation = [
    { title: "Home", href: "#home" },
    { title: "Technical Skills", href: "#skills" },
    { title: "Featured Projects", href: "#projects" },
    { title: "Work Experience", href: "#experience" },
    { title: "Education", href: "#education" },
    { title: "Contact", href: "#contact" },
  ];

  const resources = [
    { title: "SETEC Institute", href: "#education" },
    {
      title: "Flutter Ecommerce Doc",
      href: "/assets/projects/flutter_ecommerce/The-D3V-Ecommerce_Frontend_Documentation.pdf",
    },
    { title: "Telegram Channel", href: personalInfo.contact.telegramUrl },
    { title: "Contact Support / Inquiries", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <GithubIcon className="size-4" />,
      link: personalInfo.contact.githubUrl,
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="size-4" />,
      link: personalInfo.contact.linkedinUrl,
    },
    {
      name: "Telegram",
      icon: <TelegramIcon className="size-4" />,
      link: personalInfo.contact.telegramUrl,
    },
    {
      name: "Facebook",
      icon: <FacebookIcon className="size-4" />,
      link: personalInfo.contact.facebookUrl || "https://facebook.com/devitnang",
    },
  ];

  return (
    <footer className="relative border-t border-border bg-background transition-colors">
      <div className="bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)] mx-auto max-w-4xl md:border-x border-border">
        <div className="bg-border absolute inset-x-0 h-px w-full" />
        <div className="grid max-w-4xl grid-cols-6 gap-6 p-6 sm:p-8">
          <div className="col-span-6 flex flex-col gap-4 md:col-span-4">
            <Link href="#home" className="flex items-center gap-2.5 w-max group">
              <div className="relative w-8 h-8 rounded-md bg-[#0B2046] dark:bg-blue-600 p-0.5 flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/images/logo/mylogo.png"
                  alt="Nang Devit Logo"
                  fill
                  className="object-contain p-0.5"
                  sizes="32px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-[#0B2046] dark:text-white leading-none">
                  NANG DEVIT
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                  MIS &bull; SETEC Institute
                </span>
              </div>
            </Link>

            <p className="text-muted-foreground max-w-sm font-sans text-xs sm:text-sm leading-relaxed text-balance">
              Management Information Systems (MIS) Senior at SETEC Institute.
              Specializing in enterprise systems analysis, relational database
              architectures.
            </p>

            <div className="flex gap-2 pt-1">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  className="hover:bg-accent rounded-md border border-border p-2 text-slate-700 dark:text-slate-300 hover:text-[#0B2046] dark:hover:text-white transition-colors cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.link}
                  aria-label={item.name}
                  title={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground mb-2 block text-xs font-semibold uppercase tracking-wider">
              Navigation
            </span>
            <div className="flex flex-col gap-1">
              {navigation.map(({ href, title }, i) => (
                <a
                  key={i}
                  className="w-max py-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 duration-200 hover:text-[#0B2046] dark:hover:text-blue-400 hover:underline"
                  href={href}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground mb-2 block text-xs font-semibold uppercase tracking-wider">
              Resources
            </span>
            <div className="flex flex-col gap-1">
              {resources.map(({ href, title }, i) => (
                <a
                  key={i}
                  className="w-max py-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 duration-200 hover:text-[#0B2046] dark:hover:text-blue-400 hover:underline"
                  href={href}
                  target={href.endsWith(".pdf") ? "_blank" : undefined}
                  rel={href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-border absolute inset-x-0 h-px w-full" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 pt-4 pb-24 md:pb-6 px-4">
          <p className="text-muted-foreground text-center font-normal text-xs">
            &copy; {year}{" "}
            <Link
              href="https://www.nangdevit.xyz"
              className="font-semibold text-[#0B2046] dark:text-blue-400 hover:underline"
            >
              Nang Devit
            </Link>
            . All rights reserved. Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Export both Footer and MinimalFooter for seamless compatibility
export const Footer = MinimalFooter;
