import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "the-d3v-ecommerce-flutter",
    title: "The D3V Ecommerce — Cross-Platform Mobile Shopping App",
    category: "Mobile Application",
    featured: true,
    status: "Completed",
    year: "2026",
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
      "Mobile consumers demand responsive retail experiences with offline cart preservation, instantaneous catalog updates, and fluid animations across Android and iOS devices.",
    objectives: [
      "Build a scalable Flutter architecture separating presentation widgets from business providers.",
      "Integrate asynchronous RESTful product catalogs with persistent local secure storage.",
      "Deliver a frictionless checkout sequence with real-time tax, discount, and total pricing computations.",
      "Author formal engineering documentation detailing screen wireframes and REST API contracts.",
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
      {
        challenge: "Providing seamless authentication token refresh without interrupting user checkout flows.",
        solution: "Used flutter_secure_storage for encrypted JWT storage with automated token verification on network requests.",
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
    year: "2026",
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
      "Optimize local asset loading and widget rebuilding for 60fps scrolling on entry-level Android devices.",
    ],
    keyFeatures: [
      "Dynamic grocery storefront featuring daily promotions and fresh produce specials.",
      "Explore tab with intuitive icon-based categories (Beverages, Fresh Fruits, Bakery, Pantry).",
      "Comprehensive product detail screen with quantity counters, price calculator, and nutrition specs.",
      "Category-specific inventory listing with stock availability tags.",
      "Optimized asset loading and clean Flutter UI architecture.",
    ],
    systemArchitecture:
      "Component-Driven Mobile Architecture: Modular category widgets, item cards, and persistent bottom navigation bar coordinating local product states.",
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
    documentationUrl: "/assets/projects/library_sa/Book_Final_SA.pdf",
    shortDescription:
      "A comprehensive System Analysis (SA-II) capstone blueprint and 3-tier architecture for digital library operations, borrowing cycles, automated fine tracking, and reporting.",
    fullDescription:
      "Engineered an end-to-end enterprise systems analysis specification for digital library operations at SETEC Institute under instructor CHEA Savuth. Authored formal functional and non-functional requirements via Agile Scrum sprints and ClickUp, modeled 3-tier system architecture (presentation, application business logic, and relational SQL storage tier), and structured normalized database schemas for book circulation, member accounts, fines, reservations, and multi-role access control. Published comprehensive documentation including Book_Final_SA.pdf, slide decks, and production MySQL DDL script (db_library.sql).",
    problemStatement:
      "Academic institutions suffer from book loss, tracking inaccuracies, and bottlenecks when circulating physical and digital assets across thousands of students without formal system blueprints.",
    objectives: [
      "Produce formal system analysis artifacts (Use Case Diagrams, DFDs, 3-Tier Architecture Diagrams, ERDs).",
      "Model multi-role security boundaries (Admin, Librarian, Member) and automated circulation workflows.",
      "Deliver a validated MySQL DDL schema script (db_library.sql) with full relational integrity constraints.",
      "Compile complete capstone documentation (Book_Final_SA.pdf) and presentation defense slides.",
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
      "Third Normal Form (3NF) relational database (db_library.sql) containing Books, Copies, Members, Borrowings, Returns, Fines, Reservations, and Librarians with foreign key cascade integrity.",
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
    year: "2026",
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
    id: "docker-wordpress-mysql-stack",
    title: "Containerized Multi-Service WordPress & MySQL Cloud Stack",
    category: "Enterprise Systems",
    featured: true,
    status: "Completed",
    year: "2026",
    clientOrOrg: "SETEC Institute — Linux Systems & Cloud Infrastructure (LIN-II)",
    role: "DevOps & Cloud Infrastructure Engineer",
    shortDescription:
      "A containerized multi-tier cloud infrastructure deploying WordPress, MySQL 8.0, and phpMyAdmin through Docker Compose with Nginx reverse proxying and persistent volumes.",
    fullDescription:
      "Architected and deployed an isolated multi-service web hosting stack on Linux utilizing Docker Compose based on LIN-II coursework. Orchestrated isolated network bridges between WordPress application containers, MySQL 8.0 relational database instances, and phpMyAdmin administrative consoles. Configured persistent named volumes for data resilience across container lifecycles, environment variable security, and Nginx reverse proxy routing for public internet exposure.",
    problemStatement:
      "Hosting modern database-driven applications on raw virtual machines without containerization leads to dependency conflicts, challenging migration processes, and vulnerability during host maintenance.",
    objectives: [
      "Define reproducible multi-service configurations using declarative Docker Compose manifests.",
      "Isolate database services within dedicated Docker internal networks while exposing necessary HTTP endpoints.",
      "Verify container health and port bindings using production CLI inspection tools (docker compose ps).",
    ],
    keyFeatures: [
      "Multi-container service definition orchestrating WordPress CMS, MySQL 8.0 database, and phpMyAdmin UI.",
      "Custom Docker bridge networking isolating internal database communication from external exposure.",
      "Named volume mappings ensuring zero data loss during service restarts and image upgrades.",
      "Nginx reverse proxying mapping public HTTP ports to internal container sockets.",
      "Production container management verified using docker compose ps, logs, and resource health checks.",
    ],
    systemArchitecture:
      "Containerized Cloud Topology: Public Client -> Host Nginx Reverse Proxy -> Docker Bridge Network (wordpress:80, phpmyadmin:80) -> Isolated Database Network (mysql:3306) with Persistent Named Storage Volumes.",
    challengesAndSolutions: [
      {
        challenge: "Ensuring database service is healthy and initialized before WordPress container boot.",
        solution: "Configured container healthchecks and depends_on restart policies inside the docker-compose.yml specification.",
      },
    ],
    contributions: [
      "Authored the complete docker-compose.yml configuration with network and volume isolation.",
      "Configured phpMyAdmin and MySQL root and application user credentials securely.",
      "Verified public internet deployment and web server port bindings on remote host.",
    ],
    technologies: [
      { name: "Docker" },
      { name: "Docker Compose" },
      { name: "MySQL 8.0" },
      { name: "phpMyAdmin" },
      { name: "WordPress" },
      { name: "Nginx" },
      { name: "Linux" },
      { name: "AWS EC2" },
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
    featured: true,
    status: "Completed",
    year: "2026",
    clientOrOrg: "SETEC Institute — Linux Systems & Cloud Infrastructure (LIN-II)",
    role: "DevOps & Cloud Systems Specialist",
    shortDescription:
      "A production Docker packaging and container registry deployment pipeline for Laravel PHP-FPM web applications with Nginx reverse proxying and Docker Hub publication.",
    fullDescription:
      "Constructed a containerized deployment workflow for modern PHP/Laravel applications under Linux administration coursework. Built optimized multi-stage Dockerfiles packaging Laravel dependencies and PHP-FPM runtimes, orchestrated background daemons with Docker Compose, pushed versioned container artifacts to Docker Hub registry, and configured Nginx to handle fastcgi_pass proxying for high-performance public delivery.",
    problemStatement:
      "Deploying PHP applications directly on server environments often introduces PHP extension mismatches, manual Composer dependency installation hurdles, and lack of reproducible build artifacts.",
    objectives: [
      "Containerize Laravel with an optimized PHP-FPM base image including all required extensions.",
      "Build, tag, and publish versioned application images to public Docker Hub container repository.",
      "Expose application to the public internet using Nginx fastcgi reverse proxying on cloud server.",
    ],
    keyFeatures: [
      "Production-ready multi-stage Dockerfile packaging PHP 8.x, Composer dependencies, and Laravel framework.",
      "Automated image build, tagging, and deployment pipeline pushing artifacts to Docker Hub container registry.",
      "Nginx reverse proxy configuration with optimized fastcgi_pass socket communication.",
      "Environment isolation preventing sensitive framework credentials from leaking into public image layers.",
      "Verified container deployment using docker compose ps and remote browser HTTP response inspection.",
    ],
    systemArchitecture:
      "Cloud Deployment Pipeline: Source Code (Laravel) -> Multi-stage Docker Build -> Docker Hub Registry (`devitnang/laravel`) -> Remote Linux Server Pull -> Docker Compose Execution -> Nginx FastCGI Public Proxy.",
    challengesAndSolutions: [
      {
        challenge: "Minimizing final Docker image footprint while maintaining PHP-FPM and Composer build tools.",
        solution: "Implemented multi-stage Docker builds separating the Composer dependency resolver stage from the minimal PHP-FPM runtime image.",
      },
    ],
    contributions: [
      "Created the application Dockerfile and docker-compose.yml deployment stack.",
      "Built and published the versioned image tags to Docker Hub container registry.",
      "Configured Nginx reverse proxy site configuration file on remote server instance.",
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
