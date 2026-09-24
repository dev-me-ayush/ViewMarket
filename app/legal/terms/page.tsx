import LegalPageShell from "@/components/legal/LegalPageShell";
import { TermsSections } from "./_components/terms-sections";

export const metadata = {
  title: "Terms of Service · ViewMarket Legal & Trust Center",
  description:
    "Governing the use of ViewMarket non-custodial trading workflow software, algorithmic strategy builders, compute optimization engines, and broker API connectors.",
};

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

export default function TermsOfServicePage() {
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
      <TermsSections />
    </LegalPageShell>
  );
}
