import { ChevronRight } from "lucide-react";
import Image from "next/image";

import phoenix from "@/assets/phoenix.svg";
import remix from "@/assets/remix.svg";
import nextjs from "@/assets/nextjs.svg";
import rails from "@/assets/rails.svg";
import django from "@/assets/django.svg";
import docker from "@/assets/docker.svg";
import go from "@/assets/go.svg";
import rust from "@/assets/rust.svg";
import laravel from "@/assets/laravel.svg";

export default function Tech() {
  const frameworks = [
    { name: "Phoenix", logo: phoenix },
    { name: "Remix", logo: remix },
    { name: "Rails", logo: rails },
    { name: "Docker", logo: docker },
    { name: "Go", logo: go },
    { name: "Rust", logo: rust },
    { name: "Django", logo: django },
    { name: "Laravel", logo: laravel },
    { name: "Next.js", logo: nextjs },
  ];

  return (
    <section className="bg-transparent px-4 md:px-6 my-16 md:my-24">
      <div className="compliance-banner-bg flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 max-w-[1136px] mx-auto w-full p-8 sm:p-12 md:p-14">
        <div className="flex-1 max-w-xl space-y-6 text-left">
          <h2 className="font-mackinac text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight font-normal">
            Built On Modern High-Performance Stacks
          </h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
            Engineered for low-latency market execution and rigorous mathematical modeling. From real-time WebSocket client pipelines to isolated sandboxed compute runtimes for parallel backtest simulations.
          </p>

          <div className="pt-2">
            <a href="/legal/terms" className="btn-glass-primary inline-flex items-center">
              <span className="font-medium">Explore Architecture</span>
              <ChevronRight className="size-4 text-white/80" />
            </a>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-md">
          {frameworks.map((fw) => (
            <div
              key={fw.name}
              className="btn-glass !rounded-2xl p-5 sm:p-7 flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <Image
                src={fw.logo}
                alt={`${fw.name} logo`}
                className="brightness-0 invert h-7 sm:h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
