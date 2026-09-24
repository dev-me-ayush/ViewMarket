import { ChevronRight } from "lucide-react";
import Header from "./Header";

export default function Hero() {
  return (
    <div className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-transparent">

      <Header inverted />

      <section className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 py-12 md:py-20 text-center max-w-4xl mx-auto">
        <h1 className="font-mackinac text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] text-white font-normal drop-shadow-md">
          Non-Custodial Algorithmic Workflow Platform Built For Indian Traders
        </h1>
        <p className="mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-zinc-300 leading-relaxed font-normal">
          <span className="font-semibold text-white">Non-custodial by design.</span>
          {" "}Design visual trading strategies, run sandboxed compute parameter optimizations,
          and dispatch click-to-trade orders directly to your Zerodha, Upstox, Dhan, or Angel One accounts
          with zero broker token storage on central servers.
        </p>

        <div className="mt-8 flex justify-center">
          <button className="btn-white text-base px-6 py-3.5 shadow-xl hover:shadow-2xl">
            <span>Open Strategy Studio</span>
            <ChevronRight className="size-4 text-black" />
          </button>
        </div>
      </section>

      {/* Horizon Spacer allowing the sunset clouds and mountain ridges to breathe */}
      <div className="relative z-10 h-16 md:h-28" />
    </div>
  );
}
