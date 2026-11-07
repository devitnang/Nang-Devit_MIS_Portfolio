"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  SearchFilterToolbar,
  CategoryOption,
} from "@/components/ui/SearchFilterToolbar";
import { skillCategories } from "@/data/skillsData";
import { SkillItem } from "@/types";
import { GithubIcon } from "@/components/ui/Icons";
import {
  Code,
  Database,
  Terminal,
  Layers,
  Globe,
  Smartphone,
  Palette,
  Server,
  BarChart3,
  GitBranch,
  Cloud,
  Box,
  Send,
  RotateCcw,
  Filter,
  ChevronsUpDown,
} from "lucide-react";

/**
 * Renders the circular avatar icon for a skill, matching Vercel's dashboard styling
 */
function SkillAvatar({ skill }: { skill: SkillItem }) {
  const name = skill.name.toLowerCase();

  // Next.js & Vercel special brand logos
  if (skill.slug === "devitnang-mis-portfolio" || name.includes("vercel")) {
    return (
      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 border border-slate-800 shadow-2xs">
        <svg className="w-4 h-4 fill-white" viewBox="0 0 75 65">
          <path d="M37.5 0L75 65H0z" />
        </svg>
      </div>
    );
  }

  if (
    skill.slug === "portfolio-nangdevit-v1" ||
    skill.slug === "nang-devit-portfolio" ||
    name.includes("next.js")
  ) {
    return (
      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 border border-slate-800 shadow-2xs">
        <svg className="w-5 h-5 fill-white" viewBox="0 0 180 180">
          <mask
            height="180"
            id={`next-mask-${skill.slug}`}
            maskUnits="userSpaceOnUse"
            width="180"
            x="0"
            y="0"
            style={{ maskType: "alpha" }}
          >
            <circle cx="90" cy="90" fill="black" r="90" />
          </mask>
          <g mask={`url(#next-mask-${skill.slug})`}>
            <circle cx="90" cy="90" fill="black" r="90" />
            <path
              d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
              fill="white"
            />
            <rect fill="white" height="72" width="12" x="115" y="54" />
          </g>
        </svg>
      </div>
    );
  }

  // Card 4 from screenshot: White circle with royal blue monogram 'D'
  if (skill.slug === "portfolio-devitnang") {
    return (
      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-2xs">
        <svg
          className="w-5 h-5 text-[#1A56DB] fill-none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            d="M6 4h6a8 8 0 0 1 8 8 8 8 0 0 1-8 8H6V4z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // Flutter Brand Icon
  if (name.includes("flutter")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#02569B] text-white flex items-center justify-center shrink-0 border border-blue-400/30 shadow-2xs">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M14.314 0L2.3 12 6 15.7 21.684 0zm.014 11.072L7.857 17.53 14.328 24H21.7l-6.471-6.47 6.457-6.458z" />
        </svg>
      </div>
    );
  }

  // C# Icon
  if (name.includes("c#")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#239120] text-white flex items-center justify-center shrink-0 font-bold text-xs tracking-tight border border-green-500/30 shadow-2xs">
        C#
      </div>
    );
  }

  // Oracle Database Icon
  if (name.includes("oracle")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#E51C23] text-white flex items-center justify-center shrink-0 border border-red-500/30 shadow-2xs">
        <Database className="w-5 h-5 text-white" />
      </div>
    );
  }

  // Databases & SQL
  if (
    name.includes("sql") ||
    name.includes("database") ||
    name.includes("postgres") ||
    name.includes("mysql") ||
    name.includes("mongo")
  ) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-900 text-white dark:bg-slate-800 dark:text-blue-400 flex items-center justify-center shrink-0 border border-slate-700 shadow-2xs">
        <Database className="w-4 h-4" />
      </div>
    );
  }

  // Data Analytics & BI
  if (
    name.includes("power bi") ||
    name.includes("excel") ||
    name.includes("analytics")
  ) {
    return (
      <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 border border-amber-400/30 shadow-2xs">
        <BarChart3 className="w-4 h-4 text-white" />
      </div>
    );
  }

  // Git & GitHub
  if (name.includes("git")) {
    return (
      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 border border-slate-800 shadow-2xs">
        <GithubIcon className="w-4 h-4 fill-white" />
      </div>
    );
  }

  // Docker
  if (name.includes("docker")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#2496ED] text-white flex items-center justify-center shrink-0 border border-blue-400/30 shadow-2xs">
        <Box className="w-4 h-4 text-white" />
      </div>
    );
  }

  // Fallback icon inside dark circular avatar
  return (
    <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-800 text-white dark:text-blue-400 flex items-center justify-center shrink-0 border border-slate-700 shadow-2xs">
      <Code className="w-4 h-4" />
    </div>
  );
}

