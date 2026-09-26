"use client"

import * as React from "react"
import {
  DEFAULT_TIMEFRAME,
  isValidTimeframe,
  type ChartTimeframe,
} from "./chart-timeframe-types"

const STORAGE_KEY = "vm:chart-timeframe"

export function useChartTimeframe(defaultValue: ChartTimeframe = DEFAULT_TIMEFRAME) {
  const [timeframe, setTimeframe] = React.useState<ChartTimeframe>(defaultValue)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored && isValidTimeframe(stored)) setTimeframe(stored)
    } catch {
      // Private mode — keep default.
    }
  }, [])

  const selectTimeframe = React.useCallback((next: ChartTimeframe) => {
    setTimeframe(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore persistence failures.
    }
  }, [])

  return { timeframe, selectTimeframe }
}
