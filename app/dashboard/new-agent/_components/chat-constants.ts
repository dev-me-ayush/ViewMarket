import type { AIModelOption, HistorySession } from "./types"

export const AVAILABLE_MODELS: AIModelOption[] = [
  {
    id: "mercury-2.5",
    name: "Mercury 2.5",
    description: "High-throughput Inception Labs reasoning engine with balanced key pool",
    tag: "Primary",
  },
  {
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    description: "Sub-second Vertex AI model for rapid market parsing & low-latency checks",
    tag: "Vertex AI",
  },
]

export const STARTER_PROMPTS = [
  "Build a 15m NIFTY EMA 9/21 trend crossover with ATR trailing stop",
  "Design a mean-reversion RSI strategy with 1:2 risk-to-reward ratio",
  "Create an intraday BankNIFTY volatility breakout agent with SL at 0.5%",
  "Generate Python logic for an automated delta-neutral option adjustment",
]

export const INITIAL_HISTORY: HistorySession[] = [
  {
    id: "sess-1",
    title: "NIFTY 15m EMA Trend Scalper",
    lastMessage: "Parameters set: Fast EMA = 9, Slow EMA = 21, ATR Multiplier = 1.5",
    timestamp: "10 mins ago",
    model: "Mercury 2.5",
  },
  {
    id: "sess-2",
    title: "BankNIFTY Opening Range Breakout",
    lastMessage: "Trigger condition defined for 09:30 candle high/low expansion.",
    timestamp: "Yesterday",
    model: "Mercury 2.5",
  },
  {
    id: "sess-3",
    title: "Finnifty 0DTE Mean Reversion",
    lastMessage: "Risk guardrails configured: max daily loss capped at ₹5,000.",
    timestamp: "3 days ago",
    model: "Gemini 2.5 Flash Lite",
  },
]
