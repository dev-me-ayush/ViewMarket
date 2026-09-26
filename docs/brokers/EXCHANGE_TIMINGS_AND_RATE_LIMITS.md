# Indian Exchanges Trading Timings, Order Windows & Rate Limits

## 1. Official Exchange Trading Sessions (NSE & BSE)
All times are Indian Standard Time (IST - UTC+05:30).

| Session | Time Window (IST) | Supported Operations | Broker API Behavior |
| :--- | :--- | :--- | :--- |
| **Block Deal Window (Morning)** | 08:45 AM – 09:00 AM | Large block transactions only | Institutional access only. Retail orders rejected. |
| **Pre-Open Order Entry** | 09:00 AM – 09:08 AM | Enter, modify, cancel limit & market orders | Orders queue for equilibrium opening price. |
| **Pre-Open Order Matching** | 09:08 AM – 09:12 AM | Equilibrium price discovery & match | No order modifications or entries allowed. |
| **Pre-Open Buffer Transition** | 09:12 AM – 09:15 AM | Transition to continuous CTS | System buffer period. |
| **Normal Continuous Trading** | **09:15 AM – 03:30 PM** | All Equities (NSE/BSE) & Equity F&O (NFO) | Real-time immediate limit & market order execution. |
| **Block Deal Window (Afternoon)**| 02:05 PM – 02:20 PM | Minimum ₹10 Crore deal size | Institutional access only. |
| **Closing Session** | 03:30 PM – 03:40 PM | Weighted average calculation | 30-minute VWAP calculated for settlement price. |
| **Post-Market Session** | 03:40 PM – 04:00 PM | Trade at discovered closing price | Limit orders accepted strictly at closing price. |
| **After Market Orders (AMO)** | **04:00 PM / 06:30 PM – 09:00 AM** | AMO Queueing | Queued on broker servers and placed at 09:00 AM or 09:15 AM. |
| **MCX Commodity Trading** | **09:00 AM – 11:30 PM / 11:55 PM** | Commodity Futures & Options | Runs through the evening (until 11:55 PM during US Daylight Savings). |

---

## 2. Broker API Rate Limits & Throttling Matrix

| Broker | Order Placement Limit | General REST API Limit | Historical Data Limit | WebSocket Connection Limits |
| :--- | :--- | :--- | :--- | :--- |
| **Zerodha** | **10 Orders/sec (OPS)** | 3 Requests/sec | 3 Requests/sec | Max 3 concurrent sockets / API key, 1000 scrips/socket |
| **Angel One** | **10 Orders/sec** | 10 Requests/sec | 3 Requests/sec | 1 socket connection / client, up to 500 scrips |
| **Upstox** | **10 Orders/sec** | 50 Requests/sec | 50 Requests/sec | Dynamic authorized WebSocket feed |
| **Dhan** | **10 Orders/sec** (burst 25/s) | 20 Requests/sec | 10 Requests/sec | 1 WebSocket connection / clientId |
| **Fyers** | **10 Orders/sec** | 10 Requests/sec | 5 Requests/sec | 1 Data Socket + 1 Order Socket |
| **Kotak Neo** | **10 Orders/sec** | 10 Requests/sec | 5 Requests/sec | 1 HSM Feed socket |
| **ICICI Direct** | **5 Orders/sec** | 5 Requests/sec | 5 Requests/sec | Socket.io stream with auto-reconnect |
| **Shoonya** | **10 Orders/sec** | 10 Requests/sec | 10 Requests/sec | TCP Socket, max 500 scrips per frame |

---

## 3. After Market Orders (AMO) Timing Schedule by Broker

| Broker | AMO Window Opens (Evening) | AMO Window Closes (Morning) | Segments Allowed |
| :--- | :--- | :--- | :--- |
| **Zerodha** | 04:00 PM (Equities) / 06:30 PM (F&O) | 08:59 AM (Equities) / 09:10 AM (F&O) | CNC, MIS (Equities), NRML (F&O) |
| **Angel One** | 04:15 PM | 08:59 AM | Equity Delivery, Intraday, F&O |
| **Upstox** | 04:00 PM | 09:00 AM | Equity, F&O, Currency |
| **Dhan** | 04:30 PM | 09:05 AM | Equity, F&O, Commodities |
| **Fyers** | 04:00 PM | 09:00 AM | Equity Delivery, Intraday |
| **Kotak Neo** | 04:30 PM | 09:00 AM | Equity & Derivatives |
| **ICICI Direct**| 04:00 PM | 08:55 AM | Cash Equity only |
| **Shoonya** | 04:15 PM | 09:00 AM | Equity, F&O, Currency |

---

## 4. Universal Error Codes & Edge Case Matrix

| HTTP Status | Error Type | Cause | Recommended Client Action |
| :--- | :--- | :--- | :--- |
| `400 Bad Request` | `InputException` / `InvalidToken` | Malformed parameters, wrong instrument token | Validate token against latest morning instrument dump |
| `401 Unauthorized` | `TokenException` / `SessionExpired` | Access token expired (passed morning cutoff) | Prompt user to re-authenticate or refresh token |
| `403 Forbidden` | `PermissionDenied` / `KycPending` | Account deactivated, F&O segment inactive | Display broker error message directly to user |
| `429 Too Many Requests` | `RateLimitExceeded` | Surpassed 10 orders/sec or REST limit | Apply exponential backoff with jitter (500ms -> 1s -> 2s) |
| `502 / 503` | `GatewayTimeout` / `ExchangeDown` | Exchange matching engine or broker OMS down | Retry after 3 seconds; check exchange circuit status |
