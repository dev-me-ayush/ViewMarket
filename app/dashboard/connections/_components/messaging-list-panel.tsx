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
import { SUPPORTED_MESSAGING_PROVIDERS } from "./messaging-config"
import { MessagingRowItem } from "./messaging-row-item"

const FILTER_LABELS: Record<string, string> = {
  all: "All Channels",
  chat: "Chat Bots",
  webhook: "Webhooks",
  push: "Critical Push",
}

export function MessagingListPanel() {
  const [expandedProviderId, setExpandedProviderId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "chat" | "webhook" | "push">("all")

  const handleToggle = (id: string) => {
    setExpandedProviderId((prev) => (prev === id ? null : id))
  }

  const filteredProviders = useMemo(() => {
    return SUPPORTED_MESSAGING_PROVIDERS.filter((provider) => {
      // Filter by channel type
      if (selectedFilter !== "all" && provider.channelType !== selectedFilter) return false

      // Search query check
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase().trim()
      return (
        provider.name.toLowerCase().includes(q) ||
        provider.tagline.toLowerCase().includes(q) ||
        provider.protocol.toLowerCase().includes(q) ||
        provider.category.toLowerCase().includes(q) ||
        provider.features.some((f) => f.toLowerCase().includes(q))
      )
    })
  }, [searchQuery, selectedFilter])

  return (
    <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4 lg:p-5 max-w-6xl w-full mx-auto">
      {/* Search Input + Channel Type Filter */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search channels (e.g. Telegram, Discord, Webhook)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 rounded-lg border-zinc-800 bg-zinc-950/80 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0"
          />
        </div>

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
                <span>All Channels</span>
                {selectedFilter === "all" && <Check className="size-4 text-zinc-300" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedFilter("chat")}
                className="flex h-9 items-center justify-between rounded-lg px-3 text-sm font-medium cursor-pointer text-zinc-100 hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white transition-colors"
              >
                <span>Chat Bots</span>
                {selectedFilter === "chat" && <Check className="size-4 text-zinc-300" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedFilter("webhook")}
                className="flex h-9 items-center justify-between rounded-lg px-3 text-sm font-medium cursor-pointer text-zinc-100 hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white transition-colors"
              >
                <span>Webhooks</span>
                {selectedFilter === "webhook" && <Check className="size-4 text-zinc-300" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedFilter("push")}
                className="flex h-9 items-center justify-between rounded-lg px-3 text-sm font-medium cursor-pointer text-zinc-100 hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white transition-colors"
              >
                <span>Critical Push</span>
                {selectedFilter === "push" && <Check className="size-4 text-zinc-300" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Provider Rows */}
      {filteredProviders.length > 0 ? (
        <div className="space-y-3">
          {filteredProviders.map((provider) => (
            <MessagingRowItem
              key={provider.id}
              provider={provider}
              isExpanded={expandedProviderId === provider.id}
              onToggle={() => handleToggle(provider.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 py-12 text-center">
          <p className="text-sm font-medium text-zinc-300">No messaging channels found</p>
          <p className="mt-1 text-xs text-zinc-500">
            No alert channel matching &ldquo;{searchQuery}&rdquo; under the selected filter.
          </p>
        </div>
      )}
    </div>
  )
}
