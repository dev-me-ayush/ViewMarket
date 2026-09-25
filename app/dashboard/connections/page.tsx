import type { Metadata } from "next"
import { DashboardPlaceholder } from "@/app/dashboard/_components/dashboard-placeholder"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Connections | ViewMarket",
  description: "Manage personal broker connections.",
}

export default function ConnectionsPage() {
  return (
    <>
      <SiteHeader title="Connections" />
      <div className="flex flex-1 flex-col">
        <DashboardPlaceholder
          eyebrow="Broker access"
          title="Connections"
          description="Connect Zerodha Kite, Upstox, Dhan, or Angel One. Credentials stay in your browser — nothing is stored on ViewMarket servers."
        />
      </div>
    </>
  )
}
