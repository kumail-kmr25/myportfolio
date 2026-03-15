import React from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

import ClientProviders from "@/components/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kumailkmr.com'),
  title: {
    default: "Kumale Ali Bhat | Premium Full-Stack Developer & SaaS Expert",
    template: "%s | Kumale Ali Bhat"
  },
  description: "I build high-performance, scalable web applications that drive results. Specializing in Next.js, Node.js, and DevOps for startups and businesses.",
  keywords: ["Full Stack Developer", "SaaS Developer", "Next.js Expert", "React Developer", "DevOps Engineer", "Premium Web Design", "Startup Developer", "Performance Optimization"],
  authors: [{ name: "Kumale Ali Bhat" }],
  creator: "Kumale Ali Bhat",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kumale Ali Bhat | Full-Stack Engineering & SaaS Development",
    description: "Launch your next production-ready platform with an expert Next.js & DevOps engineer.",
    url: "https://kumailkmr.com",
    siteName: "Kumale Ali Bhat | Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kumale Ali Bhat - Full Stack Engineering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumale Ali Bhat | Premium Full-Stack Developer",
    description: "Building fast, scalable web apps that drive real business results.",
    images: ["/og-image.jpg"],
    creator: "@kumailkmr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
    "name": "Kumale Ali Bhat",
    "url": "https://kumailkmr.com",
    "jobTitle": "Full Stack Developer & DevOps Engineer",
    "description": "Expert Full Stack Developer specializing in Next.js, MERN stack, and cloud architecture.",
    "sameAs": [
      "https://github.com/kumail-kmr25",
      "https://www.linkedin.com/in/kumale-ali-bhat-6196a0384/",
      "https://x.com/KumailKmr"
    ],
    "knowsAbout": ["Next.js", "React", "Node.js", "DevOps", "TypeScript", "PostgreSQL", "MongoDB"]
  };

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#050505" />
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
