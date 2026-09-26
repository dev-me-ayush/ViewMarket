import {
  TrendingUp,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChartsToolbarDivider } from "./charts-toolbar-divider"
import { ChartTypeDropdown } from "./chart-type-dropdown"
import type { ChartSeriesType } from "./chart-series-types"
import { ChartTimeframeDropdown } from "./chart-timeframe-dropdown"
import { DEFAULT_TIMEFRAME, type ChartTimeframe } from "./chart-timeframe-types"
import { SymbolSearchDialog } from "./symbol-search-dialog"
import type { SymbolEntry } from "./chart-demo-symbols"

interface ChartsToolbarLeftProps {
  seriesType?: ChartSeriesType
  onSeriesChange?: (next: ChartSeriesType) => void
  timeframe?: ChartTimeframe
  onTimeframeChange?: (next: ChartTimeframe) => void
  symbol?: SymbolEntry
  symbolRecents?: SymbolEntry[]
  onSymbolChange?: (next: SymbolEntry) => void
}

export function ChartsToolbarLeft({ seriesType = "candlestick", onSeriesChange, timeframe = DEFAULT_TIMEFRAME, onTimeframeChange, symbol, symbolRecents, onSymbolChange }: ChartsToolbarLeftProps) {
  return (
    <div className="flex h-full items-center min-w-0">
      {symbol && (
        <SymbolSearchDialog value={symbol} recents={symbolRecents} onSelect={onSymbolChange} />
      )}

      <ChartsToolbarDivider />

      <ChartTimeframeDropdown value={timeframe} onChange={onTimeframeChange} />

      <ChartsToolbarDivider />

      <ChartTypeDropdown value={seriesType} onChange={onSeriesChange} />

      <div className="hidden sm:flex items-center">
        <ChartsToolbarDivider />
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2.5 text-xs gap-2 font-medium hover:bg-muted/70 text-foreground hidden sm:flex"
        type="button"
      >
        <TrendingUp className="size-[18px] stroke-[2.2] text-emerald-500" />
        <span>Indicators</span>
      </Button>

      <div className="hidden lg:flex items-center">
        <ChartsToolbarDivider />
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2.5 text-xs gap-2 hover:bg-muted/70 text-foreground hidden lg:flex"
        type="button"
      >
        <Bell className="size-[18px] stroke-[2.2]" />
        <span>Alert</span>
      </Button>
    </div>
  )
}
