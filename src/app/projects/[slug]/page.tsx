import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { projects } from "@/data/projectsData";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ArrowLeft,
  ChevronRight,
  Home,
  CheckCircle2,
  ExternalLink,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Next.js 16 Route Segment Config: allow blocking route for dynamic project slug segment
export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found | Nang Devit",
      description: "The requested project case study could not be found.",
    };
  }

  const title = `${project.title} | Nang Devit Case Study`;
  const description = project.shortDescription;
  const ogImage = project.images[0]?.url || "/assets/images/logo/mylogo.png";
  const url = `https://www.nangdevit.xyz/projects/${project.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Nang Devit Portfolio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#080F1E] text-slate-900 dark:text-slate-100 transition-colors">
      <ScrollProgressBar />
      <Navbar />

      <main className="flex-1 py-6 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-12">
          {/* Top Navigation: Breadcrumbs & Back to Projects Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
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
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2046] dark:text-blue-400 hover:underline transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </Link>
          </div>

          {/* 2-Column Clean Layout: Image Left, Details Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column: Image Gallery (sticky on desktop) */}
            <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-24 space-y-4">
              <ProjectGallery images={project.images} projectTitle={project.title} />
            </div>

            {/* Right Column: Project Details & In-Line Table */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-7">
              {/* Header: Badges & Title */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 text-[#0B2046] dark:text-blue-300">
                    {project.category}
                  </span>

                  {project.status && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold",
                        project.status === "Completed"
                          ? "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50"
                          : project.status === "In Progress"
                          ? "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50"
                          : "text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50"
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          project.status === "Completed"
                            ? "bg-emerald-500"
                            : project.status === "In Progress"
                            ? "bg-amber-500"
                            : "bg-purple-500"
                        )}
                      />
                      {project.status}
                    </span>
                  )}

                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    • {project.year}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2046] dark:text-white leading-tight">
                  {project.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {project.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#0B2046] hover:bg-[#07152E] dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-all shadow-xs cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-xs cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                  </a>
                )}

                {project.documentationUrl && (
                  <a
                    href={project.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all shadow-xs cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400" />
                    <span>Technical Doc (PDF)</span>
                  </a>
                )}
              </div>

              {/* Specifications Table (In-lines only, NO outer box outline) */}
              <div className="border-t border-b border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
                <div className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
                  <span className="font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-32 shrink-0 text-[11px] sm:text-xs">
                    My Role
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100 sm:text-right">
                    {project.role}
                  </span>
                </div>

                {project.clientOrOrg && (
                  <div className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
                    <span className="font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-32 shrink-0 text-[11px] sm:text-xs">
                      Organization
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 sm:text-right">
                      {project.clientOrOrg}
                    </span>
                  </div>
                )}

                <div className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
                  <span className="font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-32 shrink-0 text-[11px] sm:text-xs">
                    Timeline
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 sm:text-right">
                    {project.year} &bull; {project.status || "Completed"}
                  </span>
                </div>

                <div className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
                  <span className="font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-32 shrink-0 text-[11px] sm:text-xs">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1 sm:justify-end">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {project.teamMembers && project.teamMembers.length > 0 && (
                  <div className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
                    <span className="font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-32 shrink-0 text-[11px] sm:text-xs">
                      Team
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 sm:text-right">
                      {project.teamMembers.join(" • ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Background Narrative */}
              {project.fullDescription && project.fullDescription !== project.shortDescription && (
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Project Background & Architecture Overview
                  </h2>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {project.fullDescription}
                  </p>
                </div>
              )}

              {/* Problem Statement (In-lines only) */}
              {project.problemStatement && (
                <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Problem Statement
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {/* Objectives (In-lines only) */}
              {project.objectives && project.objectives.length > 0 && (
                <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                    Project Objectives
                  </h3>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {project.objectives.map((obj, idx) => (
                      <div
                        key={idx}
                        className="py-2 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features (In-lines only, no box outline) */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                    Key Features & Functionalities
                  </h3>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {project.keyFeatures.map((feature, idx) => (
                      <div
                        key={idx}
                        className="py-2.5 flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                      >
                        <span className="font-mono text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0 pt-0.5">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System Architecture & Database Design */}
              {project.systemArchitecture && (
                <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                    System Architecture
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {project.systemArchitecture}
                  </p>
                </div>
              )}

              {project.databaseDesign && (
                <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                    Database Schema & Model
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {project.databaseDesign}
                  </p>
                </div>
              )}

              {/* Challenges & Solutions (In-lines only) */}
              {project.challengesAndSolutions && project.challengesAndSolutions.length > 0 && (
                <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                    Technical Challenges & Implemented Solutions
                  </h3>
                  <div className="divide-y divide-slate-200 dark:divide-slate-800">
                    {project.challengesAndSolutions.map((cs, idx) => (
                      <div key={idx} className="py-3 space-y-1 text-xs sm:text-sm">
                        <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-start gap-2">
                          <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 shrink-0 tracking-wider">
                            Challenge:
                          </span>
                          <span>{cs.challenge}</span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 flex items-start gap-2 pl-3 border-l-2 border-emerald-500">
                          <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 shrink-0 tracking-wider">
                            Solution:
                          </span>
                          <span>{cs.solution}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* My Contributions (In-lines only) */}
              {project.contributions && project.contributions.length > 0 && (
                <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2046] dark:text-blue-400">
                    My Contributions & Responsibilities
                  </h3>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {project.contributions.map((c, idx) => (
                      <div
                        key={idx}
                        className="py-2 flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                      >
                        <span className="text-[#0B2046] dark:text-blue-400 font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Projects Section at Bottom */}
          <RelatedProjects currentProjectId={project.id} allProjects={projects} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
