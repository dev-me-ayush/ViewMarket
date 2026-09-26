# Dhan (DhanHQ API v2) - Modular Specification Suite

<p align="left">
  <img src="../../assets/brokers/dhan.png" alt="Dhan Broker Logo" width="48" height="48" />
</p>

## 1. Authentication & API Key Lifecycle
Dhan offers both instant static tokens from the Dhan web portal and OAuth 2.0.

- **Required Credentials**:
  - `dhanClientId`: 10-digit account ID (e.g. `1000000009`)
  - `accessToken`: JWT Token generated from Dhan Web Portal > Profile > DhanHQ Trading APIs
- **Token Validity**: Static tokens can be configured for **24 hours up to 30 days**.
- **Headers on all HTTP Calls**:
  ```http
  access-token: {accessToken}
  client-id: {dhanClientId}
  Content-Type: application/json
  Accept: application/json
  ```

---

## 2. WebSocket Market Feed Architecture
- **WebSocket Endpoint**: `wss://api-feed.dhan.co?version=2&token={accessToken}&clientId={dhanClientId}&authType=2`
- **Framing**: **Proprietary High-Performance Binary Protocol**
  - Ticker Packet: 50 bytes (LTP, LTT)
  - Quote Packet: 83 bytes (LTP, Volume, OHLC, VWAP, Total Buy/Sell)
  - Full Depth Packet: 350+ bytes (5-level bid/ask depth)
- **Subscription Request (JSON Text)**:
  ```json
  {
    "RequestCode": 15,
    "InstrumentCount": 2,
    "InstrumentList": [
      { "ExchangeSegment": "NSE_EQ", "SecurityId": "1333" },
      { "ExchangeSegment": "NSE_FNO", "SecurityId": "52175" }
    ]
  }
  ```
- **Heartbeat**: Ping sent from server every 20 seconds. Client must stay connected without dropped TCP frames.

---

## 3. Orders, Funds & Historical Candles

### Place Order
- **Endpoint**: `POST https://api.dhan.co/v2/orders`
- **Body**:
  ```json
  {
    "dhanClientId": "1000000009",
    "correlationId": "strat_order_01",
    "transactionType": "BUY",
    "exchangeSegment": "NSE_EQ",
    "productType": "INTRA",
    "orderType": "LIMIT",
    "validity": "DAY",
    "securityId": "1333",
    "quantity": 25,
    "price": 1640.50,
    "triggerPrice": 0
  }
  ```
- **Special Orders**: `Super Orders` (Target + StopLoss automated legs), `Forever Orders` (GTT on Dhan server).

### Fund Limits
- **Endpoint**: `GET https://api.dhan.co/v2/fundlimit`
- **Returns**: `availabelBalance`, `sodLimit`, `collateralAmount`, `utilizedAmount`.

### Historical Candle Data (100% Free)
- **Daily Candles**: `POST https://api.dhan.co/v2/charts/historical`
- **Intraday 1-Minute Candles**: `POST https://api.dhan.co/v2/charts/intraday`
- **Symbols Master**: `https://images.dhan.co/api-data/api-scrip-master.csv`
