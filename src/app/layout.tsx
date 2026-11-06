import type { Metadata, Viewport } from "next";
import { Open_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B2046" },
    { media: "(prefers-color-scheme: dark)", color: "#080F1E" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nangdevit.xyz"),
  title: {
    default: "Nang Devit | MIS (Management Information Systems)",
    template: "%s | Nang Devit",
  },
  description:
    "Professional portfolio of Nang Devit - Management Information Systems (MIS) senior at SETEC Institute. Experienced in enterprise system design, database architecture, C#, Next.js, Flutter, and multi-relational SQL.",
  keywords: [
    "Nang Devit",
    "Devit Nang",
    "System Analyst Cambodia",
    "Data Analytics Cambodia",
    "Software Developer Cambodia",
    "SETEC Institute",
    "Management Information Systems",
    "C# Developer",
    "Flutter Developer",
    "Next.js Developer",
    "SQL Server",
    "Oracle Database",
  ],
  authors: [{ name: "Nang Devit", url: "https://www.nangdevit.xyz" }],
  creator: "Nang Devit",
  publisher: "Nang Devit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.nangdevit.xyz",
  },
  openGraph: {
    title: "Nang Devit | System Analyst | Data Analytics | Software Developer",
    description:
      "Explore the professional portfolio of Nang Devit - showcasing enterprise system architectures, data analytics pipelines, full-stack applications, and academic accomplishments.",
    url: "https://www.nangdevit.xyz",
    siteName: "Nang Devit Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/nangdevit.PNG",
        width: 1200,
        height: 630,
        alt: "Nang Devit - System Analyst & Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nang Devit | System Analyst & Software Developer",
    description:
      "System Analyst, Data Analytics enthusiast, and Software Developer portfolio.",
    images: ["/assets/images/nangdevit.PNG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nang Devit",
    alternateName: "Devit Nang",
    url: "https://www.nangdevit.xyz",
    image: "https://www.nangdevit.xyz/assets/images/nangdevit.PNG",
    jobTitle: ["System Analyst", "Data Analyst", "Software Developer"],
    worksFor: {
      "@type": "Organization",
      name: "SETEC Institute",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "SETEC Institute",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Phnom Penh",
        addressCountry: "Cambodia",
      },
    },
    sameAs: [
      "https://linkedin.com/in/devitnang",
      "https://github.com/devitnang",
      "https://t.me/nangdevit",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${openSans.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 dark:bg-[#080F1E] dark:text-slate-100 font-sans selection:bg-red-600 selection:text-white transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
