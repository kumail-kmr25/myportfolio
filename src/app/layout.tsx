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
  metadataBase: new URL('https://your-portfolio-url.com'),
  title: "Kumail Kmr | Full Stack Developer & DevOps Engineer",
  description: "Portfolio of Kumail Kmr - Expert Full Stack Developer, DevOps Engineer, and UI/UX Designer. Explore my featured projects in Next.js, MERN stack, and cloud deployments.",
  keywords: ["Full Stack Developer", "DevOps Engineer", "Next.js Expert", "Kumail Kmr", "Web Development", "MERN Stack", "React Developer", "Freelance Developer"],
  authors: [{ name: "Kumail Kmr" }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kumail Kmr | Full Stack Developer",
    description: "Building high-performance, premium web applications with Next.js and DevOps best practices.",
    url: "https://your-portfolio-url.com",
    siteName: "Kumail Kmr Portfolio",
    images: [
      {
        url: "/hero_background.svg",
        width: 1200,
        height: 630,
        alt: "Kumail Kmr Portfolio - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumail Kmr | Full Stack Developer",
    description: "Building high-performance, premium web applications.",
    images: ["/hero_background.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
