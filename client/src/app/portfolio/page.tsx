import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

export const metadata = {
  title: "My Projects | Kumail KMR",
  description: "Technical deep-dives into end-to-end product engineering, architectural decision logs, and systemic impact analysis.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/10 selection:text-white">
      <ClientShell>
        <Navbar />
        <div className="pt-20"> {/* Offset for fixed navbar */}
          <Projects />
        </div>
        <Footer />
      </ClientShell>
    </main>
  );
}
