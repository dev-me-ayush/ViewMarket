import type { Metadata } from "next"
import { DashboardPlaceholder } from "@/app/dashboard/_components/dashboard-placeholder"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Charts | ViewMarket",
  description: "Inspect market charts and strategy analytics.",
}

export default function ChartsPage() {
  return (
    <>
      <SiteHeader title="Charts" />
      <div className="flex flex-1 flex-col">
        <DashboardPlaceholder
          eyebrow="Analytics"
          title="Charts"
          description="Review price action, strategy overlays, and backtest sweeps with direct client-to-broker market data."
        />
      </div>
    </>
  )
}
