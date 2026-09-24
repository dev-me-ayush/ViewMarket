import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5fa] text-[#281950]">
      {/* Seamless header directly on canvas, matching landing page */}
      <div className="w-full bg-header-pattern">
        <Header />
      </div>

      {/* Main full-width container */}
      <main className="flex-1 w-full max-w-[1400px] xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
