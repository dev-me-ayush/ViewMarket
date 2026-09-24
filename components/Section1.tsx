import Image from "next/image";
import web from "@/assets/web.svg";
import connection from "@/assets/connection.svg";
import thunder from "@/assets/thunder.svg";
import spot from "@/assets/spot.svg";
import worldGlobe from "@/assets/world-globe.png";
import complianceShield from "@/assets/compliance-shield.png";
import Card from "./Card";
import Enterprise from "./Enterprise";

export default function Section1() {
  const card1 = {
    title: "Direct Client-to-Broker Execution. Zero Central Server Relay.",
    desc: "Your trading credentials and live market data belong entirely to you. ViewMarket connects your browser directly to supported broker WebSocket gateways using your ephemeral session tokens. Zero tick streaming, zero order routing, and zero broker credentials ever pass through or touch our backend servers.",
    img: worldGlobe,
    alt: "ViewMarket direct client-to-broker execution illustration",
    reverse: false,
    btn: "",
  };

  const card2 = {
    title: "Substance Over Form. 100% Indian Market Regulatory Compliance.",
    desc: "We provide clean, unlicensed SaaS tooling and workflow automation—not unsolicited trading tips, black-box auto-bots, or speculative Telegram advice. All orders enforce mandatory human click-to-trade verification under SEBI retail guidelines.",
    img: complianceShield,
    alt: "100% Non-Advisory and Human Click-to-Trade regulatory verification seal",
    reverse: false,
    btn: "View Compliance Details",
    href: "/legal/disclaimer",
  };

  const features = [
    {
      icon: web,
      iconClass: "icon-green",
      title: "BYOA Model (Bring Your Own Account)",
      desc: "Connect your personal API keys for Zerodha Kite, Upstox, Dhan, or Angel One seamlessly with zero custodial risk or counterparty exposure.",
    },
    {
      icon: connection,
      iconClass: "icon-blue",
      title: "Mandatory Click-to-Trade Confirmation",
      desc: "Zero unattended auto-trading. Every trade staging triggers an explicit confirmation modal displaying Scrip, Exchange, Quantity, and Product type before execution.",
    },
    {
      icon: thunder,
      iconClass: "icon-orange",
      title: "Descriptive Analytics & Real-Time Ratios",
      desc: "Mathematical momentum conditions (SMA, RSI, ATR volatility, Camarilla pivots) and automated balance sheet summaries from public corporate filings.",
    },
    {
      icon: spot,
      iconClass: "icon-yellow",
      title: "Sandboxed Compute-as-a-Service",
      desc: "Run heavy multi-parameter simulations and backtesting sweeps on dedicated isolated cloud vCPUs without leaking your proprietary logic.",
    },
  ];

  return (
    <section className="bg-transparent py-20 md:py-32 flex flex-col items-center gap-24 md:gap-32 px-4 md:px-6">
      <Card
        reverse={card1.reverse}
        title={card1.title}
        desc={card1.desc}
        img={card1.img}
        alt={card1.alt}
        btn={card1.btn}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-[1136px] w-full">
        {features.map((feat) => (
          <div key={feat.title} className="flex gap-6 items-start">
            <div className={`icon ${feat.iconClass} shrink-0`} aria-hidden="true">
              <Image
                src={feat.icon}
                alt=""
                width={24}
                height={24}
                unoptimized
                className="size-6 brightness-0 invert"
              />
            </div>
            <div className="flex flex-col gap-2">
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

      <div className="w-full max-w-[1136px] compliance-banner-bg p-8 sm:p-12 md:p-14">
        <Card
          reverse={card2.reverse}
          title={card2.title}
          desc={card2.desc}
          img={card2.img}
          alt={card2.alt}
          btn={card2.btn}
          href={card2.href}
        />
      </div>

      <Enterprise />
    </section>
  );
}
