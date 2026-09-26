import {
  ChartCandlestick,
  ChartBar,
  ChartLine,
  ChartArea,
  Baseline,
  CandlestickChart,
  type LucideIcon,
} from "lucide-react"

export type ChartSeriesType =
  | "candlestick"
  | "bars"
  | "line"
  | "area"
  | "baseline"
  | "heikin-ashi"

export interface ChartSeriesOption {
  value: ChartSeriesType
  label: string
  hint: string
  Icon: LucideIcon
}

export const CHART_SERIES_OPTIONS: ChartSeriesOption[] = [
  { value: "candlestick", label: "Candles", hint: "OHLC", Icon: ChartCandlestick },
  { value: "bars", label: "Bars", hint: "OHLC", Icon: ChartBar },
  { value: "line", label: "Line", hint: "Close", Icon: ChartLine },
  { value: "area", label: "Area", hint: "Close", Icon: ChartArea },
  { value: "baseline", label: "Baseline", hint: "Close", Icon: Baseline },
  { value: "heikin-ashi", label: "Heikin Ashi", hint: "Averaged OHLC", Icon: CandlestickChart },
]

export function seriesLabel(value: ChartSeriesType): string {
  return CHART_SERIES_OPTIONS.find((o) => o.value === value)?.label ?? "Candles"
}

export function isValidSeriesType(value: string): value is ChartSeriesType {
  return CHART_SERIES_OPTIONS.some((o) => o.value === value)
}
