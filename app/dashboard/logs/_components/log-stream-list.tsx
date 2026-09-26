"use client"

import { ChevronRightIcon } from "lucide-react"
import { type LogEntry } from "./logs-data"

export function LogStreamList({
  logs,
  onSelectLog,
}: {
  logs: LogEntry[]
  onSelectLog: (log: LogEntry) => void
}) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center font-mono">
        <p className="text-sm font-medium text-foreground">No events found</p>
        <p className="mt-1 text-xs text-muted-foreground">
          No log entries matched your filter criteria in the current buffer.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Table Column Header for unambiguous scanning */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/80 bg-background/95 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-xs select-none lg:px-4">
        <div className="flex items-center gap-3">
          <span className="w-24">Timestamp</span>
          <span className="w-14 text-center">Level</span>
          <span className="w-40">Source / Service</span>
          <span className="hidden md:inline">Event / Message Payload</span>
        </div>
        <div className="flex items-center gap-4 text-right">
          <span className="hidden sm:inline w-16">Latency</span>
          <span className="w-6"></span>
        </div>
      </div>

      {/* Row List */}
      <div className="divide-y divide-border/40 font-mono text-xs">
        {logs.map((log) => (
          <div
            key={log.id}
            onClick={() => onSelectLog(log)}
            className="group flex cursor-pointer items-center justify-between gap-3 px-3 py-2 transition-colors hover:bg-muted/40 lg:px-4"
          >
            {/* Left Group */}
            <div className="flex flex-1 items-center gap-3 overflow-hidden">
              {/* 1. Timestamp */}
              <span className="w-24 shrink-0 text-[11px] text-muted-foreground tabular-nums select-none">
                {log.timestamp}
              </span>

              {/* 2. Level Badge */}
              <div className="w-14 shrink-0 text-center">
                <span
                  className={`inline-flex min-w-[46px] items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-bold ${
                    log.level === "TRADE"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : log.level === "ERROR"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : log.level === "WARN"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {log.level}
                </span>
              </div>

              {/* 3. Source */}
              <span className="w-40 shrink-0 text-xs font-medium text-zinc-300 truncate">
                {log.source}
              </span>

              {/* 4. Message Payload */}
              <p className="flex-1 truncate text-xs text-zinc-400 group-hover:text-zinc-100">
                {log.message}
              </p>
            </div>

            {/* Right Group: Latency & Chevron */}
            <div className="flex shrink-0 items-center gap-4 pl-2">
              <span className="hidden sm:inline-block w-16 text-right text-[11px] text-muted-foreground/80 tabular-nums">
                {log.latencyMs !== undefined ? `${log.latencyMs}ms` : "—"}
              </span>
              <div className="w-6 flex justify-end">
                <ChevronRightIcon className="size-3.5 text-muted-foreground group-hover:text-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
