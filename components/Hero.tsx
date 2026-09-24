import { ChevronRight } from "lucide-react";
import Image from "next/image";
import heroImage from "@/assets/hero1.png";
import Header from "./Header";

export default function Hero() {
  return (
    <div className="bg-header-pattern min-h-screen flex flex-col">
      <Header />
      <section className="mt-8 md:mt-14 lg:mt-20 flex-1 flex flex-col justify-between">
        <div className="px-4 tracking-tight text-left md:text-center max-w-4xl mx-auto">
          <h1 className="font-mackinac text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] text-[#281950] font-normal">
            Non-Custodial Algorithmic Workflow Platform Built For Indian Traders
          </h1>
          <p className="mt-5 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-[#281950]/80 leading-relaxed font-normal">
            <span className="font-semibold text-[#281950]">Non-custodial by design.</span>
            {" "}Design visual trading strategies, run sandboxed compute parameter optimizations,
            and dispatch click-to-trade orders directly to your Zerodha, Upstox, Dhan, or Angel One accounts
            with zero broker token storage on central servers.
          </p>

          <div className="mt-8 flex justify-start md:justify-center">
            <button className="btn-purple text-base px-6 py-3.5 shadow-lg hover:shadow-xl">
              <span>Open Strategy Studio</span>
              <ChevronRight className="size-4 text-white/80" />
            </button>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 w-full max-w-6xl mx-auto px-4 overflow-hidden flex justify-center">
          <Image
            src={heroImage}
            alt="ViewMarket Non-Custodial Architecture Overview"
            priority
            className="w-full max-w-[1040px] h-auto object-contain drop-shadow-sm select-none"
          />
        </div>
      </section>
    </div>
  );
}
