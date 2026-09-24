import LegalPageShell from "@/components/legal/LegalPageShell";

export const metadata = {
  title: "Terms of Service · ViewMarket Legal & Trust Center",
  description:
    "Governing the use of ViewMarket non-custodial trading workflow software, algorithmic strategy builders, compute optimization engines, and broker API connectors.",
};

export default function TermsOfServicePage() {
  const toc = [
    { id: "sec-1", label: "1. Scope & Technology Status" },
    { id: "sec-2", label: "2. BYOA & Broker Connectors" },
    { id: "sec-3", label: "3. Mandatory Human Confirmation" },
    { id: "sec-4", label: "4. Compute Billing & Metering" },
    { id: "sec-5", label: "5. Intellectual Property" },
    { id: "sec-6", label: "6. Client Secret Isolation" },
    { id: "sec-7", label: "7. Limitation of Liability" },
    { id: "sec-8", label: "8. Decommissioning & Portability" },
  ];

  return (
    <LegalPageShell
      title="Terms of Service"
      subtitle="Governing the use of ViewMarket non-custodial trading workflow software, algorithmic strategy builders, compute optimization engines, and broker API connectors."
      effectiveDate="October 24, 2024"
      jurisdiction="Mumbai / New Delhi, Republic of India"
      version="Version 3.2 (India Market Compliance)"
      tocItems={toc}
      tldr="ViewMarket is an unlicensed technology SaaS workflow tool, NOT a broker, investment adviser, or financial intermediary. You operate on a Bring Your Own Account (BYOA) model using your personal broker credentials. All orders require explicit human confirmation clicks—we do not offer automated or unattended execution. You retain complete ownership over your proprietary strategies and rules."
    >
      {/* SECTION 1 */}
      <section className="scroll-mt-24 space-y-3" id="sec-1">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          01. Platform Scope &amp; Technology Status
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          1. Scope of Services &amp; Technology Provider Status
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;Customer&quot;, or &quot;Trader&quot;) and ViewMarket Technology Platform (&quot;ViewMarket&quot;, &quot;Company&quot;, &quot;We&quot;). ViewMarket operates strictly as an <strong>Unlicensed Technology SaaS and Workflow Tooling Provider</strong> under Indian law.
        </p>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          ViewMarket holds <strong>no registrations</strong> with the Securities and Exchange Board of India (SEBI) as an Investment Adviser, Research Analyst, Stock Broker, Sub-Broker, or Portfolio Manager. We do not hold a Virtual Digital Asset (VDA) registration with the Financial Intelligence Unit (FIU-IND). The platform provides modular charting canvases, condition builders, mathematical indicators, and programmatic API connectors for Indian capital markets (NSE &amp; BSE).
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="scroll-mt-24 space-y-3" id="sec-2">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          02. Bring Your Own Account (BYOA)
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          2. Broker Connectivity &amp; Non-Custodial Architecture
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          ViewMarket operates on a strict <strong>Bring Your Own Account (BYOA)</strong> non-custodial model. To route orders or stream live market ticks, users must authenticate their personal credentials with an approved, SEBI-registered broker (such as Zerodha, Upstox, Dhan, or Angel One).
        </p>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          ViewMarket never handles, custodies, pools, clears, or manages user capital, margin, or securities. All contractual brokerage relationships, trade settlements, and statutory STT/exchange levies exist exclusively between you and your executing broker.
        </p>
      </section>

      {/* SECTION 3 */}
      <section className="scroll-mt-24 space-y-3" id="sec-3">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          03. Mandatory Human Confirmation
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          3. Click-to-Trade &amp; Prohibition of Unattended Auto-Trading
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          In strict compliance with SEBI retail algorithmic trading directives, ViewMarket does <strong>not</strong> provide autonomous, unattended, or black-box automated order execution.
        </p>
        <ul className="list-disc pl-6 space-y-2.5 text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          <li>
            <strong className="text-[#281950]">AI Intent Parsing:</strong> The AI chat assistant acts solely as an NLP-to-JSON parser. Natural language prompts generate an unexecuted trade draft.
          </li>
          <li>
            <strong className="text-[#281950]">Mandatory Confirmation Modal:</strong> Every drafted transaction displays an explicit modal containing Scrip Name, Exchange, Transaction Type (BUY/SELL), Product Code (MIS/CNC), Quantity, and Order Type.
          </li>
          <li>
            <strong className="text-[#281950]">Client-Side Human Click:</strong> Orders are dispatched to the broker API gateway exclusively upon an intentional, manual physical click by the user in the client browser.
          </li>
        </ul>
      </section>

      {/* SECTION 4 */}
      <section className="scroll-mt-24 space-y-3" id="sec-4">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          04. Compute Billing &amp; Metering
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          4. Compute-as-a-Service Infrastructure Billing
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          Platform subscription fees are assessed purely for software access and dedicated cloud compute capacity (vCPU-hours utilized for historical parameter optimization, genetic algorithm sweeps, and chart rule evaluation).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-[#281950]/80 pt-2">
          <div className="p-4 bg-white rounded-2xl border border-black/[0.08] shadow-sm">
            <dt className="font-semibold text-[#281950] text-lg">Cloud Compute Runtime</dt>
            <dd className="mt-1 text-sm text-[#281950]/75">Billed based on sandboxed CPU/RAM allocation for user-authored strategy backtests.</dd>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-black/[0.08] shadow-sm">
            <dt className="font-semibold text-[#281950] text-lg">Zero Performance Markups</dt>
            <dd className="mt-1 text-sm text-[#281950]/75">ViewMarket never charges profit shares, turnover fees, or per-order commissions.</dd>
          </div>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="scroll-mt-24 space-y-3" id="sec-5">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          05. Intellectual Property
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          5. Strategy Sovereignty &amp; Template Library
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          <strong className="text-[#281950]">You Retain 100% Strategy Ownership:</strong> All custom indicators, visual rule chains, risk parameters, and backtest results created within your account remain your exclusive intellectual property.
        </p>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          <strong className="text-[#281950]">Mandatory Copy &amp; Edit Workflow:</strong> Public-domain algorithm templates provided in the library (e.g., Moving Average Crossover, Dual Supertrend, VWAP Reversion) are educational examples only. Users must copy, independently configure, inspect parameters, and verify risk tolerances before initiating any trades.
        </p>
      </section>

      {/* SECTION 6 */}
      <section className="scroll-mt-24 space-y-3" id="sec-6">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          06. Client Secret Isolation
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          6. Credential Isolation &amp; Zero Tick Storage
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          To comply with broker API developer agreements and exchange data policies (NSE Data &amp; Analytics Ltd), ViewMarket maintains absolute client-side isolation:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          <li>Broker API secret keys and session tokens reside exclusively in your local browser memory or encrypted <code className="bg-purple-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#5300b7]">IndexedDB</code> storage.</li>
          <li>Live tick data streams directly from broker endpoints to your browser via direct client WebSocket (<code className="bg-purple-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#5300b7]">wss://</code>). Zero market tick feeds pass through or are cached on ViewMarket backend servers.</li>
        </ul>
      </section>

      {/* SECTION 7 */}
      <section className="scroll-mt-24 space-y-3" id="sec-7">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          07. Limitation of Liability
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          7. Warranties, Limitation of Liability &amp; Disclaimers
        </h2>
        <div className="p-5 bg-white rounded-2xl border border-black/[0.08] shadow-sm">
          <p className="text-xs uppercase tracking-wider text-[#281950]/90 font-medium leading-relaxed">
            VIEWMARKET SOFTWARE IS DELIVERED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. IN NO EVENT SHALL VIEWMARKET BE LIABLE FOR DIRECT, INDIRECT, OR CONSEQUENTIAL TRADING LOSSES, CAPITAL IMPAIRMENT, BROKER API GATEWAY OUTAGES, EXECUTION SLIPPAGE, INTERNET PARTITIONING, OR EXCHANGE ORDER THROTTLING. MAXIMUM AGGREGATE LIABILITY SHALL NOT EXCEED THE SUBSCRIPTION FEES ACTUALLY PAID BY CUSTOMER IN THE THREE (3) MONTHS PRECEDING THE CLAIM.
          </p>
        </div>
      </section>

      {/* SECTION 8 */}
      <section className="scroll-mt-24 space-y-3" id="sec-8">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          08. Decommissioning &amp; Portability
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          8. Termination &amp; Local Storage Purging
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          Users may terminate their account at any time via the settings panel. Decommissioning instantly revokes all local session tokens, wipes cached rule configurations, and severs broker WebSocket connections. You can export your visual rule flowcharts and backtest telemetry at any time without restriction.
        </p>
      </section>
    </LegalPageShell>
  );
}
