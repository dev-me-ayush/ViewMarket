"use client";

import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function HeaderMenu({ inverted = false }: { inverted?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const nav = [
    { name: "Visual Strategy Builder", href: "#builder" },
    { name: "Descriptive Analytics", href: "#analytics" },
    { name: "AI Research Assistant", href: "#ai-research" },
    { name: "Open-Source Library", href: "#templates" },
    { name: "Supported Brokers", href: "#brokers" },
    { name: "Architecture", href: "#architecture" },
    { name: "Regulatory Compliance", href: "#compliance" },
    { name: "Legal & Trust Center", href: "/legal/terms" },
    { name: "Pricing", href: "#pricing" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const iconColor = isOpen
    ? "text-[#281950]"
    : inverted
    ? "text-white"
    : "text-[#281950]";

  return (
    <>
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className={`xl:hidden z-50 p-2 rounded-full transition-colors ${
          isOpen
            ? "bg-white shadow-sm"
            : inverted
            ? "hover:bg-white/10"
            : "hover:bg-black/5"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className={`size-6 ${iconColor}`} /> : <Menu className={`size-6 ${iconColor}`} />}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`w-full max-w-xs h-full bg-white shadow-2xl p-6 pt-24 flex flex-col justify-between transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col gap-1 overflow-y-auto">
            {nav.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-[#281950] hover:bg-[#7c3aed]/10 hover:text-[#7c3aed] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-black/5 flex flex-col gap-3">
            <a
              href="/sign-in"
              onClick={() => setIsOpen(false)}
              className="w-full btn-white justify-center !py-2.5 text-center block"
            >
              Sign In
            </a>
            <a
              href="#builder"
              onClick={() => setIsOpen(false)}
              className="w-full btn-purple justify-center !py-2.5 text-center block"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
