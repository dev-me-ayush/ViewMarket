import Image from "next/image";
import logo from "@/assets/logo-landscape.png";
import Link from "next/link";
import Nav from "./Nav";
import HeaderMenu from "./HeaderMenu";

export default function Header({ className = "" }: { className?: string }) {
  return (
    <header className={`flex justify-between items-center px-4 md:px-6 lg:px-9 py-5 max-w-[1400px] mx-auto w-full relative z-20 ${className}`}>
      <Link href="/" id="logo" className="z-20 block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] rounded-lg">
        <Image
          src={logo}
          alt="ViewMarket Logo"
          width={111}
          height={36}
          priority
          className="h-8 w-auto object-contain"
        />
      </Link>

      <Nav />

      <div className="flex gap-2 items-center">
        <HeaderMenu />

        <div className="hidden lg:flex gap-1 p-1 nav-glass-bg rounded-full text-sm">
          <Link href="/sign-in" className="btn-white !py-2 !px-4 rounded-r-lg rounded-l-3xl inline-flex items-center">
            Sign In
          </Link>
          <a href="#builder" className="btn-purple !py-2 !px-4 rounded-l-lg rounded-r-3xl inline-flex items-center">
            Launch Studio
          </a>
        </div>
      </div>
    </header>
  );
}
