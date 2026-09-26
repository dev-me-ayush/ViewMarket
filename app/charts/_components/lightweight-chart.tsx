"use client"

import * as React from "react"
import {
  createChart,
  type IChartApi,
  type CandlestickData,
  type Time,
  CandlestickSeries,
  BarSeries,
  LineSeries,
  AreaSeries,
  BaselineSeries,
} from "lightweight-charts"
import {
  darkChartOptions,
  candlestickSeriesOptions,
  barSeriesOptions,
  lineSeriesOptions,
  areaSeriesOptions,
  baselineSeriesOptions,
} from "./chart-theme"
import { INITIAL_SAMPLE_CANDLES } from "./chart-sample-data"
import type { ChartSeriesType } from "./chart-series-types"
import { toLinePoints, toHeikinAshi, baselineValue } from "./chart-series-data"

interface LightweightChartProps {
  data?: CandlestickData<Time>[]
  seriesType?: ChartSeriesType
  onChartReady?: (chart: IChartApi | null) => void
}

export function LightweightChart({ data = INITIAL_SAMPLE_CANDLES, seriesType = "candlestick", onChartReady }: LightweightChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const chartRef = React.useRef<IChartApi | null>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chart = createChart(container, {
      ...darkChartOptions,
      width: container.clientWidth,
      height: container.clientHeight,
    })

    switch (seriesType) {
      case "bars": {
        const series = chart.addSeries(BarSeries, barSeriesOptions)
        series.setData(data)
        break
      }
      case "line": {
        const series = chart.addSeries(LineSeries, lineSeriesOptions)
        series.setData(toLinePoints(data))
        break
      }
      case "area": {
        const series = chart.addSeries(AreaSeries, areaSeriesOptions)
        series.setData(toLinePoints(data))
        break
      }
      case "baseline": {
        const series = chart.addSeries(BaselineSeries, baselineSeriesOptions(baselineValue(data)))
        series.setData(toLinePoints(data))
        break
      }
      case "heikin-ashi": {
        const series = chart.addSeries(CandlestickSeries, candlestickSeriesOptions)
        series.setData(toHeikinAshi(data))
        break
      }
      default: {
        const series = chart.addSeries(CandlestickSeries, candlestickSeriesOptions)
        series.setData(data)
        break
      }
    }
    chart.timeScale().fitContent()

    chartRef.current = chart
    onChartReady?.(chart)

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
      onChartReady?.(null)
    }
  }, [data, seriesType, onChartReady])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-background"
    />
  )
}
