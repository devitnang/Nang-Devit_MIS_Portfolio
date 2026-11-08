"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  SearchFilterToolbar,
  CategoryOption,
} from "@/components/ui/SearchFilterToolbar";
import { skillCategories } from "@/data/skillsData";
import { SkillItem } from "@/types";
import { GithubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { Parallax, ParallaxBackground } from "@/components/ui/Parallax";
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
 * Renders the brand app tile icon for a skill
 */
function SkillAvatar({ skill }: { skill: SkillItem }) {
  const name = skill.name.toLowerCase();

  // Flutter Brand Icon
  if (name.includes("flutter")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#02569B] text-white flex items-center justify-center shrink-0 border border-blue-400/30 shadow-2xs">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
          <path d="M14.314 0L2.3 12 6 15.7 21.684 0zm.014 11.072L7.857 17.53 14.328 24H21.7l-6.471-6.47 6.457-6.458z" />
        </svg>
      </div>
    );
  }

  // Dart Icon
  if (name.includes("dart")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#0175C2] text-white flex items-center justify-center shrink-0 border border-cyan-400/30 shadow-2xs">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
          <path d="M4.105 4.105L12.5 0l7.395 3.553L4.105 19.895V4.105zm15.79 3.552L12.5 24l-3.553-7.395L20.895 4.105l-1 3.552z" />
        </svg>
      </div>
    );
  }

  // C# Icon
  if (name.includes("c#")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#239120] text-white flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm tracking-tight border border-green-500/30 shadow-2xs">
        C#
      </div>
    );
  }

  // Oracle Database Icon
  if (name.includes("oracle")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#E51C23] text-white flex items-center justify-center shrink-0 border border-red-500/30 shadow-2xs">
        <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
    );
  }

  // SQL Server Icon
  if (name.includes("sql server")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#CC292B] text-white flex items-center justify-center shrink-0 border border-red-400/30 shadow-2xs">
        <Server className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
    );
  }

  // MySQL Icon
  if (name.includes("mysql")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#00758F] text-white flex items-center justify-center shrink-0 border border-cyan-400/30 shadow-2xs">
        <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
    );
  }

  // MongoDB Icon
  if (name.includes("mongodb")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#13AA52] text-white flex items-center justify-center shrink-0 border border-emerald-400/30 shadow-2xs">
        <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
    );
  }

  // GitHub Icon
  if (name.includes("git")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#181717] dark:bg-[#24292E] text-white flex items-center justify-center shrink-0 border border-slate-700 shadow-2xs">
        <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
      </div>
    );
  }

  // Figma Icon
  if (name.includes("figma")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#1E1E1E] text-white flex items-center justify-center shrink-0 border border-slate-700 shadow-2xs">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 38 57" fill="none">
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
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#001E36] text-[#31A8FF] flex items-center justify-center shrink-0 font-extrabold text-xs sm:text-base border border-[#31A8FF]/40 shadow-2xs">
        Ps
      </div>
    );
  }

  // Adobe Illustrator
  if (name.includes("illustrator")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#330000] text-[#FF9A00] flex items-center justify-center shrink-0 font-extrabold text-xs sm:text-base border border-[#FF9A00]/40 shadow-2xs">
        Ai
      </div>
    );
  }

  // Adobe Premiere Pro
  if (name.includes("premiere")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#00005B] text-[#9999FF] flex items-center justify-center shrink-0 font-extrabold text-xs sm:text-base border border-[#9999FF]/40 shadow-2xs">
        Pr
      </div>
    );
  }

  // Adobe After Effects
  if (name.includes("after effect")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#00005B] text-[#CF96FD] flex items-center justify-center shrink-0 font-extrabold text-xs sm:text-base border border-[#CF96FD]/40 shadow-2xs">
        Ae
      </div>
    );
  }

  // CapCut
  if (name.includes("capcut") || name.includes("cupcut")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-black text-white flex items-center justify-center shrink-0 border border-slate-700 shadow-2xs">
        <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
    );
  }

  // Microsoft Office
  if (name.includes("microsoft office") || name.includes("office")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#D83B01] text-white flex items-center justify-center shrink-0 border border-orange-400/30 shadow-2xs">
        <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
    );
  }

  // Google Docs
  if (name.includes("docs")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#4285F4] text-white flex items-center justify-center shrink-0 border border-blue-300/40 shadow-2xs">
        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
    );
  }

  // Google Sheets
  if (name.includes("sheets")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#0F9D58] text-white flex items-center justify-center shrink-0 border border-emerald-300/40 shadow-2xs">
        <Table className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
    );
  }

  // Google Slides
  if (name.includes("slides")) {
    return (
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#F4B400] text-white flex items-center justify-center shrink-0 border border-amber-300/40 shadow-2xs">
        <Presentation className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
    );
  }

  // Fallback icon inside dark square tile
  return (
    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#0B2046] text-white dark:text-blue-400 flex items-center justify-center shrink-0 border border-slate-700 shadow-2xs">
      <Code className="w-4 h-4 sm:w-5 sm:h-5" />
    </div>
  );
}

