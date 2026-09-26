export type ChartTimeframe =
  | "1m"
  | "2m"
  | "3m"
  | "5m"
  | "10m"
  | "15m"
  | "30m"
  | "1H"
  | "2H"
  | "4H"
  | "6H"
  | "12H"
  | "1D"
  | "3D"
  | "1W"
  | "1M"

export interface ChartTimeframeGroup {
  label: string
  values: ChartTimeframe[]
}

export const CHART_TIMEFRAME_GROUPS: ChartTimeframeGroup[] = [
  { label: "Minutes", values: ["1m", "2m", "3m", "5m", "10m", "15m", "30m"] },
  { label: "Hours", values: ["1H", "2H", "4H", "6H", "12H"] },
  { label: "Days", values: ["1D", "3D", "1W", "1M"] },
]

export const DEFAULT_TIMEFRAME: ChartTimeframe = "1m"
export const DEFAULT_EXPANDED_GROUP = "Minutes"

export function isValidTimeframe(value: string): value is ChartTimeframe {
  return CHART_TIMEFRAME_GROUPS.some((g) => g.values.includes(value as ChartTimeframe))
}

export function timeframeGroupOf(value: ChartTimeframe): string {
  return (
    CHART_TIMEFRAME_GROUPS.find((g) => g.values.includes(value))?.label ??
    DEFAULT_EXPANDED_GROUP
  )
}
