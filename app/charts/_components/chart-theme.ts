import type {
  ChartOptions,
  DeepPartial,
  CandlestickSeriesOptions,
  BarSeriesOptions,
  LineSeriesOptions,
  AreaSeriesOptions,
  BaselineSeriesOptions,
} from "lightweight-charts"

export const darkChartOptions: DeepPartial<ChartOptions> = {
  layout: {
    background: { color: "transparent" },
    textColor: "#a1a1aa", // zinc-400
    fontSize: 11,
    fontFamily: "var(--font-sans), system-ui, sans-serif",
    attributionLogo: false,
  },
  grid: {
    vertLines: {
      color: "rgba(255, 255, 255, 0.04)",
    },
    horzLines: {
      color: "rgba(255, 255, 255, 0.04)",
    },
  },
  crosshair: {
    mode: 1, // Magnet mode
    vertLine: {
      color: "#52525b",
      width: 1,
      style: 3, // Dashed
    },
    horzLine: {
      color: "#52525b",
      width: 1,
      style: 3, // Dashed
    },
  },
  timeScale: {
    borderColor: "rgba(255, 255, 255, 0.08)",
    timeVisible: true,
    secondsVisible: false,
    barSpacing: 10,
    minBarSpacing: 4,
  },
  rightPriceScale: {
    borderColor: "rgba(255, 255, 255, 0.08)",
    autoScale: true,
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
  },
  handleScale: {
    axisPressedMouseMove: true,
    mouseWheel: true,
    pinch: true,
  },
  handleScroll: {
    mouseWheel: true,
    pressedMouseMove: true,
    horzTouchDrag: true,
    vertTouchDrag: false,
  },
}

export const candlestickSeriesOptions: DeepPartial<CandlestickSeriesOptions> = {
  upColor: "#26a69a", // TradingView signature green
  downColor: "#ef5350", // TradingView signature red
  borderVisible: true,
  borderUpColor: "#26a69a",
  borderDownColor: "#ef5350",
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350",
}

export const barSeriesOptions: DeepPartial<BarSeriesOptions> = {
  upColor: "#26a69a",
  downColor: "#ef5350",
}

export const lineSeriesOptions: DeepPartial<LineSeriesOptions> = {
  color: "#60a5fa",
  lineWidth: 2,
  priceLineVisible: true,
}

export const areaSeriesOptions: DeepPartial<AreaSeriesOptions> = {
  lineColor: "#60a5fa",
  topColor: "rgba(96, 165, 250, 0.35)",
  bottomColor: "rgba(96, 165, 250, 0.02)",
  lineWidth: 2,
}

export function baselineSeriesOptions(baseValue: number): DeepPartial<BaselineSeriesOptions> {
  return {
    baseValue: { type: "price", price: baseValue },
    topLineColor: "#26a69a",
    bottomLineColor: "#ef5350",
    topFillColor1: "rgba(38, 166, 154, 0.28)",
    topFillColor2: "rgba(38, 166, 154, 0.02)",
    bottomFillColor1: "rgba(239, 83, 80, 0.02)",
    bottomFillColor2: "rgba(239, 83, 80, 0.28)",
  }
}

