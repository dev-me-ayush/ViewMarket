import LegalPageShell from "@/components/legal/LegalPageShell";

export const metadata = {
  title: "Risk Disclosure · ViewMarket Legal & Trust Center",
  description:
    "Mandatory statutory risk warnings regarding equity derivatives (F&O), algorithmic execution hazards, API latency, and capital loss.",
};

export default function RiskDisclosurePage() {
  const toc = [
    { id: "sec-1", label: "1. SEBI F&O Risk Study" },
    { id: "sec-2", label: "2. Algorithmic Logic Risks" },
    { id: "sec-3", label: "3. Broker API & Token Risks" },
    { id: "sec-4", label: "4. Volatility & Slippage" },
    { id: "sec-5", label: "5. Total Capital Hazard" },
  ];

  return (
    <LegalPageShell
      title="Risk Disclosure Statement"
      subtitle="Mandatory statutory risk warnings regarding equity derivatives (F&O), algorithmic execution hazards, API latency, and capital loss."
      effectiveDate="October 24, 2024"
      jurisdiction="Mumbai / New Delhi, Republic of India"
      version="Version 3.2 (SEBI F&O Mandate)"
      tocItems={toc}
      tldr="Trading in equities and particularly Futures & Options (F&O) involves severe risk of total capital loss. According to SEBI studies, 9 out of 10 individual traders in the equity F&O segment incur net losses averaging ₹50,000 to ₹1,25,000 annually. Algorithmic rules, broker rate limits, and market gap-downs can compound drawdowns. Never trade with money you cannot afford to lose completely."
    >
      {/* SECTION 1 */}
      <section className="scroll-mt-24 space-y-3" id="sec-1">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          01. Statutory Regulatory Notice
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          1. Mandatory SEBI Risk Disclosure on Derivatives (Futures &amp; Options)
        </h2>
        <div className="p-5 bg-amber-50 rounded-2xl border border-amber-300/80 shadow-sm space-y-2">
          <h3 className="font-semibold text-amber-950 text-base">Key Findings of SEBI Study on Individual Traders in F&amp;O:</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-amber-900/90 leading-relaxed font-normal">
            <li><strong>9 out of 10 individual traders</strong> in equity Futures and Options incur net financial losses.</li>
            <li>On average, loss-makers registered an annual net loss of approximately <strong>₹50,000 to ₹1,25,000</strong>.</li>
            <li>In addition to trading losses, loss-makers expended an additional <strong>21% to 28% of net losses</strong> as transaction costs, brokerage, and statutory exchange levies.</li>
            <li>Top profit-makers are predominantly institutional entities and high-frequency algorithms, not retail traders.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="scroll-mt-24 space-y-3" id="sec-2">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          02. Algorithmic Execution Hazards
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          2. Algorithmic Overfitting &amp; Rule Failure Risks
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          When constructing custom visual strategies or testing parameters via ViewMarket&apos;s compute engine, users face substantial risks of <strong>curve-fitting (overfitting)</strong>. A rule set that demonstrated high hypothetical profitability on past candlestick data may fail catastrophically during live market regimes with shifts in volatility or liquidity.
        </p>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          Visual condition triggers (<code className="bg-purple-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#5300b7]">IF Indicator A &gt; Indicator B</code>) execute based strictly on mathematical logic. Logic race conditions or incorrect operator chaining can generate unintended order drafts.
        </p>
      </section>

      {/* SECTION 3 */}
      <section className="scroll-mt-24 space-y-3" id="sec-3">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          03. Broker API &amp; Gateway Risks
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          3. Broker API Gateway, Token &amp; Connectivity Hazards
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          Live order routing is entirely contingent on your broker&apos;s API infrastructure (Zerodha, Upstox, Dhan, Angel One). The following failure modes can prevent order dispatch or cancellation:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          <li><strong>Daily Token Expiration:</strong> Broker auth tokens expire at the end of each trading day or upon session timeout. Unauthenticated requests will fail silently or reject.</li>
          <li><strong>Broker Rate Limiting:</strong> Sending excessive order requests can trigger HTTP 429 rate limit bans from the broker gateway.</li>
          <li><strong>Client-Side Internet Drops:</strong> Local Wi-Fi, 4G/5G latency, or browser tab suspension can delay trigger alerts.</li>
        </ul>
      </section>

      {/* SECTION 4 */}
      <section className="scroll-mt-24 space-y-3" id="sec-4">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          04. Market Mechanics
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          4. Execution Slippage &amp; Gap Openings
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          Market orders drafted by ViewMarket and approved by the user execute at the prevailing market price on the exchange order book. During major economic events, RBI policy announcements, or earnings releases, the execution price may differ materially from the trigger price due to bid-ask spread widening and slippage.
        </p>
      </section>

      {/* SECTION 5 */}
      <section className="scroll-mt-24 space-y-3" id="sec-5">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          05. Capital Loss Warning
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          5. Total Capital Impairment Warning
        </h2>
        <div className="p-5 bg-rose-50/70 rounded-2xl border border-rose-200/80 shadow-sm">
          <p className="text-sm sm:text-base text-rose-950 font-semibold leading-relaxed">
            Do not trade with money you cannot afford to lose. Derivatives and intraday margin products (MIS) carry substantial leverage and can result in losses exceeding your initial deposit. ViewMarket provides software tooling only and does not assume responsibility for financial losses incurred while using this platform.
          </p>
        </div>
      </section>
    </LegalPageShell>
  );
}
