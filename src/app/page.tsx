"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const IntroAnimation = dynamic(() => import("@/components/IntroAnimation"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: true });

// Dynamic imports for below-the-fold components to improve TBT and initial load performance
const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const Blog = dynamic(() => import("@/components/Blog"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/10 selection:text-white">
      <IntroAnimation />
      <Navbar />
      <Hero />
      <Skills />
      <Services />
      <Projects />
      <Testimonials />
      <Blog />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
