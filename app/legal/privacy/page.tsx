import LegalPageShell from "@/components/legal/LegalPageShell";

export const metadata = {
  title: "Privacy Policy · ViewMarket Legal & Trust Center",
  description:
    "How ViewMarket collects, isolates, encrypts, and protects user data under the Indian Digital Personal Data Protection (DPDP) Act, 2023.",
};

export default function PrivacyPolicyPage() {
  const toc = [
    { id: "sec-1", label: "1. DPDP Act Compliance" },
    { id: "sec-2", label: "2. Zero Broker Token Storage" },
    { id: "sec-3", label: "3. Market Data Isolation" },
    { id: "sec-4", label: "4. Information We Retain" },
    { id: "sec-5", label: "5. User Rights & Erasure" },
  ];

  return (
    <LegalPageShell
      title="Privacy Policy"
      subtitle="How ViewMarket collects, isolates, encrypts, and protects user data under the Indian Digital Personal Data Protection (DPDP) Act, 2023."
      effectiveDate="October 24, 2024"
      jurisdiction="Mumbai / New Delhi, Republic of India"
      version="Version 3.2 (DPDP Act Compliant)"
      tocItems={toc}
      tldr="ViewMarket enforces a strict zero-knowledge architecture for financial secrets. We NEVER store, see, or log your broker API secrets, trading PINs, portfolio balances, or real-time trade ticks on our servers. All broker credentials reside exclusively inside your browser's encrypted local storage. We retain only basic identity data required for user login and compute billing."
    >
      {/* SECTION 1 */}
      <section className="scroll-mt-24 space-y-3" id="sec-1">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          01. Statutory Framework
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          1. Digital Personal Data Protection (DPDP) Act, 2023 Compliance
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          ViewMarket serves as a <strong>Data Fiduciary</strong> in respect of your account identity data under the provisions of the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
        </p>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          We collect and process digital personal data solely on the basis of your explicit, informed consent for the purpose of granting access to the ViewMarket software suite. We do not sell, rent, or trade user data to third-party marketing brokers or financial institutions.
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="scroll-mt-24 space-y-3" id="sec-2">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          02. Cryptographic Isolation
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          2. Client-Side Secret Isolation: Zero Broker Token Storage
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          To eliminate the risk of server-side credential breaches, ViewMarket is architected with zero-token backend storage:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          <li><strong>Client-Side Storage Only:</strong> Broker API keys, API secrets, TOTP keys, and ephemeral access tokens are stored strictly in client browser memory or encrypted <code className="bg-purple-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#5300b7]">IndexedDB</code> on your device.</li>
          <li><strong>Zero Server Transmission:</strong> Broker authentication tokens are never transmitted to, relayed through, or stored on ViewMarket backend databases.</li>
        </ul>
      </section>

      {/* SECTION 3 */}
      <section className="scroll-mt-24 space-y-3" id="sec-3">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          03. Market Data Architecture
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          3. Market Data Isolation &amp; Zero Tick Relaying
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          Live tick data for Indian equities and F&amp;O streams directly from your broker&apos;s authorized WebSocket servers to your browser client (<code className="bg-purple-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#5300b7]">wss://</code>). Zero market ticks pass through or are cached on ViewMarket servers, ensuring full compliance with NSE and BSE market data licensing guidelines.
        </p>
      </section>

      {/* SECTION 4 */}
      <section className="scroll-mt-24 space-y-3" id="sec-4">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          04. Data Retention
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          4. Information We Collect and Retain
        </h2>
        <div className="space-y-3 text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          <p>We retain only the minimum data required to deliver the software:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-base">
            <li><strong>Authentication Data:</strong> Name, email address, and OAuth provider identifier (Google or GitHub).</li>
            <li><strong>User-Authored Strategies:</strong> Saved flowchart conditions, indicator parameters, and backtest history stored in isolated user workspaces.</li>
            <li><strong>Billing Records:</strong> Transaction IDs and tax invoice data processed securely via Razorpay or Stripe. ViewMarket never stores credit card or bank credentials.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="scroll-mt-24 space-y-3" id="sec-5">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          05. Data Subject Rights
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          5. Rights of Data Principals &amp; Complete Erasure
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          Under Section 11–13 of the DPDP Act, you have the right to access, rectify, and permanently erase your account data. Initiating an account deletion request permanently wipes your saved strategies, user metadata, and backtest logs across our backend infrastructure.
        </p>
      </section>
    </LegalPageShell>
  );
}
