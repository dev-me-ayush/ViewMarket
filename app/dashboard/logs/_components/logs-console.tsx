"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { type LogEntry, type LogLevel, type LogStream, MOCK_LOGS } from "./logs-data"
import { LogStreamList } from "./log-stream-list"
import { LogDetailDrawer } from "./log-detail-drawer"

export function LogsConsole() {
  const searchParams = useSearchParams()
  const currentStream = (searchParams.get("stream") as LogStream) || "all"
  const currentLevel = (searchParams.get("level") as LogLevel) || "ALL"
  const currentQuery = searchParams.get("q") || ""

  const [selectedLog, setSelectedLog] = React.useState<LogEntry | null>(null)

  const filteredLogs = React.useMemo(() => {
    return MOCK_LOGS.filter((item) => {
      if (currentStream !== "all" && item.stream !== currentStream) return false
      if (currentLevel !== "ALL" && item.level !== currentLevel) return false
      if (!currentQuery.trim()) return true

      const q = currentQuery.toLowerCase()
      const inMsg = item.message.toLowerCase().includes(q)
      const inSource = item.source.toLowerCase().includes(q)
      const inMeta = item.metadata ? JSON.stringify(item.metadata).toLowerCase().includes(q) : false
      return inMsg || inSource || inMeta
    })
  }, [currentStream, currentLevel, currentQuery])

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-background">
      {/* 
        Zero extra cards, zero separate toolbar rows, zero live button.
        Pure full-bleed streaming execution table directly under the header.
      */}
      <div className="flex-1 overflow-auto">
        <LogStreamList logs={filteredLogs} onSelectLog={setSelectedLog} />
      </div>

      {/* Slide-over inspector drawer */}
      <LogDetailDrawer log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  )
}
