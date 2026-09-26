export interface BrokerField {
  id: string
  label: string
  placeholder: string
  type: "text" | "password"
  required: boolean
  helperText?: string
}

export interface BrokerDefinition {
  id: string
  name: string
  tagline: string
  protocol: string
  category: "Discount Broker" | "Institutional / Bank" | "Direct Access / Algo"
  marketType: "indian" | "crypto"
  features: string[]
  accentColor: string
  docsUrl: string
  logoUrl?: string
  redirectUri?: string
  fields: BrokerField[]
}

export const SUPPORTED_BROKERS: BrokerDefinition[] = [
  {
    id: "zerodha",
    name: "Zerodha",
    tagline: "Kite Connect v3",
    protocol: "Binary Protobuf WebSocket",
    category: "Discount Broker",
    marketType: "indian",
    features: ["Binary WebSockets", "Historical API", "Multi-Asset"],
    accentColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    docsUrl: "https://kite.trade/docs/connect/v3",
    logoUrl: "/assets/brokers/zerodha.png",
    redirectUri: "https://viewmarket.in/api/broker/callback/zerodha",
    fields: [
      { id: "apiKey", label: "API Key", placeholder: "e.g. 29kdf02...", type: "text", required: true },
      { id: "apiSecret", label: "API Secret", placeholder: "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢", type: "password", required: true },
      { id: "userId", label: "Kite User ID (Client Code)", placeholder: "e.g. ZM1024", type: "text", required: true },
      { id: "totpKey", label: "TOTP Secret Key (Optional)", placeholder: "Base32 Auth key for auto-login", type: "password", required: false },
    ],
  },
  {
    id: "angelone",
    name: "Angel One",
    tagline: "SmartAPI v2",
    protocol: "TCP Binary Stream",
    category: "Discount Broker",
    marketType: "indian",
    features: ["Free Historical", "TCP Feed", "Zero API Cost"],
    accentColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    docsUrl: "https://smartapi.angelbroking.com",
    logoUrl: "/assets/brokers/angelone.png",
    fields: [
      { id: "apiKey", label: "API Key", placeholder: "e.g. smart_key_...", type: "text", required: true },
      { id: "clientCode", label: "Client Code", placeholder: "e.g. A10948", type: "text", required: true },
      { id: "mpin", label: "MPIN", placeholder: "â€¢â€¢â€¢â€¢", type: "password", required: true },
      { id: "totpSecret", label: "TOTP Secret", placeholder: "Base32 authenticator secret", type: "password", required: true },
    ],
  },
  {
    id: "upstox",
    name: "Upstox",
    tagline: "Upstox API v2",
    protocol: "Protobuf WebSocket",
    category: "Discount Broker",
    marketType: "indian",
    features: ["OAuth 2.0", "Fast Protobuf", "Equities & F&O"],
    accentColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    docsUrl: "https://upstox.com/developer/api-documentation",
    logoUrl: "/assets/brokers/upstox.png",
    redirectUri: "https://viewmarket.in/api/broker/callback/upstox",
    fields: [
      { id: "apiKey", label: "API Key (Client ID)", placeholder: "e.g. 98ac0...", type: "text", required: true },
      { id: "apiSecret", label: "API Secret", placeholder: "••••••••••••••••", type: "password", required: true },
    ],
  },
  {
    id: "dhan",
    name: "Dhan",
    tagline: "DhanHQ SuperFast API",
    protocol: "Packet-Optimized Binary WS",
    category: "Direct Access / Algo",
    marketType: "indian",
    features: ["Sub-ms Latency", "100% Free API", "Deep Options"],
    accentColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    docsUrl: "https://dhanhq.co/docs",
    logoUrl: "/assets/brokers/dhan.png",
    fields: [
      { id: "clientId", label: "Dhan Client ID", placeholder: "e.g. 100029384", type: "text", required: true },
      { id: "accessToken", label: "Access Token (Static / 24h)", placeholder: "eyJhbGciOi...", type: "password", required: true },
    ],
  },
  {
    id: "fyers",
    name: "Fyers",
    tagline: "Fyers API v3",
    protocol: "WebSocket v3 Data Stream",
    category: "Direct Access / Algo",
    marketType: "indian",
    features: ["TradingView Native", "Tick Feed", "Free API"],
    accentColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    docsUrl: "https://myapi.fyers.in/docs",
    logoUrl: "/assets/brokers/fyers.png",
    redirectUri: "https://viewmarket.in/api/broker/callback/fyers",
    fields: [
      { id: "appId", label: "App ID", placeholder: "e.g. 7X...-100", type: "text", required: true },
      { id: "secretKey", label: "Secret Key", placeholder: "••••••••••••••••", type: "password", required: true },
    ],
  },
  {
    id: "kotakneo",
    name: "Kotak Neo",
    tagline: "Kotak Securities Neo API",
    protocol: "HSM Secure Socket",
    category: "Institutional / Bank",
    marketType: "indian",
    features: ["Institutional Trust", "Zero Brokerage Intraday", "F&O Suite"],
    accentColor: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    docsUrl: "https://www.kotaksecurities.com/trade-api",
    logoUrl: "/assets/brokers/kotakneo.png",
    fields: [
      { id: "consumerKey", label: "Consumer Key", placeholder: "e.g. 5x_...", type: "text", required: true },
      { id: "consumerSecret", label: "Consumer Secret", placeholder: "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢", type: "password", required: true },
      { id: "mobileNumber", label: "Registered Mobile Number", placeholder: "+91 98765 43210", type: "text", required: true },
      { id: "neoPassword", label: "Neo Password", placeholder: "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢", type: "password", required: true },
    ],
  },
  {
    id: "icicidirect",
    name: "ICICI Direct",
    tagline: "Breeze API v2",
    protocol: "Socket.io Streaming",
    category: "Institutional / Bank",
    marketType: "indian",
    features: ["Banking Integrated", "Multi-Leg Strategies", "HNW Reliability"],
    accentColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    docsUrl: "https://api.icicidirect.com/breezeapi",
    logoUrl: "/assets/brokers/icicidirect.png",
    fields: [
      { id: "appKey", label: "App Key", placeholder: "e.g. 8@...b", type: "text", required: true },
      { id: "secretKey", label: "Secret Key", placeholder: "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢", type: "password", required: true },
      { id: "sessionToken", label: "Session Token (Daily generated)", placeholder: "Daily token from Breeze portal", type: "password", required: true },
    ],
  },
  {
    id: "shoonya",
    name: "Shoonya (Finvasia)",
    tagline: "Shoonya Trading API",
    protocol: "TCP WebSocket Stream",
    category: "Direct Access / Algo",
    marketType: "indian",
    features: ["Lifetime ₹0 F&O", "Zero API Cost", "Static TOTP Auth"],
    accentColor: "text-teal-400 bg-teal-400/10 border-teal-400/20",
    docsUrl: "https://shoonya.com/api",
    logoUrl: "/assets/brokers/shoonya.png",
    fields: [
      { id: "userId", label: "User ID (Client Code)", placeholder: "e.g. FA12345", type: "text", required: true },
      { id: "apiKey", label: "API Key", placeholder: "e.g. 8f4a...", type: "text", required: true },
      { id: "password", label: "Password", placeholder: "••••••••", type: "password", required: true },
      { id: "totpSecret", label: "TOTP Key (Base32 Authenticator)", placeholder: "Base32 secret key for automated session", type: "password", required: true },
    ],
  },
]