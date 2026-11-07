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
  Cpu,
  Image as ImageIcon,
  PenTool,
  Video,
  Film,
  Scissors,
  FileSpreadsheet,
  FileText,
  Table,
  Presentation,
} from "lucide-react";

/**
 * Renders the circular avatar icon for a skill, matching Vercel's dashboard styling
 */
function SkillAvatar({ skill }: { skill: SkillItem }) {
  const name = skill.name.toLowerCase();

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

  // Dart Icon
  if (name.includes("dart")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#0175C2] text-white flex items-center justify-center shrink-0 border border-cyan-400/30 shadow-2xs">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M4.105 4.105L12.5 0l7.395 3.553L4.105 19.895V4.105zm15.79 3.552L12.5 24l-3.553-7.395L20.895 4.105l-1 3.552z" />
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

  // SQL Server Icon
  if (name.includes("sql server")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#CC292B] text-white flex items-center justify-center shrink-0 border border-red-400/30 shadow-2xs">
        <Server className="w-4 h-4 text-white" />
      </div>
    );
  }

  // MySQL Icon
  if (name.includes("mysql")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#00758F] text-white flex items-center justify-center shrink-0 border border-cyan-400/30 shadow-2xs">
        <Database className="w-4 h-4 text-white" />
      </div>
    );
  }

  // MongoDB Icon
  if (name.includes("mongodb")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#13AA52] text-white flex items-center justify-center shrink-0 border border-emerald-400/30 shadow-2xs">
        <Database className="w-4 h-4 text-white" />
      </div>
    );
  }

  // GitHub Icon
  if (name.includes("git")) {
    return (
      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 border border-slate-800 shadow-2xs">
        <GithubIcon className="w-4 h-4 fill-white" />
      </div>
    );
  }

  // Figma Icon
  if (name.includes("figma")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center shrink-0 border border-slate-700 shadow-2xs">
        <svg className="w-5 h-5" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      </div>
    );
  }

  // Adobe Photoshop
  if (name.includes("photoshop")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#001E36] text-[#31A8FF] flex items-center justify-center shrink-0 font-extrabold text-sm border border-[#31A8FF]/40 shadow-2xs">
        Ps
      </div>
    );
  }

  // Adobe Illustrator
  if (name.includes("illustrator")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#330000] text-[#FF9A00] flex items-center justify-center shrink-0 font-extrabold text-sm border border-[#FF9A00]/40 shadow-2xs">
        Ai
      </div>
    );
  }

  // Adobe Premiere Pro
  if (name.includes("premiere")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#00005B] text-[#9999FF] flex items-center justify-center shrink-0 font-extrabold text-sm border border-[#9999FF]/40 shadow-2xs">
        Pr
      </div>
    );
  }

  // Adobe After Effects
  if (name.includes("after effect")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#00005B] text-[#CF96FD] flex items-center justify-center shrink-0 font-extrabold text-sm border border-[#CF96FD]/40 shadow-2xs">
        Ae
      </div>
    );
  }

  // CapCut
  if (name.includes("capcut") || name.includes("cupcut")) {
    return (
      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 border border-slate-700 shadow-2xs">
        <Scissors className="w-4 h-4 text-white" />
      </div>
    );
  }

  // Microsoft Office
  if (name.includes("microsoft office") || name.includes("office")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#D83B01] text-white flex items-center justify-center shrink-0 border border-orange-400/30 shadow-2xs">
        <FileSpreadsheet className="w-4 h-4 text-white" />
      </div>
    );
  }

  // Google Docs
  if (name.includes("docs")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#4285F4] text-white flex items-center justify-center shrink-0 border border-blue-300/40 shadow-2xs">
        <FileText className="w-4 h-4 text-white" />
      </div>
    );
  }

  // Google Sheets
  if (name.includes("sheets")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#0F9D58] text-white flex items-center justify-center shrink-0 border border-emerald-300/40 shadow-2xs">
        <Table className="w-4 h-4 text-white" />
      </div>
    );
  }

  // Google Slides
  if (name.includes("slides")) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#F4B400] text-white flex items-center justify-center shrink-0 border border-amber-300/40 shadow-2xs">
        <Presentation className="w-4 h-4 text-white" />
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
        title="Active Production Deployment"
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
      case "Cpu":
        return <Cpu className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Smartphone":
        return <Smartphone className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Database":
        return <Database className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Server":
        return <Server className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Table":
        return <Table className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "GitBranch":
        return <GitBranch className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Palette":
        return <Palette className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Image":
        return <ImageIcon className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "PenTool":
        return <PenTool className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Video":
        return <Video className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Film":
        return <Film className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Scissors":
        return <Scissors className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "FileSpreadsheet":
      case "Sheet":
        return <FileSpreadsheet className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "FileText":
        return <FileText className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
      case "Presentation":
        return <Presentation className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />;
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
          subtitle="A verified inventory of programming languages, frameworks, enterprise database management systems, developer tools, design software, and productivity suites."
        />

        {/* Search, Filter & View Controls Toolbar */}
        <div className="mb-10 max-w-5xl mx-auto">
          <SearchFilterToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search Skills (e.g. Flutter, C#, Oracle, Figma, Photoshop)..."
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
