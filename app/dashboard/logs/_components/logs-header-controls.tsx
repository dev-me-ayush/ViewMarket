"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  ActivityIcon,
  BotIcon,
  Building2Icon,
  ChevronDownIcon,
  DownloadIcon,
  RadioIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type LogLevel, type LogStream, MOCK_LOGS } from "./logs-data"

const STREAMS: { id: LogStream; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "All Streams", icon: ActivityIcon },
  { id: "agent", label: "AI Agent", icon: BotIcon },
  { id: "broker", label: "Broker Gateway", icon: Building2Icon },
  { id: "system", label: "System Feed", icon: RadioIcon },
]

const LEVELS: LogLevel[] = ["ALL", "TRADE", "INFO", "WARN", "ERROR"]

export function LogsHeaderControls() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentStream = (searchParams.get("stream") as LogStream) || "all"
  const currentLevel = (searchParams.get("level") as LogLevel) || "ALL"
  const currentQuery = searchParams.get("q") || ""

  const [searchVal, setSearchVal] = React.useState(currentQuery)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Sync internal search input if URL changes
  React.useEffect(() => {
    setSearchVal(currentQuery)
  }, [currentQuery])

  // Global '/' shortcut to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const updateParam = React.useCallback(
    (key: string, val: string | null) => {
      const p = new URLSearchParams(searchParams.toString())
      if (val && val !== "all" && val !== "ALL" && val !== "") {
        p.set(key, val)
      } else {
        p.delete(key)
      }
      router.replace(`${pathname}?${p.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateParam("q", searchVal.trim() || null)
  }

  const handleExport = () => {
    const filtered = MOCK_LOGS.filter((item) => {
      if (currentStream !== "all" && item.stream !== currentStream) return false
      if (currentLevel !== "ALL" && item.level !== currentLevel) return false
      if (currentQuery.trim()) {
        const q = currentQuery.toLowerCase()
        return (
          item.message.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q) ||
          (item.metadata ? JSON.stringify(item.metadata).toLowerCase().includes(q) : false)
        )
      }
      return true
    })

    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `viewmarket-logs-${currentStream}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-1 items-center justify-between gap-3 ml-2">
      {/* 1. Left: Stream Switcher Styled Identical to Connections Page Header */}
      <Tabs
        value={currentStream}
        onValueChange={(val) => updateParam("stream", val as LogStream)}
        className="w-auto"
      >
        <TabsList className="h-7 bg-muted/60 p-0.5 text-xs">
          {STREAMS.map((s) => {
            const Icon = s.icon
            return (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className="gap-1.5 px-2.5 py-0.5 text-xs"
              >
                <Icon className="size-3.5" />
                <span className="hidden sm:inline">{s.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>

      {/* 2. Middle: Search in Header */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex-1 max-w-xs md:max-w-sm"
      >
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onBlur={() => updateParam("q", searchVal.trim() || null)}
          placeholder="Search logs (Press '/' to focus)..."
          className="h-7 w-full rounded-md border border-border bg-card/60 pl-8 pr-7 text-xs text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-hidden focus:ring-1 focus:ring-ring"
        />
        {searchVal && (
          <button
            type="button"
            onClick={() => {
              setSearchVal("")
              updateParam("q", null)
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <XIcon className="size-3" />
          </button>
        )}
      </form>

      {/* 3. Right: Level Dropdown + Download Button */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={currentLevel}
            aria-label="Filter logs by level"
            onChange={(e) => updateParam("level", e.target.value)}
            className="h-7 appearance-none rounded-md border border-border bg-card/60 pl-2 pr-6 text-xs font-medium text-foreground cursor-pointer focus:border-ring focus:outline-hidden focus:ring-1 focus:ring-ring"
          >
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl} className="bg-card text-foreground">
                {lvl === "ALL" ? "All Levels" : lvl}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-1.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
        </div>

        <button
          type="button"
          onClick={handleExport}
          title="Download logs JSON"
          className="flex h-7 items-center justify-center rounded-md border border-border bg-card/60 px-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
        >
          <DownloadIcon className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
