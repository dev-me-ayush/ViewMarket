export interface ChartSnapshotMeta {
  symbol: string
  exchange: string
  timeframe: string
  chartType: string
}

export const CHART_SNAPSHOT_META: ChartSnapshotMeta = {
  symbol: "NIFTY 50",
  exchange: "NSE",
  timeframe: "1m",
  chartType: "Candlestick",
}

export function sanitizeSymbol(symbol: string): string {
  return symbol
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "")
    .slice(0, 16) || "CHART"
}
