import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Kumail Kmr | Full Stack Developer & DevOps Engineer",
  description: "Portfolio of Kumail Kmr - Expert Full Stack Developer, DevOps Engineer, and UI/UX Designer specializing in scalable web applications and premium digital experiences.",
  keywords: ["Full Stack Developer", "DevOps", "Next.js", "React", "Tailwind CSS", "Web Development", "freelance"],
  authors: [{ name: "Kumail Kmr" }],
  openGraph: {
    title: "Kumail Kmr | Full Stack Developer",
    description: "Building high-performance, premium web applications.",
    url: "https://your-portfolio-url.com",
    siteName: "Kumail Kmr Portfolio",
    images: [
      {
        url: "/hero_background.svg", // Fallback image until a real OG image is added
        width: 1200,
        height: 630,
        alt: "Kumail Kmr Portfolio",
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
