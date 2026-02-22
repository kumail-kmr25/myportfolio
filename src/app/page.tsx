import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ClientShell from "@/components/ClientShell";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: true });

// Dynamic imports for below-the-fold components to improve TBT and initial load performance
const Skills = dynamic(() => import("@/components/Skills"), { ssr: false });
const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const StatsDashboard = dynamic(() => import("@/components/StatsDashboard"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });
const FeatureSuggestion = dynamic(() => import("@/components/FeatureSuggestion"), { ssr: false });
const DiagnosticTool = dynamic(() => import("@/components/DiagnosticTool"), { ssr: false });
const Blog = dynamic(() => import("@/components/Blog"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const HireMeCTA = dynamic(() => import("@/components/HireMeCTA"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

import SectionReveal from "@/components/SectionReveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/10 selection:text-white">
      <ClientShell>
        <Navbar />
        <Hero />
        <SectionReveal><Skills /></SectionReveal>
        <SectionReveal><Services /></SectionReveal>
        <SectionReveal><StatsDashboard /></SectionReveal>
        <SectionReveal><Projects /></SectionReveal>
        <SectionReveal><CaseStudies /></SectionReveal>
        <SectionReveal><Testimonials /></SectionReveal>
        <SectionReveal><FeatureSuggestion /></SectionReveal>
        <SectionReveal><DiagnosticTool /></SectionReveal>
        <SectionReveal><Blog /></SectionReveal>
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><HireMeCTA /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
        <Footer />
      </ClientShell>
    </main>
  );
}

