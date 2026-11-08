"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SearchFilterToolbar, CategoryOption } from "@/components/ui/SearchFilterToolbar";
import { projects } from "@/data/projectsData";
import { Project } from "@/types";
import { RotateCcw } from "lucide-react";
import { ParallaxBackground } from "@/components/ui/Parallax";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Dynamic categories with counts
  const availableCategories = Array.from(new Set(projects.map((p) => p.category)));
  const categoryOptions: CategoryOption[] = [
    { id: "All", label: "All Projects", count: projects.length },
    ...availableCategories.map((cat) => ({
      id: cat,
      label: cat,
      count: projects.filter((p) => p.category === cat).length,
    })),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesTitle = project.title.toLowerCase().includes(query);
    const matchesDesc = project.shortDescription.toLowerCase().includes(query);
    const matchesTech = project.technologies.some((t) =>
      t.name.toLowerCase().includes(query)
    );

    return matchesCategory && (matchesTitle || matchesDesc || matchesTech);
  });

  const handleReset = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <section
      id="projects"
      className="relative py-16 md:py-24 bg-white dark:bg-[#080F1E] border-b border-slate-200 dark:border-slate-800 transition-colors overflow-hidden"
    >
      {/* Ambient Parallax Multi-Plane Depth Background */}
      <ParallaxBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Portfolio Showcase"
            title="Featured Projects"
            subtitle="A curated portfolio of systems analysis specifications, relational database engineering, modern web applications, and cross-platform mobile apps developed with clean architectures."
          />
        </ScrollReveal>

        {/* Search, Filter & View Controls Toolbar */}
        <div className="mb-8 max-w-5xl mx-auto">
          <SearchFilterToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search Projects"
            categories={categoryOptions}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            idPrefix="projects"
          />

          {/* Active Filter Info / Reset */}
          {(selectedCategory !== "All" || searchQuery.trim()) && (
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                Showing{" "}
                <strong className="text-[#0B2046] dark:text-blue-300">
                  {filteredProjects.length}
                </strong>{" "}
                of {projects.length} projects
                {selectedCategory !== "All" && ` in "${selectedCategory}"`}
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

        {/* Projects View (Grid or List - 2 cards in a row on mobile) */}
        {filteredProjects.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
              {filteredProjects.map((project, idx) => (
                <ScrollReveal
                  key={project.id}
                  animation="fade-up"
                  delay={idx * 90}
                >
                  <ProjectCard
                    project={project}
                    onOpenModal={setActiveModalProject}
                    viewMode="grid"
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:flex md:flex-col gap-3 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
              {filteredProjects.map((project, idx) => (
                <ScrollReveal
                  key={project.id}
                  animation="fade-up"
                  delay={idx * 90}
                >
                  <ProjectCard
                    project={project}
                    onOpenModal={setActiveModalProject}
                    viewMode="list"
                  />
                </ScrollReveal>
              ))}
            </div>
          )
        ) : (
          <div className="max-w-md mx-auto text-center py-12 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              No projects matched your search criteria.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-[#0B2046] text-white hover:bg-[#07152E] dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All Projects</span>
            </button>
          </div>
        )}

        {/* More Projects on GitHub Text Link */}
        <div className="mt-8 sm:mt-10 text-center">
          <a
            href="https://github.com/devitnang?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-[#0B2046] dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 underline underline-offset-4 transition-colors"
          >
            More Projects on GitHub...
          </a>
        </div>

        {/* Project Modal for Image Gallery & Full Details */}
        <ProjectModal
          key={activeModalProject?.id ?? "closed"}
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
