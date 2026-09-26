"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SUPPORTED_BROKERS } from "./brokers-config"
import { BrokerRowItem } from "./broker-row-item"

const FILTER_LABELS: Record<string, string> = {
  all: "All",
  indian: "NSE/BSE",
  crypto: "Crypto",
}

export function BrokerListPanel() {
  const [expandedBrokerId, setExpandedBrokerId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "indian" | "crypto">("all")

  const handleToggle = (id: string) => {
    setExpandedBrokerId((prev) => (prev === id ? null : id))
  }

  const filteredBrokers = useMemo(() => {
    return SUPPORTED_BROKERS.filter((broker) => {
      // Category filter check
      if (selectedFilter === "indian" && broker.marketType !== "indian") return false
      if (selectedFilter === "crypto" && broker.marketType !== "crypto") return false

      // Search query check
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase().trim()
      return (
        broker.name.toLowerCase().includes(q) ||
        broker.tagline.toLowerCase().includes(q) ||
        broker.protocol.toLowerCase().includes(q) ||
        broker.category.toLowerCase().includes(q) ||
        broker.features.some((f) => f.toLowerCase().includes(q))
      )
    })
  }, [searchQuery, selectedFilter])

  return (
    <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4 lg:p-5 max-w-6xl w-full mx-auto">
      {/* Header Controls: Search Input + Polished DropdownMenu */}
      <div className="sticky top-0 z-10 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between bg-zinc-950/90 backdrop-blur-md py-2 border-b border-zinc-900/60">
        {/* Search Panel */}
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search brokers (e.g. Zerodha, Dhan, Protobuf)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 rounded-lg border-zinc-800 bg-zinc-950/80 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0"
          />
        </div>

        {/* Polished Filter Dropdown Menu */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  className="h-10 min-w-36 justify-between rounded-lg border-zinc-800 bg-zinc-950/80 px-3.5 text-sm font-medium text-zinc-100 hover:bg-zinc-900 hover:text-white focus-visible:border-zinc-700 focus-visible:ring-0"
                />
              }
            >
              <span>{FILTER_LABELS[selectedFilter]}</span>
              <ChevronDown className="size-4 text-zinc-400 opacity-80" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              sideOffset={8}
              className="w-44 rounded-xl border-zinc-800 bg-zinc-950 p-1.5 text-zinc-200 shadow-2xl"
            >
              <DropdownMenuItem
                onClick={() => setSelectedFilter("all")}
                className="flex h-9 items-center justify-between rounded-lg px-3 text-sm font-medium cursor-pointer text-zinc-100 hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white transition-colors"
              >
                <span>All</span>
                {selectedFilter === "all" && <Check className="size-4 text-zinc-300" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedFilter("indian")}
                className="flex h-9 items-center justify-between rounded-lg px-3 text-sm font-medium cursor-pointer text-zinc-100 hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white transition-colors"
              >
                <span>NSE/BSE</span>
                {selectedFilter === "indian" && <Check className="size-4 text-zinc-300" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="flex h-9 items-center justify-between rounded-lg px-3 text-sm font-medium text-zinc-600 cursor-not-allowed opacity-50"
              >
                <span>Crypto</span>
                <span className="text-[10px] text-zinc-600 uppercase font-mono">Soon</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Broker Rows */}
      {filteredBrokers.length > 0 ? (
        <div className="space-y-3">
          {filteredBrokers.map((broker) => (
            <BrokerRowItem
              key={broker.id}
              broker={broker}
              isExpanded={expandedBrokerId === broker.id}
              onToggle={() => handleToggle(broker.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 py-12 text-center">
          <p className="text-sm font-medium text-zinc-300">No brokers found</p>
          <p className="mt-1 text-xs text-zinc-500">
            No broker matching &ldquo;{searchQuery}&rdquo; under the selected filter.
          </p>
        </div>
      )}
    </div>
  )
}
