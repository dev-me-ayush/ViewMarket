# Angel One (SmartAPI v2) - WebSocket & Live Data Feed

## 1. Connection Architecture (SmartWebSocketV2)
Angel One uses **SmartWebSocketV2** for real-time market quotes and depth streaming.

- **WebSocket URL**: `wss://smartapisocket.angelone.in/smart-stream`
- **Required Tokens for Handshake**:
  - `auth_token`: The `jwtToken` from authentication
  - `api_key`: Developer API key
  - `client_code`: Angel One Client ID
  - `feed_token`: The distinct `feedToken` obtained during login
- **Headers in Handshake**:
  ```http
  Authorization: Bearer {jwtToken}
  x-api-key: {apiKey}
  x-client-code: {clientCode}
  x-feed-token: {feedToken}
  ```

---

## 2. Subscription Commands

### Subscribe Request (Action = 1)
```json
{
  "correlationID": "viewmarket_sub_01",
  "action": 1,
  "params": {
    "mode": 2,
    "tokenList": [
      {
        "exchangeType": 1,
        "tokens": ["26000", "26009"]
      },
      {
        "exchangeType": 2,
        "tokens": ["57919", "57920"]
      }
    ]
  }
}
```

### Unsubscribe Request (Action = 2)
```json
{
  "correlationID": "viewmarket_unsub_01",
  "action": 2,
  "params": {
    "mode": 2,
    "tokenList": [
      {
        "exchangeType": 2,
        "tokens": ["57919"]
      }
    ]
  }
}
```

### Modes Supported
- `mode: 1` -> **LTP** (Last Traded Price only)
- `mode: 2` -> **Quote** (LTP, OHLC, Traded Volume, Last Traded Quantity)
- `mode: 3` -> **SnapQuote** (Quote + Full 5-depth Market Depth + Open Interest)

---

## 3. Streaming Response Packet
```json
{
  "exchange_type": 1,
  "token": "26000",
  "exchange_timestamp": 1727334520000,
  "last_traded_price": 2585050,
  "open_price_of_the_day": 2570000,
  "high_price_of_the_day": 2598000,
  "low_price_of_the_day": 2565000,
  "closed_price": 2568000,
  "volume_traded_for_the_day": 8540200
}
```
*Note: Prices are in paise (divide by 100 to get INR).*
