import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "the-d3v-ecommerce-flutter",
    title: "The D3V Ecommerce - Cross-Platform Mobile Shopping App",
    category: "Mobile Application",
    featured: true,
    year: "2024",
    clientOrOrg: "SETEC Institute — Year 4, Semester 1 (MA - II)",
    role: "Mobile App Developer & Architecture Contributor",
    teamMembers: ["Nang Devit", "Ken Sokraingsey", "Thai Sulinh"],
    documentationUrl: "/assets/projects/flutter_ecommerce/The-D3V-Ecommerce_Frontend_Documentation.pdf",
    shortDescription:
      "A feature-rich, high-performance cross-platform e-commerce application developed in Flutter and Dart with category browsing, cart checkout, and order lifecycle tracking.",
    fullDescription:
      "Engineered an end-to-end mobile shopping application utilizing Flutter and Dart for SETEC Institute MA-II coursework. Designed with a modular feature-first architecture (config, model, provider, routes, screen, widget, helper, utils) featuring Provider-based state management, asynchronous REST API integration with http package, secure token storage with flutter_secure_storage and shared_preferences, dynamic product carousels, Lottie animations, and order placement verification.",
    keyFeatures: [
      "Modern home storefront with promotional carousel banners, featured collections, and new arrivals.",
      "Multi-level department category exploration and granular product filtering.",
      "Interactive product details view with image zoom, variant selection, and review summaries.",
      "Persistent cart state management (Provider) with real-time subtotal, discounts, and tax computation.",
      "Wishlist management, secure user authentication with session persistence, and order receipt flow.",
      "Complete technical architecture documentation and mobile frontend design manual (PDF available).",
    ],
    technologies: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Provider" },
      { name: "RESTful APIs" },
      { name: "Secure Storage" },
      { name: "Figma" },
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
    githubUrl: "https://github.com/devitnang/mid-ecommerce-flutter",
  },
  {
    id: "flutter-groceries-app",
    title: "Fresh Groceries & Daily Essentials Mobile App",
    category: "Mobile Application",
    featured: true,
    year: "2024",
    clientOrOrg: "Mobile Application Development",
    role: "Mobile Application Developer",
    shortDescription:
      "A clean mobile grocery ordering application built in Flutter with category exploration, product itemization, and interactive shopping workflows.",
    fullDescription:
      "Built a seamless mobile grocery shopping experience using Flutter and Dart. Focused on high-frame-rate rendering, intuitive bottom navigation, responsive image caching, product search, and smooth modal transitions across product detail cards.",
    keyFeatures: [
      "Dynamic grocery storefront featuring daily promotions and fresh produce specials.",
      "Explore tab with intuitive icon-based categories (Beverages, Fresh Fruits, Bakery).",
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
    githubUrl: "https://github.com/devitnang/my_app",
  },
  {
    id: "library-management-system-sa",
    title: "Library Management System — 3-Tier Enterprise SA Capstone",
    category: "System Analysis",
    featured: true,
    year: "2026",
    clientOrOrg: "SETEC Institute — Systems Analysis & Design (SA-II)",
    role: "Lead System Analyst & Database Architect",
    teamMembers: ["Thai Sulinh", "Nang Devit", "Ken Sokraingsey"],
    shortDescription:
      "A comprehensive System Analysis (SA-II) capstone blueprint and 3-tier architecture for digital library operations, borrowing cycles, automated fine tracking, and reporting.",
    fullDescription:
      "Engineered an end-to-end enterprise systems analysis specification for digital library operations at SETEC Institute under instructor CHEA Savuth. Authored formal functional and non-functional requirements via Agile Scrum sprints and ClickUp, modeled 3-tier system architecture (presentation, application business logic, and relational SQL storage tier), and structured normalized database schemas for book circulation, member accounts, fines, reservations, and multi-role access control.",
    keyFeatures: [
      "3-Tier System Architecture modeled for Web/Mobile presentation, Business API, and Relational SQL storage.",
      "Book catalog management with ISBN indexing, category classification, and available copy tracking.",
      "Borrowing and return processing with due date validation and automated overdue fine calculation.",
      "Reservation queue system for unavailable titles with automated status notifications.",
      "Role-based access control (Admin, Librarian, Member) with secure authentication flows.",
      "Production DDL relational schema script (db_library.sql) with 3NF normalization and foreign key integrity.",
    ],
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
    githubUrl: "https://github.com/devitnang/Library_Mangement_System_SA",
  },
  {
    id: "crm-system-sql",
    title: "Customer Relationship Management (CRM) — SQL Architecture & DFD",
    category: "Enterprise Systems",
    featured: true,
    year: "2024",
    clientOrOrg: "Enterprise Database Architecture & Business Modeling",
    role: "Database Architect & Systems Modeler",
    teamMembers: ["Ken Sokraingsey", "Nang Devit"],
    shortDescription:
      "A robust SQL-based architecture streamlining the entire sales lifecycle—from lead acquisition and qualification to deal closure, revenue reporting, and support.",
    fullDescription:
      "Designed an enterprise relational database schema and business workflow architecture for a multi-tiered Customer Relationship Management (CRM) platform. Engineered 3NF normalized tables across 8 core modules (User Auth, Pre-Sales Leads, Accounts & Contacts, Opportunity Deals, Line Items, Support Tickets, and Interaction Logs). Enforced business logic rules including manager approval workflows for high-value discounts (>20%), 360-degree customer auditing, and Level 0, Level 1, and Level 2 Data Flow Diagrams (DFDs).",
    keyFeatures: [
      "360-degree customer view separating parent corporate accounts from individual contact persons.",
      "End-to-end sales pipeline tracking leads from qualification to opportunity deals and line item revenue.",
      "Context Level 0, Level 1 process decomposition, and Level 2 deal closure Data Flow Diagrams (DFD).",
      "Automated business logic rules routing discounts over 20% to manager approval workflows.",
      "Integrated post-sale customer support ticketing module with SLA tracking and priority queues.",
      "Complete SQL DDL schema script with third normal form (3NF) relational constraints and audit logs.",
    ],
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
    githubUrl: "https://github.com/devitnang/Customer_Relationship_Management_System_SQL",
  },
  {
    id: "sokraingsey-ken-portfolio",
    title: "Sokraingsey Ken — IT Support & Professional Web Portfolio",
    category: "Software Development",
    featured: true,
    year: "2026",
    clientOrOrg: "Production Web Portfolio",
    role: "Full-Stack Web Developer & UI Designer",
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
        url: "/assets/projects/sokraingsey_portfolio/portfolio_preview.svg",
        caption: "Live Web Portfolio Interface at portfolio.sokraingseyken.xyz",
        alt: "Sokraingsey Ken Web Portfolio Preview",
      },
    ],
    demoUrl: "https://portfolio.sokraingseyken.xyz",
    githubUrl: "https://github.com/devitnang/Sokraingsey_KEN",
  },
];
