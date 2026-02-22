import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

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
    default: "Kumail Kmr | Full Stack Developer & DevOps Engineer",
    template: "%s | Kumail Kmr"
  },
  description: "Portfolio of Kumail Kmr - Expert Full Stack Developer, DevOps Engineer, and UI/UX Designer. Specializing in high-performance Next.js applications and scalable cloud architecture.",
  keywords: ["Full Stack Developer", "DevOps Engineer", "Next.js Expert", "Kumail Kmr", "Web Development", "MERN Stack", "SaaS Developer", "Performance Optimization"],
  authors: [{ name: "Kumail Kmr" }],
  creator: "Kumail Kmr",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kumail Kmr | Full Stack Developer",
    description: "Building high-performance, premium web applications with Next.js and DevOps best practices.",
    url: "https://kumailkmr.com",
    siteName: "Kumail Kmr Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kumail Kmr - Full Stack Engineering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumail Kmr | Full Stack Developer",
    description: "Building high-performance, premium web applications.",
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
    "name": "Kumail Kmr",
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
        {children}
      </body>
    </html>
  );
}
