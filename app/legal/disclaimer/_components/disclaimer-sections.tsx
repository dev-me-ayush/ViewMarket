export function DisclaimerSections() {
  return (
    <>
      {/* SECTION 1 */}
      <section className="scroll-mt-24 space-y-3" id="sec-1">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          01. Statutory Licensing Notice
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          1. Absence of SEBI Registration &amp; Intermediary Status
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          ViewMarket is an unlicensed financial technology software platform developed for analytical, workflow, and educational purposes. ViewMarket is <strong className="text-white">not registered</strong> with the Securities and Exchange Board of India (SEBI) under the:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          <li>SEBI (Investment Advisers) Regulations, 2013</li>
          <li>SEBI (Research Analysts) Regulations, 2014</li>
          <li>SEBI (Stock Brokers) Regulations, 1992</li>
          <li>SEBI (Portfolio Managers) Regulations, 2020</li>
        </ul>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          Nothing contained within ViewMarket, its algorithms, charting tools, or conversational AI assistant should be construed as investment advice, a portfolio recommendation, or an offer to buy or sell securities, derivatives, commodities, or currencies.
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="scroll-mt-24 space-y-3" id="sec-2">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          02. Operating Doctrine
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          2. Descriptive State Analytics vs. Prescriptive Advice
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          In adherence to SEBI regulations, ViewMarket strictly enforces the <strong className="text-white">Descriptive State Doctrine</strong> across all charts, gauges, and AI dialogs:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-zinc-300 pt-2">
          <div className="p-4 bg-emerald-950/20 rounded-2xl border border-emerald-900/40 shadow-sm">
            <h4 className="font-semibold text-emerald-300 text-base mb-1">Permitted: Mathematical Conditions</h4>
            <p className="text-sm text-emerald-400/80">Descriptive mathematical outputs such as &quot;RSI &gt; 70 (Overbought State)&quot;, &quot;Price below 50-day SMA (Bearish Momentum)&quot;, or &quot;Camarilla R3 Pivot Level: ₹842&quot;.</p>
          </div>
          <div className="p-4 bg-rose-950/20 rounded-2xl border border-rose-900/40 shadow-sm">
            <h4 className="font-semibold text-rose-300 text-base mb-1">Strictly Prohibited: Prescriptions</h4>
            <p className="text-sm text-rose-400/80">ViewMarket NEVER outputs directional imperatives: no &quot;Strong Buy&quot;, &quot;Sell Now&quot;, &quot;Target ₹920&quot;, &quot;Stop-Loss ₹780&quot;, or personalized allocation advice.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="scroll-mt-24 space-y-3" id="sec-3">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          03. Click-to-Trade Integrity
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          3. Chat-Based Order Drafting &amp; Human Responsibility
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          When using the chat assistant to draft trades (e.g., &quot;Draft limit buy for 25 shares of INFYS at ₹1850&quot;), the AI functions strictly as a natural language parser. It compiles parameters into a structured client-side Confirmation Modal. 
        </p>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          No order is ever routed automatically. The trader retains sole and unfettered responsibility for reviewing the modal for price, quantity, exchange, and product validity before manually clicking to dispatch the order to their personal broker API.
        </p>
      </section>

      {/* SECTION 4 */}
      <section className="scroll-mt-24 space-y-3" id="sec-4">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          04. Performance Disclaimers
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          4. Zero Performance Claims, Leaderboards or Return Guarantees
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          Pursuant to SEBI Circular SEBI/HO/MIRSD/DOP/P/CIR/2022/117, ViewMarket explicitly prohibits the publication of strategy leaderboards, CAGR promises, simulated win-rate percentages, or profit rankings.
        </p>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          Hypothetical backtests or parameter optimizations do not represent actual trading and have inherent limitations. Backtested results do not account for market impact, slippage, liquidity vacuums, or exchange latency. Past performance is no guarantee of future returns.
        </p>
      </section>

      {/* SECTION 5 */}
      <section className="scroll-mt-24 space-y-3" id="sec-5">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          05. Infrastructure Latency
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          5. Broker API Disconnection &amp; Gateway Outages
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          Order routing depends upon third-party broker gateways (Zerodha Kite Connect, Upstox API, Dhan HQ, Angel One SmartAPI). ViewMarket is not responsible for broker rate limit rejections, network latency between your device and broker servers, session token expiration, or exchange connectivity dropouts.
        </p>
      </section>
    </>
  );
}
