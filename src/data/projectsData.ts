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
    githubUrl: "https://github.com/devitnang/flutter-groceries-app",
  },
];
