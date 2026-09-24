import LegalPageShell from "@/components/legal/LegalPageShell";

export const metadata = {
  title: "Cookie Policy · ViewMarket Legal & Trust Center",
  description:
    "Explanation of the first-party preference cookie, browser storage, and tracking practices used by ViewMarket.",
};

const toc = [
  { id: "sec-1", label: "1. Dashboard Preference Cookie" },
  { id: "sec-2", label: "2. Current Browser Storage" },
  { id: "sec-3", label: "3. Advertising & Tracking" },
  { id: "sec-4", label: "4. Clearing Browser Data" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageShell
      title="Cookie & Browser Storage Policy"
      subtitle="Explanation of the first-party preference cookie, browser storage, and tracking practices used by the current ViewMarket web application."
      effectiveDate="October 24, 2024"
      jurisdiction="Mumbai / New Delhi, Republic of India"
      version="Version 3.2 (Client-Side Storage)"
      tocItems={toc}
      tldr="The current ViewMarket web application writes a first-party sidebar_state cookie when you change the dashboard sidebar state. The cookie expires after seven days, contains only open or collapsed state, and does not identify you. The application does not currently use LocalStorage or IndexedDB and does not deploy advertising or behavioral-tracking cookies."
    >
      <section className="scroll-mt-24 space-y-3" id="sec-1">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          01. Current Cookie Use
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          1. Dashboard Sidebar Preference Cookie
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          The current web application does not set an authentication or advertising cookie. When you toggle the dashboard sidebar, it writes a first-party cookie named <code className="bg-zinc-850 border border-zinc-700 px-1.5 py-0.5 rounded text-xs font-mono text-zinc-200">sidebar_state</code> with the sidebar&apos;s open or collapsed state.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          <li><strong className="text-white">Contents:</strong> The cookie contains only the sidebar state and does not include your name, email address, broker credentials, portfolio data, or authentication token.</li>
          <li><strong className="text-white">Lifetime:</strong> The cookie expires after seven days unless the sidebar preference is changed again.</li>
          <li><strong className="text-white">Access:</strong> The cookie is available to ViewMarket client code in your browser and is not used for advertising or cross-site tracking.</li>
        </ul>
      </section>

      <section className="scroll-mt-24 space-y-3" id="sec-2">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          02. Browser Storage
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          2. Current Browser Storage Usage
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          The current web application does not read or write <code className="bg-zinc-850 border border-zinc-700 px-1.5 py-0.5 rounded text-xs font-mono text-zinc-200">localStorage</code>, <code className="bg-zinc-850 border border-zinc-700 px-1.5 py-0.5 rounded text-xs font-mono text-zinc-200">sessionStorage</code>, or <code className="bg-zinc-850 border border-zinc-700 px-1.5 py-0.5 rounded text-xs font-mono text-zinc-200">IndexedDB</code>. Interactive demonstration state is held in memory and resets when the page reloads or you navigate away.
        </p>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          Broker credentials, portfolio data, and live market ticks are not stored by the current web application. Any future introduction of browser storage or broker connectivity will require a corresponding update to this policy.
        </p>
      </section>

      <section className="scroll-mt-24 space-y-3" id="sec-3">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          03. Advertising Policy
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          3. No Advertising or Behavioral Tracking
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          ViewMarket does not currently load advertising networks, retargeting pixels, or behavioral trackers. The application does not set advertising or behavioral-tracking cookies.
        </p>
      </section>

      <section className="scroll-mt-24 space-y-3" id="sec-4">
        <div className="text-zinc-400 font-bold text-xs tracking-wider uppercase font-mono">
          04. Data Control
        </div>
        <h2 className="font-mackinac text-2xl sm:text-3xl text-white tracking-tight leading-snug font-normal">
          4. Clearing Browser Data
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          You can remove the sidebar cookie by clearing site data for ViewMarket in your browser settings. Clearing site data may also remove other browser permissions, cached files, or locally stored information associated with the site.
        </p>
      </section>
    </LegalPageShell>
  );
}
