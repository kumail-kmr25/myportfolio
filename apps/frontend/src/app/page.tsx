import Hero from "@/components/Hero";
import ClientShell from "@/components/ClientShell";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/10 selection:text-white">
      <ClientShell>
        <Navbar />
        <Hero />
        <MainContent />
      </ClientShell>
    </main>
  );
}

