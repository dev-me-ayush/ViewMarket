"use client"

import { useSearchParams } from "next/navigation"
import { ConnectionsOverviewTable } from "./connections-overview-table"
import { BrokerListPanel } from "./broker-list-panel"
import { DataProviderListPanel } from "./data-provider-list-panel"
import { MessagingListPanel } from "./messaging-list-panel"
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
    <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar">
      {currentTab === "overview" && <ConnectionsOverviewTable />}

      {currentTab === "brokers" && <BrokerListPanel />}

      {currentTab === "data-providers" && <DataProviderListPanel />}

      {currentTab === "messaging" && <MessagingListPanel />}
    </div>
  )
}
