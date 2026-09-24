import LegalPageShell from "@/components/legal/LegalPageShell";

export const metadata = {
  title: "Refund Policy · ViewMarket Legal & Trust Center",
  description:
    "Terms governing software SaaS subscriptions, compute engine optimization hours, and complete non-reimbursement of trading outcomes.",
};

export default function RefundPolicyPage() {
  const toc = [
    { id: "sec-1", label: "1. Compute Metering Policy" },
    { id: "sec-2", label: "2. Zero Trading Loss Liability" },
    { id: "sec-3", label: "3. Subscription Cancellation" },
    { id: "sec-4", label: "4. Billing Dispute Inquiries" },
  ];

  return (
    <LegalPageShell
      title="Refund &amp; Billing Policy"
      subtitle="Terms governing software SaaS subscriptions, compute engine optimization runtime, and complete non-reimbursement of trading outcomes."
      effectiveDate="October 24, 2024"
      jurisdiction="Mumbai / New Delhi, Republic of India"
      version="Version 3.2 (Commercial Terms)"
      tocItems={toc}
      tldr="ViewMarket bills for software platform access and dedicated cloud compute capacity (vCPU-hours utilized for parameter optimization). Consumed compute resources are non-refundable. Under NO circumstances does ViewMarket compensate, reimburse, or refund trading losses, order slippage, or missed execution opportunities."
    >
      {/* SECTION 1 */}
      <section className="scroll-mt-24 space-y-3" id="sec-1">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          01. Compute Metering Policy
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          1. Cloud Compute Runtime &amp; Non-Refundable Services
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          ViewMarket allocates isolated cloud compute instances (vCPU, RAM, sandboxed execution runtimes) to perform heavy combinatorial parameter sweeps and algorithmic optimization. Because these computing resources are provisioned in real time on cloud infrastructure, all fees charged for utilized compute runtime are <strong>strictly non-refundable</strong> once processing commences.
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="scroll-mt-24 space-y-3" id="sec-2">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          02. Absolute Liability Exclusion
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          2. Complete Non-Reimbursement of Market &amp; Trading Losses
        </h2>
        <div className="p-5 bg-rose-50/70 rounded-2xl border border-rose-200/80 shadow-sm space-y-2">
          <p className="text-xs uppercase tracking-wider text-rose-950 font-bold leading-relaxed">
            VIEWMARKET IS A WORKFLOW SOFTWARE TOOL. UNDER NO CIRCUMSTANCES SHALL VIEWMARKET, ITS FOUNDERS, OR CONTRIBUTORS BE LIABLE TO REFUND, REIMBURSE, OR COMPENSATE FOR FINANCIAL LOSSES ARISING FROM MARKET OPERATIONS.
          </p>
          <p className="text-sm text-rose-900/90 leading-relaxed">
            This exclusion applies unconditionally to: algorithmic logic errors authored by the user, slippage during market opens, broker API gateway rejections, session token expirations, internet connection drops, or exchange-mandated halts. All capital risk rests solely with the trader.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="scroll-mt-24 space-y-3" id="sec-3">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          03. Subscription Cancellation
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          3. SaaS Subscription Cancellation &amp; Renewals
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          You may cancel your monthly or annual ViewMarket SaaS subscription at any time via your account billing settings. Upon cancellation, you will retain full access to software features and strategy builders until the end of your current prepaid billing cycle. No further automatic charges will occur.
        </p>
      </section>

      {/* SECTION 4 */}
      <section className="scroll-mt-24 space-y-3" id="sec-4">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          04. Technical Inquiries
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          4. Technical Billing Inquiries &amp; Erroneous Charges
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          If you experience a technical billing anomaly (such as a duplicate subscription charge caused by payment gateway timeouts), please submit a ticket to{" "}
          <a className="text-[#6d28d9] underline hover:opacity-80 font-medium" href="mailto:billing@viewmarket.in">
            billing@viewmarket.in
          </a>{" "}
          within fourteen (14) days of transaction date. Validated double-charges will be promptly refunded via the original payment channel.
        </p>
      </section>
    </LegalPageShell>
  );
}
