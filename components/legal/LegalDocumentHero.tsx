import Link from "next/link";

interface LegalDocumentHeroProps {
  title: string;
  subtitle: string;
  effectiveDate: string;
  jurisdiction: string;
  version: string;
  tldr: string;
}

export default function LegalDocumentHero({
  title,
  subtitle,
  effectiveDate,
  jurisdiction,
  version,
  tldr,
}: LegalDocumentHeroProps) {
  return (
    <section className="w-full mb-10 pb-8 border-b border-black/[0.08]">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Legal document breadcrumb"
        className="flex items-center gap-2 text-xs sm:text-sm text-[#281950]/75 mb-4 font-medium"
      >
        <Link
          href="/"
          className="rounded-sm hover:text-[#6d28d9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]/40 focus-visible:ring-offset-2"
        >
          Home
        </Link>
        <span className="text-black/40" aria-hidden="true">
          /
        </span>
        <Link
          href="/legal/terms"
          className="rounded-sm hover:text-[#6d28d9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]/40 focus-visible:ring-offset-2"
        >
          Legal
        </Link>
        <span className="text-black/40" aria-hidden="true">
          /
        </span>
        <span aria-current="page" className="text-[#6d28d9] font-semibold">
          {title}
        </span>
      </nav>

      {/* Document Titling */}
      <div className="max-w-4xl">
        <h1 className="font-mackinac text-3xl sm:text-4xl md:text-5xl text-[#281950] tracking-tight leading-[1.15] font-normal">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-[#281950]/80 mt-3 leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>

      {/* Clean Metadata Line */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-6 pt-4 border-t border-black/[0.06] text-xs sm:text-sm text-[#281950]/75">
        <div>
          <span className="text-[#281950]/70 font-medium">Effective:</span>{" "}
          <span className="font-medium text-[#281950]">{effectiveDate}</span>
        </div>
        <span className="text-black/30" aria-hidden="true">
          ·
        </span>
        <div>
          <span className="text-[#281950]/70 font-medium">Jurisdiction:</span>{" "}
          <span className="font-medium text-[#281950]">{jurisdiction}</span>
        </div>
        <span className="text-black/30" aria-hidden="true">
          ·
        </span>
        <div>
          <span className="text-[#281950]/70 font-medium">Version:</span>{" "}
          <span className="font-medium text-[#281950]">{version}</span>
        </div>
        <span className="text-black/30" aria-hidden="true">
          ·
        </span>
        <div>
          <span className="text-[#281950]/70 font-medium">Inquiries:</span>{" "}
          <a
            href="mailto:legal@viewmarket.in"
            className="rounded-sm font-medium text-[#6d28d9] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]/40 focus-visible:ring-offset-2"
          >
            legal@viewmarket.in
          </a>
        </div>
      </div>

      {/* Plain text overview note (TL;DR) */}
      <div className="mt-6 text-sm sm:text-base text-[#281950]/80 leading-relaxed bg-white/70 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-black/[0.08] shadow-sm">
        <p>
          <strong className="text-[#281950] font-semibold">Plain-English Summary (TL;DR):</strong>{" "}
          {tldr}
        </p>
      </div>
    </section>
  );
}
