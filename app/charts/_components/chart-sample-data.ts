import type { CandlestickData, Time } from "lightweight-charts"

// Clean sample intraday candlestick sequence for preview
export const INITIAL_SAMPLE_CANDLES: CandlestickData<Time>[] = [
  { time: "2026-09-21" as Time, open: 24850.5, high: 24920.0, low: 24820.0, close: 24905.0 },
  { time: "2026-09-22" as Time, open: 24910.0, high: 24980.5, low: 24890.0, close: 24960.0 },
  { time: "2026-09-23" as Time, open: 24955.0, high: 25030.0, low: 24930.5, close: 25010.5 },
  { time: "2026-09-24" as Time, open: 25015.0, high: 25060.0, low: 24970.0, close: 24985.0 },
  { time: "2026-09-25" as Time, open: 24980.0, high: 25110.0, low: 24965.0, close: 25090.5 },
  { time: "2026-09-26" as Time, open: 25095.0, high: 25150.0, low: 25060.0, close: 25140.0 },
]
