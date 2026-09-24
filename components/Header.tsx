import Image from "next/image";
import logo from "@/assets/logo-landscape.png";
import logoInverted from "@/assets/logo-landscape-inverted.png";
import Link from "next/link";
import Nav from "./Nav";
import HeaderMenu from "./HeaderMenu";
import NavAuth from "./NavAuth";

export default function Header({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <header className={`flex justify-between items-center px-4 md:px-6 lg:px-9 py-5 max-w-[1400px] mx-auto w-full relative z-20 ${className}`}>
      <Link href="/" id="logo" className="z-20 block focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-lg">
        <Image
          src={logoInverted}
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
        <NavAuth />
      </div>
    </header>
  );
}
