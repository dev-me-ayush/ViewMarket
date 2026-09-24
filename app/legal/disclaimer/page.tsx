import LegalPageShell from "@/components/legal/LegalPageShell";
import { DisclaimerSections } from "./_components/disclaimer-sections";

export const metadata = {
  title: "Disclaimer · ViewMarket Legal & Trust Center",
  description:
    "Statutory disclosures under SEBI regulations, non-prescriptive analytics boundaries, and non-custodial execution tooling limitations.",
};

const toc = [
  { id: "sec-1", label: "1. SEBI Non-Registration" },
  { id: "sec-2", label: "2. Descriptive vs. Prescriptive" },
  { id: "sec-3", label: "3. Confirmation & Intent Parsing" },
  { id: "sec-4", label: "4. No Performance Marketing" },
  { id: "sec-5", label: "5. Broker API & Network Latency" },
];

export default function DisclaimerPage() {
  return (
    <LegalPageShell
      title="Disclaimer &amp; Regulatory Notice"
      subtitle="Statutory disclosures under SEBI regulations, non-prescriptive analytics boundaries, and non-custodial execution tooling limitations."
      effectiveDate="October 24, 2024"
      jurisdiction="Mumbai / New Delhi, Republic of India"
      version="Version 3.2 (SEBI Compliance)"
      tocItems={toc}
      tldr="ViewMarket is NOT a SEBI-registered Investment Adviser (IA) or Research Analyst (RA). The platform generates mathematical calculations, historical indicators, and corporate filing digests only. We NEVER provide trading recommendations, buy/sell calls, target prices, or profit guarantees. You are solely responsible for all trade decisions and risk parameters."
    >
      <DisclaimerSections />
    </LegalPageShell>
  );
}
