"use client"

import * as React from "react"
import { isValidSeriesType, type ChartSeriesType } from "./chart-series-types"

const STORAGE_KEY = "vm:chart-series"

export function useChartSeries(defaultType: ChartSeriesType = "candlestick") {
  const [seriesType, setSeriesType] = React.useState<ChartSeriesType>(defaultType)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored && isValidSeriesType(stored)) setSeriesType(stored)
    } catch {
      // Private mode — keep default.
    }
  }, [])

  const selectSeries = React.useCallback((next: ChartSeriesType) => {
    setSeriesType(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore persistence failures.
    }
  }, [])

  return { seriesType, selectSeries }
}
