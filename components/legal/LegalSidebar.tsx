"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Cookie as CookieIcon,
  RefreshCw,
} from "lucide-react";

export default function LegalSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Terms of Service", href: "/legal/terms", icon: Scale },
    { label: "Privacy Policy", href: "/legal/privacy", icon: ShieldCheck },
    { label: "Disclaimer", href: "/legal/disclaimer", icon: FileText },
    { label: "Risk Disclosure", href: "/legal/risk-disclosure", icon: AlertTriangle },
    { label: "Cookie Policy", href: "/legal/cookies", icon: CookieIcon },
    { label: "Refund Policy", href: "/legal/refund", icon: RefreshCw },
  ];

  return (
    <aside className="w-full lg:sticky lg:top-24">
      {/* Index Navigation Card */}
      <div className="bg-[#121215] rounded-2xl p-3 border border-zinc-800 shadow-md">
        <div className="px-3 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Legal Documents
        </div>
        <nav aria-label="Legal documents" className="mt-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-zinc-800 text-white font-semibold shadow-xs"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className={`size-4 shrink-0 ${
                    isActive ? "text-white" : "text-zinc-500"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pt-3 mt-3 border-t border-zinc-800 text-xs text-zinc-400">
          <span>Inquiries: </span>
          <a
            href="mailto:legal@viewmarket.in"
            className="rounded-sm text-zinc-200 hover:text-white hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
          >
            legal@viewmarket.in
          </a>
        </div>
      </div>
    </aside>
  );
}
