import { ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface CardProps {
  title: string;
  desc: string;
  img: StaticImageData;
  alt: string;
  w?: number;
  h?: number;
  reverse?: boolean;
  btn?: string;
  href?: string;
}

export default function Card({
  title,
  desc,
  img,
  alt,
  reverse = false,
  btn = "",
  href = "#",
}: CardProps) {
  return (
    <div
      className={`w-full max-w-[1136px] mx-auto flex flex-col items-center justify-between gap-10 md:gap-14 lg:gap-20 ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="flex-1 max-w-xl space-y-5 text-left">
        <h2 className="font-mackinac text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug font-normal">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
          {desc}
        </p>

        {btn && (
          <div className="pt-2">
            <a href={href} className="btn-white inline-flex items-center text-sm sm:text-base font-semibold text-black">
              <span>{btn}</span>
              <ChevronRight className="size-4 text-black" />
            </a>
          </div>
        )}
      </div>

      <div className="flex-1 flex justify-center items-center w-full max-w-md">
        <Image
          src={img}
          alt={alt}
          className="w-full max-w-[420px] h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
