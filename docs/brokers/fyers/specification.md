# Fyers (Fyers API v3) - Modular Specification Suite

<p align="left">
  <img src="../../assets/brokers/fyers.png" alt="Fyers Broker Logo" width="48" height="48" />
</p>

## 1. Authentication & Lifecycle
- **Required Credentials**:
  - `appId`: Client ID (e.g. `ABC1234-100`)
  - `secretKey`: Secret Key
  - `redirectUrl`: Configured callback URL
- **Lifecycle Flow**:
  1. Authorize via browser: `https://api-t1.fyers.in/api/v3/generate-authcode?client_id={appId}&redirect_uri={redirectUrl}&response_type=code&state=vm`
  2. Compute `appIdHash = SHA256(appId:secretKey)`
  3. POST `https://api-t1.fyers.in/api/v3/validate-authcode` with `appIdHash` and `auth_code`.
  4. Returns `access_token` valid until 04:00 AM IST.

---

## 2. WebSocket Streaming (Data & Order Sockets)
- **Data Socket URL**: `wss://socket.fyers.in/socket/v3`
- **Framing**: Binary Protobuf (`msg.proto`) or JSON.
- **Subscription Format**:
  ```json
  {
    "T": "SUB_DATA",
    "SUB_T": 1,
    "SYMBOLS": ["NSE:SBIN-EQ", "NSE:NIFTY24OCTFUT"]
  }
  ```
- **Order Socket**: `wss://socket.fyers.in/orders/v3` for asynchronous execution postbacks.

---

## 3. Orders, Funds & Historical Candles
- **Place Order**: `POST https://api-t1.fyers.in/api/v3/orders/sync`
- **Funds**: `GET https://api-t1.fyers.in/api/v3/funds`
- **Historical Data**:
  - `GET https://api-t1.fyers.in/data/history?symbol=NSE:SBIN-EQ&resolution=1&date_format=1&range_from=2026-09-01&range_to=2026-09-25`
  - Resolutions: `1`, `2`, `3`, `5`, `15`, `30`, `60`, `D`.
- **Symbols Master**:
  - `https://public.fyers.in/sym_details/NSE_CM.csv` (Equities)
  - `https://public.fyers.in/sym_details/NSE_FO.csv` (Derivatives)