/**
 * Real-world practical application descriptions for each skill
 */
function getSkillDescription(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("c#")) {
    return "Enterprise OOP business logic, LINQ queries, Windows desktop applications, and structured .NET architecture.";
  }
  if (n.includes("dart")) {
    return "Reactive stateful logic, asynchronous streams, event handling, and cross-platform widget architectures.";
  }
  if (n.includes("flutter")) {
    return "Cross-platform mobile development with Provider state management, RESTful APIs, responsive layouts, and native UI flows.";
  }
  if (n.includes("oracle")) {
    return "Enterprise 3NF relational schemas, PL/SQL stored packages, triggers, transaction management, and database administration.";
  }
  if (n.includes("sql server")) {
    return "Relational database modeling, complex SQL queries, stored procedures, indexed views, and transactional constraints.";
  }
  if (n.includes("mysql")) {
    return "Normalized tables, foreign key constraints, relational queries, and ACID-compliant persistence for academic & full-stack systems.";
  }
  if (n.includes("mongodb")) {
    return "Document schema validation, JSON data structures, aggregation pipelines, and scalable NoSQL database storage.";
  }
  if (n.includes("git")) {
    return "Git version control, collaborative branch workflows, pull request reviews, repository management, and continuous delivery.";
  }
  if (n.includes("figma")) {
    return "User experience design, interactive wireframing, high-fidelity mobile prototypes, and design component libraries.";
  }
  if (n.includes("photoshop")) {
    return "High-resolution digital graphics composition, UI asset creation, image retouching, and marketing visual materials.";
  }
  if (n.includes("illustrator")) {
    return "Precision vector artwork, custom iconography, corporate logos, and scalable branding graphics.";
  }
  if (n.includes("premiere")) {
    return "Multi-track audio-visual timeline editing, color grading, sequence pacing, and dynamic promotional video production.";
  }
  if (n.includes("after effect")) {
    return "Keyframed motion graphics, dynamic title animations, visual effects, and UI interaction presentations.";
  }
  if (n.includes("capcut") || n.includes("cupcut")) {
    return "Agile mobile video editing, short-form presentation reels, dynamic captions, and fast-turnaround video content.";
  }
  if (n.includes("office")) {
    return "Comprehensive enterprise documentation (Word), structured workbook analytics (Excel), and executive presentations (PowerPoint).";
  }
  if (n.includes("docs")) {
    return "Cloud-collaborative technical documentation, systems analysis specifications, and academic capstone deliverables.";
  }
  if (n.includes("sheets")) {
    return "Analytical data modeling, mathematical formulations, pivot tables, and automated reporting dashboards.";
  }
  if (n.includes("slides")) {
    return "Structured system architecture slide decks, coursework defenses, and executive project presentations.";
  }
  return "Practical technical application, system architecture, and coursework implementation at SETEC Institute.";
}

