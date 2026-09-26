# Upstox (API v2 / v3) - WebSocket Market Feed Specification

## 1. Connection Architecture (Market Data Feed V3)
Upstox features an enterprise-grade Protobuf-encoded streaming feed.

- **Step 1: Obtain Dynamic Feed URL**:
  - `GET https://api.upstox.com/v2/feed/market-data-feed/authorize`
  - Header: `Authorization: Bearer {access_token}`
  - Returns: `{"status": "success", "data": {"authorizedRedirectUri": "wss://...protobuf-signed-url"}}`
- **Step 2: Connect via WebSocket**:
  - Connect directly to the returned `authorizedRedirectUri`.
- **Framing**: Google Protocol Buffers (`MarketDataFeed.proto`).

---

## 2. Subscription Commands

### Subscribe
```json
{
  "guid": "vm_upstox_sub_1",
  "method": "sub",
  "data": {
    "mode": "full",
    "instrumentKeys": [
      "NSE_INDEX|Nifty 50",
      "NSE_INDEX|Nifty Bank",
      "NSE_EQ|INE002A01018"
    ]
  }
}
```

### Modes
- `ltpc`: Last Traded Price, Close, Timestamp
- `full`: LTPC + 5-depth Market Depth + Option Greeks (Delta, Theta, Gamma, Vega, IV) + Open Interest

---

## 3. Orders & Portfolio Streamer
- **WebSocket URL**: `wss://api.upstox.com/v2/feed/portfolio-stream-feed`
- Provides instant asynchronous push notifications whenever orders are executed, modified, or cancelled.
