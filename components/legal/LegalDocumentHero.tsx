import Link from "next/link";

interface LegalDocumentHeroProps {
  title: string;
  subtitle: string;
  effectiveDate: string;
  jurisdiction: string;
  version?: string;
  tldr: string;
}

export default function LegalDocumentHero({
  title,
  subtitle,
  effectiveDate,
  jurisdiction,
  tldr,
}: LegalDocumentHeroProps) {
  return (
    <section className="w-full mb-10 pb-8 border-b border-black/[0.08]">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#281950]/60 mb-4 font-medium">
        <Link href="/" className="hover:text-[#6d28d9] transition-colors">
          Home
        </Link>
        <span className="text-black/30">/</span>
        <Link href="/legal/terms" className="hover:text-[#6d28d9] transition-colors">
          Legal
        </Link>
        <span className="text-black/30">/</span>
        <span className="text-[#6d28d9] font-semibold">{title}</span>
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
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-6 pt-4 border-t border-black/[0.06] text-xs sm:text-sm text-[#281950]/70">
        <div>
          <span className="text-[#281950]/50 font-medium">Effective:</span>{" "}
          <span className="font-medium text-[#281950]">{effectiveDate}</span>
        </div>
        <span className="text-black/20">·</span>
        <div>
          <span className="text-[#281950]/50 font-medium">Jurisdiction:</span>{" "}
          <span className="font-medium text-[#281950]">{jurisdiction}</span>
        </div>
        <span className="text-black/20">·</span>
        <div>
          <span className="text-[#281950]/50 font-medium">Inquiries:</span>{" "}
          <a
            href="mailto:legal@viewmarket.in"
            className="font-medium text-[#6d28d9] hover:underline"
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
