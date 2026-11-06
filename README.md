# Nang Devit's Professional Personal Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss)
![Telegram Bot](https://img.shields.io/badge/Telegram_Bot_API-Enabled-26A5E4?style=flat&logo=telegram)
![Domain](https://img.shields.io/badge/Domain-www.nangdevit.xyz-D32F2F?style=flat)

Official personal portfolio website for **Nang Devit**, presenting a clean, corporate enterprise identity inspired by financial institutional portals such as the ABA Bank Careers Portal. Built to showcase professional background, technical competencies, enterprise projects, organizational experience, and academic achievements for recruiters, hiring managers, and prospective employers.

🌐 **Production Domain:** [www.nangdevit.xyz](https://www.nangdevit.xyz)  
👤 **Professional Title:** System Analyst | Data Analytics | Software Developer  
🏛️ **Institution:** SETEC Institute — Management Information Systems (MIS)

---

## 🏛️ Corporate UI/UX Design System

- **Clean Corporate Palette**:
  - **Navy Blue Primary (`#0B2046`)**: Authoritative, stable enterprise corporate tone.
  - **Red Accent (`#D32F2F`)**: Professional, vibrant accent for critical call-to-action buttons and status indicators.
  - **Clean White & Crisp Grays**: High legibility, subtle borders (`#E2E8F0`), flat UI, minimal shadows.
- **Dual Theme Support**:
  - **Light Mode**: Traditional corporate enterprise aesthetic.
  - **Dark Mode**: Rich midnight navy/slate (`#080F1E` / `#0D182E`) with high-contrast typography and subtle borders.
- **Fully Responsive**: Optimized for Desktop, Laptop, Tablet, and Mobile screens.

---

## 📁 Key Sections & Layout

1. **Navigation Bar**: Fixed header with monogram branding, active section tracking, theme toggle, CV download button, and mobile drawer menu.
2. **Hero Section**:
   - Name: **Nang Devit**
   - Title: **System Analyst | Data Analytics | Software Developer**
   - Executive profile portrait (`/assets/images/nangdevit.PNG`)
   - Direct CV download button (`/assets/cv/NANGDEVIT__CV.pdf`)
   - "View Projects" smooth navigation
   - Social & direct contact badges (LinkedIn, GitHub, Telegram, Email, Phone)
3. **About Me**:
   - Professional narrative & core philosophy
   - Academic background in Management Information Systems (SETEC Institute)
   - Career objectives & goals
   - 3 Core Pillars: **System Analysis & Architecture**, **Data Analytics & BI**, **Software & Mobile Development**
4. **Technical Skills**:
   - Categorized directory: Programming Languages (C#, SQL, TypeScript, Dart, etc.), Modern Frameworks (Flutter, Next.js, React, ASP.NET Core), Database Systems (Oracle, MSSQL, PostgreSQL, MySQL, MongoDB), Data Analytics (Power BI, Advanced Excel, SQL Analytics), and Tooling.
   - Interactive search bar and category filters.
5. **Featured Projects**:
   - Managed via centralized data structure (`src/data/projectsData.ts`).
   - Interactive modal gallery with multi-screenshot carousel, technical specifications, role context, GitHub links, and live demo links.
6. **Professional Experience**:
   - **National Election Committee (NEC)**: External Coordinator (Third Member), Kampong Speu, Cambodia (2022) with official logo, statutory compliance, ballot verification, and data custody contributions.
7. **Academic Education**:
   - **SETEC Institute**: Bachelor of Science in Management Information Systems (MIS), Senior Year 4, coursework, and capstone achievements.
8. **Contact & Telegram Bot Integration**:
   - Contact cards with verified phone, email, LinkedIn, GitHub, and Telegram.
   - Interactive contact form with real-time field validation, anti-spam honeypot, loading spinner, and error/success alerts.
   - Secure backend API route (`/api/contact`) dispatching HTML-formatted notifications to a private Telegram group channel.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Server Components & Route Handlers)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React + Custom Brand SVGs
- **Theming**: `next-themes` (Dark Mode & Light Mode)
- **Notifications**: Telegram Bot API
- **Deployment**: Vercel

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/devitnang/nangdevit-portfolio.git
cd nangdevit_portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your credentials:
```env
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
TELEGRAM_CHAT_ID="your_telegram_group_chat_id"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```
*(If Telegram keys are left blank, the contact endpoint runs in development mode and logs submissions safely to the server console).*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm run start
```

---

## 📡 Telegram Bot Notification Format

When a visitor submits the contact form, the backend delivers a message formatted as follows to your configured Telegram Group:

```text
🏛️ Portfolio Website - New Contact Message
━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Full Name: [Visitor Name]
📧 Email: visitor@example.com
📌 Subject: [Message Subject]
━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Description:
[Detailed Message Content]
━━━━━━━━━━━━━━━━━━━━━━━━━
🕒 Submitted At: Friday, November 6, 2026, 8:30:00 PM (Cambodia Time)
🌐 Source: www.nangdevit.xyz
```

---

## 🌐 Custom Domain & Deployment

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for complete step-by-step instructions on:
- Setting up the Telegram Bot via `@BotFather`.
- Deploying to Vercel.
- Pointing DNS records (`CNAME` and `A`) for **`www.nangdevit.xyz`**.

---

## 📄 License & Copyright

&copy; 2026 Nang Devit. All Rights Reserved.
