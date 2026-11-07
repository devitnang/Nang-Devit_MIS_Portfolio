"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projectsData";
import { Project } from "@/types";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const availableCategories = Array.from(new Set(projects.map((p) => p.category)));
  const categories = availableCategories.length > 1 ? ["All", ...availableCategories] : [];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-white dark:bg-[#080F1E] border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Portfolio Showcase"
          title="Featured Projects"
          subtitle="Explore mobile application engineering projects developed with Flutter and Dart, featuring modular architectures, reactive state management, comprehensive UI flows, and official technical documentation."
        />

        {/* Category Tabs (if more than 1 category exists) */}
        {categories.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0B2046] dark:bg-blue-600 text-white shadow-2xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid with Interactive Slidable Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={setActiveModalProject}
            />
          ))}
        </div>

        {/* Project Modal for Image Gallery & Full Details */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
