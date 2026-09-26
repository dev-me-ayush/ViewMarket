"use client"

import { useState } from "react"
import { ShieldAlert, KeyRound, Check } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import type { ConnectedServiceItem } from "./connections-overview-config"

interface AuthModalProps {
  item: ConnectedServiceItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (id: string) => void
}

export function ConnectionAuthModal({ item, open, onOpenChange, onSuccess }: AuthModalProps) {
  const [totp, setTotp] = useState("")
  const [loading, setLoading] = useState(false)

  if (!item) return null

  const handleAuthenticate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSuccess(item.id)
      onOpenChange(false)
      toast.success(`${item.name} Session Re-Authenticated`, {
        description: "Fresh session token obtained. Valid until tomorrow 06:00 AM IST.",
        duration: 4000,
      })
    }, 700)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-zinc-800 bg-zinc-950 p-6 text-zinc-100 sm:rounded-xl">
        <DialogTitle className="not-sr-only">
          <div className="flex items-center gap-2 text-amber-400">
            <ShieldAlert className="size-5" />
            <span className="text-base font-semibold text-zinc-100">
              Daily Broker Auth: {item.name}
            </span>
          </div>
        </DialogTitle>
        <p className="text-xs text-zinc-400 mt-1">
          Indian market regulations mandate daily token renewal. Enter your 6-digit TOTP / Authenticator code or re-login.
        </p>

        <div className="space-y-4 py-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 text-xs text-zinc-300">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Broker Protocol:</span>
              <span className="font-mono text-zinc-200">{item.protocol}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-zinc-400">Scheduled Expiry:</span>
              <span className="text-amber-400">Daily 06:00 AM IST</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="daily-totp" className="text-xs text-zinc-300">
              6-Digit Authenticator Code (TOTP)
            </Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <Input
                id="daily-totp"
                type="text"
                maxLength={6}
                placeholder="e.g. 849201"
                value={totp}
                onChange={(e) => setTotp(e.target.value.replace(/\D/g, ""))}
                className="h-10 rounded-lg border-zinc-800 bg-zinc-900/60 pl-9 pr-3 font-mono text-sm tracking-widest text-zinc-100 focus-visible:border-zinc-700"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 border-t border-zinc-800/60 pt-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs text-zinc-400 hover:text-zinc-200"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleAuthenticate}
            disabled={loading || totp.length < 6}
            className="bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-white disabled:opacity-50"
          >
            <Check className="mr-1.5 size-3.5" />
            <span>{loading ? "Renewing..." : "Verify & Connect"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
