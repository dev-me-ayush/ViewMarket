"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const moduleItems = [
    { label: "Visual Strategy Builder", href: "#builder" },
    { label: "Descriptive Analytics", href: "#analytics" },
    { label: "AI Research Assistant", href: "#ai-research" },
    { label: "Open-Source Library", href: "#templates" },
    { label: "Compute Optimization", href: "#compute" },
  ];

  return (
    <ul className="hidden xl:flex gap-1 px-4 nav-glass-bg py-2 justify-center items-center text-sm font-medium rounded-full relative z-30">
      <li
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button
          type="button"
          aria-expanded={isDropdownOpen}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${
            isDropdownOpen ? "text-[#7c3aed]" : "text-[#281950] hover:text-[#7c3aed]"
          }`}
        >
          <span>Modules</span>
          <ChevronDown className={`size-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 top-full pt-2 w-60 z-50">
            <div className="bg-white rounded-2xl p-2 shadow-xl border border-black/[0.06] backdrop-blur-md flex flex-col gap-0.5">
              {moduleItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm text-[#281950] rounded-xl hover:bg-[#7c3aed]/10 hover:text-[#7c3aed] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </li>

      <li>
        <a href="#brokers" className="nav-link">
          Brokers
        </a>
      </li>
      <li>
        <a href="#architecture" className="nav-link">
          Architecture
        </a>
      </li>
      <li>
        <a href="#compliance" className="nav-link">
          Compliance
        </a>
      </li>
      <li>
        <a href="/legal/terms" className="nav-link">
          Legal
        </a>
      </li>
      <li>
        <a href="#pricing" className="nav-link">
          Pricing
        </a>
      </li>
    </ul>
  );
}
