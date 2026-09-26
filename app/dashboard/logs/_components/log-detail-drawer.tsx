"use client"

import { XIcon } from "lucide-react"
import type { LogEntry } from "./logs-data"

export function LogDetailDrawer({
  log,
  onClose,
}: {
  log: LogEntry | null
  onClose: () => void
}) {
  if (!log) return null

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-border bg-card shadow-2xl transition-transform animate-in slide-in-from-right duration-200">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                log.level === "TRADE"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : log.level === "ERROR"
                    ? "bg-rose-500/20 text-rose-300"
                    : log.level === "WARN"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-muted text-muted-foreground"
              }`}
            >
              {log.level}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{log.timestamp}</span>
          </div>
          <h2 className="mt-1 text-sm font-semibold text-foreground">{log.source}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <XIcon className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</h3>
          <p className="mt-1 rounded-lg border border-border/80 bg-background/60 p-3 font-mono text-xs text-foreground leading-relaxed">
            {log.message}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-background/40 p-2.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Latency</span>
            <p className="mt-0.5 font-mono text-xs font-semibold text-foreground">{log.latencyMs ? `${log.latencyMs} ms` : "—"}</p>
          </div>
          <div className="rounded-lg border border-border bg-background/40 p-2.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Status Code</span>
            <p className="mt-0.5 font-mono text-xs font-semibold text-foreground">{log.statusCode ?? "200 OK"}</p>
          </div>
        </div>

        {log.metadata && (
          <div>
            <div className="flex items-center justify-between pb-1.5">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Payload & Context</h3>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(JSON.stringify(log.metadata, null, 2))}
                className="text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2"
              >
                Copy JSON
              </button>
            </div>
            <pre className="max-h-[300px] overflow-auto rounded-lg border border-border bg-background p-3 font-mono text-[11px] leading-5 text-zinc-300">
              {JSON.stringify(log.metadata, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="border-t border-border p-3 text-right">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
        >
          Close Inspector
        </button>
      </div>
    </div>
  )
}
