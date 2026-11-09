"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/types";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ArrowLeft,
  Calendar,
  Building,
  UserCheck,
  ExternalLink,
  FileText,
  ChevronRight,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="space-y-6">
      {/* Breadcrumb Navigation & Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-[#0B2046] dark:hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href="/#projects"
            className="text-slate-600 dark:text-slate-400 hover:text-[#0B2046] dark:hover:text-white transition-colors"
          >
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-[#0B2046] dark:text-blue-300 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {project.title}
          </span>
        </nav>

        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0B2046] dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Badges & Meta Info Row */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 text-[#0B2046] dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
          {project.category}
        </span>

        {project.status && (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
              project.status === "Completed"
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60"
                : project.status === "In Progress"
                ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60"
                : "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60"
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                project.status === "Completed"
                  ? "bg-emerald-500 animate-pulse"
                  : project.status === "In Progress"
                  ? "bg-amber-500 animate-pulse"
                  : "bg-purple-500"
              )}
            />
            {project.status}
          </span>
        )}

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          {project.year}
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
          <UserCheck className="w-3.5 h-3.5 text-slate-500" />
          {project.role}
        </span>

        {project.clientOrOrg && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
            <Building className="w-3.5 h-3.5 text-slate-500" />
            <span className="truncate max-w-[200px] sm:max-w-none">{project.clientOrOrg}</span>
          </span>
        )}
      </div>

      {/* Main Title */}
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B2046] dark:text-white leading-tight">
        {project.title}
      </h1>

      {/* Short Description */}
      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-4xl text-balance">
        {project.shortDescription}
      </p>

      {/* Action Buttons & Tech Stack Row */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-200/80 dark:border-slate-800">
        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#0B2046] hover:bg-[#07152E] dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Website Demo</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition-all border border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          )}

          {project.documentationUrl && (
            <a
              href={project.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#0B2046] dark:text-blue-400" />
              <span>Technical Documentation (PDF)</span>
            </a>
          )}
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

