"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Plus, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  INITIAL_CONNECTED_SERVICES,
  type ConnectedServiceItem,
  type ConnectionCategory,
} from "./connections-overview-config"
import { ConnectionTableRow } from "./connection-table-row"
import { ConnectionAuthModal } from "./connection-auth-modal"

export function ConnectionsOverviewTable() {
  const [services, setServices] = useState<ConnectedServiceItem[]>(INITIAL_CONNECTED_SERVICES)
  const [selectedTab, setSelectedTab] = useState<string>("all")
  const [activeModalItem, setActiveModalItem] = useState<ConnectedServiceItem | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // Counts for tab badges
  const counts = useMemo(() => {
    return {
      all: services.length,
      broker: services.filter((s) => s.category === "broker").length,
      "data-provider": services.filter((s) => s.category === "data-provider").length,
      messaging: services.filter((s) => s.category === "messaging").length,
    }
  }, [services])

  // Filtered rows
  const filteredServices = useMemo(() => {
    if (selectedTab === "all") return services
    return services.filter((s) => s.category === (selectedTab as ConnectionCategory))
  }, [services, selectedTab])

  const handleReAuth = (item: ConnectedServiceItem) => {
    setActiveModalItem(item)
    setAuthModalOpen(true)
  }

  const handleAuthSuccess = (id: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "active",
              statusLabel: "Session Active",
              expiresText: "Valid until 06:00 AM IST",
              latency: "14ms",
            }
          : s
      )
    )
  }

  const handlePing = (item: ConnectedServiceItem) => {
    toast.success(`Ping Verified: ${item.name}`, {
      description: `Latency: ${item.latency} • Socket stream status 200 OK.`,
      duration: 3000,
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4 lg:p-5 max-w-6xl w-full mx-auto">
      {/* Top Toolbar with identical segment pill style as SiteHeader */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-auto">
          <TabsList className="h-7 bg-muted/60 p-0.5 text-xs">
            <TabsTrigger value="all" className="gap-1.5 px-2.5 py-0.5 text-xs">
              <span>All Active</span>
              <span className="rounded-full bg-zinc-800/80 px-1.5 py-0.2 text-[10px] font-mono text-zinc-300">
                {counts.all}
              </span>
            </TabsTrigger>
            <TabsTrigger value="broker" className="gap-1.5 px-2.5 py-0.5 text-xs">
              <span>Brokers</span>
              <span className="rounded-full bg-zinc-800/80 px-1.5 py-0.2 text-[10px] font-mono text-zinc-300">
                {counts.broker}
              </span>
            </TabsTrigger>
            <TabsTrigger value="data-provider" className="gap-1.5 px-2.5 py-0.5 text-xs">
              <span>Data Feeds</span>
              <span className="rounded-full bg-zinc-800/80 px-1.5 py-0.2 text-[10px] font-mono text-zinc-300">
                {counts["data-provider"]}
              </span>
            </TabsTrigger>
            <TabsTrigger value="messaging" className="gap-1.5 px-2.5 py-0.5 text-xs">
              <span>Messaging</span>
              <span className="rounded-full bg-zinc-800/80 px-1.5 py-0.2 text-[10px] font-mono text-zinc-300">
                {counts.messaging}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => toast.info("Checking connection health across all 5 pipelines...")}
            className="h-7 rounded-lg border-zinc-800 bg-zinc-950/80 text-xs text-zinc-300 hover:bg-zinc-900 px-2.5"
          >
            <RefreshCcw className="mr-1.5 size-3" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Link
            href="/dashboard/connections?tab=brokers"
            className="inline-flex h-7 items-center justify-center rounded-lg bg-zinc-100 px-2.5 text-xs font-medium text-zinc-950 hover:bg-white transition-colors"
          >
            <Plus className="mr-1 size-3" />
            <span>Connect</span>
          </Link>
        </div>
      </div>

      {/* Overview Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-xl">
        <Table>
          <TableHeader className="bg-zinc-900/60 border-b border-zinc-800/80">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="w-[30%] pl-4 sm:pl-5 text-xs text-zinc-400 font-medium">Service / Connection</TableHead>
              <TableHead className="hidden md:table-cell text-xs text-zinc-400 font-medium">Category</TableHead>
              <TableHead className="text-xs text-zinc-400 font-medium">Session & Auth Status</TableHead>
              <TableHead className="hidden sm:table-cell text-xs text-zinc-400 font-medium">Latency</TableHead>
              <TableHead className="hidden lg:table-cell text-xs text-zinc-400 font-medium">Market Scope / Channel</TableHead>
              <TableHead className="pr-4 sm:pr-5 text-right text-xs text-zinc-400 font-medium">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ConnectionTableRow
                  key={service.id}
                  item={service}
                  onReAuth={handleReAuth}
                  onPing={handlePing}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center text-xs text-zinc-500">
                  No active services connected in this category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Auth Re-validation Dialog */}
      <ConnectionAuthModal
        item={activeModalItem}
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}
