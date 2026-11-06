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
      className="py-16 md:py-24 bg-white dark:bg-[#080F1E] border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Competencies"
          title="Skills & Technologies"
          subtitle="A comprehensive inventory of programming languages, enterprise database systems, frameworks, analytics tools, and deployment environments."
        />

        {/* Minimalist Filter & Search Toolbar (Line-based, no bulky outer card) */}
        <div className="mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Category Dropdown */}
            <div className="relative w-full sm:w-72 md:w-80">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Filter className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />
                </div>
                <select
                  id="categoryFilter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-[#0B2046] dark:hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-[#0B2046] dark:focus:ring-blue-400 transition-colors cursor-pointer appearance-none"
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
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 hover:border-[#0B2046] dark:hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-[#0B2046] dark:focus:ring-blue-400 transition-colors"
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

            {/* Reset Button */}
            {isFiltered && (
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-300 dark:border-slate-700 shrink-0"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Active Status Info */}
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
            {selectedCategory !== "all" && (
              <span className="font-mono text-[11px] text-[#0B2046] dark:text-blue-300">
                Category:{" "}
                {skillCategories.find((c) => c.id === selectedCategory)?.title}
              </span>
            )}
          </div>
        </div>

        {/* Clean Line-Based Table Layout (No Outer Box, only horizontal rule lines) */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
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

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 border-t border-b border-slate-200 dark:border-slate-800">
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
