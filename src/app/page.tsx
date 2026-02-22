import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ClientShell from "@/components/ClientShell";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: true });

// Dynamic imports for below-the-fold components to improve TBT and initial load performance
const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const StatsDashboard = dynamic(() => import("@/components/StatsDashboard"), { ssr: true });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: true });
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const FeatureSuggestion = dynamic(() => import("@/components/FeatureSuggestion"), { ssr: true });
const Blog = dynamic(() => import("@/components/Blog"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const HireMeCTA = dynamic(() => import("@/components/HireMeCTA"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/10 selection:text-white">
      <ClientShell>
        <Navbar />
        <Hero />
        <Skills />
        <Services />
        <StatsDashboard />
        <Projects />
        <CaseStudies />
        <Testimonials />
        <FeatureSuggestion />
        <Blog />
        <About />
        <HireMeCTA />
        <Contact />
        <Footer />
      </ClientShell>
    </main>
  );
}