/**
 * Deployment status icon (waveform or checkmark with light-blue progress ring)
 */
function DeploymentStatus({
  status = "ready",
}: {
  status?: "waveform" | "ready";
}) {
  if (status === "waveform") {
    return (
      <div
        title="Active Production Domain"
        className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-900 shadow-2xs"
      >
        <svg
          className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12h4l3-7 4 14 3-7h6" />
        </svg>
      </div>
    );
  }

  return (
    <div
      title="Ready & Deployed"
      className="relative w-6 h-6 flex items-center justify-center"
    >
      {/* Light blue partial progress ring */}
      <svg className="w-6 h-6 -rotate-90 text-sky-400" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="59.7"
          strokeDashoffset="16"
          strokeLinecap="round"
        />
      </svg>
      {/* Checkmark inside */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-2.5 h-2.5 text-slate-700 dark:text-slate-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Vercel-style deployment card for the Grid View
 */
function VercelSkillCard({ skill }: { skill: SkillItem }) {
  const slug =
    skill.slug || skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const domain = skill.domain || `${slug}.vercel.app`;
  const commit =
    skill.commit || "Add Flutter skill, new projects, logo branding, and...";
  const repo = skill.repo || "devitnang/MIS_Portfolio";
  const date = skill.date || "Sep 19";
  const status = skill.status || "ready";

  const repoUrl = repo.startsWith("http")
    ? repo
    : `https://github.com/${repo}`;

  const domainUrl = domain.startsWith("http")
    ? domain
    : `https://${domain}`;

  return (
    <div className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D182E] p-4 sm:p-5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-2xs transition-all flex flex-col justify-between">
      {/* Top Row: Avatar, Title, Domain, Status Indicator, Chevrons */}
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <SkillAvatar skill={skill} />

          <div className="min-w-0 flex-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
              {slug}
            </h4>
            <a
              href={domainUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate block mt-0.5 hover:text-[#0B2046] dark:hover:text-blue-400 hover:underline transition-colors"
            >
              {domain}
            </a>
          </div>
        </div>

        {/* Right Status Indicator & Selector Chevrons */}
        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
          <DeploymentStatus status={status} />
          <ChevronsUpDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        </div>
      </div>

      {/* Middle Row: Commit message with Git commit symbol -o- */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 min-w-0">
        <svg
          className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <circle cx="8" cy="8" r="2.5" />
          <line x1="0" y1="8" x2="5.5" y2="8" />
          <line x1="10.5" y1="8" x2="16" y2="8" />
        </svg>

        <p
          className="text-xs sm:text-[13px] font-medium text-slate-800 dark:text-slate-200 truncate min-w-0"
          title={commit}
        >
          {commit}
        </p>
      </div>

      {/* Bottom Row: GitHub repo & date */}
      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono min-w-0">
        <GithubIcon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate min-w-0 hover:text-[#0B2046] dark:hover:text-blue-400 hover:underline transition-colors"
        >
          {repo}
        </a>
        <span className="text-slate-400 shrink-0">·</span>
        <span className="shrink-0">{date}</span>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
      case "Code2":
        return <Code className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Database":
      case "Table":
        return <Database className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Smartphone":
        return <Smartphone className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Globe":
      case "Boxes":
        return <Globe className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Palette":
        return <Palette className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Server":
      case "HardDrive":
        return <Server className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "BarChart3":
      case "PieChart":
        return <BarChart3 className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "GitBranch":
        return <GitBranch className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Cloud":
        return <Cloud className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Box":
        return <Box className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Send":
        return <Send className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Terminal":
      case "Cpu":
        return <Terminal className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      default:
        return <Layers className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
    }
  };

  const filteredCategories = skillCategories
    .map((category) => {
      const filteredSkills = category.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
          (skill.slug &&
            skill.slug.toLowerCase().includes(searchQuery.toLowerCase().trim())) ||
          (skill.commit &&
            skill.commit.toLowerCase().includes(searchQuery.toLowerCase().trim()))
      );
      return {
        ...category,
        skills: filteredSkills,
      };
    })
    .filter((category) => {
      if (selectedCategory !== "all" && category.id !== selectedCategory) {
        return false;
      }
      return category.skills.length > 0;
    });

  const totalFilteredSkills = filteredCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  const categoryOptions: CategoryOption[] = [
    { id: "all", label: "All Skills", count: totalSkills },
    ...skillCategories.map((c) => ({
      id: c.id,
      label: c.title,
      count: c.skills.length,
    })),
  ];

  const handleReset = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  return (
    <section
      id="skills"
      className="py-16 md:py-24 bg-white dark:bg-[#080F1E] border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Competencies"
          title="Skills & Technologies"
          subtitle="A comprehensive inventory of programming languages, enterprise database systems, frameworks, analytics tools, and deployment environments."
        />

        {/* Search, Filter & View Controls Toolbar */}
        <div className="mb-10 max-w-5xl mx-auto">
          <SearchFilterToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search Skills (e.g. Flutter, C#, SQL, Next.js, Oracle)..."
            categories={categoryOptions}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            idPrefix="skills"
          />

          {/* Active Filter Info / Reset */}
          {(selectedCategory !== "all" || searchQuery.trim()) && (
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                Showing{" "}
                <strong className="text-[#0B2046] dark:text-blue-300">
                  {totalFilteredSkills}
                </strong>{" "}
                skills in{" "}
                <strong className="text-[#0B2046] dark:text-blue-300">
                  {filteredCategories.length}
                </strong>{" "}
                categories
              </span>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B2046] dark:text-blue-400 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Skills View (List: Clean Line-Divided Table, Grid: Vercel Cards Layout) */}
        {filteredCategories.length > 0 ? (
          viewMode === "list" ? (
            <div className="divide-y divide-slate-200 dark:divide-slate-800 max-w-5xl mx-auto">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="py-8 first:pt-2 last:pb-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-colors"
                >
                  {/* Category Header Column (Left) */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#0B2046] dark:text-white uppercase tracking-wider">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {cat.skills.length}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                      {cat.description}
                    </p>
                  </div>

                  {/* Skills List Column (Right) */}
                  <div className="lg:col-span-8 flex flex-wrap gap-2.5 items-center">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          skill.highlight
                            ? "bg-slate-50 dark:bg-slate-900 border-b-2 border-[#0B2046] dark:border-blue-400 text-slate-900 dark:text-white"
                            : "bg-slate-50/70 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {getSkillIcon(skill.iconName)}
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                            ({skill.level})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-10 max-w-5xl mx-auto">
              {filteredCategories.map((cat) => (
                <div key={cat.id} className="space-y-4">
                  {/* Category Section Header */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-sm font-bold text-[#0B2046] dark:text-blue-300 uppercase tracking-wider">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {cat.skills.length}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline max-w-md text-right truncate">
                      {cat.description}
                    </p>
                  </div>

                  {/* 2-Column Vercel Card Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {cat.skills.map((skill) => (
                      <VercelSkillCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="max-w-md mx-auto text-center py-12 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
            <Filter className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No skills found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={handleReset}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-[#0B2046] text-white hover:bg-[#07152E] dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
