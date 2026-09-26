"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink, ShieldCheck, KeyRound, Radio } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { DataProviderDefinition } from "./data-providers-config"

interface DataProviderRowItemProps {
  provider: DataProviderDefinition
  isExpanded: boolean
  onToggle: () => void
}

export function DataProviderRowItem({ provider, isExpanded, onToggle }: DataProviderRowItemProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <div className="group rounded-xl border border-zinc-800/80 bg-zinc-950/60 transition-colors hover:border-zinc-700/70">
      {/* Top Bar (Horizontal Row) */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors sm:px-5"
      >
        {/* Left: Avatar + Title */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-semibold ${provider.accentColor}`}
          >
            <Radio className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-medium text-zinc-100">{provider.name}</span>
              <span className="hidden text-xs text-zinc-500 sm:inline">· {provider.tagline}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="truncate text-xs text-zinc-400">{provider.protocol}</p>
              <span className="text-zinc-600 text-xs hidden sm:inline">•</span>
              <div className="hidden sm:flex items-center gap-1">
                {provider.marketCoverage.map((mkt) => (
                  <span key={mkt} className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800/60 px-1.5 py-0.2 rounded">
                    {mkt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Feature Tags */}
        <div className="hidden items-center gap-1.5 md:flex">
          {provider.features.slice(0, 3).map((feat) => (
            <span
              key={feat}
              className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-[11px] font-medium text-zinc-400"
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Right: Configure Toggle Action */}
        <div className="flex items-center shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 border-zinc-800 bg-zinc-900/80 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
          >
            <span>{isExpanded ? "Close" : "Configure"}</span>
            <ChevronDown
              className={`ml-1 size-3.5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Expanded Drawer (Credential Setup) */}
      {isExpanded && (
        <div className="border-t border-zinc-800/80 bg-zinc-900/30 p-5 sm:p-6">
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
              <KeyRound className="size-3.5 text-zinc-400" />
              <span>Feed Access Credentials & Endpoints</span>
            </div>
            <a
              href={provider.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <span>{provider.name} Developer Portal & Docs</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          {/* Dynamic Field Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {provider.fields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <Label htmlFor={`${provider.id}-${field.id}`} className="text-xs text-zinc-300">
                  {field.label}
                  {field.required && <span className="text-zinc-500 ml-0.5">*</span>}
                </Label>
                <Input
                  id={`${provider.id}-${field.id}`}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="h-9 border-zinc-800 bg-zinc-950/80 text-xs text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-700"
                />
              </div>
            ))}
          </div>

          {/* Footer Actions & Security Guarantee */}
          <div className="mt-5 flex items-center justify-between pt-3 border-t border-zinc-800/60">
            <button
              type="button"
              onClick={() => {
                toast.info("Secure Data Pipe", {
                  description: "API keys and stream credentials are encrypted locally. Market data sockets connect directly from your browser to data vendor endpoints.",
                  duration: 4000,
                })
              }}
              title="Click to view security details"
              className="group/sec inline-flex items-center gap-1.5 rounded-md p-1.5 text-zinc-500 hover:text-emerald-400 hover:bg-zinc-900/60 transition-colors"
            >
              <ShieldCheck className="size-4 transition-transform group-hover/sec:scale-110" />
              <span className="hidden text-[11px] text-zinc-500 sm:inline group-hover/sec:text-zinc-400">
                Direct WebSocket Encryption
              </span>
            </button>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-8 text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                disabled
                className="h-8 bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white disabled:opacity-50"
              >
                Save & Connect Feed
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
