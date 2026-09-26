"use client"

import * as React from "react"
import { ChartsHeader } from "./charts-header"
import { ChartsToolbar } from "./charts-toolbar"
import { ChartsFooter } from "./charts-footer"
import { ChartsRightPanel } from "./charts-right-panel"
import { ChartsCanvas } from "./charts-canvas"
import { FullscreenExitBar } from "./fullscreen-exit-bar"
import { useFullscreen } from "./use-fullscreen"
import { useChartSnapshot } from "./use-chart-snapshot"
import { useChartSeries } from "./use-chart-series"
import { useChartTimeframe } from "./use-chart-timeframe"
import { useChartSymbol } from "./use-chart-symbol"
import { CHART_SNAPSHOT_META } from "./chart-snapshot-meta"
import { seriesLabel } from "./chart-series-types"
import { Toaster } from "@/components/ui/sonner"

export function ChartsShell() {
  const { isFullscreen, toggleFullscreen, exitFullscreen } = useFullscreen()
  const { seriesType, selectSeries } = useChartSeries()
  const { timeframe, selectTimeframe } = useChartTimeframe()
  const { symbol, recents, selectSymbol } = useChartSymbol()
  const snapshotMeta = React.useMemo(
    () => ({
      ...CHART_SNAPSHOT_META,
      symbol: symbol.symbol,
      exchange: symbol.exchange,
      chartType: seriesLabel(seriesType),
      timeframe,
    }),
    [seriesType, timeframe, symbol]
  )
  const { handleChartReady, takeSnapshot, isSnapshotting } =
    useChartSnapshot(snapshotMeta)

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground">
      <FullscreenExitBar isFullscreen={isFullscreen} onExit={exitFullscreen} />

      {/* Header: hidden in fullscreen */}
      {!isFullscreen && (
        <ChartsHeader>
          <ChartsToolbar
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            onTakeSnapshot={takeSnapshot}
            isSnapshotting={isSnapshotting}
            seriesType={seriesType}
            onSeriesChange={selectSeries}
            timeframe={timeframe}
            onTimeframeChange={selectTimeframe}
            symbol={symbol}
            symbolRecents={recents}
            onSymbolChange={selectSymbol}
          />
        </ChartsHeader>
      )}

      {/* Main Workspace: only chart canvas in fullscreen */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <ChartsCanvas onChartReady={handleChartReady} seriesType={seriesType} />
        {!isFullscreen && <ChartsRightPanel />}
      </div>

      {/* Footer: hidden in fullscreen */}
      {!isFullscreen && <ChartsFooter />}
      <Toaster position="bottom-right" />
    </div>
  )
}
