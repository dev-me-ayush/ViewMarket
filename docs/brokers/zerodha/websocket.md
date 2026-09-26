# Zerodha (Kite Connect v3) - WebSocket Market Feed Specification

## 1. Connection Architecture
Kite Connect publishes live real-time market data quotes, ticks, and order execution events via WebSocket protocol.

- **WebSocket URL**: `wss://ws.kite.trade?api_key={api_key}&access_token={access_token}`
- **Framing Protocol**: **Binary Stream (Big-Endian ArrayBuffer / Protobuf)**
- **Authentication**: Provided directly in URL query parameters during handshake. No separate WebSocket token is required.
- **Maximum Instrument Limit**: Up to **1,000 instruments** per connection. Up to **3 concurrent WebSocket connections** per API key.

---

## 2. Heartbeat & Liveness (Ping-Pong)
- **Client Heartbeat**: The client application must send a text string `"ping"` every **5 to 10 seconds**.
- **Server Response**: Server replies with `"pong"`.
- **Timeout**: If neither ping nor pong is exchanged within 30 seconds, connection drops with code `1006` or `1000`.

---

## 3. Subscription & Modes

### Subscription Command (JSON Text)
```json
{"a": "subscribe", "v": [738561, 5633]}
```

### Unsubscribe Command
```json
{"a": "unsubscribe", "v": [5633]}
```

### Setting Modes
Kite supports 3 streaming modes:
1. `ltp`: Last Traded Price only (8-byte binary packet).
2. `quote`: LTP, OHLC, Volume, Change, Buy/Sell quantity (44-byte binary packet).
3. `full`: Quote + Full 5-depth Market Depth (Bid/Ask 5 levels) + Open Interest (184-byte binary packet).

```json
{"a": "mode", "v": ["full", [738561]]}
```

---

## 4. Binary Packet Structure (Quote Mode - 44 Bytes)

| Byte Offset | Data Type | Field | Description |
| :--- | :--- | :--- | :--- |
| `0 - 3` | Int32 (Big-Endian) | `instrument_token` | Unique exchange identifier |
| `4 - 7` | Int32 / 100 | `last_price` | Last traded price in Rupees |
| `8 - 11` | Int32 | `last_traded_quantity` | Traded volume on tick |
| `12 - 15` | Int32 / 100 | `average_traded_price` | Volume-weighted average price (VWAP) |
| `16 - 19` | Int32 | `volume_traded` | Cumulative day's traded volume |
| `20 - 23` | Int32 | `total_buy_quantity` | Total buy market depth |
| `24 - 27` | Int32 | `total_sell_quantity` | Total sell market depth |
| `28 - 31` | Int32 / 100 | `open` | Day's opening price |
| `32 - 35` | Int32 / 100 | `high` | Day's high price |
| `36 - 39` | Int32 / 100 | `low` | Day's low price |
| `40 - 43` | Int32 / 100 | `close` | Previous day's closing price |
