"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  SearchFilterToolbar,
  CategoryOption,
} from "@/components/ui/SearchFilterToolbar";
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
  RotateCcw,
  Filter,
} from "lucide-react";

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

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
            placeholder="Search Skills (e.g. C#, Flutter, SQL, Oracle)..."
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

        {/* Skills View (List: Clean Line-Divided Table, Grid: Categorized Cards) */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D182E] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-[#0B2046] dark:text-white uppercase tracking-wider">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {cat.skills.length}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          skill.highlight
                            ? "bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-[#0B2046] dark:text-blue-300"
                            : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {getSkillIcon(skill.iconName)}
                        <span>{skill.name}</span>
                      </div>
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
