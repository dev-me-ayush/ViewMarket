"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Nav({ inverted = false }: { inverted?: boolean }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const moduleItems = [
    { label: "Visual Strategy Builder", href: "#builder" },
    { label: "Descriptive Analytics", href: "#analytics" },
    { label: "AI Research Assistant", href: "#ai-research" },
    { label: "Open-Source Library", href: "#templates" },
    { label: "Compute Optimization", href: "#compute" },
  ];

  const linkClass = "px-3 py-1.5 text-zinc-300 hover:text-white rounded-full transition-colors";

  return (
    <ul className="hidden xl:flex gap-1 px-4 py-2 justify-center items-center text-sm font-medium rounded-full relative z-30 bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-sm">
      <li
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button
          type="button"
          aria-expanded={isDropdownOpen}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${
            isDropdownOpen
              ? "text-white bg-zinc-800"
              : "text-zinc-300 hover:text-white"
          }`}
        >
          <span>Modules</span>
          <ChevronDown className={`size-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 top-full pt-2 w-60 z-50">
            <div className="bg-[#121215] rounded-2xl p-2 shadow-2xl border border-zinc-800 backdrop-blur-md flex flex-col gap-0.5">
              {moduleItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm text-zinc-300 rounded-xl hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </li>

      <li>
        <a href="#brokers" className={linkClass}>
          Brokers
        </a>
      </li>
      <li>
        <a href="#architecture" className={linkClass}>
          Architecture
        </a>
      </li>
      <li>
        <a href="#compliance" className={linkClass}>
          Compliance
        </a>
      </li>
      <li>
        <a href="/legal/terms" className={linkClass}>
          Legal
        </a>
      </li>
      <li>
        <a href="#pricing" className={linkClass}>
          Pricing
        </a>
      </li>
    </ul>
  );
}
