import LegalPageShell from "@/components/legal/LegalPageShell";

export const metadata = {
  title: "Cookie Policy · ViewMarket Legal & Trust Center",
  description:
    "Explanation of session security tokens, LocalStorage preferences, and client-side IndexedDB caching in ViewMarket.",
};

export default function CookiePolicyPage() {
  const toc = [
    { id: "sec-1", label: "1. Essential Session Cookies" },
    { id: "sec-2", label: "2. Client-Side Storage" },
    { id: "sec-3", label: "3. Zero Tracking Pixels" },
    { id: "sec-4", label: "4. Clearing Local Data" },
  ];

  return (
    <LegalPageShell
      title="Cookie &amp; Local Storage Policy"
      subtitle="Transparent explanation of session security tokens, client-side LocalStorage preferences, and encrypted IndexedDB usage across ViewMarket."
      effectiveDate="October 24, 2024"
      jurisdiction="Mumbai / New Delhi, Republic of India"
      version="Version 3.2 (Client-Side Storage)"
      tocItems={toc}
      tldr="ViewMarket uses strictly necessary authentication cookies to maintain your login session. We utilize browser LocalStorage and IndexedDB to store your active charting templates, indicator settings, and ephemeral broker credentials on your device. We NEVER deploy third-party advertising cookies, cross-site trackers, or data-broker pixels."
    >
      {/* SECTION 1 */}
      <section className="scroll-mt-24 space-y-3" id="sec-1">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          01. Security &amp; Sessions
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          1. Strictly Necessary Authentication Cookies
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          ViewMarket uses first-party HTTP cookies exclusively to maintain authenticated sessions (via Better Auth) and protect against Cross-Site Request Forgery (CSRF). These cookies are encrypted, marked <code className="bg-purple-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#5300b7]">HttpOnly</code> and <code className="bg-purple-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#5300b7]">SameSite=Lax</code>, and cannot be disabled without preventing login to the platform.
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="scroll-mt-24 space-y-3" id="sec-2">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          02. Browser Storage Architecture
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          2. Client-Side LocalStorage &amp; IndexedDB Storage
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          Rather than transmitting sensitive trading data to our servers, ViewMarket utilizes standard web browser storage APIs:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          <li><strong>Encrypted IndexedDB:</strong> Holds your temporary broker API session tokens and active WebSocket connection metadata during market hours.</li>
          <li><strong>LocalStorage:</strong> Retains client UI state such as active chart interval (1m, 5m, 15m), customized moving average periods, indicator visual colors, and sidebar collapse states.</li>
        </ul>
      </section>

      {/* SECTION 3 */}
      <section className="scroll-mt-24 space-y-3" id="sec-3">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          03. Advertising Policy
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          3. Zero Behavioral Advertising or Third-Party Pixels
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          We do not partner with ad networks. ViewMarket embeds zero third-party behavioral trackers, retargeting pixels (e.g., Meta Pixel, Google AdSense), or surveillance scripts. Your trading activities and algorithmic rules are never monitored for targeted marketing.
        </p>
      </section>

      {/* SECTION 4 */}
      <section className="scroll-mt-24 space-y-3" id="sec-4">
        <div className="text-[#6d28d9] font-bold text-xs tracking-wider uppercase font-mono">
          04. Data Control
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-[#281950] tracking-tight leading-snug font-normal">
          4. Managing &amp; Purging Local Data
        </h2>
        <p className="text-base sm:text-lg text-[#281950]/80 leading-relaxed font-normal">
          You can clear your local tokens and chart preferences at any time by clicking <strong>&quot;Disconnect Broker&quot;</strong> in the dashboard or clearing your browser site data for ViewMarket.
        </p>
      </section>
    </LegalPageShell>
  );
}
