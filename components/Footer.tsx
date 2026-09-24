import Image from "next/image";
import logoInverted from "@/assets/logo-landscape-inverted.png";

export default function Footer() {
  const columns = [
    {
      title: "Modules",
      links: [
        { label: "Visual Strategy Builder", href: "#builder" },
        { label: "Descriptive Analytics", href: "#analytics" },
        { label: "AI Research Assistant", href: "#ai-research" },
        { label: "Open-Source Library", href: "#templates" },
        { label: "Compute Optimization", href: "#compute" },
      ],
    },
    {
      title: "Brokers",
      links: [
        { label: "Zerodha Kite", href: "#brokers" },
        { label: "Upstox API", href: "#brokers" },
        { label: "Dhan HQ", href: "#brokers" },
        { label: "Angel One SmartAPI", href: "#brokers" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#docs" },
        { label: "Architecture", href: "#architecture" },
        { label: "Regulatory Compliance", href: "/legal/disclaimer" },
        { label: "Platform Status", href: "#status" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "support@viewmarket.in", href: "mailto:support@viewmarket.in" },
        { label: "legal@viewmarket.in", href: "mailto:legal@viewmarket.in" },
        { label: "Community", href: "#community" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/legal/privacy" },
        { label: "Disclaimer", href: "/legal/disclaimer" },
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Risk Disclosure", href: "/legal/risk-disclosure" },
        { label: "Cookies", href: "/legal/cookies" },
        { label: "Refund", href: "/legal/refund" },
      ],
    },
  ];

  return (
    <footer className="bg-[#191034] text-[#a39ac1] px-6 sm:px-10 py-16 sm:py-20 flex flex-col items-center">
      <div className="w-full max-w-[1136px] flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
        <a href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg">
          <Image
            alt="ViewMarket Logo"
            src={logoInverted}
            height={36}
            width={110}
            className="h-8 w-auto object-contain"
          />
        </a>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-10 tracking-tight w-full lg:w-auto">
          {columns.map((col) => (
            <div key={col.title} className="min-w-[120px]">
              <h4 className="uppercase font-semibold mb-4 text-xs text-white tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm footer-link block hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1136px] mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#a39ac1]">
        <p>© {new Date().getFullYear()} ViewMarket Technologies. All rights reserved.</p>
        <p>
          Non-custodial trading workflow software &amp; computational analytics.
        </p>
      </div>
    </footer>
  );
}
