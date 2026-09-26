export type LogLevel = "ALL" | "INFO" | "WARN" | "ERROR" | "TRADE"
export type LogStream = "all" | "agent" | "broker" | "system"

export interface LogEntry {
  id: string
  timestamp: string
  level: "INFO" | "WARN" | "ERROR" | "TRADE"
  stream: "agent" | "broker" | "system"
  source: string
  message: string
  latencyMs?: number
  statusCode?: number
  metadata?: Record<string, unknown>
}

export const MOCK_LOGS: LogEntry[] = [
  {
    id: "log-101",
    timestamp: "11:28:44.102",
    level: "TRADE",
    stream: "broker",
    source: "Broker:Zerodha",
    message: "Order placed: BUY 50 NIFTY 24500 CE @ 142.50. Human confirmed.",
    latencyMs: 38,
    statusCode: 200,
    metadata: {
      orderId: "24092600192841",
      exchange: "NFO",
      tradingsymbol: "NIFTY24SEP24500CE",
      broker: "Zerodha Kite Connect v3",
      decisionLatencyMs: 31.4,
      fillStatus: "COMPLETE",
      executionPrice: 142.50,
      clientConfirmTimestamp: "2026-09-26T05:58:44.071Z"
    }
  },
  {
    id: "log-102",
    timestamp: "11:28:40.850",
    level: "INFO",
    stream: "agent",
    source: "Agent:AlphaBreakout",
    message: "ModernBERT verdict: Entailment (confidence: 94.2%). Breakout validated on 5m candle.",
    latencyMs: 19,
    statusCode: 200,
    metadata: {
      model: "dleemiller/ModernCE-base-nli",
      engine: "ModernBERT ONNX Runtime",
      hypothesis: "Market structure is strongly bullish above 24,480 resistance.",
      premise: "NIFTY 5m candle closed at 24,492 with 1.8x volume expansion.",
      score: 0.942,
      inferenceTimeMs: 18.6
    }
  },
  {
    id: "log-103",
    timestamp: "11:28:35.412",
    level: "INFO",
    stream: "system",
    source: "Gateway:LiveKit",
    message: "Voice agent session active: room 'trader-session-98520' audio stream stable (jitter: 2ms).",
    latencyMs: 12,
    statusCode: 200,
    metadata: {
      roomId: "trader-session-98520",
      vadStatus: "prewarmed",
      activeParticipants: 1,
      transport: "WebRTC",
      audioCodec: "opus/48000"
    }
  },
  {
    id: "log-104",
    timestamp: "11:28:18.220",
    level: "WARN",
    stream: "broker",
    source: "Broker:AngelOne",
    message: "Rate limit warning: 8/10 requests in 1s window on SmartAPI v2 quote endpoint.",
    latencyMs: 44,
    statusCode: 429,
    metadata: {
      broker: "Angel One SmartAPI v2",
      endpoint: "/rest/secure/angelbroking/market/v1/quote",
      retryAfterMs: 250,
      circuitBreaker: "NOMINAL"
    }
  },
  {
    id: "log-105",
    timestamp: "11:27:59.091",
    level: "INFO",
    stream: "system",
    source: "System:Proxy",
    message: "Next.js 16 proxy check verified. Auth token valid. Route: /dashboard/logs.",
    latencyMs: 4,
    statusCode: 200,
    metadata: {
      handler: "proxy.ts",
      authenticated: true,
      userRole: "trader",
      ip: "127.0.0.1"
    }
  },
  {
    id: "log-106",
    timestamp: "11:27:12.784",
    level: "ERROR",
    stream: "agent",
    source: "Agent:MeanReversion",
    message: "SEBI Risk Parameter tripped: Stop-loss breach detected (-1.5%). Order auto-halted.",
    latencyMs: 22,
    statusCode: 422,
    metadata: {
      rule: "SEBI Mandate & Platform Risk Limit",
      maxDailyDrawdownAllowed: "-1.5%",
      currentDrawdown: "-1.54%",
      actionTaken: "TRADING_SUSPENDED_FOR_SESSION",
      complianceNote: "Non-custodial mandatory guardrail protection"
    }
  },
  {
    id: "log-107",
    timestamp: "11:26:45.310",
    level: "TRADE",
    stream: "broker",
    source: "Broker:Dhan",
    message: "Order filled: SELL 25 BANKNIFTY 52000 PE @ 288.10. Gateway ACK in 27ms.",
    latencyMs: 27,
    statusCode: 200,
    metadata: {
      orderId: "DHAN-99218491",
      exchange: "NSE_FNO",
      symbol: "BANKNIFTY 52000 PE",
      broker: "DhanHQ API",
      status: "EXECUTED"
    }
  },
  {
    id: "log-108",
    timestamp: "11:25:30.125",
    level: "INFO",
    stream: "system",
    source: "Feed:WebSocket",
    message: "NSE Tick Feed synchronized. 4,820 symbols refreshed. Sub-5ms stream latency.",
    latencyMs: 5,
    statusCode: 200,
    metadata: {
      ticksReceived: 148290,
      dropRate: "0.00%",
      activeSubscriptions: ["NIFTY 50", "NIFTY BANK", "FINNIFTY"]
    }
  }
]
