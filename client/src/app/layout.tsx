import React from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

import ClientProviders from "@/components/ClientProviders";
import { GoogleAnalytics } from '@next/third-parties/google';

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
    default: "Kumail KMR | Premium Full-Stack Developer & SaaS Expert",
    template: "%s | Kumail KMR"
  },
  description: "I build high-performance, scalable web applications that drive results. Specializing in Next.js, Node.js, and DevOps for startups and businesses.",
  keywords: ["Full Stack Developer", "SaaS Developer", "Next.js Expert", "React Developer", "DevOps Engineer", "Premium Web Design", "Startup Developer", "Performance Optimization"],
  authors: [{ name: "Kumail KMR" }],
  creator: "Kumail KMR",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kumail KMR | Full-Stack Engineering & SaaS Development",
    description: "Launch your next production-ready platform with an expert Next.js & DevOps engineer.",
    url: "https://kumailkmr.com",
    siteName: "Kumail KMR | Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kumail KMR - Full Stack Engineering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumail KMR | Premium Full-Stack Developer",
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
    "name": "Kumail KMR",
    "url": "https://kumailkmr.com",
    "jobTitle": "Full Stack Developer & DevOps Engineer",
    "description": "Expert Full Stack Developer specializing in Next.js, MERN stack, and cloud architecture.",
    "sameAs": [
      "https://github.com/kumail-kmr25",
      "https://www.linkedin.com/in/kumail-kmr25",
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
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
