import { SocialLink } from "@/types";

export const personalInfo = {
  name: "Nang Devit",
  preferredName: "Devit",
  title: "MIS (Management Information Systems)",
  shortTagline: "Bridging business requirements with scalable software architectures and data-driven insights.",
  bio: "A disciplined and detail-oriented System Analyst, Data Analytics enthusiast, and Software Developer with a strong academic foundation in Management Information Systems (MIS) from SETEC Institute. Passionate about designing robust enterprise database architectures, translating complex operational workflows into functional system specifications, and building high-performance web and mobile applications.",
  
  status: "Open for Opportunities",
  location: "Phnom Penh, Cambodia",
  availability: "Full-Time / Contract / Hybrid",
  
  contact: {
    website: "https://www.nangdevit.xyz",
    displayWebsite: "www.nangdevit.xyz",
    phone: "+855 88 885 8249",
    displayPhone: "+855 88 885 8249",
    email: "devit.nang@gmail.com",
    telegramUsername: "nangdevit",
    telegramUrl: "https://t.me/nangdevit",
    linkedinUrl: "https://linkedin.com/in/devitnang",
    githubUrl: "https://github.com/devitnang",
    facebookUrl: "https://facebook.com/devitnang",
  },
  
  assets: {
    avatar: "/assets/images/nangdevit.PNG",
    cv: "/assets/cv/NANGDEVIT__CV.pdf",
    cvFileName: "NANGDEVIT__CV.pdf",
  },
  
  highlights: [
    { label: "Academic Specialization", value: "Management Information Systems (MIS)" },
    { label: "Core Database Expertise", value: "Oracle, MSSQL, PostgreSQL, MySQL" },
    { label: "Key Development Stack", value: "C#, Next.js, Flutter, TypeScript" },
    { label: "Analytical Strengths", value: "System Analysis, Data Modeling, BI" },
  ],

  corePillars: [
    {
      id: "system-analysis",
      title: "System Analysis & Architecture",
      icon: "Workflow",
      badge: "Core Discipline",
      description:
        "Translating complex business processes into structured technical specifications, data flow diagrams (DFD), entity-relationship diagrams (ERD), and enterprise system blueprints.",
      competencies: [
        "Requirement Elicitation & Scope Definition",
        "Business Process Modeling (BPMN / UML)",
        "Database Architecture & Normalization",
        "Enterprise System Integration & Feasibility",
        "User Acceptance Testing (UAT) Planning",
      ],
    },
    {
      id: "data-analytics",
      title: "Data Analytics & Business Intelligence",
      icon: "BarChart3",
      badge: "Data Driven",
      description:
        "Harnessing multi-relational databases, statistical modeling, and analytical reporting to convert operational data into actionable strategic insights.",
      competencies: [
        "Relational & Analytical SQL (Oracle, SQL Server, PostgreSQL)",
        "KPI Dashboard Design & Data Visualization",
        "ETL Pipeline Concepts & Data Cleansing",
        "Business Intelligence Reporting (Power BI, Excel Advanced)",
        "Exploratory Data Analysis & Trend Detection",
      ],
    },
    {
      id: "software-dev",
      title: "Software & Mobile Development",
      icon: "Code2",
      badge: "Engineering",
      description:
        "Building scalable, enterprise-grade software solutions across modern web frameworks and cross-platform mobile platforms with clean, maintainable code.",
      competencies: [
        "Modern Full-Stack Web Development (Next.js, React, Node.js)",
        "Cross-Platform Mobile Apps (Flutter, Dart)",
        "Backend Services & APIs (C#, ASP.NET Core, REST)",
        "Robust Database Connectivity (ORM & Native SQL)",
        "Version Control & Automated Deployment (Git, Vercel)",
      ],
    },
  ],
};

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: personalInfo.contact.linkedinUrl,
    icon: "Linkedin",
    label: "devitnang",
  },
  {
    name: "GitHub",
    url: personalInfo.contact.githubUrl,
    icon: "Github",
    label: "devitnang",
  },
  {
    name: "Telegram",
    url: personalInfo.contact.telegramUrl,
    icon: "Send",
    label: "@nangdevit",
  },
  {
    name: "Email",
    url: `mailto:${personalInfo.contact.email}`,
    icon: "Mail",
    label: personalInfo.contact.email,
  },
  {
    name: "Phone",
    url: `tel:${personalInfo.contact.phone.replace(/\s+/g, "")}`,
    icon: "Phone",
    label: personalInfo.contact.displayPhone,
  },
];

