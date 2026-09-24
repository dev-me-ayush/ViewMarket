"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { useState } from "react";

export default function NavAuth() {
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
    router.refresh();
  };

  // Zero-CLS skeleton placeholder matching exact dimensions
  if (isPending) {
    return (
      <div
        aria-hidden="true"
        className="hidden lg:flex items-center gap-2 h-10 w-[210px] rounded-full bg-zinc-900/60 border border-zinc-800/80 animate-pulse"
      />
    );
  }

  // Authenticated State: Show Dashboard CTA & User Profile Controls
  if (session?.user) {
    const userInitial = session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || "U";

    return (
      <div className="relative hidden lg:flex items-center gap-1.5 p-1 rounded-full text-sm bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
        <Link
          href="/dashboard/overview"
          className="btn-white !py-1.5 !px-4 rounded-full inline-flex items-center gap-1.5 font-semibold text-black text-xs shadow-sm hover:opacity-95 transition-all"
        >
          <LayoutDashboard className="size-3.5" />
          <span>Dashboard</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="User account menu"
            className="flex items-center justify-center size-7 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white hover:border-zinc-600 transition-colors text-xs font-semibold"
          >
            {session.user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="size-full rounded-full object-cover"
              />
            ) : (
              <span>{userInitial}</span>
            )}
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-xl bg-zinc-950 border border-zinc-800 p-2 shadow-2xl z-50 text-xs"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="px-3 py-2 border-b border-zinc-800/80 mb-1">
                <p className="font-semibold text-white truncate">{session.user.name || "Trader"}</p>
                <p className="text-zinc-400 text-[11px] truncate">{session.user.email}</p>
              </div>

              <Link
                href="/dashboard/overview"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <User className="size-3.5 text-zinc-400" />
                <span>Strategy Studio</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors mt-1"
              >
                <LogOut className="size-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Unauthenticated State: Show Sign In & Launch Studio CTAs
  return (
    <div className="hidden lg:flex gap-1.5 p-1 rounded-full text-sm bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
      <Link
        href="/sign-in"
        className="text-zinc-300 hover:text-white hover:bg-zinc-800 !py-2 !px-4 rounded-full inline-flex items-center transition-all font-medium"
      >
        Sign In
      </Link>
      <a
        href="#builder"
        className="btn-white !py-2 !px-4.5 rounded-full inline-flex items-center font-semibold text-black"
      >
        Launch Studio
      </a>
    </div>
  );
}
