export function TermsSections() {
  return (
    <>
      {/* SECTION 1 */}
      <section className="scroll-mt-24 space-y-3" id="sec-1">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          01. Platform Scope &amp; Technology Status
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          1. Scope of Services &amp; Technology Provider Status
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;Customer&quot;, or &quot;Trader&quot;) and ViewMarket Technology Platform (&quot;ViewMarket&quot;, &quot;Company&quot;, &quot;We&quot;). ViewMarket operates strictly as an <strong className="text-white">Unlicensed Technology SaaS and Workflow Tooling Provider</strong> under Indian law.
        </p>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          ViewMarket holds <strong className="text-white">no registrations</strong> with the Securities and Exchange Board of India (SEBI) as an Investment Adviser, Research Analyst, Stock Broker, Sub-Broker, or Portfolio Manager. We do not hold a Virtual Digital Asset (VDA) registration with the Financial Intelligence Unit (FIU-IND). The platform provides modular charting canvases, condition builders, mathematical indicators, and programmatic API connectors for Indian capital markets (NSE &amp; BSE).
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="scroll-mt-24 space-y-3" id="sec-2">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          02. Bring Your Own Account (BYOA)
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          2. Broker Connectivity &amp; Non-Custodial Architecture
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          ViewMarket operates on a strict <strong className="text-white">Bring Your Own Account (BYOA)</strong> non-custodial model. To route orders or stream live market ticks, users must authenticate their personal credentials with an approved, SEBI-registered broker (such as Zerodha, Upstox, Dhan, or Angel One).
        </p>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          ViewMarket never handles, custodies, pools, clears, or manages user capital, margin, or securities. All contractual brokerage relationships, trade settlements, and statutory STT/exchange levies exist exclusively between you and your executing broker.
        </p>
      </section>

      {/* SECTION 3 */}
      <section className="scroll-mt-24 space-y-3" id="sec-3">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          03. Mandatory Human Confirmation
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          3. Click-to-Trade &amp; Prohibition of Unattended Auto-Trading
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          In strict compliance with SEBI retail algorithmic trading directives, ViewMarket does <strong className="text-white">not</strong> provide autonomous, unattended, or black-box automated order execution.
        </p>
        <ul className="list-disc pl-6 space-y-2.5 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          <li>
            <strong className="text-white">AI Intent Parsing:</strong> The AI chat assistant acts solely as an NLP-to-JSON parser. Natural language prompts generate an unexecuted trade draft.
          </li>
          <li>
            <strong className="text-white">Mandatory Confirmation Modal:</strong> Every drafted transaction displays an explicit modal containing Scrip Name, Exchange, Transaction Type (BUY/SELL), Product Code (MIS/CNC), Quantity, and Order Type.
          </li>
          <li>
            <strong className="text-white">Client-Side Human Click:</strong> Orders are dispatched to the broker API gateway exclusively upon an intentional, manual physical click by the user in the client browser.
          </li>
        </ul>
      </section>

      {/* SECTION 4 */}
      <section className="scroll-mt-24 space-y-3" id="sec-4">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          04. Compute Billing &amp; Metering
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          4. Compute-as-a-Service Infrastructure Billing
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          Platform subscription fees are assessed purely for software access and dedicated cloud compute capacity (vCPU-hours utilized for historical parameter optimization, genetic algorithm sweeps, and chart rule evaluation).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-zinc-300 pt-2">
          <div className="p-4 bg-[#121215] rounded-2xl border border-zinc-800 shadow-sm">
            <dt className="font-semibold text-white text-lg">Cloud Compute Runtime</dt>
            <dd className="mt-1 text-sm text-zinc-400">Billed based on sandboxed CPU/RAM allocation for user-authored strategy backtests.</dd>
          </div>
          <div className="p-4 bg-[#121215] rounded-2xl border border-zinc-800 shadow-sm">
            <dt className="font-semibold text-white text-lg">Zero Performance Markups</dt>
            <dd className="mt-1 text-sm text-zinc-400">ViewMarket never charges profit shares, turnover fees, or per-order commissions.</dd>
          </div>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="scroll-mt-24 space-y-3" id="sec-5">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          05. Intellectual Property
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          5. Strategy Sovereignty &amp; Template Library
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          <strong className="text-white">You Retain 100% Strategy Ownership:</strong> All custom indicators, visual rule chains, risk parameters, and backtest results created within your account remain your exclusive intellectual property.
        </p>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          <strong className="text-white">Mandatory Copy &amp; Edit Workflow:</strong> Public-domain algorithm templates provided in the library (e.g., Moving Average Crossover, Dual Supertrend, VWAP Reversion) are educational examples only. Users must copy, independently configure, inspect parameters, and verify risk tolerances before initiating any trades.
        </p>
      </section>

      {/* SECTION 6 */}
      <section className="scroll-mt-24 space-y-3" id="sec-6">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          06. Client Secret Isolation
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          6. Credential Isolation &amp; Zero Tick Storage
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          To comply with broker API developer agreements and exchange data policies (NSE Data &amp; Analytics Ltd), ViewMarket maintains absolute client-side isolation:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          <li>Broker API secret keys and session tokens reside exclusively in your local browser memory or encrypted <code className="bg-zinc-850 border border-zinc-700 px-1.5 py-0.5 rounded text-xs font-mono text-zinc-200">IndexedDB</code> storage.</li>
          <li>Live tick data streams directly from broker endpoints to your browser via direct client WebSocket (<code className="bg-zinc-850 border border-zinc-700 px-1.5 py-0.5 rounded text-xs font-mono text-zinc-200">wss://</code>). Zero market tick feeds pass through or are cached on ViewMarket backend servers.</li>
        </ul>
      </section>

      {/* SECTION 7 */}
      <section className="scroll-mt-24 space-y-3" id="sec-7">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          07. Limitation of Liability
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          7. Warranties, Limitation of Liability &amp; Disclaimers
        </h2>
        <div className="p-5 bg-[#121215] rounded-2xl border border-zinc-800 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-zinc-400 font-medium leading-relaxed">
            VIEWMARKET SOFTWARE IS DELIVERED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. IN NO EVENT SHALL VIEWMARKET BE LIABLE FOR DIRECT, INDIRECT, OR CONSEQUENTIAL TRADING LOSSES, CAPITAL IMPAIRMENT, BROKER API GATEWAY OUTAGES, EXECUTION SLIPPAGE, INTERNET PARTITIONING, OR EXCHANGE ORDER THROTTLING. MAXIMUM AGGREGATE LIABILITY SHALL NOT EXCEED THE SUBSCRIPTION FEES ACTUALLY PAID BY CUSTOMER IN THE THREE (3) MONTHS PRECEDING THE CLAIM.
          </p>
        </div>
      </section>

      {/* SECTION 8 */}
      <section className="scroll-mt-24 space-y-3" id="sec-8">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          08. Decommissioning &amp; Portability
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          8. Termination &amp; Local Storage Purging
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          Users may terminate their account at any time via the settings panel. Decommissioning instantly revokes all local session tokens, wipes cached rule configurations, and severs broker WebSocket connections. You can export your visual rule flowcharts and backtest telemetry at any time without restriction.
        </p>
      </section>
    </>
  );
}
