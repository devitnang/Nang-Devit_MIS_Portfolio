"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelatedProjectsProps {
  currentProjectId: string;
  allProjects: Project[];
}

export function RelatedProjects({
  currentProjectId,
  allProjects,
}: RelatedProjectsProps) {
  const current = allProjects.find((p) => p.id === currentProjectId);
  if (!current) return null;

  // Filter: Same category first, then others, excluding current, take up to 3
  const sameCategory = allProjects.filter(
    (p) => p.id !== currentProjectId && p.category === current.category
  );
  const others = allProjects.filter(
    (p) => p.id !== currentProjectId && p.category !== current.category
  );
  const recommended = [...sameCategory, ...others].slice(0, 3);

  if (recommended.length === 0) return null;

  return (
    <section aria-label="Related Projects" className="pt-12 border-t border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B2046] dark:text-blue-400">
            Keep Exploring
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2046] dark:text-white">
            Related Projects
          </h2>
        </div>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2046] dark:text-blue-400 hover:underline"
        >
          <span>View All {allProjects.length} Projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {recommended.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group rounded-xl bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative aspect-16/10 w-full bg-slate-900 overflow-hidden">
                {project.images && project.images[0] ? (
                  <Image
                    src={project.images[0].url}
                    alt={project.images[0].alt || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500 text-xs">
                    No image
                  </div>
                )}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0B2046]/90 text-white backdrop-blur-xs">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.year}
                  </span>
                  {project.status && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-semibold",
                        project.status === "Completed"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-amber-600 dark:text-amber-400"
                      )}
                    >
                      • {project.status}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-[#0B2046] dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#0B2046] dark:text-blue-400">
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
