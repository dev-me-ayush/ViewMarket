import type {
  ChartOptions,
  DeepPartial,
  CandlestickSeriesOptions,
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