/**
 * Returns clean category sub-label
 */
function getSkillCategoryTag(categoryTitle: string): string {
  const c = categoryTitle.toLowerCase();
  if (c.includes("programming")) return "Programming Language";
  if (c.includes("framework")) return "Mobile Framework";
  if (c.includes("database")) return "Database Management";
  if (c.includes("tools")) return "Developer Tool";
  if (c.includes("design")) return "Design & Multimedia";
  if (c.includes("office")) return "Productivity Suite";
  return "Core Competency";
}

/**
 * Professional Skill Card matching the website's clean enterprise design
 */
function SkillCard({
  skill,
  categoryTitle,
}: {
  skill: SkillItem;
  categoryTitle: string;
}) {
  const description = getSkillDescription(skill.name);
  const tag = getSkillCategoryTag(categoryTitle);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#0D182E]/95 p-3 sm:p-5 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between backdrop-blur-xs">
      <div>
        {/* Top Row: Brand App Tile Icon & Proficiency Pill */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-3 mb-2.5 sm:mb-4">
          <div className="transition-transform duration-200 group-hover:scale-105">
            <SkillAvatar skill={skill} />
          </div>

          <span
            className={cn(
              "text-[9px] sm:text-[11px] font-semibold px-1.5 sm:px-2.5 py-0.5 rounded-full border tracking-wide shrink-0 transition-colors",
              skill.level === "Advanced"
                ? "bg-blue-50 dark:bg-blue-950/60 text-[#0B2046] dark:text-blue-300 border-blue-200 dark:border-blue-800/80 group-hover:border-blue-400/50"
                : "bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
            )}
          >
            {skill.level}
          </span>
        </div>

        {/* Skill Name */}
        <h4 className="text-xs sm:text-base font-bold text-[#0B2046] dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-1 sm:line-clamp-none">
          {skill.name}
        </h4>

        {/* Competency Description */}
        <p className="text-[10px] sm:text-[13px] text-slate-600 dark:text-slate-300 leading-snug sm:leading-relaxed mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-3">
          {description}
        </p>
      </div>

      {/* Card Footer: Category Tag & Core Competency Badge */}
      <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] gap-1">
        <span className="font-medium text-slate-500 dark:text-slate-400 truncate text-[9px] sm:text-[11px]">
          {tag}
        </span>

        {skill.highlight && (
          <span className="inline-flex items-center gap-1 font-semibold text-[#0B2046] dark:text-blue-400 shrink-0 text-[9px] sm:text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="hidden sm:inline">Core Stack</span>
            <span className="sm:hidden">Core</span>
          </span>
        )}
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
      className="relative py-16 md:py-24 bg-white dark:bg-[#080F1E] border-b border-slate-200 dark:border-slate-800 transition-colors overflow-hidden"
    >
      {/* Ambient Parallax Multi-Plane Depth Background */}
      <ParallaxBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Technical Competencies"
            title="Skills & Technologies"
            subtitle="A verified inventory of programming languages, frameworks, enterprise database management systems, developer tools, design software, and productivity suites."
          />
        </ScrollReveal>

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

        {/* Skills View Container */}
        <div>

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
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${skill.highlight
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
                {filteredCategories.map((cat, catIdx) => (
                  <ScrollReveal
                    key={cat.id}
                    animation="fade-up"
                    delay={catIdx * 60}
                    className="space-y-4"
                  >
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

                    {/* Modern Enterprise Skill Card Grid (2 cards per row on mobile, 3 on large screens) */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
                      {cat.skills.map((skill) => (
                        <SkillCard
                          key={skill.name}
                          skill={skill}
                          categoryTitle={cat.title}
                        />
                      ))}
                    </div>
                  </ScrollReveal>
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
      </div>
    </section>
  );
}
