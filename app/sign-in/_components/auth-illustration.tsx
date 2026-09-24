import Image from "next/image";
import authIllustration from "@/assets/auth-illustration.png";

export function AuthIllustration() {
  return (
    <section
      className="hidden lg:block lg:w-1/2 relative bg-[#09090b] overflow-hidden min-h-screen"
      data-purpose="brand-illustration-panel"
    >
      <Image
        src={authIllustration}
        alt="ViewMarket strategy observatory and sovereign trading studio illustration"
        priority
        fill
        unoptimized
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-center select-none pointer-events-none"
      />
    </section>
  );
}
