"use client"

import * as React from "react"
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
  CandlestickSeries,
} from "lightweight-charts"
import { darkChartOptions, candlestickSeriesOptions } from "./chart-theme"
import { INITIAL_SAMPLE_CANDLES } from "./chart-sample-data"

interface LightweightChartProps {
  data?: CandlestickData<Time>[]
}

export function LightweightChart({ data = INITIAL_SAMPLE_CANDLES }: LightweightChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const chartRef = React.useRef<IChartApi | null>(null)
  const seriesRef = React.useRef<ISeriesApi<"Candlestick"> | null>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chart = createChart(container, {
      ...darkChartOptions,
      width: container.clientWidth,
      height: container.clientHeight,
    })

    const series = chart.addSeries(CandlestickSeries, candlestickSeriesOptions)
    series.setData(data)
    chart.timeScale().fitContent()

    chartRef.current = chart
    seriesRef.current = series

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0] || !chartRef.current) return
      const { width, height } = entries[0].contentRect
      if (width > 0 && height > 0) {
        chartRef.current.applyOptions({ width, height })
      }
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [data])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-background"
    />
  )
}
