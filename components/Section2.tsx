import Image from "next/image";
import Tech from "./Tech";
import Card from "./Card";
import web from "@/assets/web.svg";
import connection from "@/assets/connection.svg";
import thunder from "@/assets/thunder.svg";
import disciplinedTrader from "@/assets/disciplined-trader.png";
import strategyBuilder from "@/assets/strategy-builder.png";

export default function Section2() {
  const card3 = {
    title: "Visual Strategy Builder With Natural Language Logic Translation",
    desc: "Chain multi-timeframe indicators, candlestick patterns, and mathematical pivot points into clean visual flowcharts. Describe trading ideas in natural language, and let our NLP compiler structure verified rule trees for your inspection.",
    img: strategyBuilder,
    alt: "Visual algorithmic strategy flowchart with rule trees and manual verification",
    reverse: true,
    btn: "",
  };

  const card4 = {
    title: "Systematic, Rule-Based Execution For Disciplined Traders",
    desc: "Graduate from emotional discretionary trading to disciplined, rule-based execution. Connect your broker account in minutes and build your first strategy canvas.",
    img: disciplinedTrader,
    alt: "Systematic rule-based trader studio canvas and workstation illustration",
    reverse: false,
    btn: "Launch Strategy Studio",
    href: "#builder",
  };

  const edgeFeatures = [
    {
      icon: web,
      iconClass: "icon-green",
      title: "Sub-Millisecond Client Rule Evaluation",
      desc: "Browser-based condition engine evaluates live broker WebSocket ticks locally and stages click-to-trade confirmation modals instantly without server latency.",
    },
    {
      icon: connection,
      iconClass: "icon-blue",
      title: "Open-Source Standard Indicator Library",
      desc: "Inspect full source code and formulas for Supertrend, VWAP Mean Reversion, Dual Moving Average Crossovers, and Bollinger Squeezes.",
    },
    {
      icon: thunder,
      iconClass: "icon-orange",
      title: "Embedded SEBI Risk Disclosures",
      desc: "Contextual F&O risk indicators highlighting historical market realities (9 out of 10 individual traders incur net losses) to enforce disciplined capital sizing.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-transparent px-4 md:px-6">
      <Card
        reverse={card3.reverse}
        title={card3.title}
        desc={card3.desc}
        img={card3.img}
        alt={card3.alt}
        btn={card3.btn}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 max-w-[1136px] mx-auto my-20 md:my-28">
        {edgeFeatures.map((feat) => (
          <div key={feat.title} className="flex flex-col gap-5 text-left">
            <div className={`icon ${feat.iconClass}`} aria-hidden="true">
              <Image
                src={feat.icon}
                alt=""
                width={24}
                height={24}
                unoptimized
                className="size-6 brightness-0 invert"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-mackinac text-xl font-medium tracking-tight text-white">
                {feat.title}
              </h3>
              <p className="text-base text-zinc-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Tech />

      <div className="mt-16 md:mt-24">
        <Card
          reverse={card4.reverse}
          title={card4.title}
          desc={card4.desc}
          img={card4.img}
          alt={card4.alt}
          btn={card4.btn}
          href={card4.href}
        />
      </div>
    </section>
  );
}
