export type ConnectionCategory = "broker" | "data-provider" | "messaging"
export type ConnectionStatus = "active" | "auth_needed" | "expiring_soon" | "disconnected"

export interface ConnectedServiceItem {
  id: string
  name: string
  subtext: string
  protocol: string
  category: ConnectionCategory
  categoryLabel: string
  status: ConnectionStatus
  statusLabel: string
  expiresText: string
  latency: string
  marketScope: string
  logoUrl?: string
  accentColor: string
}

export const INITIAL_CONNECTED_SERVICES: ConnectedServiceItem[] = [
  {
    id: "conn-zerodha",
    name: "Zerodha",
    subtext: "Kite Connect v3",
    protocol: "Binary Protobuf Stream",
    category: "broker",
    categoryLabel: "Broker",
    status: "auth_needed",
    statusLabel: "Daily TOTP Needed",
    expiresText: "Expired at 06:00 AM IST",
    latency: "—",
    marketScope: "NSE EQ, NSE FO, MCX",
    logoUrl: "/assets/brokers/zerodha.png",
    accentColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  {
    id: "conn-truedata",
    name: "TrueData",
    subtext: "Authorized Real-Time Vendor",
    protocol: "Binary WebSocket & L2 Depth",
    category: "data-provider",
    categoryLabel: "Data Feed",
    status: "active",
    statusLabel: "Live Streaming",
    expiresText: "Valid (30-day API key)",
    latency: "18ms",
    marketScope: "NSE Cash & FnO (5-Best)",
    accentColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: "conn-angelone",
    name: "Angel One",
    subtext: "SmartAPI v2",
    protocol: "TCP Binary Stream",
    category: "broker",
    categoryLabel: "Broker",
    status: "active",
    statusLabel: "Session Active",
    expiresText: "Expires 06:00 AM IST",
    latency: "24ms",
    marketScope: "NSE EQ, BSE Cash",
    logoUrl: "/assets/brokers/angelone.png",
    accentColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  },
  {
    id: "conn-telegram",
    name: "Telegram Alert Bot",
    subtext: "@ViewMarketTradingAlerts",
    protocol: "Bot API HTTPS",
    category: "messaging",
    categoryLabel: "Alert Channel",
    status: "active",
    statusLabel: "Ready",
    expiresText: "Permanent Bot Token",
    latency: "140ms",
    marketScope: "Trade Signals & SL Hits",
    accentColor: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  },
  {
    id: "conn-openalgo",
    name: "OpenAlgo Hub",
    subtext: "Normalized Market Bridge",
    protocol: "REST & Multi-WS",
    category: "data-provider",
    categoryLabel: "Data Feed",
    status: "expiring_soon",
    statusLabel: "Token Expiring",
    expiresText: "Expires in 42 mins",
    latency: "32ms",
    marketScope: "Indices & Derivatives",
    accentColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  },
]
