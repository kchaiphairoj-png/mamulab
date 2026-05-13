import Hero from "@/components/Hero";
import DailyEnergyCard from "@/components/DailyEnergyCard";
import BirthDateWidget from "@/components/BirthDateWidget";
import NameAnalyzer from "@/components/NameAnalyzer";
import Pain from "@/components/Pain";
import About from "@/components/About";
import Method from "@/components/Method";
import LeadMagnet from "@/components/LeadMagnet";
import WhoFor from "@/components/WhoFor";
import Program from "@/components/Program";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <DailyEnergyCard />
      <Hero />
      <BirthDateWidget />
      <NameAnalyzer />
      <Pain />
      <About />
      <Method />
      <LeadMagnet />
      <WhoFor />
      <Program />
      <Testimonials />
      <FAQ />
      <SocialProof />
      <Footer />
    </main>
  );
}
