import Image from "next/image";
import logo from "@/assets/logo-landscape.png";
import logoInverted from "@/assets/logo-landscape-inverted.png";
import Link from "next/link";
import Nav from "./Nav";
import HeaderMenu from "./HeaderMenu";

export default function Header({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <header className={`flex justify-between items-center px-4 md:px-6 lg:px-9 py-5 max-w-[1400px] mx-auto w-full relative z-20 ${className}`}>
      <Link href="/" id="logo" className="z-20 block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] rounded-lg">
        <Image
          src={inverted ? logoInverted : logo}
          alt="ViewMarket Logo"
          width={220}
          height={36}
          priority
          className="h-9 md:h-10 w-auto object-contain"
        />
      </Link>

      <Nav inverted={inverted} />

      <div className="flex gap-2 items-center">
        <HeaderMenu inverted={inverted} />

        <div className={`hidden lg:flex gap-1 p-1 rounded-full text-sm ${
          inverted ? "bg-white/10 border border-white/20 backdrop-blur-md" : "nav-glass-bg"
        }`}>
          <Link
            href="/sign-in"
            className={`${
              inverted
                ? "text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20"
                : "btn-white"
            } !py-2 !px-4 rounded-r-lg rounded-l-3xl inline-flex items-center transition-all`}
          >
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
