import Hero from "@/components/Hero";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f4f5fa]">
      <Hero />
      <Section1 />
      <Section2 />
      <Footer />
    </main>
  );
}
