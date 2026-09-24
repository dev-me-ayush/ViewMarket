import { Check, ChevronRight } from "lucide-react";

export default function Enterprise() {
  const items = [
    "Direct Client-Side Broker WebSocket (WSS) streaming",
    "Zero broker credential storage (IndexedDB client isolation)",
    "SEBI Retail Algo Framework compliant click-to-trade modals",
    "Multi-broker coverage: Zerodha, Upstox, Dhan, Angel One",
    "Isolated vCPU cloud instances for compute parameter tuning",
  ];

  return (
    <section id="compliance" className="w-full max-w-[1136px] mx-auto flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-20">
      <div className="flex-1 max-w-xl space-y-5 text-left">
        <h2 className="font-mackinac text-2xl sm:text-3xl lg:text-4xl text-[#281950] tracking-tight leading-snug font-normal">
          Institutional-Grade Privacy &amp; Sandboxed Execution
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          Strategy configurations and parameter optimizations run inside client-isolated memory and dedicated compute instances with strict data boundaries and zero credential persistence.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a href="/legal/disclaimer" className="btn-purple inline-flex items-center text-sm sm:text-base">
            <span>Compliance Architecture</span>
            <ChevronRight className="size-4 text-white/80" />
          </a>
          <a href="/legal/terms" className="btn-white inline-flex items-center text-sm sm:text-base">
            <span>Security &amp; Trust</span>
            <ChevronRight className="size-4 text-[#281950]/80" />
          </a>
        </div>
      </div>

      <div className="flex-1 w-full max-w-lg">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#0284c7]/20 shadow-sm divide-y divide-[#0284c7]/15">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-3.5 py-4 first:pt-1 last:pb-1">
              <div className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                <Check className="size-3.5 stroke-[2.5]" />
              </div>
              <p className="text-base sm:text-lg font-medium tracking-tight text-[#281950]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
