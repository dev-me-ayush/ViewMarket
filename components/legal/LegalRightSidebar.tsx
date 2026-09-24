"use client";

import { List } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

interface LegalRightSidebarProps {
  tocItems?: TocItem[];
}

export default function LegalRightSidebar({ tocItems }: LegalRightSidebarProps) {
  const defaultItems: TocItem[] = [
    { id: "sec-1", label: "1. Overview & Scope" },
    { id: "sec-2", label: "2. Account Terms & Tokens" },
    { id: "sec-3", label: "3. Acceptable Use Policies" },
    { id: "sec-4", label: "4. Billing & Metering" },
    { id: "sec-5", label: "5. Intellectual Property" },
    { id: "sec-6", label: "6. Data Privacy & Security" },
    { id: "sec-7", label: "7. Liability & Disclaimers" },
    { id: "sec-8", label: "8. Termination & Export" },
  ];

  const items = tocItems && tocItems.length > 0 ? tocItems : defaultItems;

  return (
    <aside className="w-full lg:sticky lg:top-24">
      {/* Table of Contents Dock */}
      <div className="bg-white rounded-2xl p-4 border border-black/[0.08] shadow-sm">
        <div className="text-xs font-semibold text-[#281950]/70 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <List className="size-3.5 text-[#281950]/60" />
          <span>On This Page</span>
        </div>
        <ul className="space-y-1.5 text-xs text-[#281950]/80 border-l border-black/10 pl-3">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-[#281950]/75 hover:text-[#6d28d9] hover:underline transition-colors block py-0.5"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-3 border-t border-black/[0.06] text-[11px] text-[#281950]/50">
          <span>Inquiries: </span>
          <a
            href="mailto:legal@viewmarket.in"
            className="text-[#6d28d9] hover:underline font-medium"
          >
            legal@viewmarket.in
          </a>
        </div>
      </div>
    </aside>
  );
}
