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
    <section className="w-full mb-10 pb-8 border-b border-zinc-800">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Legal document breadcrumb"
        className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-4 font-medium"
      >
        <Link
          href="/"
          className="rounded-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
        >
          Home
        </Link>
        <span className="text-zinc-600" aria-hidden="true">
          /
        </span>
        <Link
          href="/legal/terms"
          className="rounded-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
        >
          Legal
        </Link>
        <span className="text-zinc-600" aria-hidden="true">
          /
        </span>
        <span aria-current="page" className="text-white font-semibold">
          {title}
        </span>
      </nav>

      {/* Document Titling */}
      <div className="max-w-4xl">
        <h1 className="font-mackinac text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15] font-normal">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 mt-3 leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>

      {/* Clean Metadata Line */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-6 pt-4 border-t border-zinc-800 text-xs sm:text-sm text-zinc-400">
        <div>
          <span className="text-zinc-500 font-medium">Effective:</span>{" "}
          <span className="font-medium text-zinc-200">{effectiveDate}</span>
        </div>
        <span className="text-zinc-700" aria-hidden="true">
          ·
        </span>
        <div>
          <span className="text-zinc-500 font-medium">Jurisdiction:</span>{" "}
          <span className="font-medium text-zinc-200">{jurisdiction}</span>
        </div>
        <span className="text-zinc-700" aria-hidden="true">
          ·
        </span>
        <div>
          <span className="text-zinc-500 font-medium">Version:</span>{" "}
          <span className="font-medium text-zinc-200">{version}</span>
        </div>
        <span className="text-zinc-700" aria-hidden="true">
          ·
        </span>
        <div>
          <span className="text-zinc-500 font-medium">Inquiries:</span>{" "}
          <a
            href="mailto:legal@viewmarket.in"
            className="rounded-sm font-medium text-zinc-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
          >
            legal@viewmarket.in
          </a>
        </div>
      </div>

      {/* Plain text overview note (TL;DR) */}
      <div className="mt-6 text-sm sm:text-base text-zinc-300 leading-relaxed bg-[#121215] p-5 sm:p-6 rounded-2xl border border-zinc-800 shadow-sm">
        <p>
          <strong className="text-white font-semibold">Plain-English Summary (TL;DR):</strong>{" "}
          {tldr}
        </p>
      </div>
    </section>
  );
}
