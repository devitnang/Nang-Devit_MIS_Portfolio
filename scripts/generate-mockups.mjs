import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dir = path.join(__dirname, '..', 'public', 'assets', 'projects');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function createSvg(title, subtitle, badge, accentColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B2046"/>
      <stop offset="100%" stop-color="#07152E"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#162B55"/>
      <stop offset="100%" stop-color="#0E1E3D"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="750" fill="url(#bgGrad)"/>
  <rect width="1200" height="750" fill="url(#grid)"/>

  <!-- Top App Window Bar -->
  <rect x="60" y="45" width="1080" height="60" rx="8" fill="#12254B" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <circle cx="95" cy="75" r="6" fill="#EF4444"/>
  <circle cx="115" cy="75" r="6" fill="#F59E0B"/>
  <circle cx="135" cy="75" r="6" fill="#10B981"/>
  <rect x="170" y="60" width="360" height="30" rx="6" fill="rgba(255,255,255,0.06)"/>
  <text x="185" y="80" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12">https://portal.nangdevit.xyz/enterprise-system</text>
  
  <rect x="940" y="60" width="170" height="30" rx="6" fill="${accentColor}"/>
  <text x="1025" y="80" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="bold" text-anchor="middle" letter-spacing="0.5">${badge}</text>

  <!-- Main Showcase Container -->
  <rect x="60" y="125" width="1080" height="575" rx="12" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- Left Sidebar Mock -->
  <rect x="60" y="125" width="230" height="575" rx="12" fill="#0D1D3A" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <rect x="85" y="160" width="180" height="28" rx="6" fill="${accentColor}" opacity="0.25"/>
  <text x="100" y="179" fill="${accentColor}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="bold">SYSTEM MODULE</text>
  
  <rect x="85" y="215" width="150" height="12" rx="4" fill="rgba(255,255,255,0.4)"/>
  <rect x="85" y="245" width="120" height="12" rx="4" fill="rgba(255,255,255,0.18)"/>
  <rect x="85" y="275" width="160" height="12" rx="4" fill="rgba(255,255,255,0.18)"/>
  <rect x="85" y="305" width="140" height="12" rx="4" fill="rgba(255,255,255,0.18)"/>
  <rect x="85" y="335" width="110" height="12" rx="4" fill="rgba(255,255,255,0.18)"/>
  <rect x="85" y="365" width="130" height="12" rx="4" fill="rgba(255,255,255,0.18)"/>

  <!-- Main Content Header -->
  <text x="325" y="180" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="bold">${title}</text>
  <text x="325" y="210" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14">${subtitle}</text>

  <!-- Metric Cards -->
  <rect x="325" y="240" width="235" height="105" rx="8" fill="#152A52" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="345" y="270" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="bold">TRANSACTION RELIABILITY</text>
  <text x="345" y="305" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="26" font-weight="bold">99.99%</text>
  <text x="345" y="330" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12">ACID Compliant</text>

  <rect x="580" y="240" width="235" height="105" rx="8" fill="#152A52" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="600" y="270" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="bold">DATABASE QUERY LATENCY</text>
  <text x="600" y="305" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="26" font-weight="bold">&lt; 18 ms</text>
  <text x="600" y="330" fill="${accentColor}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12">Indexed Schema</text>

  <rect x="835" y="240" width="275" height="105" rx="8" fill="#152A52" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="855" y="270" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="bold">AUDIT SECURITY STATUS</text>
  <text x="855" y="305" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="26" font-weight="bold">VERIFIED</text>
  <text x="855" y="330" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12">Role-Based Access Control</text>

  <!-- Big Data Visualization Area -->
  <rect x="325" y="365" width="785" height="305" rx="10" fill="#102244" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  
  <!-- Subtle Grid Lines -->
  <line x1="350" y1="430" x2="1080" y2="430" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <line x1="350" y1="490" x2="1080" y2="490" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <line x1="350" y1="550" x2="1080" y2="550" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <line x1="350" y1="610" x2="1080" y2="610" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

  <!-- Waveform / Chart Path -->
  <path d="M 370 600 Q 480 480, 560 520 T 730 430 T 910 470 T 1060 410" fill="none" stroke="${accentColor}" stroke-width="4"/>
  <circle cx="370" cy="600" r="5" fill="${accentColor}"/>
  <circle cx="560" cy="520" r="5" fill="${accentColor}"/>
  <circle cx="730" cy="430" r="5" fill="${accentColor}"/>
  <circle cx="910" cy="470" r="5" fill="${accentColor}"/>
  <circle cx="1060" cy="410" r="5" fill="${accentColor}"/>

  <!-- Mock Table Rows on bottom -->
  <rect x="370" y="390" width="180" height="20" rx="4" fill="rgba(255,255,255,0.15)"/>
  <text x="380" y="405" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="bold">SYSTEM ANALYTICS TELEMETRY</text>

  <rect x="370" y="630" width="130" height="24" rx="4" fill="rgba(255,255,255,0.08)"/>
  <text x="380" y="646" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11">Data Normalized (3NF)</text>

  <rect x="520" y="630" width="150" height="24" rx="4" fill="rgba(255,255,255,0.08)"/>
  <text x="530" y="646" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11">Automated Failover Test</text>

  <rect x="690" y="630" width="140" height="24" rx="4" fill="rgba(255,255,255,0.08)"/>
  <text x="700" y="646" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11">Integrity Check: PASSED</text>
</svg>`;
}

const files = [
  { name: 'banking-core-dashboard.svg', title: 'Enterprise Banking Core & CIS Platform', subtitle: 'Customer Information System, Account Balances & Audit Ledger', badge: 'C# / SQL SERVER', color: '#0052CC' },
  { name: 'banking-core-erd.svg', title: 'Relational Database Schema Architecture', subtitle: 'Third Normal Form (3NF) Entity-Relationship Design with Strict Foreign Constraints', badge: 'SYSTEM ANALYSIS', color: '#0284C7' },
  { name: 'banking-core-ledger.svg', title: 'Audit Trail & Financial Ledger Engine', subtitle: 'Immutable Double-Entry Ledger System with Automated Reconciliation', badge: 'BACKEND ARCHITECTURE', color: '#10B981' },

  { name: 'setec-academic-portal.svg', title: 'SETEC Academic & Student Management System', subtitle: 'Comprehensive Student Lifecycle, Course Registration & Exam Grading', badge: 'ORACLE / NEXT.JS', color: '#1E40AF' },
  { name: 'setec-analytics-bi.svg', title: 'Academic Progression & GPA Analytics', subtitle: 'Student Performance Prediction & Departmental Grade Distribution', badge: 'DATA ANALYTICS', color: '#8B5CF6' },
  { name: 'setec-enrollment-flow.svg', title: 'Course Enrollment Workflow Engine', subtitle: 'Prerequisite Verification, Capacity Checks & Real-Time Scheduling', badge: 'BPMN WORKFLOW', color: '#0EA5E9' },

  { name: 'smartpay-mobile-home.svg', title: 'SmartPay - Digital Wallet & QR Payment App', subtitle: 'Cross-Platform Banking Experience with Biometric Authentication', badge: 'FLUTTER / DART', color: '#2563EB' },
  { name: 'smartpay-mobile-qr.svg', title: 'KHQR Compatible Payment Processing', subtitle: 'Standardized Merchant & Peer-to-Peer QR Code Scanner and Generator', badge: 'MOBILE API', color: '#10B981' },
  { name: 'smartpay-analytics.svg', title: 'Personal Spending Trends & Category Breakdown', subtitle: 'Monthly Budget Health Analysis with Interactive Visual Charts', badge: 'FINTECH ANALYTICS', color: '#0284C7' },

  { name: 'inventory-erp-overview.svg', title: 'Supply Chain & Inventory Management ERP', subtitle: 'Multi-Warehouse Inventory Tracking, Automated Reordering & PO Generation', badge: 'C# .NET / MYSQL', color: '#1E3A8A' },
  { name: 'inventory-erp-analytics.svg', title: 'Stock Turnover & Demand Forecasting Dashboard', subtitle: 'Predictive Stockout Alerts & Supplier Reliability Scorecards', badge: 'BUSINESS INTELLIGENCE', color: '#0284C7' },

  { name: 'electoral-logistics-map.svg', title: 'Electoral Logistics & Precinct Tally System', subtitle: 'Voter Verification Audit, Ballot Custody Logs & Real-Time Tally Aggregation', badge: 'DATA VERIFICATION', color: '#1D4ED8' },
  { name: 'electoral-turnout-stats.svg', title: 'Voter Turnout & Statistical Reporting Suite', subtitle: 'Comprehensive Provincial Demographic Breakdown and Participation Telemetry', badge: 'STATISTICAL MODELING', color: '#10B981' }
];

files.forEach(f => {
  const content = createSvg(f.title, f.subtitle, f.badge, f.color);
  fs.writeFileSync(path.join(dir, f.name), content, 'utf8');
});

console.log(`Generated ${files.length} project mockups.`);

