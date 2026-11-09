# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
