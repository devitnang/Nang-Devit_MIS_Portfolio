"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { projects } from "@/data/projectsData";
import { Project } from "@/types";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ExternalLink,
  ChevronRight,
  Maximize2,
  Calendar,
  Code2,
  FileText,
} from "lucide-react";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    "All",
    "System Analysis",
    "Data Analytics",
    "Software Development",
    "Mobile Application",
  ];

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
          subtitle="Explore academic, enterprise, and personal software engineering projects encompassing systems analysis, multi-relational database design, and cross-platform applications."
        />

        {/* Category Tabs */}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const primaryImage =
              project.images && project.images.length > 0
                ? project.images[0]
                : null;

            return (
              <div
                key={project.id}
                className="group rounded-xl bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Container with Zoom/Modal trigger */}
                  <div
                    onClick={() => setActiveModalProject(project)}
                    className="relative aspect-16/10 bg-slate-900 overflow-hidden cursor-pointer group/img"
                  >
                    {primaryImage ? (
                      <Image
                        src={primaryImage.url}
                        alt={primaryImage.alt || project.title}
                        fill
                        className="object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <Code2 className="w-10 h-10" />
                      </div>
                    )}

                    {/* Category Badge overlay */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-[#0B2046]/90 text-white backdrop-blur-xs border border-white/10">
                      {project.category}
                    </div>

                    {/* Screenshot Count Overlay */}
                    {project.images && project.images.length > 1 && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-white backdrop-blur-xs border border-white/10 flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />
                        <span>{project.images.length} Views</span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0B2046]/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="px-3 py-1.5 rounded-md bg-white text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-md">
                        <Maximize2 className="w-3.5 h-3.5 text-[#0B2046]" />
                        View Gallery
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {project.year}
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
                        {project.role}
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="text-lg font-bold text-[#0B2046] dark:text-white mb-2.5 line-clamp-2 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer transition-colors"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2046] dark:text-blue-400 hover:underline transition-colors cursor-pointer"
                  >
                    <span>Details & Screenshots</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.documentationUrl && (
                      <a
                        href={project.documentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-[#0B2046] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                        title="Read Architecture Documentation (PDF)"
                      >
                        <FileText className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        title="View GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-[#0B2046] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                        title="Open Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
