import Image from "next/image";
import heroImage from "@/assets/hero1.png";

export default function LandingAtmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 select-none"
    >
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom opacity-60"
      />
      {/* Legibility veil keeps zinc text at AAA over clouds */}
      <div className="absolute inset-0 bg-[#09090b]/55" />
      {/* Header contrast + footer dissolve into obsidian canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/95 via-[#09090b]/25 to-[#09090b]/90" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent" />
    </div>
  );
}
