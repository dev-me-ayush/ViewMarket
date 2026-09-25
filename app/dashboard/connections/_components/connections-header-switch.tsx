"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2Icon,
  DatabaseIcon,
  LayoutGridIcon,
  MessageSquareIcon,
} from "lucide-react"

export const VALID_TABS = ["brokers", "data-providers", "messaging", "overview"] as const
export type TabKey = (typeof VALID_TABS)[number]

export const DEFAULT_TAB: TabKey = "brokers"

export function ConnectionsHeaderSwitch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const rawTab = searchParams.get("tab")
  const currentTab: TabKey =
    rawTab && (VALID_TABS as readonly string[]).includes(rawTab)
      ? (rawTab as TabKey)
      : DEFAULT_TAB

  React.useEffect(() => {
    if (!rawTab || !(VALID_TABS as readonly string[]).includes(rawTab)) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("tab", DEFAULT_TAB)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [rawTab, pathname, router, searchParams])

  const handleTabChange = React.useCallback(
    (nextTab: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("tab", nextTab)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className="w-auto"
    >
      <TabsList className="h-7 bg-muted/60 p-0.5 text-xs">
        <TabsTrigger value="brokers" className="gap-1.5 px-2.5 py-0.5 text-xs">
          <Building2Icon className="size-3.5" />
          <span className="hidden sm:inline">Brokers</span>
        </TabsTrigger>
        <TabsTrigger value="data-providers" className="gap-1.5 px-2.5 py-0.5 text-xs">
          <DatabaseIcon className="size-3.5" />
          <span className="hidden sm:inline">Data Providers</span>
        </TabsTrigger>
        <TabsTrigger value="messaging" className="gap-1.5 px-2.5 py-0.5 text-xs">
          <MessageSquareIcon className="size-3.5" />
          <span className="hidden sm:inline">Messaging</span>
        </TabsTrigger>
        <TabsTrigger value="overview" className="gap-1.5 px-2.5 py-0.5 text-xs">
          <LayoutGridIcon className="size-3.5" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
