"use client"

import { useSearchParams } from "next/navigation"
import { DashboardPlaceholder } from "@/app/dashboard/_components/dashboard-placeholder"
import {
  VALID_TABS,
  DEFAULT_TAB,
  type TabKey,
} from "./connections-header-switch"

export function ConnectionsContent() {
  const searchParams = useSearchParams()
  const rawTab = searchParams.get("tab")
  const currentTab: TabKey =
    rawTab && (VALID_TABS as readonly string[]).includes(rawTab)
      ? (rawTab as TabKey)
      : DEFAULT_TAB

  return (
    <div className="flex flex-1 flex-col">
      {currentTab === "brokers" && (
        <DashboardPlaceholder
          eyebrow="Trading execution"
          title="Brokers"
          description="Connect Zerodha Kite, Upstox, Dhan, or Angel One. API keys and sessions remain strictly client-side — orders require human authorization."
        />
      )}

      {currentTab === "data-providers" && (
        <DashboardPlaceholder
          eyebrow="Market feeds & data"
          title="Data Providers"
          description="Configure real-time market data providers, historical tick streams, and external charting feeds."
        />
      )}

      {currentTab === "messaging" && (
        <DashboardPlaceholder
          eyebrow="Alert channels"
          title="Messaging"
          description="Connect Telegram bots, Discord webhooks, or WhatsApp Business endpoints to receive instant strategy and order alerts."
        />
      )}

      {currentTab === "overview" && (
        <DashboardPlaceholder
          eyebrow="Integrations status"
          title="Connection Overview"
          description="Unified view of all connected services, broker session health, live market data feeds, and active messaging channels."
        />
      )}
    </div>
  )
}
