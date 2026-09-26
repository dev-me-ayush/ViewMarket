import { ChartsToolbarLeft } from "./charts-toolbar-left"
import { ChartsToolbarRight } from "./charts-toolbar-right"
import type { ChartSeriesType } from "./chart-series-types"
import { DEFAULT_TIMEFRAME, type ChartTimeframe } from "./chart-timeframe-types"
import type { SymbolEntry } from "./chart-demo-symbols"

interface ChartsToolbarProps {
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
  onTakeSnapshot?: () => void
  isSnapshotting?: boolean
  seriesType?: ChartSeriesType
  onSeriesChange?: (next: ChartSeriesType) => void
  timeframe?: ChartTimeframe
  onTimeframeChange?: (next: ChartTimeframe) => void
  symbol?: SymbolEntry
  symbolRecents?: SymbolEntry[]
  onSymbolChange?: (next: SymbolEntry) => void
}

export function ChartsToolbar({
  isFullscreen,
  onToggleFullscreen,
  onTakeSnapshot,
  isSnapshotting,
  seriesType,
  onSeriesChange,
  timeframe = DEFAULT_TIMEFRAME,
  onTimeframeChange,
  symbol,
  symbolRecents,
  onSymbolChange,
}: ChartsToolbarProps) {
  return (
    <div className="flex h-full w-full items-center justify-between min-w-0">
      <ChartsToolbarLeft
        seriesType={seriesType}
        onSeriesChange={onSeriesChange}
        timeframe={timeframe}
        onTimeframeChange={onTimeframeChange}
        symbol={symbol}
        symbolRecents={symbolRecents}
        onSymbolChange={onSymbolChange}
      />
      <ChartsToolbarRight
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        onTakeSnapshot={onTakeSnapshot}
        isSnapshotting={isSnapshotting}
      />
    </div>
  )
}
