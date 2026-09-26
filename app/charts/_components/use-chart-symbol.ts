"use client"

import * as React from "react"
import {
  DEFAULT_SYMBOL,
  findSymbol,
  type SymbolEntry,
} from "./chart-demo-symbols"

const SELECTED_KEY = "vm:chart-symbol"
const RECENTS_KEY = "vm:recent-symbols"
const MAX_RECENTS = 5

export function useChartSymbol() {
  const [symbol, setSymbol] = React.useState<SymbolEntry>(DEFAULT_SYMBOL)
  const [recents, setRecents] = React.useState<SymbolEntry[]>([])

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SELECTED_KEY)
      const found = stored ? findSymbol(stored) : undefined
      if (found) setSymbol(found)
      const rawRecents = window.localStorage.getItem(RECENTS_KEY)
      if (rawRecents) {
        const parsed = (JSON.parse(rawRecents) as string[])
          .map(findSymbol)
          .filter((s): s is SymbolEntry => Boolean(s))
        setRecents(parsed.slice(0, MAX_RECENTS))
      }
    } catch {
      // Private mode — keep defaults.
    }
  }, [])

  const selectSymbol = React.useCallback((next: SymbolEntry) => {
    setSymbol(next)
    setRecents((prev) => {
      const updated = [next, ...prev.filter((s) => s.symbol !== next.symbol)].slice(0, MAX_RECENTS)
      try {
        window.localStorage.setItem(SELECTED_KEY, next.symbol)
        window.localStorage.setItem(RECENTS_KEY, JSON.stringify(updated.map((s) => s.symbol)))
      } catch {
        // Ignore persistence failures.
      }
      return updated
    })
  }, [])

  return { symbol, recents, selectSymbol }
}
