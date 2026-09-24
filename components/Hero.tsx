import { ChevronRight } from "lucide-react";
import Image from "next/image";
import heroImage from "@/assets/hero1.png";
import Header from "./Header";

export default function Hero() {
  return (
    <div className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-[#120e28]">
      {/* Scenic Horizon Background Design — Zero container, pure ambient backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-90"
        />
        {/* Sky ambient gradient for header & typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#120e28]/95 via-[#181135]/50 to-transparent" />
        {/* Soft atmospheric fade dissolving mountain silhouettes cleanly into the page canvas */}
        <div className="absolute inset-x-0 bottom-0 h-44 md:h-64 bg-gradient-to-t from-[#f4f5fa] via-[#f4f5fa]/70 to-transparent" />
      </div>

      <Header inverted />

      <section className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 py-12 md:py-20 text-center max-w-4xl mx-auto">
        <h1 className="font-mackinac text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] text-white font-normal drop-shadow-md">
          Non-Custodial Algorithmic Workflow Platform Built For Indian Traders
        </h1>
        <p className="mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-purple-100/90 leading-relaxed font-normal">
          <span className="font-semibold text-white">Non-custodial by design.</span>
          {" "}Design visual trading strategies, run sandboxed compute parameter optimizations,
          and dispatch click-to-trade orders directly to your Zerodha, Upstox, Dhan, or Angel One accounts
          with zero broker token storage on central servers.
        </p>

        <div className="mt-8 flex justify-center">
          <button className="btn-purple text-base px-6 py-3.5 shadow-xl hover:shadow-2xl">
            <span>Open Strategy Studio</span>
            <ChevronRight className="size-4 text-white/80" />
          </button>
        </div>
      </section>

      {/* Horizon Spacer allowing the sunset clouds and mountain ridges to breathe */}
      <div className="relative z-10 h-16 md:h-28" />
    </div>
  );
}
