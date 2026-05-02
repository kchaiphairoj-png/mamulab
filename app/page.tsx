import Hero from "@/components/Hero";
import Pain from "@/components/Pain";
import About from "@/components/About";
import Method from "@/components/Method";
import LeadMagnet from "@/components/LeadMagnet";
import WhoFor from "@/components/WhoFor";
import Program from "@/components/Program";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <Pain />
      <About />
      <Method />
      <LeadMagnet />
      <WhoFor />
      <Program />
      <SocialProof />
      <Footer />
    </main>
  );
}
