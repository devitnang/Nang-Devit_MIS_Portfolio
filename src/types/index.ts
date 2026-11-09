export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}

export interface SkillItem {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Proficient";
  iconName: string;
  highlight?: boolean;
  slug?: string;
  domain?: string;
  commit?: string;
  repo?: string;
  date?: string;
  status?: "waveform" | "ready";
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface ProjectImage {
  url: string;
  caption: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  category: "System Analysis" | "Software Development" | "Data Analytics" | "Mobile Application" | "Enterprise Systems";
  featured: boolean;
  status?: "Completed" | "In Progress" | "Experimental";
  shortDescription: string;
  fullDescription: string;
  role: string;
  keyFeatures: string[];
  technologies: {
    name: string;
    icon?: string;
  }[];
  images: ProjectImage[];
  githubUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  teamMembers?: string[];
  year: string;
  clientOrOrg?: string;
  problemStatement?: string;
  objectives?: string[];
  systemArchitecture?: string;
  databaseDesign?: string;
  challengesAndSolutions?: {
    challenge: string;
    solution: string;
  }[];
  contributions?: string[];
}

export interface Experience {
  id: string;
  organization: string;
  position: string;
  location: string;
  year: string;
  period: string;
  logo: string;
  type: "Professional" | "Organizational" | "Academic";
  responsibilities: string[];
  skillsApplied: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  major: string;
  period: string;
  year: string;
  location: string;
  logo: string;
  description: string;
  coreCourses: string[];
  highlights: string[];
  courseImage?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

