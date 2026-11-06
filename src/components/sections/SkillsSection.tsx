"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skillsData";
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
  CheckCircle2,
  Search,
  Filter,
  ChevronDown,
  X,
  RotateCcw,
} from "lucide-react";

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      const filteredSkills = category.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
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

  const isFiltered = selectedCategory !== "all" || searchQuery.trim().length > 0;

  const handleReset = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  return (
    <section
      id="skills"
      className="py-16 md:py-24 bg-slate-50 dark:bg-[#070D19] border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Competencies"
          title="Skills & Technologies"
          subtitle="A comprehensive inventory of programming languages, enterprise database systems, frameworks, analytics tools, and deployment environments."
        />

        {/* Filter and Search Bar: Dropdown + Search Input */}
        <div className="mb-10 p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {/* Dropdown Filter for Category */}
            <div className="relative w-full sm:w-72 md:w-80">
              <label
                htmlFor="categoryFilter"
                className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 sm:hidden"
              >
                Filter by Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Filter className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />
                </div>
                <select
                  id="categoryFilter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-[#0B2046] dark:hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-[#0B2046] dark:focus:ring-blue-400 transition-colors cursor-pointer appearance-none shadow-2xs"
                >
                  <option value="all">All Skill Categories</option>
                  {skillCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label
                htmlFor="skillSearch"
                className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 sm:hidden"
              >
                Search Skills
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />
                </div>
                <input
                  id="skillSearch"
                  type="text"
                  placeholder="Search by skill name (e.g. C#, Flutter, SQL, Oracle)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 hover:border-[#0B2046] dark:hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-[#0B2046] dark:focus:ring-blue-400 transition-colors shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Reset Button (only shown when filtered) */}
            {isFiltered && (
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Active Status Info Bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing{" "}
              <strong className="text-[#0B2046] dark:text-blue-300">
                {totalFilteredSkills}
              </strong>{" "}
              technical skills across{" "}
              <strong className="text-[#0B2046] dark:text-blue-300">
                {filteredCategories.length}
              </strong>{" "}
              categories
            </span>
            {selectedCategory !== "all" && (
              <span className="hidden sm:inline font-mono text-[11px] bg-blue-50 dark:bg-blue-950/60 text-[#0B2046] dark:text-blue-300 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/40">
                Filtered:{" "}
                {skillCategories.find((c) => c.id === selectedCategory)?.title}
              </span>
            )}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-xl bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-[#0B2046]/40 dark:hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-[#0B2046] dark:text-white uppercase tracking-wider">
                    {cat.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {cat.skills.length} Items
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                  {cat.description}
                </p>

                {/* Skill List Badges */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                        skill.highlight
                          ? "bg-slate-50 dark:bg-slate-800/80 border-[#0B2046]/30 dark:border-blue-500/40 text-slate-900 dark:text-white"
                          : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {getSkillIcon(skill.iconName)}
                      <span className="font-semibold">{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Tag */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Verified in Projects
                </span>
                <span className="font-mono text-[10px]">MIS Verified</span>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[#0D182E] rounded-xl border border-slate-200 dark:border-slate-800">
            <Filter className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No skills found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={handleReset}
              className="mt-3 text-xs font-bold text-[#0B2046] dark:text-blue-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
