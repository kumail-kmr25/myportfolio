import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";

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
