import Testimonials from "@/components/Testimonials";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

export const metadata = {
  title: "Testimonials | Kumale Ali Bhat",
  description: "Real-world feedback from engineering partners and institutional clients. Unfiltered technical validation.",
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/10 selection:text-white">
      <ClientShell>
        <Navbar />
        <div className="pt-20"> {/* Offset for fixed navbar */}
          <Testimonials />
        </div>
        <Footer />
      </ClientShell>
    </main>
  );
}
