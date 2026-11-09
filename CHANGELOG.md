# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.5] - 2026-11-09

### Removed
- **Section Heading Subtitles**:
  - Removed the subtitle description from the **Featured Projects** section heading ([`src/components/sections/ProjectsSection.tsx`](file:///d:/SETEC/YEAR4_SEMESTER1/Portfolio/nangdevit_portfolio/src/components/sections/ProjectsSection.tsx)).
  - Removed the subtitle description from the **Skills & Technologies** section heading ([`src/components/sections/SkillsSection.tsx`](file:///d:/SETEC/YEAR4_SEMESTER1/Portfolio/nangdevit_portfolio/src/components/sections/SkillsSection.tsx)).

## [0.3.4] - 2026-11-09

### Changed
- **Featured Projects Mobile List View Redesign**:
  - Refactored List View in `ProjectsSection` ([`src/components/sections/ProjectsSection.tsx`](file:///d:/SETEC/YEAR4_SEMESTER1/Portfolio/nangdevit_portfolio/src/components/sections/ProjectsSection.tsx)) from a 2-column mobile grid to a full-width vertical list stack (`flex flex-col`), matching laptop/tablet behavior.
  - Redesigned `ProjectCard` ([`src/components/ui/ProjectCard.tsx`](file:///d:/SETEC/YEAR4_SEMESTER1/Portfolio/nangdevit_portfolio/src/components/ui/ProjectCard.tsx)) in list mode to maintain a horizontal layout (left image gallery, right details specification) on mobile, tablet, and desktop alike.
  - Preserved the 2-column grid layout specifically for Grid View mode.

## [0.3.3] - 2026-11-09

### Changed
- **Skills & Technologies Card UI Streamlining**:
  - Removed lengthy descriptive paragraphs beneath skill titles in `SkillCard` ([`src/components/sections/SkillsSection.tsx`](file:///d:/SETEC/YEAR4_SEMESTER1/Portfolio/nangdevit_portfolio/src/components/sections/SkillsSection.tsx)).
  - Cleaned up skill cards to present a focused, compact, and balanced layout containing the brand icon, proficiency pill, skill name, category tag, and core stack badge.

## [0.3.2] - 2026-11-09

### Changed
- **Project Catalog Timeline Update**:
  - Standardized the timeline year to `2026` across all portfolio projects in [`src/data/projectsData.ts`](file:///d:/SETEC/YEAR4_SEMESTER1/Portfolio/nangdevit_portfolio/src/data/projectsData.ts).
  - All project detail pages (`/projects/[slug]`), project cards, and related project recommendations now consistently display `2026` across all case studies.

## [0.3.1] - 2026-11-09

### Fixed
- **Next.js 16 Instant Navigation Route Configuration**:
  - Resolved `instant-shell-url-data` validation error in Next.js 16.4.5 Turbopack for `/projects/[slug]` (`src/app/projects/[slug]/page.tsx`).
  - Added route segment configuration `export const instant = false;` to explicitly permit blocking dynamic slug resolution during prefetching and prerendering with `cacheComponents: true` and `partialPrefetching: true`.
  - Maintained full static optimization across all 18 routes (18/18 static pages rendered in 1.1s).

## [0.3.0] - 2026-11-09

### Added
- **Dedicated Multi-Page Project Detail Architecture**:
  - Replaced modal/popup preview windows with dedicated, shareable, dynamic project detail pages at `/projects/[slug]` (`src/app/projects/[slug]/page.tsx`).
  - Pre-rendered static generation via `generateStaticParams()` for all verified portfolio projects.
  - Implemented dynamic SEO metadata generation with OpenGraph cards, Twitter cards, and canonical link attributes.
  - Added interactive breadcrumb navigation (`Home → Projects → Project Name`) and a "Back to Projects" return link.
  - Built `ProjectGallery` (`src/components/projects/ProjectGallery.tsx`) with a high-resolution stage, thumbnail navigation strip, touch-swipe gestures, keyboard shortcuts, and a full-screen lightbox modal for image enlargement.
  - Built `ProjectHeader` (`src/components/projects/ProjectHeader.tsx`) featuring status pills with pulsing indicators, metadata badges, GitHub/Live Demo/PDF documentation links, and tech stack chips.
  - Built `RelatedProjects` (`src/components/projects/RelatedProjects.tsx`) recommending 2-3 relevant projects from the catalog at the bottom of each case study.
  - Added redirect route from `/projects` to `/#projects` (`src/app/projects/page.tsx`).
  - Updated `sitemap.ts` to dynamically include individual project detail URLs.

### Changed
- Refactored `ProjectCard` (`src/components/ui/ProjectCard.tsx`) so card clicks, titles, and "View Details" buttons route directly to `/projects/[slug]`.
- Updated `Navbar` (`src/components/layout/Navbar.tsx`) and `Footer` (`src/components/layout/Footer.tsx`) to support smooth cross-page routing between detail pages and home page hash anchors.

### Removed
- Completely removed `ProjectModal` (`src/components/ui/ProjectModal.tsx`) and its modal state in `ProjectsSection.tsx`.

## [0.2.1] - 2026-11-09

### Fixed
- **Browser Tab Favicon Replacement**:
  - Replaced the default Next.js black "N" icon in the browser tab with the authentic, high-resolution D3V squircle brand logo (`public/assets/images/logo/mylogo.png`).
  - Generated crisp multi-resolution assets: `favicon-32x32.png`, `favicon-16x16.png`, and `apple-touch-icon.png` (180x180).
  - Built compliant multi-layer ICO containers containing 16x16, 32x32, and 48x48 sharpened icon frames for both `src/app/favicon.ico` and `public/favicon.ico`.
  - Added cache-busting query strings (`?v=3`) and explicit `<link rel="icon">` tags in `<head>` and `layout.tsx` metadata to ensure modern browsers immediately invalidate their cached favicon database.
  - Purged `.next` build cache to eliminate legacy `favicon.*.ico` references.

## [0.2.0] - 2026-11-09

### Added
- **Actual Projects Catalog**: Expanded projects catalog from 5 to 15 real, fully-documented academic and personal projects grounded directly in local project repositories across SETEC Institute Year 1 through Year 4:
  - `tenantpay-telegram-mini-app`: Full-Stack Telegram Mini App rental & utility ecosystem with FastAPI, Next.js, Framer Motion, and aiogram 3.
  - `enterprise-ecommerce-spring-boot`: Java 21 LTS, Spring Boot 3.4.3, Spring Security 6, JWT, MySQL 8.4 multi-tier e-commerce platform (`FullStack-Ecommece`).
  - `setec-attendance-score-system`: Next.js 16, TypeScript, MongoDB, bilingual English/Khmer academic attendance & score management system.
  - `bnc-fc-football-platform`: Next.js football club official kit store and squad showcase with authentic kit assets and Telegram order routing (`BNC-FC`).
  - `the-d3v-ecommerce-flutter`: Cross-platform mobile shopping application in Flutter/Dart with Provider and architecture documentation (`mid-ecommerce-flutter`).
  - `flutter-groceries-app`: Mobile grocery ordering application in Flutter/Dart (`Home_Screen`).
  - `library-management-system-sa`: 3-Tier Enterprise System Analysis capstone blueprint, presentation slide, and MySQL DDL specification (`Library_Mangement_System_SA`).
  - `crm-system-sql`: Enterprise SQL architecture with 3NF ERD and DFD Level 0, 1, and 2 diagrams (`Customer_Relationship_Management_System_SQL`).
  - `sokraingsey-ken-portfolio`: Production portfolio website with Next.js 16 and Lenis smooth scrolling (`Sokraingsey_KEN`).
  - `paypal-payment-gateway-testing`: Full-stack PayPal Sandbox payment gateway integration with Spring Boot 3.2, PostgreSQL, and Next.js 15.
  - `inventory-control-system-csharp`: Desktop C# WinForms inventory management application connected to MongoDB (`InventoryControlSystem`).
  - `dart-pos-system`: Console Point of Sale terminal application in pure Dart SDK 3.0+ with REST API integration (`Final_Project_Dart`).
  - `portfolio-cms-management`: Dynamic Portfolio Content Management System with Next.js 16, NextAuth, and MongoDB.
  - `docker-wordpress-mysql-stack`: Multi-container WordPress, MySQL 8.0, and phpMyAdmin stack orchestrated with Docker Compose and Nginx.
  - `docker-laravel-registry-pipeline`: Multi-stage Dockerfile packaging for PHP/Laravel with automated Docker Hub registry deployment.
- **Development Status Badges**: Added `status` (`Completed`, `In Progress`, `Experimental`) with visual status indicators in `ProjectCard` and `ProjectModal`.
- **Comprehensive Case Study Sections in ProjectModal**:
  - Problem Statement
  - Project Objectives
  - System Architecture
  - Database Design & Data Model
  - Challenges & Solutions
  - My Contributions & Responsibilities
- **Authentic Assets**: Migrated high-resolution BNC-FC football cover, emblem, and kit inspection photography into `public/assets/projects/bnc_football/`.

### Changed
- Extended `Project` TypeScript interface in `src/types/index.ts` to support optional case study fields.
- Upgraded `ProjectCard` in both Grid and List modes to display development status pills with color indicators.
- Enhanced search filter in `ProjectsSection` to query project titles, descriptions, technologies, and roles.

## [0.1.0] - 2026-11-08

### Added
- Initial production portfolio launch with Next.js 16, TypeScript, Tailwind CSS v4, and Turbopack.
- Parallax scrolling system with prefers-reduced-motion support.
- Hardened contact form with in-memory rate limiting, input sanitization, honeypot bot trap, and Telegram webhook delivery.
- Verified badge with animated scalloped shimmer.
- Custom corporate branding icons and theme toggle.
