export interface DataProviderField {
  id: string
  label: string
  placeholder: string
  type: "text" | "password"
  required: boolean
  helperText?: string
}

export interface DataProviderDefinition {
  id: string
  name: string
  tagline: string
  protocol: string
  category: "Tick-by-Tick Feed" | "Intraday & EOD" | "Open Bridge" | "Custom BYOF"
  feedType: "tick" | "eod" | "custom"
  marketCoverage: string[]
  features: string[]
  accentColor: string
  docsUrl: string
  fields: DataProviderField[]
}

export const SUPPORTED_DATA_PROVIDERS: DataProviderDefinition[] = [
  {
    id: "truedata",
    name: "TrueData",
    tagline: "Authorized NSE/BSE & MCX Real-time Feed",
    protocol: "Binary Protobuf & JSON WebSocket",
    category: "Tick-by-Tick Feed",
    feedType: "tick",
    marketCoverage: ["NSE EQ", "NSE FO", "MCX", "BSE"],
    features: ["Tick-by-Tick Live", "Level 2 Depth (5-Best)", "10+ Yrs Tick History", "Corporate Actions"],
    accentColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    docsUrl: "https://docs.truedata.in",
    fields: [
      { id: "username", label: "TrueData Username", placeholder: "e.g. TD10283", type: "text", required: true },
      { id: "password", label: "Account Password", placeholder: "••••••••••••••••", type: "password", required: true },
      { id: "apiKey", label: "Market Data API Key", placeholder: "e.g. td_live_98a7...", type: "password", required: true },
    ],
  },
  {
    id: "globaldatafeeds",
    name: "GlobalDataFeeds (GFDL)",
    tagline: "Dotex Authorized Real-Time Feed Engine",
    protocol: "High-Speed TCP & WebSocket",
    category: "Tick-by-Tick Feed",
    feedType: "tick",
    marketCoverage: ["NSE Cash", "NSE Futures", "NSE Options", "MCX"],
    features: ["Sub-50ms Latency", "1-Min & 5-Min Bars", "Realtime Greeks", "EOD Adjusted"],
    accentColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    docsUrl: "https://globaldatafeeds.in",
    fields: [
      { id: "loginId", label: "GFDL Client Login ID", placeholder: "e.g. GFD8920", type: "text", required: true },
      { id: "passkey", label: "API Passkey", placeholder: "••••••••••••••••", type: "password", required: true },
      { id: "serverPort", label: "Preferred Stream Port (Optional)", placeholder: "e.g. 8082", type: "text", required: false },
    ],
  },
  {
    id: "openalgo",
    name: "OpenAlgo Market Hub",
    tagline: "Open-Source Normalized Market Data Feed",
    protocol: "REST & Multiplexed WebSocket",
    category: "Open Bridge",
    feedType: "tick",
    marketCoverage: ["NSE", "BSE", "MCX", "Indices"],
    features: ["Zero Vendor Lock-in", "Community Driven", "Multi-Broker Routing", "Local Caching"],
    accentColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    docsUrl: "https://openalgo.in",
    fields: [
      { id: "hubUrl", label: "OpenAlgo Hub Endpoint URL", placeholder: "http://127.0.0.1:5000 or https://hub.domain.com", type: "text", required: true },
      { id: "apiKey", label: "Hub API Key", placeholder: "e.g. oa_live_...", type: "password", required: true },
    ],
  },
  {
    id: "eodhd",
    name: "EODHD India Feeds",
    tagline: "Institutional EOD, Intraday & Fundamental Data",
    protocol: "JSON REST & Streaming WebSocket",
    category: "Intraday & EOD",
    feedType: "eod",
    marketCoverage: ["NSE", "BSE"],
    features: ["30+ Yrs History", "Corporate Dividends & Splits", "1-Min Intraday Bars", "Balance Sheets"],
    accentColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    docsUrl: "https://eodhd.com/financial-apis/",
    fields: [
      { id: "apiToken", label: "EODHD API Token", placeholder: "e.g. 642e18d...", type: "password", required: true },
    ],
  },
  {
    id: "custom-udf",
    name: "Custom Datafeed (BYOF)",
    tagline: "Bring Your Own Feed (TradingView UDF / Custom WS)",
    protocol: "UDF REST & Custom WebSocket",
    category: "Custom BYOF",
    feedType: "custom",
    marketCoverage: ["Custom", "Prop Desk", "Synthetic"],
    features: ["TradingView UDF Standard", "Custom Headers", "Private Network Compatible", "Raw Stream"],
    accentColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    docsUrl: "https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/",
    fields: [
      { id: "restUrl", label: "UDF REST Endpoint URL", placeholder: "https://feed.yourdomain.com/udf", type: "text", required: true },
      { id: "wsUrl", label: "WebSocket Feed URL (Optional)", placeholder: "wss://feed.yourdomain.com/ws", type: "text", required: false },
      { id: "authHeader", label: "Authorization Header / Bearer Token", placeholder: "Bearer eyJhbGci...", type: "password", required: false },
    ],
  },
]
