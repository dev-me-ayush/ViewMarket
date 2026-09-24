"use client";

import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

export default function HeaderMenu({ inverted = false }: { inverted?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

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
    ? "text-zinc-950"
    : inverted
    ? "text-white"
    : "text-zinc-950";

  return (
    <>
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className={`xl:hidden z-50 p-2 rounded-full transition-colors ${
          isOpen
            ? "bg-zinc-800 text-white"
            : "text-white hover:bg-zinc-850"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="size-6 text-white" /> : <Menu className="size-6 text-white" />}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`w-full max-w-xs h-full bg-[#09090b] border-r border-zinc-800 shadow-2xl p-6 pt-24 flex flex-col justify-between transition-transform duration-300 ease-out ${
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
                className="px-3 py-2 rounded-lg text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-zinc-800 flex flex-col gap-3">
            {session?.user ? (
              <>
                <div className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800/80 mb-1">
                  <p className="text-xs font-semibold text-white truncate">{session.user.name || "Trader"}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{session.user.email}</p>
                </div>
                <Link
                  href="/dashboard/overview"
                  onClick={() => setIsOpen(false)}
                  className="w-full btn-white justify-center !py-2.5 text-center flex items-center gap-2 text-black font-semibold"
                >
                  <LayoutDashboard className="size-4" />
                  <span>Open Dashboard</span>
                </Link>
                <button
                  onClick={async () => {
                    setIsOpen(false);
                    await signOut();
                  }}
                  className="w-full py-2 px-3 rounded-lg border border-red-950/50 bg-red-950/20 text-red-400 hover:text-red-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LogOut className="size-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="w-full btn-black justify-center !py-2.5 text-center block text-white"
                >
                  Sign In
                </Link>
                <a
                  href="#builder"
                  onClick={() => setIsOpen(false)}
                  className="w-full btn-white justify-center !py-2.5 text-center block text-black font-semibold"
                >
                  Launch Studio
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
