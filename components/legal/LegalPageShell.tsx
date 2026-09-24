import LegalDocumentHero from "@/components/legal/LegalDocumentHero";
import LegalSidebar from "@/components/legal/LegalSidebar";
import LegalRightSidebar from "@/components/legal/LegalRightSidebar";

interface TocItem {
  id: string;
  label: string;
}

interface LegalPageShellProps {
  title: string;
  subtitle: string;
  effectiveDate: string;
  jurisdiction: string;
  version: string;
  tldr: string;
  tocItems?: TocItem[];
  children: React.ReactNode;
}

export default function LegalPageShell({
  title,
  subtitle,
  effectiveDate,
  jurisdiction,
  version,
  tldr,
  tocItems,
  children,
}: LegalPageShellProps) {
  return (
    <div className="w-full">
      {/* 1. Full-width Hero spanning the entire page width */}
      <LegalDocumentHero
        title={title}
        subtitle={subtitle}
        effectiveDate={effectiveDate}
        jurisdiction={jurisdiction}
        version={version}
        tldr={tldr}
      />

      {/* 2. Fluid 3-column layout with generous center width */}
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start mt-8 w-full">
        {/* Left Column: Index & Certifications */}
        <div className="w-full lg:w-64 xl:w-72 shrink-0">
          <LegalSidebar />
        </div>

        {/* Center Column: Editorial Legal Article (expanded full width) */}
        <article className="flex-1 min-w-0 max-w-4xl space-y-12 w-full text-left">
          {children}
        </article>

        {/* Right Column: Sticky Table of Contents & Support */}
        <div className="w-60 xl:w-64 shrink-0 hidden lg:block">
          <LegalRightSidebar tocItems={tocItems} />
        </div>
      </div>
    </div>
  );
}
