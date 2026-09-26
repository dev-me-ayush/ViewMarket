"use client"

import * as React from "react"
import { Check, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DEMO_SYMBOLS, type SymbolEntry } from "./chart-demo-symbols"

interface SymbolSearchDialogProps {
  value: SymbolEntry
  recents?: SymbolEntry[]
  onSelect?: (next: SymbolEntry) => void
}

type Category = "all" | "futures" | "options" | "nse" | "crypto"

const CATEGORIES: { value: Category; label: string; soon?: boolean }[] = [
  { value: "all", label: "All Stocks" },
  { value: "futures", label: "Futures" },
  { value: "options", label: "Options" },
  { value: "nse", label: "NSE" },
  { value: "crypto", label: "Crypto", soon: true },
]

function inCategory(s: SymbolEntry, cat: Category) {
  if (cat === "all") return true
  if (cat === "futures") return s.type === "Future"
  if (cat === "options") return s.type === "Option"
  if (cat === "nse") return s.exchange === "NSE"
  return false
}

function matches(s: SymbolEntry, q: string) {
  return s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
}

export function SymbolSearchDialog({ value, recents = [], onSelect }: SymbolSearchDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<Category>("all")
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  React.useEffect(() => {
    if (open) {
      setQuery("")
      setCategory("all")
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const q = query.trim().toLowerCase()
  const inTab = DEMO_SYMBOLS.filter((s) => inCategory(s, category) && matches(s, q))
  const showRecents = q === "" && category === "all" && recents.length > 0
  const recentList = showRecents ? recents.filter((s) => inCategory(s, category)) : []
  const recentSyms = new Set(recentList.map((s) => s.symbol))
  const list = inTab.filter((s) => !recentSyms.has(s.symbol))
  const flat = [...recentList, ...list]

  React.useEffect(() => setActive(0), [query, category])

  const pick = (entry: SymbolEntry) => {
    onSelect?.(entry)
    setOpen(false)
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (flat.length === 0) return
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % flat.length) }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + flat.length) % flat.length) }
    else if (e.key === "Enter" && flat[active]) { pick(flat[active]) }
  }

  const row = (entry: SymbolEntry) => {
    const idx = flat.indexOf(entry)
    return (
      <button
        key={entry.symbol}
        type="button"
        onClick={() => pick(entry)}
        onMouseMove={() => setActive(idx)}
        className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors ${idx === active ? "bg-accent text-accent-foreground" : ""}`}
      >
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate text-[13px] font-semibold">{entry.symbol}</span>
          <span className="truncate text-[11px] text-muted-foreground">{entry.name}</span>
        </span>
        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">{entry.type}</span>
        {entry.symbol === value.symbol && <Check className="size-4 shrink-0 text-emerald-500" />}
      </button>
    )
  }

  const countFor = (cat: Category) =>
    cat === "crypto" ? 0 : DEMO_SYMBOLS.filter((s) => inCategory(s, cat)).length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="sm" type="button" title="Search symbol ( / )" aria-label={`Symbol: ${value.symbol}`}
            className="h-8 px-2.5 text-xs font-semibold gap-2 hover:bg-muted/70 text-foreground" />
        }
      >
        <Search className="size-[18px] stroke-[2.2] text-foreground" />
        <span>{value.symbol}</span>
        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">{value.exchange}</span>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <DialogTitle>Search Symbols</DialogTitle>
        <div className="border-b border-border px-4 pt-4 pb-3">
          <h2 className="text-base font-semibold tracking-tight">Search Symbols</h2>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={onInputKey}
              placeholder="Search stocks, futures, options…" className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
        </div>
        <div className="flex min-h-0">
          <aside className="flex w-40 shrink-0 flex-col gap-0.5 border-r border-border p-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                disabled={cat.soon}
                onClick={() => setCategory(cat.value)}
                className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${category === cat.value && !cat.soon ? "bg-accent text-accent-foreground" : "hover:bg-muted/60"}`}
              >
                <span>{cat.label}</span>
                {cat.soon ? (
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">Soon</span>
                ) : (
                  <span className="text-[11px] text-muted-foreground">{countFor(cat.value)}</span>
                )}
              </button>
            ))}
          </aside>
          <div className="max-h-80 min-w-0 flex-1 overflow-y-auto p-1.5">
            {flat.length === 0 && (
              <p className="px-2.5 py-8 text-center text-sm text-muted-foreground">
                {q ? `No symbols match “${query}”.` : "Nothing here yet."}
              </p>
            )}
            {showRecents && recentList.length > 0 && (
              <div>
                <p className="px-2.5 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Recent</p>
                {recentList.map(row)}
              </div>
            )}
            {list.length > 0 && (
              <div>
                <p className="px-2.5 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  {CATEGORIES.find((c) => c.value === category)?.label}
                </p>
                {list.map(row)}
              </div>
            )}
          </div>
        </div>
        <p className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">↑↓ navigate · Enter select · Esc close</p>
      </DialogContent>
    </Dialog>
  )
}
