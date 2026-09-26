import type {
  CandlestickData,
  LineData,
  Time,
} from "lightweight-charts"

export function toLinePoints(candles: CandlestickData<Time>[]): LineData<Time>[] {
  return candles.map((c) => ({ time: c.time, value: c.close }))
}

export function baselineValue(candles: CandlestickData<Time>[]): number {
  return candles.length > 0 ? candles[0].close : 0
}

export function toHeikinAshi(candles: CandlestickData<Time>[]): CandlestickData<Time>[] {
  const out: CandlestickData<Time>[] = []
  let prevOpen = 0
  let prevClose = 0
  candles.forEach((c, i) => {
    const haClose = (c.open + c.high + c.low + c.close) / 4
    const haOpen = i === 0 ? (c.open + c.close) / 2 : (prevOpen + prevClose) / 2
    const haHigh = Math.max(c.high, haOpen, haClose)
    const haLow = Math.min(c.low, haOpen, haClose)
    out.push({ time: c.time, open: haOpen, high: haHigh, low: haLow, close: haClose })
    prevOpen = haOpen
    prevClose = haClose
  })
  return out
}
