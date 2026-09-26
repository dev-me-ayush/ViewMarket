"use client"

import dynamic from "next/dynamic"
import type { IChartApi } from "lightweight-charts"
import type { ChartSeriesType } from "./chart-series-types"

// Dynamically import LightweightChart with SSR disabled to prevent server-side canvas errors
const DynamicLightweightChart = dynamic(
  () => import("./lightweight-chart").then((mod) => mod.LightweightChart),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-background text-xs text-muted-foreground/50">
        Initializing Canvas...
      </div>
    ),
  }
)

export function ChartsCanvas({ onChartReady, seriesType }: { onChartReady?: (chart: IChartApi | null) => void; seriesType?: ChartSeriesType }) {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-background">
      <DynamicLightweightChart onChartReady={onChartReady} seriesType={seriesType} />
    </main>
  )
}
