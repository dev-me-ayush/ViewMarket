export interface SymbolEntry {
  symbol: string
  name: string
  exchange: "NSE" | "BSE"
  type: "Index" | "Equity" | "Future" | "Option"
}

export const DEFAULT_SYMBOL: SymbolEntry = {
  symbol: "NIFTY 50",
  name: "Nifty 50 Index",
  exchange: "NSE",
  type: "Index",
}

// Phase 1 demo list. Phase 2 replaces the source with broker instrument
// masters; the SymbolEntry contract stays the same.
export const DEMO_SYMBOLS: SymbolEntry[] = [
  { symbol: "NIFTY 50", name: "Nifty 50 Index", exchange: "NSE", type: "Index" },
  { symbol: "NIFTY BANK", name: "Nifty Bank Index", exchange: "NSE", type: "Index" },
  { symbol: "FINNIFTY", name: "Nifty Financial Services", exchange: "NSE", type: "Index" },
  { symbol: "INDIA VIX", name: "Volatility Index", exchange: "NSE", type: "Index" },
  { symbol: "RELIANCE", name: "Reliance Industries", exchange: "NSE", type: "Equity" },
  { symbol: "HDFCBANK", name: "HDFC Bank", exchange: "NSE", type: "Equity" },
  { symbol: "ICICIBANK", name: "ICICI Bank", exchange: "NSE", type: "Equity" },
  { symbol: "SBIN", name: "State Bank of India", exchange: "NSE", type: "Equity" },
  { symbol: "INFY", name: "Infosys", exchange: "NSE", type: "Equity" },
  { symbol: "TCS", name: "Tata Consultancy Services", exchange: "NSE", type: "Equity" },
  { symbol: "TATAMOTORS", name: "Tata Motors", exchange: "NSE", type: "Equity" },
  { symbol: "TITAN", name: "Titan Company", exchange: "NSE", type: "Equity" },
  { symbol: "ASIANPAINT", name: "Asian Paints", exchange: "NSE", type: "Equity" },
  { symbol: "AXISBANK", name: "Axis Bank", exchange: "NSE", type: "Equity" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", exchange: "NSE", type: "Equity" },
  { symbol: "LT", name: "Larsen & Toubro", exchange: "NSE", type: "Equity" },
  { symbol: "MARUTI", name: "Maruti Suzuki", exchange: "NSE", type: "Equity" },
  { symbol: "SUNPHARMA", name: "Sun Pharma", exchange: "NSE", type: "Equity" },
  { symbol: "TATASTEEL", name: "Tata Steel", exchange: "NSE", type: "Equity" },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement", exchange: "NSE", type: "Equity" },
  { symbol: "NIFTY FUT", name: "Nifty 50 Futures", exchange: "NSE", type: "Future" },
  { symbol: "BANKNIFTY FUT", name: "Nifty Bank Futures", exchange: "NSE", type: "Future" },
  { symbol: "RELIANCE FUT", name: "Reliance Futures", exchange: "NSE", type: "Future" },
  { symbol: "NIFTY 25000 CE", name: "Nifty 25000 Call", exchange: "NSE", type: "Option" },
  { symbol: "NIFTY 25000 PE", name: "Nifty 25000 Put", exchange: "NSE", type: "Option" },
  { symbol: "BANKNIFTY 58000 CE", name: "Bank Nifty 58000 Call", exchange: "NSE", type: "Option" },
]

export function findSymbol(symbol: string): SymbolEntry | undefined {
  return DEMO_SYMBOLS.find((s) => s.symbol === symbol)
}
