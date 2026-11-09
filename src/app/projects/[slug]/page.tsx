import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { projects } from "@/data/projectsData";
import {
  AlertCircle,
  CheckCircle2,
  Network,
  Database,
  Award,
  Users,
  Building,
  Layers,
  Calendar,
  Sparkles,
  FileCheck2,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

      <main className="flex-1 py-8 sm:py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* 1. Project Header & Breadcrumbs */}
          <ProjectHeader project={project} />

          {/* 2. Interactive Screenshot Gallery & Fullscreen Lightbox */}
          <ProjectGallery images={project.images} projectTitle={project.title} />

          {/* 3. Project Overview & Context Card */}
          <section aria-labelledby="project-overview-heading" className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Sparkles className="w-5 h-5 text-[#0B2046] dark:text-blue-400" />
              <h2
                id="project-overview-heading"
                className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0B2046] dark:text-white"
              >
                Project Overview & Background
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {project.fullDescription || project.shortDescription}
            </p>

            {/* Quick Facts Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    My Role
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {project.role}
                  </span>
                </div>
              </div>

              {project.clientOrOrg && (
                <div className="flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                      Organization / Academic Context
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {project.clientOrOrg}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Timeline
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {project.year} ({project.status || "Completed"})
                  </span>
                </div>
              </div>

              {project.teamMembers && project.teamMembers.length > 0 && (
                <div className="flex items-start gap-2.5 sm:col-span-2 md:col-span-3 pt-2 sm:pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                  <Users className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                      Project Collaborators
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {project.teamMembers.join(" • ")}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Problem Statement Callout */}
            {project.problemStatement && (
              <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                    Problem Statement
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>
            )}

            {/* Project Objectives */}
            {project.objectives && project.objectives.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200">
                  Project Objectives & Milestones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                  {project.objectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 4. Key Features & Specifications */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <section aria-labelledby="key-features-heading" className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <FileCheck2 className="w-5 h-5 text-[#0B2046] dark:text-blue-400" />
                <h2
                  id="key-features-heading"
                  className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0B2046] dark:text-white"
                >
                  Key Features & System Capabilities
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {project.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-sm transition-all flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0B2046] dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. Technical Details: Architecture, Database & Engineering */}
          {(project.systemArchitecture ||
            project.databaseDesign ||
            (project.challengesAndSolutions && project.challengesAndSolutions.length > 0)) && (
            <section aria-labelledby="technical-details-heading" className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <Network className="w-5 h-5 text-[#0B2046] dark:text-blue-400" />
                <h2
                  id="technical-details-heading"
                  className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0B2046] dark:text-white"
                >
                  Technical Architecture & Engineering Details
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {/* System Architecture */}
                {project.systemArchitecture && (
                  <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0" />
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200">
                        System Architecture & Structural Flow
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {project.systemArchitecture}
                    </p>
                  </div>
                )}

                {/* Database Design */}
                {project.databaseDesign && (
                  <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0" />
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200">
                        Database Schema & Data Model
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {project.databaseDesign}
                    </p>
                  </div>
                )}

                {/* Challenges & Solutions */}
                {project.challengesAndSolutions && project.challengesAndSolutions.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B2046] dark:text-slate-200">
                      Challenges & Engineering Solutions
                    </h3>
                    <div className="space-y-3">
                      {project.challengesAndSolutions.map((cs, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 space-y-2 text-xs sm:text-sm"
                        >
                          <div className="flex items-start gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 shrink-0">
                              Challenge
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                              {cs.challenge}
                            </span>
                          </div>
                          <div className="flex items-start gap-2 pl-3 border-l-2 border-emerald-500 dark:border-emerald-400">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shrink-0">
                              Solution
                            </span>
                            <span className="text-slate-600 dark:text-slate-300">
                              {cs.solution}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 6. My Contributions & Responsibilities */}
          {project.contributions && project.contributions.length > 0 && (
            <section aria-labelledby="contributions-heading" className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <Award className="w-5 h-5 text-[#0B2046] dark:text-blue-400" />
                <h2
                  id="contributions-heading"
                  className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0B2046] dark:text-white"
                >
                  My Contributions & Responsibilities
                </h2>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  As the <span className="text-[#0B2046] dark:text-blue-300 font-bold">{project.role}</span>, I led and executed the following core technical deliverables:
                </p>
                <ul className="space-y-2.5">
                  {project.contributions.map((c, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* 7. Related Projects */}
          <RelatedProjects currentProjectId={project.id} allProjects={projects} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

