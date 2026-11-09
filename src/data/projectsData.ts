import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "tenantpay-telegram-mini-app",
    title: "TenantPay — Full-Stack Rental & Utility Management Ecosystem",
    category: "Software Development",
    featured: true,
    status: "Completed",
    year: "2026",
    clientOrOrg: "Telegram Mini App Ecosystem (@devitnang_bot)",
    role: "Full-Stack System Architect & Developer",
    shortDescription:
      "A complete Telegram Mini App ecosystem featuring tenant mobile billing, a multi-page administrative dashboard, FastAPI REST API, and an aiogram 3 Telegram bot daemon with cryptographic Telegram authentication.",
    fullDescription:
      "Architected and deployed TenantPay, an all-in-one property management ecosystem built for seamless tenant bill settlements directly within Telegram. Features a mobile tenant portal built with Next.js and Framer Motion spring physics, a comprehensive Next.js management dashboard for landlords, a high-throughput FastAPI backend with SQLAlchemy ORM, and an aiogram 3 Telegram bot. The system enforces 3-Way Telegram Authentication, cryptographically validating WebApp initData with HMAC-SHA256 signatures alongside bcrypt-hashed credentials.",
    problemStatement:
      "Property managers and tenants in shared rental spaces face recurring friction with monthly utility calculation (water, power, ethernet, rent) and payment tracking, leading to miscalculated invoices, delayed settlements, and cumbersome verification via manual messaging screenshots.",
    objectives: [
      "Deliver a zero-friction tenant checkout experience embedded inside Telegram WebApps.",
      "Automate dynamic multi-utility cost calculations based on individual tenant usage meter readings.",
      "Provide administrators with real-time audit tools, invoice generators, and customizable rate configurations.",
      "Enforce cryptographic authenticity on all incoming Telegram user sessions to prevent identity spoofing.",
    ],
    keyFeatures: [
      "Cryptographic 3-Way Authentication verifying Email/Username, Bcrypt password, and Telegram WebApp initData HMAC-SHA256 token.",
      "Automated multi-utility billing engine computing Room rent, Water, Electricity, and Ethernet with real-time totals.",
      "Ultra-smooth floating root navigation bar built with Framer Motion layoutId spring physics and Lucide icons.",
      "Comprehensive Admin Management Portal with tenant roster, monthly invoice builder, default price settings, and multi-filter tables.",
      "Autonomous aiogram 3 Telegram bot daemon (@devitnang_bot) providing automated menu actions and instant WebApp launch buttons.",
      "All-in-one launcher scripts (run_all.py, start_all.ps1) orchestrating FastAPI, Next.js, bot, and ngrok public HTTPS tunnels.",
    ],
    systemArchitecture:
      "4-Tier Distributed System: (1) Telegram Mini App client (Next.js/React/Framer Motion), (2) Landlord Admin Dashboard (Next.js/Tailwind), (3) Central REST API tier (Python FastAPI, Pydantic, SQLAlchemy), and (4) Relational persistence layer (SQLite/PostgreSQL) with aiogram 3 event daemon.",
    databaseDesign:
      "Relational schema modeling Users (tenants, admins, telegram_id indexing), Payments (utility itemization: room, water, electric, ethernet, status enums, invoice timestamps), UtilitySettings (rate per kWh/unit), and AuditLogs.",
    challengesAndSolutions: [
      {
        challenge: "Validating Telegram WebApp initData integrity on the backend without trusting raw client input.",
        solution: "Implemented HMAC-SHA256 hash validation using the secret bot token to verify data authenticity and prevent header tampering or replay attacks.",
      },
      {
        challenge: "Managing responsive navigation across diverse mobile viewports inside Telegram's embedded browser wrapper.",
        solution: "Engineered a persistent floating navigation bar utilizing Framer Motion's hardware-accelerated spring animations and safe-area insets.",
      },
    ],
    contributions: [
      "Authored the FastAPI RESTful backend architecture, JWT token engine, and Telegram HMAC cryptographic middleware.",
      "Designed both Next.js frontend applications (tenant mobile mini-app and administrative control portal).",
      "Configured the aiogram 3 Telegram bot lifecycle and multi-service orchestration runner scripts.",
    ],
    technologies: [
      { name: "FastAPI" },
      { name: "Python" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "aiogram 3" },
      { name: "SQLAlchemy" },
      { name: "PostgreSQL" },
      { name: "JWT & HMAC" },
    ],
    images: [
      {
        url: "/assets/projects/smartpay-mobile-home.svg",
        caption: "TenantPay Mobile WebApp Interface with Floating Navigation Bar",
        alt: "TenantPay Mobile Storefront Interface",
      },
      {
        url: "/assets/projects/smartpay-analytics.svg",
        caption: "Administrative Financial Analytics & Multi-Utility Billing Engine",
        alt: "TenantPay Admin Analytics Dashboard",
      },
      {
        url: "/assets/projects/smartpay-mobile-qr.svg",
        caption: "Invoice Settlement Flow & Cryptographic Verification",
        alt: "TenantPay Payment Verification Screen",
      },
    ],
  },
  {
    id: "enterprise-ecommerce-spring-boot",
    title: "Enterprise Multi-Tier E-Commerce Platform — Spring Boot 3 & Microservice Architecture",
    category: "Software Development",
    featured: true,
    status: "Completed",
    year: "2025",
    clientOrOrg: "SETEC Institute — Advanced Java Enterprise (Java-III)",
    role: "Backend Architect & Full-Stack Developer",
    githubUrl: "https://github.com/devitnang/FullStack-Ecommece",
    shortDescription:
      "A production-grade, enterprise-ready E-Commerce RESTful platform built with Spring Boot 3.4.3, Java 21, Spring Security 6, stateless JWT, MySQL 8.4, dual Next.js web applications, and Flutter mobile client.",
    fullDescription:
      "Engineered an enterprise-grade multi-tier e-commerce system for SETEC Institute Advanced Java (Java-III) capstone. The architecture is powered by a high-throughput Java 21 LTS / Spring Boot 3.4.3 RESTful API backend incorporating Spring Security 6 with JJWT access/refresh token rotation, Spring Data JPA / Hibernate 6 with custom Query Specifications, dockerized MySQL 8.4 on isolated ports, Springdoc OpenAPI 3.0 (Swagger UI), and Actuator telemetry. The ecosystem serves three dedicated frontend tiers: a Next.js customer storefront, a Next.js administrative management portal with audit/security logs, and a Flutter cross-platform mobile app.",
    problemStatement:
      "Modern retail applications require strict data integrity, role-based security isolation between administrative staff and retail customers, and multi-channel synchronization across web and mobile platforms with resilient token lifecycles.",
    objectives: [
      "Construct a production-ready enterprise backend adhering to clean layered architecture (Controller, Service, Repository, DTO, Mapper, Exception).",
      "Implement stateless token-based authorization with granular role hierarchies (ROLE_ADMIN, ROLE_CUSTOMER).",
      "Containerize the entire infrastructure with Docker Compose and automated PowerShell deployment pipelines.",
      "Deliver rich administrative audit logs, product category trees, promotional campaigns, and customer order workflows.",
    ],
    keyFeatures: [
      "Enterprise RESTful backend powered by Java 21 LTS and Spring Boot 3.4.3 with Maven dependency management.",
      "Spring Security 6 filter chain with stateless JJWT bearer authentication and refresh token rotation.",
      "Relational persistence utilizing Spring Data JPA, Hibernate 6, and MySQL 8.4 containerized with Docker.",
      "Interactive Springdoc OpenAPI 3.0 / Swagger UI documentation with Authorize token testing at /swagger-ui.html.",
      "Production Actuator endpoints monitoring system health, memory, and database connection pools at /actuator/health.",
      "Dual Next.js frontends (Customer Storefront & Admin Portal) with order tracking, reviews, and security event auditing.",
      "Automated database migration and seeding scripts (00_create_database.sql through 10_seed_ecommerce_data.sql).",
    ],
    systemArchitecture:
      "Multi-Tier Architecture: Presentation Layer (Next.js Web Storefront, Next.js Admin Portal, Flutter Mobile App) -> API Gateway & Security Layer (Spring Security 6, JWT Filter) -> Service & Transaction Layer (Spring Boot Business Services) -> Persistence Layer (Spring Data JPA) -> Relational Database (Dockerized MySQL 8.4).",
    databaseDesign:
      "3NF relational schema encompassing Users, Roles, Addresses, Categories, Products, ProductImages, Cart, CartItems, Orders, OrderItems, Payments, Reviews, SecurityEvents, and GeoEvents.",
    challengesAndSolutions: [
      {
        challenge: "Preventing port collision with local legacy MySQL instances while guaranteeing identical deployment environments.",
        solution: "Containerized MySQL 8.4 via Docker Compose with explicit host-port remapping to port 3307 and automated initialization scripts.",
      },
      {
        challenge: "Handling complex search filtering across product categories, price ranges, and stock thresholds efficiently.",
        solution: "Implemented Spring Data JPA Specifications enabling dynamic, type-safe SQL predicate composition at the database query level.",
      },
    ],
    contributions: [
      "Designed and implemented the core Spring Boot 3.4.3 REST API architecture and Spring Security filter chains.",
      "Authored database DDL schemas, migration scripts, and seed data pipelines.",
      "Built the administrative Next.js dashboard modules for audit logs, permissions, and product catalog management.",
    ],
    technologies: [
      { name: "Spring Boot 3.4" },
      { name: "Java 21 LTS" },
      { name: "Spring Security 6" },
      { name: "Spring Data JPA" },
      { name: "MySQL 8.4" },
      { name: "Docker" },
      { name: "Swagger / OpenAPI" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Flutter" },
    ],
    images: [
      {
        url: "/assets/projects/banking-core-dashboard.svg",
        caption: "Enterprise E-Commerce Management Dashboard & Operations Telemetry",
        alt: "Enterprise E-Commerce Operations Dashboard",
      },
      {
        url: "/assets/projects/banking-core-erd.svg",
        caption: "Normalized Entity-Relationship Architecture (Users, Orders, Inventory, Payments)",
        alt: "Enterprise E-Commerce Relational Schema ERD",
      },
      {
        url: "/assets/projects/banking-core-ledger.svg",
        caption: "Order Checkout Lifecycle & Transaction Settlement Ledger",
        alt: "Order Transaction Lifecycle Ledger",
      },
    ],
  },
  {
    id: "setec-attendance-score-system",
    title: "Academic Attendance & Score Management System — SETEC Institute",
    category: "Enterprise Systems",
    featured: true,
    status: "Completed",
    year: "2026",
    clientOrOrg: "SETEC Institute — Academic Information Systems",
    role: "Lead Full-Stack Developer & Database Architect",
    shortDescription:
      "A comprehensive academic management platform built with Next.js 16, TypeScript, Tailwind CSS, and MongoDB, featuring real-time attendance tracking, score spreadsheets, teacher assignments, and bilingual English/Khmer support.",
    fullDescription:
      "Designed and engineered an enterprise academic administration portal tailored for university operations at SETEC Institute. Built on the Next.js 16 App Router with TypeScript and MongoDB (Mongoose ODM). The platform provides faculty and staff with interactive attendance sheets, assessment score calculation spreadsheets, group scheduling, and teacher assignments, complemented by a public student lookup portal, rate-limited API routes, immutable audit logs, and instant Telegram bot alert dispatching.",
    problemStatement:
      "Managing class attendance and grading across multiple student cohorts with manual paper sheets or disconnected spreadsheets leads to grading discrepancies, delayed student feedback, and lack of accountability.",
    objectives: [
      "Streamline attendance logging with fast multi-session checkboxes and instant absence percentage calculations.",
      "Provide an interactive gradebook with automated threshold evaluations, weighted scores, and exportable reports.",
      "Support bilingual faculty and student populations with full Khmer and English language localizations.",
      "Maintain strict security with role-based policies, audit trail logs, and rate-limited public student queries.",
    ],
    keyFeatures: [
      "Administrative attendance tracking sheet with session batch logging and presence summaries.",
      "Dynamic score spreadsheet with automatic total calculation, grade boundary grading, and GPA projections.",
      "Group and module management with teacher scheduling and student roster enrollment.",
      "Public student verification drawer enabling students to query their academic records securely.",
      "Full bilingual localization supporting English and Khmer (km.ts, en.ts) with seamless client-side switching.",
      "Enterprise security suite with NextAuth role permissions, rate-limiting middleware, and immutable audit logs.",
      "Telegram Bot webhook integration delivering instant administrative notifications upon score publishing.",
    ],
    systemArchitecture:
      "Serverless Next.js 16 App Router architecture utilizing React Server Components, server actions, client-side state contexts, Mongoose ODM data models, and edge API routes.",
    databaseDesign:
      "Document-based MongoDB architecture with schemas for Student, Group, Assessment, AssessmentScore, Attendance, User, SystemSettings, and AuditLog with indexed lookups.",
    challengesAndSolutions: [
      {
        challenge: "Rendering large student roster tables with dynamic score editing without UI frame drops.",
        solution: "Optimized spreadsheet component rendering using debounced inputs, memoized row calculations, and optimistic UI updates.",
      },
      {
        challenge: "Ensuring accurate Khmer font rendering and alignment across diverse operating systems.",
        solution: "Integrated Google Noto Sans Khmer font family with tailored line-height and typography utility classes in Tailwind CSS.",
      },
    ],
    contributions: [
      "Engineered the full frontend and backend architecture using Next.js 16 and Mongoose ODM.",
      "Implemented the bilingual Khmer/English localization context and translation dictionaries.",
      "Constructed the score spreadsheet engine and administrative audit logging mechanism.",
    ],
    technologies: [
      { name: "Next.js 16" },
      { name: "TypeScript" },
      { name: "React 19" },
      { name: "MongoDB" },
      { name: "Mongoose" },
      { name: "Tailwind CSS" },
      { name: "Bilingual i18n" },
      { name: "Telegram API" },
      { name: "Audit Logging" },
    ],
    images: [
      {
        url: "/assets/projects/setec-academic-portal.svg",
        caption: "SETEC Academic Attendance & Score Management System Overview",
        alt: "Academic Portal Dashboard Interface",
      },
      {
        url: "/assets/projects/setec-enrollment-flow.svg",
        caption: "Attendance Sheet & Assessment Score Calculation Workflow",
        alt: "Attendance Sheet & Grading Workflow",
      },
      {
        url: "/assets/projects/setec-analytics-bi.svg",
        caption: "Student Academic Analytics & Performance Distribution",
        alt: "Academic Performance BI Analytics",
      },
    ],
  },
  {
    id: "bnc-fc-football-platform",
    title: "BNC-FC — Football Club Official Jersey Store & Squad Showcase",
    category: "Software Development",
    featured: true,
    status: "Completed",
    year: "2024",
    clientOrOrg: "BNC Football Club",
    role: "Frontend Engineer & UI/UX Designer",
    githubUrl: "https://github.com/devitnang/BNC-FC",
    shortDescription:
      "A modern web application built with Next.js, TypeScript, and Tailwind CSS for BNC Football Club, featuring a dynamic squad roster, official kit catalog with interactive modals, and bilingual English/Khmer support.",
    fullDescription:
      "Designed and developed the official digital presence and merchandise storefront for BNC Football Club. Built using Next.js, TypeScript, and Tailwind CSS. The platform showcases the active squad roster with player cards, detailed field position badges, and jersey numbers, alongside an official kit catalog (Home, Away, Goalkeeper) with interactive inspection modals. Includes an automated Telegram order dispatching pipeline and bilingual language switching.",
    problemStatement:
      "Local sports clubs struggle to establish a professional digital brand and manage club merchandise orders without relying on disorganized direct messaging threads.",
    objectives: [
      "Establish an energetic, professional club identity reflecting team colors and official sponsors.",
      "Provide an interactive roster for fans to explore player profiles, positions, and statistics.",
      "Create an intuitive kit showcase with high-resolution imagery and direct Telegram order dispatching.",
    ],
    keyFeatures: [
      "Dynamic squad roster featuring position-coded player cards (CF, CMF, CB, LWF, RWF, GK) and numbers.",
      "Official kit catalog modal showcasing authentic Home, Away, and Goalkeeper jerseys with zoom inspection.",
      "Seamless bilingual language toggle switching between English and Khmer (translations.ts).",
      "Direct Telegram bot API integration routing fan inquiries and jersey pre-orders directly to club managers.",
      "Custom brand identity design incorporating official club logos, partner sponsor banners, and high-energy gradients.",
    ],
    systemArchitecture:
      "Next.js App Router static/dynamic hybrid architecture utilizing client components for interactive jersey inspection and serverless API endpoints for Telegram order notifications.",
    challengesAndSolutions: [
      {
        challenge: "Displaying high-resolution jersey photos without compromising mobile page load times.",
        solution: "Implemented Next.js Image component optimization with modern WebP formatting, responsive sizes, and placeholder blurs.",
      },
    ],
    contributions: [
      "Designed the responsive UI/UX theme matching BNC-FC team identity and sponsor color schemes.",
      "Developed the roster directory and interactive jersey modal components.",
      "Configured the bilingual context system and Telegram inquiry route.",
    ],
    technologies: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Lucide Icons" },
      { name: "Telegram Bot API" },
      { name: "Bilingual i18n" },
    ],
    images: [
      {
        url: "/assets/projects/bnc_football/cover.png",
        caption: "BNC-FC Official Club Banner & Digital Identity",
        alt: "BNC-FC Official Cover Banner",
      },
      {
        url: "/assets/projects/bnc_football/logo.png",
        caption: "BNC-FC Official Emblem & Branding",
        alt: "BNC-FC Club Emblem",
      },
      {
        url: "/assets/projects/bnc_football/jersey_home.png",
        caption: "Official Home Kit Showcase & Specifications",
        alt: "BNC-FC Home Jersey Preview",
      },
      {
        url: "/assets/projects/bnc_football/jersey_away.jpg",
        caption: "Official Away Kit Inspection",
        alt: "BNC-FC Away Jersey Preview",
      },
      {
        url: "/assets/projects/bnc_football/jersey_gk.jpg",
        caption: "Official Goalkeeper Jersey Edition",
        alt: "BNC-FC Goalkeeper Jersey Preview",
      },
    ],
  },
  {
    id: "the-d3v-ecommerce-flutter",
    title: "The D3V Ecommerce — Cross-Platform Mobile Shopping App",
    category: "Mobile Application",
    featured: true,
    status: "Completed",
    year: "2024",
    clientOrOrg: "SETEC Institute — Year 4, Semester 1 (MA - II)",
    role: "Mobile App Developer & Architecture Contributor",
    teamMembers: ["Nang Devit", "Ken Sokraingsey", "Thai Sulinh"],
    githubUrl: "https://github.com/devitnang/mid-ecommerce-flutter",
    documentationUrl: "/assets/projects/flutter_ecommerce/The-D3V-Ecommerce_Frontend_Documentation.pdf",
    shortDescription:
      "A feature-rich, high-performance cross-platform e-commerce application developed in Flutter and Dart with category browsing, cart checkout, and order lifecycle tracking.",
    fullDescription:
      "Engineered an end-to-end mobile shopping application utilizing Flutter and Dart for SETEC Institute MA-II coursework. Designed with a modular feature-first architecture (config, model, provider, routes, screen, widget, helper, utils) featuring Provider-based state management, asynchronous REST API integration with http package, secure token storage with flutter_secure_storage and shared_preferences, dynamic product carousels, Lottie animations, and order placement verification.",
    problemStatement:
      "Mobile consumers demand ultra-responsive retail experiences with offline cart preservation, instantaneous catalog updates, and fluid animations across Android and iOS devices.",
    objectives: [
      "Build a scalable Flutter architecture separating presentation widgets from business providers.",
      "Integrate asynchronous RESTful product catalogs with persistent local secure storage.",
      "Deliver a frictionless checkout sequence with real-time tax, discount, and total pricing computations.",
    ],
    keyFeatures: [
      "Modern home storefront with promotional carousel banners, featured collections, and new arrivals.",
      "Multi-level department category exploration and granular product filtering.",
      "Interactive product details view with image zoom, variant selection, and review summaries.",
      "Persistent cart state management (Provider) with real-time subtotal, discounts, and tax computation.",
      "Wishlist management, secure user authentication with session persistence, and order receipt flow.",
      "Complete technical architecture documentation and mobile frontend design manual (PDF available).",
    ],
    systemArchitecture:
      "Modular Feature-First Mobile Architecture: Presentation Layer (Screens, Custom Widgets) -> State Management Layer (ChangeNotifier Providers) -> Service Layer (REST API Client, Token Storage) -> Data Models.",
    challengesAndSolutions: [
      {
        challenge: "Maintaining cart consistency across application restarts and varied device screens.",
        solution: "Implemented Provider state management paired with persistent shared_preferences serialization for instant cart restoration.",
      },
    ],
    contributions: [
      "Architected the Provider state management structure and REST API network services.",
      "Implemented the shopping cart, checkout, and order confirmation screens.",
      "Co-authored the official 50-page mobile frontend technical design documentation.",
    ],
    technologies: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Provider" },
      { name: "RESTful APIs" },
      { name: "Secure Storage" },
      { name: "Figma" },
      { name: "Lottie" },
    ],
    images: [
      {
        url: "/assets/projects/flutter_ecommerce/home.png",
        caption: "Storefront Home with Featured Categories, Banners & Products",
        alt: "The D3V Ecommerce Home Screen",
      },
      {
        url: "/assets/projects/flutter_ecommerce/category.png",
        caption: "Categorized Product Catalog & Department Directory",
        alt: "Category Catalog Screen",
      },
      {
        url: "/assets/projects/flutter_ecommerce/category_detail.png",
        caption: "Filtered Category Grid & Product Selection View",
        alt: "Category Details Screen",
      },
      {
        url: "/assets/projects/flutter_ecommerce/card.png",
        caption: "Shopping Cart & Real-Time Price Calculation",
        alt: "Shopping Cart Screen",
      },
      {
        url: "/assets/projects/flutter_ecommerce/wishlist.png",
        caption: "Personal Wishlist & Saved Items Management",
        alt: "Wishlist Screen",
      },
      {
        url: "/assets/projects/flutter_ecommerce/success_order.png",
        caption: "Order Confirmation & Checkout Receipt Summary",
        alt: "Order Success Screen",
      },
      {
        url: "/assets/projects/flutter_ecommerce/login.png",
        caption: "Secure User Authentication & Account Access",
        alt: "User Login Screen",
      },
      {
        url: "/assets/projects/flutter_ecommerce/app_icons.png",
        caption: "Official App Launcher Icon & Branding Identity",
        alt: "App Launcher Icon Screen",
      },
    ],
  },
  {
    id: "flutter-groceries-app",
    title: "Fresh Groceries & Daily Essentials Mobile App",
    category: "Mobile Application",
    featured: true,
    status: "Completed",
    year: "2024",
    clientOrOrg: "Mobile Application Development (MA-II)",
    role: "Mobile Application Developer",
    githubUrl: "https://github.com/devitnang/Home_Screen",
    shortDescription:
      "A clean mobile grocery ordering application built in Flutter with category exploration, product itemization, and interactive shopping workflows.",
    fullDescription:
      "Built a seamless mobile grocery shopping experience using Flutter and Dart. Focused on high-frame-rate rendering, intuitive bottom navigation, responsive image caching, product search, and smooth modal transitions across product detail cards.",
    problemStatement:
      "Grocery shoppers require visual categorization, clear unit metrics, and quick quantity counter adjustments to order produce without complex navigation steps.",
    objectives: [
      "Create an engaging grocery storefront with visual produce categories and discount highlight carousels.",
      "Build dynamic quantity selectors and interactive price aggregators.",
    ],
    keyFeatures: [
      "Dynamic grocery storefront featuring daily promotions and fresh produce specials.",
      "Explore tab with intuitive icon-based categories (Beverages, Fresh Fruits, Bakery, Pantry).",
      "Comprehensive product detail screen with quantity counters, price calculator, and nutrition specs.",
      "Category-specific inventory listing with stock availability tags.",
      "Optimized asset loading and clean Flutter UI architecture.",
    ],
    technologies: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Mobile UI/UX" },
      { name: "State Management" },
      { name: "REST APIs" },
    ],
    images: [
      {
        url: "/assets/projects/flutter_grocies/home.png",
        caption: "Fresh Groceries Home Screen with Featured Deals & Categories",
        alt: "Grocery App Home Screen",
      },
      {
        url: "/assets/projects/flutter_grocies/explore.png",
        caption: "Visual Category Explorer for Fresh Items & Pantry",
        alt: "Explore Categories Screen",
      },
      {
        url: "/assets/projects/flutter_grocies/product_detail.png",
        caption: "Product Details, Quantity Adjustment & Add to Cart",
        alt: "Product Details Screen",
      },
      {
        url: "/assets/projects/flutter_grocies/category_detail.png",
        caption: "Category Specific Products & Inventory View",
        alt: "Category Inventory Screen",
      },
      {
        url: "/assets/projects/flutter_grocies/home1.png",
        caption: "Alternate Storefront Layout & Banner Navigation",
        alt: "Grocery Storefront Screen",
      },
      {
        url: "/assets/projects/flutter_grocies/home2.png",
        caption: "Pantry Specials & Seasonal Produce Grid",
        alt: "Grocery Specials Screen",
      },
    ],
  },
  {
    id: "library-management-system-sa",
    title: "Library Management System — 3-Tier Enterprise SA Capstone",
    category: "System Analysis",
    featured: true,
    status: "Completed",
    year: "2026",
    clientOrOrg: "SETEC Institute — Systems Analysis & Design (SA-II)",
    role: "Lead System Analyst & Database Architect",
    teamMembers: ["Thai Sulinh", "Nang Devit", "Ken Sokraingsey"],
    githubUrl: "https://github.com/devitnang/Library_Mangement_System_SA",
    documentationUrl: "/assets/projects/library_sa/library_management_slide.pdf",
    shortDescription:
      "A comprehensive System Analysis (SA-II) capstone blueprint and 3-tier architecture for digital library operations, borrowing cycles, automated fine tracking, and reporting.",
    fullDescription:
      "Engineered an end-to-end enterprise systems analysis specification for digital library operations at SETEC Institute under instructor CHEA Savuth. Authored formal functional and non-functional requirements via Agile Scrum sprints and ClickUp, modeled 3-tier system architecture (presentation, application business logic, and relational SQL storage tier), and structured normalized database schemas for book circulation, member accounts, fines, reservations, and multi-role access control.",
    problemStatement:
      "Academic institutions suffer from book loss, tracking inaccuracies, and bottlenecks when circulating physical and digital assets across thousands of students without formal system blueprints.",
    objectives: [
      "Produce formal system analysis artifacts (Use Case Diagrams, DFDs, 3-Tier Architecture Diagrams, ERDs).",
      "Model multi-role security boundaries (Admin, Librarian, Member) and automated circulation workflows.",
      "Deliver a validated MySQL DDL schema script with full relational integrity constraints.",
    ],
    keyFeatures: [
      "3-Tier System Architecture modeled for Web/Mobile presentation, Business API, and Relational SQL storage.",
      "Book catalog management with ISBN indexing, category classification, and available copy tracking.",
      "Borrowing and return processing with due date validation and automated overdue fine calculation.",
      "Reservation queue system for unavailable titles with automated status notifications.",
      "Role-based access control (Admin, Librarian, Member) with secure authentication flows.",
      "Production DDL relational schema script (db_library.sql) with 3NF normalization and foreign key integrity.",
    ],
    systemArchitecture:
      "3-Tier Architecture: Presentation Tier (Responsive Web & Mobile interfaces) -> Application Business Logic Tier (REST Services & Circulation Engines) -> Relational Data Storage Tier (MySQL Relational Schema).",
    databaseDesign:
      "Third Normal Form (3NF) relational database (db_library.sql) containing Books, Copies, Members, Borrowings, Returns, Fines, Reservations, and Librarians.",
    technologies: [
      { name: "System Analysis (SA)" },
      { name: "3-Tier Architecture" },
      { name: "MySQL / SQL DDL" },
      { name: "Agile Scrum" },
      { name: "ClickUp" },
      { name: "Database Normalization" },
    ],
    images: [
      {
        url: "/assets/projects/library_sa/library_architecture.svg",
        caption: "Library Management System 3-Tier Enterprise Architecture (Client, API & SQL)",
        alt: "Library SA 3-Tier Architecture Diagram",
      },
      {
        url: "/assets/projects/library_sa/library_erd.svg",
        caption: "Entity-Relationship Diagram (ERD) with 3NF Relational Structure (db_library.sql)",
        alt: "Library SA Relational Schema ERD",
      },
    ],
  },
  {
    id: "crm-system-sql",
    title: "Customer Relationship Management (CRM) — SQL Architecture & DFD",
    category: "Enterprise Systems",
    featured: true,
    status: "Completed",
    year: "2024",
    clientOrOrg: "Enterprise Database Architecture & Business Modeling",
    role: "Database Architect & Systems Modeler",
    teamMembers: ["Ken Sokraingsey", "Nang Devit"],
    githubUrl: "https://github.com/devitnang/Customer_Relationship_Management_System_SQL",
    shortDescription:
      "A robust SQL-based architecture streamlining the entire sales lifecycle—from lead acquisition and qualification to deal closure, revenue reporting, and support.",
    fullDescription:
      "Designed an enterprise relational database schema and business workflow architecture for a multi-tiered Customer Relationship Management (CRM) platform. Engineered 3NF normalized tables across 8 core modules (User Auth, Pre-Sales Leads, Accounts & Contacts, Opportunity Deals, Line Items, Support Tickets, and Interaction Logs). Enforced business logic rules including manager approval workflows for high-value discounts (>20%), 360-degree customer auditing, and Level 0, Level 1, and Level 2 Data Flow Diagrams (DFDs).",
    problemStatement:
      "Fragmented customer interactions and manual spreadsheet tracking cause lost sales opportunities, inconsistent customer support histories, and uncontrolled discount authorizations.",
    objectives: [
      "Architect a normalized relational schema unifying leads, enterprise accounts, contacts, and opportunities.",
      "Model complete operational data flow through context and decomposed Data Flow Diagrams.",
      "Codify managerial approval gates on deal discounts exceeding 20% to safeguard company margins.",
    ],
    keyFeatures: [
      "360-degree customer view separating parent corporate accounts from individual contact persons.",
      "End-to-end sales pipeline tracking leads from qualification to opportunity deals and line item revenue.",
      "Context Level 0, Level 1 process decomposition, and Level 2 deal closure Data Flow Diagrams (DFD).",
      "Automated business logic rules routing discounts over 20% to manager approval workflows.",
      "Integrated post-sale customer support ticketing module with SLA tracking and priority queues.",
      "Complete SQL DDL schema script with third normal form (3NF) relational constraints and audit logs.",
    ],
    systemArchitecture:
      "Event-driven enterprise workflow modeling decomposing CRM processes into Subsystem 1 (Lead Ingestion & Qualification), Subsystem 2 (Deal & Discount Approval), and Subsystem 3 (Post-Sales Support).",
    databaseDesign:
      "Relational 3NF schema covering Accounts, Contacts, Leads, Opportunities, OpportunityLineItems, Products, Tickets, and ActivityLogs with referential triggers.",
    technologies: [
      { name: "SQL (MySQL)" },
      { name: "Database Schema (ERD)" },
      { name: "Data Flow Diagrams (DFD)" },
      { name: "3NF Normalization" },
      { name: "Relational Modeling" },
      { name: "Business Logic Engine" },
    ],
    images: [
      {
        url: "/assets/projects/crm_sql/crm_erd.png",
        caption: "Third Normal Form (3NF) Entity-Relationship Diagram (ERD) & Schema",
        alt: "CRM Database Schema ERD",
      },
      {
        url: "/assets/projects/crm_sql/dfd_level0.png",
        caption: "Data Flow Diagram Level 0: High-Level Context Diagram",
        alt: "CRM Level 0 Context DFD",
      },
      {
        url: "/assets/projects/crm_sql/dfd_level1.png",
        caption: "Data Flow Diagram Level 1: Subsystems & Process Decomposition",
        alt: "CRM Level 1 Process DFD",
      },
      {
        url: "/assets/projects/crm_sql/dfd_level2.png",
        caption: "Data Flow Diagram Level 2: Deal Closure & Approval Logic Workflow",
        alt: "CRM Level 2 Deal Closure DFD",
      },
    ],
  },
  {
    id: "sokraingsey-ken-portfolio",
    title: "Sokraingsey Ken — IT Support & Professional Web Portfolio",
    category: "Software Development",
    featured: true,
    status: "Completed",
    year: "2026",
    clientOrOrg: "Production Web Portfolio",
    role: "Full-Stack Web Developer & UI Designer",
    demoUrl: "https://portfolio.sokraingseyken.xyz",
    githubUrl: "https://github.com/devitnang/Sokraingsey_KEN",
    shortDescription:
      "A high-performance modern web portfolio built with Next.js 16, TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling, deployed live on Vercel.",
    fullDescription:
      "Architected and deployed a production-grade portfolio website for Ken Sokraingsey (IT Support & Systems Specialist). Built using Next.js 16 App Router, TypeScript, and Tailwind CSS with fluid Lenis smooth scrolling and Framer Motion micro-interactions. Features dark mode theming, responsive grid layouts, automated contact dispatching, and zero-downtime production deployment on Vercel with custom SSL at portfolio.sokraingseyken.xyz.",
    keyFeatures: [
      "Modern Next.js 16 App Router architecture with TypeScript and React 19.",
      "Fluid cinematic smooth scrolling powered by Lenis and Framer Motion animations.",
      "Responsive mobile-first layout with dark mode palette and enterprise slate aesthetics.",
      "Interactive technical competency pillars highlighting IT infrastructure, networking, and modern web stack.",
      "Production deployment on Vercel Edge CDN with custom domain configuration and SSL verification.",
    ],
    technologies: [
      { name: "Next.js 16" },
      { name: "TypeScript" },
      { name: "React 19" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "Lenis Scroll" },
      { name: "Vercel Deployment" },
    ],
    images: [
      {
        url: "/assets/projects/sokraingsey_portfolio/home.png",
        caption: "Live Web Portfolio Home Interface at portfolio.sokraingseyken.xyz",
        alt: "Sokraingsey Ken Web Portfolio Home Preview",
      },
      {
        url: "/assets/projects/sokraingsey_portfolio/project.png",
        caption: "Interactive Projects Showcase & Responsive Layouts",
        alt: "Sokraingsey Ken Projects Showcase Preview",
      },
    ],
  },
  {
    id: "paypal-payment-gateway-testing",
    title: "PayPal Payment Gateway Integration & Testing Platform",
    category: "Enterprise Systems",
    featured: false,
    status: "Completed",
    year: "2024",
    clientOrOrg: "SETEC Institute — E-Commerce (E-C) Systems Architecture",
    role: "Full-Stack Payment Integration Developer",
    shortDescription:
      "A full-stack payment gateway integration and testing harness built with Spring Boot 3.2, Java 17, PostgreSQL, Next.js 15, and PayPal REST API Sandbox.",
    fullDescription:
      "Developed an end-to-end payment gateway testing and verification architecture for e-commerce transactions. The system combines a Spring Boot 3.2 backend interacting directly with PayPal's REST Sandbox APIs, a PostgreSQL transaction database for order idempotency and auditing, and a Next.js 15 TypeScript frontend handling the complete checkout, review, approval callback, and failure recovery user experience.",
    keyFeatures: [
      "Full PayPal Sandbox lifecycle integration with order creation, token approval, and capture execution.",
      "Next.js checkout interface featuring payment review, success receipt, cancellation, and error recovery views.",
      "PostgreSQL transaction ledger maintaining an immutable audit history of completed and refunded payments.",
      "Spring Boot exception handling architecture providing graceful error fallbacks for network interruptions.",
      "Docker Compose environment orchestrating the Spring Boot API and PostgreSQL database containers.",
    ],
    systemArchitecture:
      "Frontend Checkout (Next.js 15 App Router) -> Payment Service REST API (Spring Boot 3.2) -> External Gateway (PayPal Sandbox REST API v2) & Persistence (PostgreSQL).",
    technologies: [
      { name: "Spring Boot 3.2" },
      { name: "Java 17" },
      { name: "PostgreSQL" },
      { name: "PayPal REST API" },
      { name: "Next.js 15" },
      { name: "TypeScript" },
      { name: "Docker Compose" },
    ],
    images: [
      {
        url: "/assets/projects/banking-core-dashboard.svg",
        caption: "Payment Gateway Transaction Monitoring & Settlement Review",
        alt: "PayPal Transaction Monitoring Dashboard",
      },
      {
        url: "/assets/projects/banking-core-ledger.svg",
        caption: "Payment Order Status Lifecycle & Audit Ledger",
        alt: "Payment Ledger Lifecycle Screen",
      },
    ],
  },
  {
    id: "inventory-control-system-csharp",
    title: "Inventory Control System — C# Desktop & MongoDB",
    category: "Enterprise Systems",
    featured: false,
    status: "Completed",
    year: "2023",
    clientOrOrg: "SETEC Institute — Year 3 MIS Coursework",
    role: "Desktop Application & Database Developer",
    githubUrl: "https://github.com/devitnang/InventoryControlSystem",
    shortDescription:
      "A desktop inventory control and warehousing application built with C#, .NET WinForms, and MongoDB Driver for real-time stock management and category tracking.",
    fullDescription:
      "Engineered a desktop inventory management solution utilizing C# Windows Forms and MongoDB. Designed modular User Controls (UC_Home, UC_Product, UC_Category) with dynamic data grids, user authentication (LoginForm, RegisterForm), and direct document persistence using the official MongoDB.Driver.",
    keyFeatures: [
      "Modular desktop interface with custom User Controls for dashboard metrics, products, and categories.",
      "Asynchronous MongoDB driver integration with document collections for rapid inventory reads and updates.",
      "Custom DataGridView extensions providing streamlined item editing and low-stock alerts.",
      "User authentication and authorization framework securing inventory modification privileges.",
    ],
    technologies: [
      { name: "C#" },
      { name: ".NET WinForms" },
      { name: "MongoDB" },
      { name: "NoSQL" },
      { name: "User Controls" },
    ],
    images: [
      {
        url: "/assets/projects/inventory-erp-overview.svg",
        caption: "Inventory Stock Tracking & Warehouse Control Interface",
        alt: "Inventory Control System Overview",
      },
      {
        url: "/assets/projects/inventory-erp-analytics.svg",
        caption: "Inventory Stock Levels & Category Analytics Breakdown",
        alt: "Inventory Stock Levels Analytics",
      },
    ],
  },
  {
    id: "dart-pos-system",
    title: "Dart POS System — Console Point of Sale Application",
    category: "Software Development",
    featured: false,
    status: "Completed",
    year: "2024",
    clientOrOrg: "SETEC Institute — Mobile Application Development I (MA-I)",
    role: "Dart Developer",
    githubUrl: "https://github.com/devitnang/Final_Project_Dart",
    shortDescription:
      "A robust Dart console application implementing a role-based Point of Sale system with REST API synchronization, in-memory cart engine, and clean OOP architecture.",
    fullDescription:
      "Developed a role-based Point of Sale terminal application in pure Dart (SDK >= 3.0.0). Built with a clean object-oriented design featuring dedicated models (User, Product, Category, CartItem, OrderItem), an in-memory local cart manager supporting CRUD operations and discounts, and asynchronous REST API services connecting to backend product servers.",
    keyFeatures: [
      "Role-based console routing separating Cashier and Administrator operations.",
      "In-memory cart manager handling item additions, quantity modifications, subtotal calculations, and tax.",
      "Asynchronous RESTful API integration utilizing Dart http client for remote product catalog synchronization.",
      "Strict data model encapsulation with copyWith methods, factory JSON constructors, and input validation.",
    ],
    technologies: [
      { name: "Dart SDK 3.0+" },
      { name: "OOP" },
      { name: "REST APIs" },
      { name: "Async / Await" },
      { name: "State Architecture" },
    ],
    images: [
      {
        url: "/assets/projects/smartpay-mobile-qr.svg",
        caption: "Point of Sale Console Checkout & Order Settlement Engine",
        alt: "Dart POS Checkout Engine",
      },
    ],
  },
  {
    id: "portfolio-cms-management",
    title: "Dynamic Portfolio Content Management System (CMS)",
    category: "Software Development",
    featured: false,
    status: "Completed",
    year: "2026",
    clientOrOrg: "Portfolio Content Management System",
    role: "Full-Stack Web Developer & CMS Architect",
    shortDescription:
      "A full-stack dynamic portfolio CMS platform built with Next.js 16, TypeScript, Tailwind CSS, Auth.js / NextAuth, and MongoDB / Mongoose ODM.",
    fullDescription:
      "Designed and implemented an administrative Content Management System for dynamically managing personal portfolio assets. Features protected admin authentication via NextAuth with bcrypt password hashing, dedicated management interfaces for projects, skills, certificates, experience, and site settings, and full RESTful CRUD API endpoints backed by MongoDB and Mongoose.",
    keyFeatures: [
      "Comprehensive administration portal for managing projects, skills, education, experience, and certificates.",
      "Secure authentication session handling with NextAuth, credentials provider, and role checks.",
      "Mongoose database layer with automated connection caching and database error fallback screens.",
      "Responsive UI built with Tailwind CSS, Lucide icons, Sonner toast notifications, and custom modals.",
    ],
    technologies: [
      { name: "Next.js 16" },
      { name: "TypeScript" },
      { name: "MongoDB" },
      { name: "Mongoose" },
      { name: "NextAuth" },
      { name: "Tailwind CSS" },
    ],
    images: [
      {
        url: "/assets/projects/sokraingsey_portfolio/project.png",
        caption: "Administrative Content Management & Project Showcase Interface",
        alt: "Portfolio CMS Management Dashboard",
      },
      {
        url: "/assets/projects/setec-academic-portal.svg",
        caption: "Dynamic Portfolio Entity Architecture & Data Model",
        alt: "Portfolio CMS Entity Architecture",
      },
    ],
  },
  {
    id: "docker-wordpress-mysql-stack",
    title: "Containerized Multi-Service WordPress & MySQL Cloud Stack",
    category: "Enterprise Systems",
    featured: false,
    status: "Completed",
    year: "2024",
    clientOrOrg: "SETEC Institute — Linux Systems & Cloud Infrastructure (LIN-II)",
    role: "DevOps & Cloud Infrastructure Engineer",
    shortDescription:
      "A containerized multi-tier cloud infrastructure deploying WordPress, MySQL 8.0, and phpMyAdmin through Docker Compose with Nginx reverse proxying and persistent volumes.",
    fullDescription:
      "Architected and deployed an isolated multi-service web hosting stack on Linux utilizing Docker Compose. Orchestrated isolated network bridges between WordPress application containers, MySQL 8.0 relational database instances, and phpMyAdmin administrative consoles. Configured persistent named volumes for data resilience across container lifecycles, environment variable security, and Nginx reverse proxy routing for public internet exposure.",
    keyFeatures: [
      "Multi-container service definition orchestrating WordPress CMS, MySQL 8.0 database, and phpMyAdmin UI.",
      "Custom Docker bridge networking isolating internal database communication from external exposure.",
      "Named volume mappings ensuring zero data loss during service restarts and image upgrades.",
      "Nginx reverse proxying mapping public HTTP ports to internal container sockets.",
      "Production container management using docker compose ps, logs, and resource health checks.",
    ],
    technologies: [
      { name: "Docker" },
      { name: "Docker Compose" },
      { name: "MySQL 8.0" },
      { name: "phpMyAdmin" },
      { name: "WordPress" },
      { name: "Nginx" },
      { name: "Linux" },
    ],
    images: [
      {
        url: "/assets/projects/docker_wordpress/docker-compose.png",
        caption: "Docker Compose Container Orchestration & Health Inspection (docker compose ps)",
        alt: "Docker Compose Orchestration Terminal",
      },
      {
        url: "/assets/projects/docker_wordpress/wordpress.png",
        caption: "Containerized WordPress Production Web Interface",
        alt: "WordPress Web Interface",
      },
      {
        url: "/assets/projects/docker_wordpress/myphpadmin.png",
        caption: "phpMyAdmin Database Administration Console",
        alt: "phpMyAdmin Database Console",
      },
    ],
  },
  {
    id: "docker-laravel-registry-pipeline",
    title: "Docker Containerization & CI/CD Registry Pipeline (Laravel + Nginx)",
    category: "Software Development",
    featured: false,
    status: "Completed",
    year: "2024",
    clientOrOrg: "SETEC Institute — Linux Systems & Cloud Infrastructure (LIN-II)",
    role: "DevOps & Cloud Systems Specialist",
    shortDescription:
      "A production Docker packaging and container registry deployment pipeline for Laravel PHP-FPM web applications with Nginx reverse proxying and Docker Hub publication.",
    fullDescription:
      "Constructed a containerized deployment workflow for modern PHP/Laravel applications under Linux administration coursework. Built optimized multi-stage Dockerfiles packaging Laravel dependencies and PHP-FPM runtimes, orchestrated background daemons with Docker Compose, pushed versioned container artifacts to Docker Hub registry, and configured Nginx to handle fastcgi_pass proxying for high-performance public delivery.",
    keyFeatures: [
      "Production-ready multi-stage Dockerfile packaging PHP 8.x, Composer dependencies, and Laravel framework.",
      "Automated image build, tagging, and deployment pipeline pushing artifacts to Docker Hub container registry.",
      "Nginx reverse proxy configuration with optimized fastcgi_pass socket communication.",
      "Environment isolation preventing sensitive framework credentials from leaking into public image layers.",
    ],
    technologies: [
      { name: "Docker" },
      { name: "Docker Hub" },
      { name: "Laravel" },
      { name: "PHP-FPM" },
      { name: "Nginx" },
      { name: "Linux" },
      { name: "AWS EC2" },
    ],
    images: [
      {
        url: "/assets/projects/docker_laravel/dockerhub.png",
        caption: "Docker Hub Container Registry Repository & Image Tag Artifacts",
        alt: "Docker Hub Container Registry Interface",
      },
      {
        url: "/assets/projects/docker_laravel/docker_compose_ps.png",
        caption: "Production Service Daemon Status & Port Routing (docker compose ps)",
        alt: "Docker Compose Service Status Terminal",
      },
      {
        url: "/assets/projects/docker_laravel/website_laravel.png",
        caption: "Live Laravel Web Application Served via Nginx Reverse Proxy",
        alt: "Laravel Application Interface",
      },
    ],
  },
];
