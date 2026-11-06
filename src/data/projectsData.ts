import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "enterprise-banking-cis",
    title: "Enterprise Core Banking & Customer Information System (CIS)",
    category: "System Analysis",
    featured: true,
    year: "2024",
    clientOrOrg: "Academic Enterprise Project",
    role: "Lead System Analyst & Backend Developer",
    shortDescription:
      "A high-security enterprise banking core system managing customer portfolios, multi-currency accounts, double-entry ledgers, and transaction audit logs.",
    fullDescription:
      "Designed and developed a comprehensive Core Banking and Customer Information System (CIS) model modeled after institutional banking operations. Spearheaded the full System Development Life Cycle (SDLC) starting with requirement analysis, UML state diagrams, and third normal form (3NF) relational database design. Built strict ACID-compliant transaction engines in C# and SQL Server with zero-trust role-based authorization.",
    keyFeatures: [
      "Customer 360 Information System with automated KYC verification workflows.",
      "Multi-currency account management with real-time interest and balance calculations.",
      "Immutable double-entry transaction ledger with audit trails complying with banking standards.",
      "Automated End-of-Day (EOD) batch processing and balance reconciliation routines.",
      "Granular role-based access control (Maker-Checker workflow authorization).",
    ],
    technologies: [
      { name: "C#" },
      { name: "Microsoft SQL Server" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "RESTful APIs" },
    ],
    images: [
      {
        url: "/assets/projects/banking-core-dashboard.svg",
        caption: "CIS Core Operations Dashboard & Account Verification Overview",
        alt: "Enterprise Banking Core Dashboard",
      },
      {
        url: "/assets/projects/banking-core-erd.svg",
        caption: "Relational Entity-Relationship Diagram (ERD) & 3NF Normalization Schema",
        alt: "Banking Database Architecture Diagram",
      },
      {
        url: "/assets/projects/banking-core-ledger.svg",
        caption: "Double-Entry Audit Ledger & End-of-Day Reconciliation Engine",
        alt: "Audit Ledger Reconciliation Engine",
      },
    ],
    githubUrl: "https://github.com/devitnang/enterprise-banking-cis",
    demoUrl: "https://banking-demo.nangdevit.xyz",
  },
  {
    id: "setec-academic-portal",
    title: "SETEC Academic & Student Management System",
    category: "Data Analytics",
    featured: true,
    year: "2023 - 2024",
    clientOrOrg: "SETEC Institute",
    role: "Database Architect & Full-Stack Developer",
    shortDescription:
      "Centralized university academic portal providing course registration, automated grading pipelines, and interactive student retention analytics.",
    fullDescription:
      "Engineered an enterprise academic information management system tailored for higher education institutions. Utilized Oracle Database and PostgreSQL to manage thousands of student academic records, prerequisite trees, timetable conflicts, and faculty grading matrices. Integrated business intelligence dashboards displaying GPA distribution and student dropout risk indicators.",
    keyFeatures: [
      "Real-time prerequisite validation and course conflict scheduling algorithm.",
      "Faculty grading portal with automated weighted GPA and class rank calculations.",
      "Predictive student retention dashboard identifying students needing academic assistance.",
      "Secure student transcript generation with verifiable cryptographic QR hash.",
      "Exportable statistical reports in Excel and PDF formats for academic senate review.",
    ],
    technologies: [
      { name: "Oracle Database" },
      { name: "PostgreSQL" },
      { name: "Next.js" },
      { name: "Power BI" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
    images: [
      {
        url: "/assets/projects/setec-academic-portal.svg",
        caption: "Student Lifecycle & Course Enrollment Management Console",
        alt: "SETEC Student Management Portal",
      },
      {
        url: "/assets/projects/setec-analytics-bi.svg",
        caption: "Academic Performance Telemetry & Departmental GPA Analytics",
        alt: "Student Performance Analytics Dashboard",
      },
      {
        url: "/assets/projects/setec-enrollment-flow.svg",
        caption: "BPMN Prerequisite Validation & Course Conflict Resolver Workflow",
        alt: "Enrollment Workflow Engine",
      },
    ],
    githubUrl: "https://github.com/devitnang/setec-student-portal",
    demoUrl: "https://portal-demo.nangdevit.xyz",
  },
  {
    id: "the-d3v-ecommerce-flutter",
    title: "The D3V - Mobile E-Commerce Application",
    category: "Mobile Application",
    featured: true,
    year: "2024",
    clientOrOrg: "Mobile Application Development",
    role: "Lead Mobile Developer & UI/UX Designer",
    shortDescription:
      "A feature-rich, high-performance cross-platform e-commerce application developed in Flutter and Dart with category browsing, cart checkout, and order lifecycle tracking.",
    fullDescription:
      "Engineered an end-to-end mobile shopping application utilizing Flutter and Dart. Designed with a component-driven architecture featuring reactive state management, asynchronous REST API integration, secure user authentication, shopping cart persistence, and order placement verification.",
    keyFeatures: [
      "Modern home storefront with promotional carousels, featured collections, and new arrivals.",
      "Multi-level category exploration and granular product filtering.",
      "Interactive product details view with image zoom, variant selection, and review summaries.",
      "Persistent cart state management with real-time subtotal, discounts, and tax computation.",
      "Wishlist management, secure user authentication, and order completion verification flow.",
    ],
    technologies: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "RESTful APIs" },
      { name: "State Management" },
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
    ],
    githubUrl: "https://github.com/devitnang/the-d3v-ecommerce",
    demoUrl: "https://github.com/devitnang/the-d3v-ecommerce",
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
      "Built a seamless mobile grocery shopping experience using Flutter. Focused on speed, intuitive navigation, responsive image caching, product search, and smooth transitions across product detail cards.",
    keyFeatures: [
      "Dynamic grocery storefront featuring daily promotions and fresh produce specials.",
      "Explore tab with intuitive icon-based categories (Beverages, Fresh Fruits, Bakery).",
      "Comprehensive product detail screen with quantity counters and nutrition specs.",
      "Optimized asset loading and clean UI architecture.",
    ],
    technologies: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Mobile UI/UX" },
      { name: "REST APIs" },
    ],
    images: [
      {
        url: "/assets/projects/flutter_grocies/home.png",
        caption: "Fresh Groceries Home Screen with Featured Deals",
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
    ],
    githubUrl: "https://github.com/devitnang/flutter-groceries-app",
    demoUrl: "https://github.com/devitnang/flutter-groceries-app",
  },
  {
    id: "supply-chain-erp",
    title: "Supply Chain & Multi-Warehouse Inventory ERP",
    category: "Software Development",
    featured: false,
    year: "2023",
    clientOrOrg: "Enterprise Solutions",
    role: "Full-Stack Software Engineer",
    shortDescription:
      "Enterprise inventory tracking and replenishment platform featuring automated stock-level alerts, supplier purchase orders, and barcode tracking.",
    fullDescription:
      "Architected a modular ERP platform handling multi-location stock movements, bill of materials (BOM), batch tracking, and vendor performance metrics. Engineered high-throughput SQL procedures to eliminate race conditions during high-volume stock reservation.",
    keyFeatures: [
      "Multi-warehouse inventory reconciliation and inter-branch transfer requests.",
      "Automated stock reorder point calculation based on historical consumption velocity.",
      "Supplier management portal with lead-time tracking and purchase order approval workflows.",
      "Detailed financial valuation reports (FIFO / Weighted Average Costing).",
      "Containerized deployment using Docker for standardized environment parity.",
    ],
    technologies: [
      { name: "C#" },
      { name: "ASP.NET Core" },
      { name: "MySQL" },
      { name: "Next.js" },
      { name: "Docker" },
      { name: "Tailwind CSS" },
    ],
    images: [
      {
        url: "/assets/projects/inventory-erp-overview.svg",
        caption: "Multi-Warehouse Stock Valuation & Replenishment Monitor",
        alt: "Inventory ERP Dashboard",
      },
      {
        url: "/assets/projects/inventory-erp-analytics.svg",
        caption: "Stock Turnover Rate & Demand Forecasting Analytics",
        alt: "Inventory Analytics Dashboard",
      },
    ],
    githubUrl: "https://github.com/devitnang/supplychain-erp",
    demoUrl: "https://erp-demo.nangdevit.xyz",
  },
  {
    id: "electoral-data-auditor",
    title: "Electoral Logistics & Precinct Tally Verification Suite",
    category: "Data Analytics",
    featured: false,
    year: "2022 - 2023",
    clientOrOrg: "Analytical Research",
    role: "Data Analyst & System Modeler",
    shortDescription:
      "Analytical verification framework for modeling electoral logistics, precinct reconciliation, and voter turnout statistics.",
    fullDescription:
      "Synthesized insights from field experience at the National Election Committee (NEC) to design an analytical verification pipeline. Analyzed voter distribution data, logistical queue times, and ballot reconciliation logs to evaluate procedural efficiency and detect reporting anomalies.",
    keyFeatures: [
      "Statistical anomaly detection for precinct turnout deviations and outlier flags.",
      "Ballot custody chain verification logs and discrepancy reconciliation worksheets.",
      "Geographical precinct voter density modeling for efficient ballot box allocation.",
      "Automated summary report generation for election observers and administrative bodies.",
    ],
    technologies: [
      { name: "Python" },
      { name: "PostgreSQL" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Advanced Excel" },
    ],
    images: [
      {
        url: "/assets/projects/electoral-logistics-map.svg",
        caption: "Precinct Allocation & Real-Time Ballot Tally Auditing Interface",
        alt: "Electoral Logistics Verification Interface",
      },
      {
        url: "/assets/projects/electoral-turnout-stats.svg",
        caption: "Voter Turnout & Demographic Statistical Analytics Dashboard",
        alt: "Electoral Demographic Statistics",
      },
    ],
    githubUrl: "https://github.com/devitnang/electoral-logistics-analyzer",
    demoUrl: "https://electoral-demo.nangdevit.xyz",
  },
];

