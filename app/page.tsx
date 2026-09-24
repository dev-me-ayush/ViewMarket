import Hero from "@/components/Hero";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Footer from "@/components/Footer";
import LandingAtmosphere from "./_components/landing-atmosphere";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col bg-[#09090b]">
      <LandingAtmosphere />
      <div className="relative z-10 flex flex-col">
        <Hero />
        <Section1 />
        <Section2 />
        <Footer />
      </div>
    </main>
  );
}
