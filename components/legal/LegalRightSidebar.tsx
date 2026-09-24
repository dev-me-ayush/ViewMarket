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
    <aside aria-label="On this page" className="w-full lg:sticky lg:top-24">
      {/* Table of Contents Dock */}
      <div className="bg-white rounded-2xl p-4 border border-black/[0.08] shadow-sm">
        <div className="text-xs font-semibold text-[#281950]/75 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <List aria-hidden="true" className="size-3.5 text-[#281950]/70" />
          <span>On This Page</span>
        </div>
        <nav aria-label="On this page">
          <ul className="space-y-1.5 text-xs text-[#281950]/80 border-l border-black/10 pl-3">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block rounded-sm py-0.5 text-[#281950]/80 hover:text-[#6d28d9] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]/40 focus-visible:ring-offset-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-4 pt-3 border-t border-black/[0.06] text-xs text-[#281950]/75">
          <span>Inquiries: </span>
          <a
            href="mailto:legal@viewmarket.in"
            className="rounded-sm text-[#6d28d9] hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9]/40 focus-visible:ring-offset-2"
          >
            legal@viewmarket.in
          </a>
        </div>
      </div>
    </aside>
  );
}
