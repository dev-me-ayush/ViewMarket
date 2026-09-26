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
import { SUPPORTED_DATA_PROVIDERS } from "./data-providers-config"
import { DataProviderRowItem } from "./data-provider-row-item"

const FILTER_LABELS: Record<string, string> = {
  all: "All Feeds",
  tick: "Tick-by-Tick",
  eod: "Intraday & EOD",
  custom: "Custom BYOF",
}

export function DataProviderListPanel() {
  const [expandedProviderId, setExpandedProviderId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "tick" | "eod" | "custom">("all")

  const handleToggle = (id: string) => {
    setExpandedProviderId((prev) => (prev === id ? null : id))
  }

  const filteredProviders = useMemo(() => {
    return SUPPORTED_DATA_PROVIDERS.filter((provider) => {
      // Feed type filter
      if (selectedFilter !== "all" && provider.feedType !== selectedFilter) return false

      // Search query check
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase().trim()
      return (
        provider.name.toLowerCase().includes(q) ||
        provider.tagline.toLowerCase().includes(q) ||
        provider.protocol.toLowerCase().includes(q) ||
        provider.category.toLowerCase().includes(q) ||
        provider.marketCoverage.some((m) => m.toLowerCase().includes(q)) ||
        provider.features.some((f) => f.toLowerCase().includes(q))
      )
    })
  }, [searchQuery, selectedFilter])

  return (
    <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4 lg:p-5 max-w-6xl w-full mx-auto">
      {/* Header Controls: Search Input + Filter Dropdown */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Panel */}
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search data providers (e.g. TrueData, Level 2, MCX)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 rounded-lg border-zinc-800 bg-zinc-950/80 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0"
          />
        </div>

        {/* Filter Dropdown Menu */}
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
                <span>All Feeds</span>
                {selectedFilter === "all" && <Check className="size-4 text-zinc-300" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedFilter("tick")}
                className="flex h-9 items-center justify-between rounded-lg px-3 text-sm font-medium cursor-pointer text-zinc-100 hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white transition-colors"
              >
                <span>Tick-by-Tick</span>
                {selectedFilter === "tick" && <Check className="size-4 text-zinc-300" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedFilter("eod")}
                className="flex h-9 items-center justify-between rounded-lg px-3 text-sm font-medium cursor-pointer text-zinc-100 hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white transition-colors"
              >
                <span>Intraday & EOD</span>
                {selectedFilter === "eod" && <Check className="size-4 text-zinc-300" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedFilter("custom")}
                className="flex h-9 items-center justify-between rounded-lg px-3 text-sm font-medium cursor-pointer text-zinc-100 hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white transition-colors"
              >
                <span>Custom BYOF</span>
                {selectedFilter === "custom" && <Check className="size-4 text-zinc-300" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Provider Rows */}
      {filteredProviders.length > 0 ? (
        <div className="space-y-3">
          {filteredProviders.map((provider) => (
            <DataProviderRowItem
              key={provider.id}
              provider={provider}
              isExpanded={expandedProviderId === provider.id}
              onToggle={() => handleToggle(provider.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 py-12 text-center">
          <p className="text-sm font-medium text-zinc-300">No data providers found</p>
          <p className="mt-1 text-xs text-zinc-500">
            No provider matching &ldquo;{searchQuery}&rdquo; under the selected filter.
          </p>
        </div>
      )}
    </div>
  )
}
