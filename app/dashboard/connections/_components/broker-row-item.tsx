"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ExternalLink, ShieldCheck, KeyRound } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { BrokerDefinition } from "./brokers-config"
import { BrokerRedirectUriCard } from "./broker-redirect-uri-card"

interface BrokerRowItemProps {
  broker: BrokerDefinition
  isExpanded: boolean
  onToggle: () => void
}

export function BrokerRowItem({ broker, isExpanded, onToggle }: BrokerRowItemProps) {
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
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onToggle()
          }
        }}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors sm:px-5"
      >
        {/* Left: Avatar + Title */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-semibold ${broker.logoUrl ? "overflow-hidden bg-white/95 border-zinc-700/60 p-0.5 shadow-sm" : broker.accentColor}`}
          >
            {broker.logoUrl ? (
              <Image
                src={broker.logoUrl}
                alt={`${broker.name} logo`}
                width={36}
                height={36}
                className="size-full object-cover rounded-md"
              />
            ) : (
              broker.name.charAt(0)
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-medium text-zinc-100">{broker.name}</span>
              <span className="hidden text-xs text-zinc-500 sm:inline">· {broker.tagline}</span>
            </div>
            <p className="truncate text-xs text-zinc-400">{broker.protocol}</p>
          </div>
        </div>

        {/* Center: Feature Tags (Hidden on very small screens) */}
        <div className="hidden items-center gap-1.5 md:flex">
          {broker.features.map((feat) => (
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
              <span>Authentication Credentials</span>
            </div>
            <a
              href={broker.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <span>{broker.name} API Portal & Guide</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          {/* Dynamic Field Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {broker.fields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <Label htmlFor={`${broker.id}-${field.id}`} className="text-xs text-zinc-300">
                  {field.label}
                  {field.required && <span className="text-zinc-500 ml-0.5">*</span>}
                </Label>
                <Input
                  id={`${broker.id}-${field.id}`}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="h-9 border-zinc-800 bg-zinc-950/80 text-xs text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-700"
                />
              </div>
            ))}
          </div>

          {/* Minimalist Redirect URL Field below inputs */}
          {broker.redirectUri && (
            <div className="mt-4">
              <BrokerRedirectUriCard
                brokerName={broker.name}
                redirectUri={broker.redirectUri}
              />
            </div>
          )}

          {/* Footer Actions & Discreet Security Icon */}
          <div className="mt-5 flex items-center justify-between pt-3 border-t border-zinc-800/60">
            {/* Clickable Security Icon with Disappearing Toast */}
            <button
              type="button"
              onClick={() =>
                toast.info("Non-Custodial BYOA", {
                  description:
                    "Credentials are encrypted client-side in your local session. ViewMarket never places unconfirmed orders or accesses your funds.",
                  duration: 4000,
                })
              }
              title="Click to view security & privacy details"
              className="group/sec inline-flex items-center gap-1.5 rounded-md p-1.5 text-zinc-500 hover:text-emerald-400 hover:bg-zinc-900/60 transition-colors"
            >
              <ShieldCheck className="size-4 transition-transform group-hover/sec:scale-110" />
              <span className="hidden text-[11px] text-zinc-500 sm:inline group-hover/sec:text-zinc-400">
                Non-Custodial BYOA
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
                Save & Validate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
