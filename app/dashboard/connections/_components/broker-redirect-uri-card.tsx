"use client"

import { useState } from "react"
import { Copy, Check, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

interface BrokerRedirectUriCardProps {
  brokerName: string
  redirectUri: string
}

export function BrokerRedirectUriCard({ brokerName, redirectUri }: BrokerRedirectUriCardProps) {
  const [hasCopied, setHasCopied] = useState(false)

  const showRequirementToast = () => {
    toast.info("Action Required in Developer Portal", {
      description: `You must paste this Redirect URL into your ${brokerName} app settings to authorize API logins and receive trading tokens.`,
      duration: 5000,
    })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(redirectUri)
      setHasCopied(true)
      toast.success("Redirect URL Copied", {
        description: `Paste this into your ${brokerName} developer app settings to enable live broker login.`,
        duration: 4500,
      })
      setTimeout(() => setHasCopied(false), 2000)
    } catch {
      toast.error("Failed to copy Redirect URL")
    }
  }

  return (
    <div className="pt-3 border-t border-zinc-800/60">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Label + Clickable "Important" Badge */}
        <div className="flex items-center gap-2">
          <Label className="text-xs font-medium text-zinc-300">
            OAuth Redirect URL
          </Label>

          <button
            type="button"
            onClick={showRequirementToast}
            title="Click to view why this is required"
            className="group/badge inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50 transition-colors"
          >
            <AlertCircle className="size-3 text-amber-400" />
            <span>Important</span>
          </button>
        </div>

        {/* Right: URL Display + Copy Trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={showRequirementToast}
            className="flex h-8 items-center rounded-md border border-zinc-800 bg-zinc-950/80 px-2.5 font-mono text-xs text-zinc-300 hover:border-zinc-700 transition-colors text-left"
            title="Click to view requirements"
          >
            <span className="max-w-[240px] sm:max-w-[320px] truncate">
              {redirectUri}
            </span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            title={`Copy ${brokerName} Redirect URL`}
            className="flex h-8 items-center gap-1.5 rounded-md border border-zinc-700/80 bg-zinc-900 px-2.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            {hasCopied ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
