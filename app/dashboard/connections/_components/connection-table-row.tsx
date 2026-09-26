"use client"

import Image from "next/image"
import { ShieldCheck, ShieldAlert, Clock, RefreshCw, Radio } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import type { ConnectedServiceItem } from "./connections-overview-config"

interface ConnectionTableRowProps {
  item: ConnectedServiceItem
  onReAuth: (item: ConnectedServiceItem) => void
  onPing: (item: ConnectedServiceItem) => void
}

export function ConnectionTableRow({ item, onReAuth, onPing }: ConnectionTableRowProps) {
  const isAuthNeeded = item.status === "auth_needed"
  const isExpiringSoon = item.status === "expiring_soon"

  return (
    <TableRow className="border-zinc-800/80 hover:bg-zinc-900/40 transition-colors">
      {/* Service Name & Logo */}
      <TableCell className="py-2.5 pl-4 sm:pl-5">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-semibold ${
              item.logoUrl
                ? "overflow-hidden bg-white/95 border-zinc-700/60 p-0.5 shadow-sm"
                : item.accentColor
            }`}
          >
            {item.logoUrl ? (
              <Image src={item.logoUrl} alt={item.name} width={28} height={28} className="size-full object-cover rounded-md" />
            ) : (
              <Radio className="size-3.5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-xs text-zinc-100">{item.name}</span>
            </div>
            <p className="text-[11px] text-zinc-400">{item.subtext}</p>
          </div>
        </div>
      </TableCell>

      {/* Category */}
      <TableCell className="py-2.5 hidden md:table-cell">
        <Badge variant="outline" className="border-zinc-800 bg-zinc-900/60 text-zinc-400 font-mono text-[10px] font-normal">
          {item.categoryLabel}
        </Badge>
      </TableCell>

      {/* Auth & Session Status */}
      <TableCell className="py-2.5">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            {isAuthNeeded ? (
              <Badge className="bg-amber-950/50 border-amber-800/60 text-amber-400 hover:bg-amber-950/60 text-[10px] font-medium gap-1 px-1.5 py-0.2">
                <ShieldAlert className="size-3" />
                <span>{item.statusLabel}</span>
              </Badge>
            ) : isExpiringSoon ? (
              <Badge className="bg-orange-950/50 border-orange-800/60 text-orange-400 hover:bg-orange-950/60 text-[10px] font-medium gap-1 px-1.5 py-0.2">
                <Clock className="size-3" />
                <span>{item.statusLabel}</span>
              </Badge>
            ) : (
              <Badge className="bg-emerald-950/50 border-emerald-800/60 text-emerald-400 hover:bg-emerald-950/60 text-[10px] font-medium gap-1 px-1.5 py-0.2">
                <ShieldCheck className="size-3" />
                <span>{item.statusLabel}</span>
              </Badge>
            )}
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">{item.expiresText}</span>
        </div>
      </TableCell>

      {/* Latency / Ping */}
      <TableCell className="py-2.5 hidden sm:table-cell">
        <span className="font-mono text-xs text-zinc-300">{item.latency}</span>
      </TableCell>

      {/* Market Scope / Channel */}
      <TableCell className="py-2.5 hidden lg:table-cell">
        <span className="text-xs text-zinc-400 truncate max-w-44 block">{item.marketScope}</span>
      </TableCell>

      {/* Actions */}
      <TableCell className="py-2.5 pr-4 sm:pr-5 text-right">
        {isAuthNeeded ? (
          <Button
            type="button"
            size="sm"
            onClick={() => onReAuth(item)}
            className="h-7.5 bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400 px-2.5 transition-colors shadow-sm"
          >
            Re-Authenticate
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onPing(item)}
            className="h-7.5 border-zinc-800 bg-zinc-900/60 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white px-2.5"
          >
            <RefreshCw className="mr-1.5 size-3" />
            <span>Test Ping</span>
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
