"use client"

import * as React from "react"

export function IstClock() {
  const [timeString, setTimeString] = React.useState<string>("")

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)

      setTimeString(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-8 items-center gap-2 rounded-lg border border-border/80 bg-zinc-900/60 px-3 shadow-xs select-none">
      <span className="font-mono text-sm font-semibold tracking-wide text-foreground">
        {timeString || "--:--:--"}
      </span>
      <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-semibold text-muted-foreground">
        IST
      </span>
    </div>
  )
}
