# Kotak Neo (Trade API v2) - Modular Specification Suite

<p align="left">
  <img src="../../assets/brokers/kotakneo.png" alt="Kotak Neo Broker Logo" width="48" height="48" />
</p>

## 1. Authentication & Lifecycle
- **Required Credentials**:
  - `consumerKey` & `consumerSecret`: Developer App credentials
  - `mobileNumber`: Registered mobile number (+91)
  - `neoPassword`: Login Password
  - `mpin`: 6-digit MPIN or TOTP
- **Flow**:
  1. POST `https://gw-napi.kotaksecurities.com/oauth/token` with `Basic Base64(consumerKey:consumerSecret)` -> Bearer Token.
  2. POST `/login/v2/validate` with Mobile + Password.
  3. POST `/login/v2/validate/mpin` -> `sessionToken` + `jwtToken`.

---

## 2. WebSocket Market Feed
- **WebSocket Endpoint**: `wss://feed.kotaksecurities.com/websocket`
- **Handshake Headers**:
  - `Authorization: Bearer {jwtToken}`
  - `Sid: {sessionToken}`
- **Subscription**:
  ```json
  {
    "type": "subscribe",
    "scrips": ["nse_cm|11536", "nse_fo|35414"]
  }
  ```

---

## 3. Orders, Funds & Symbols
- **Place Order**: `POST https://gw-napi.kotaksecurities.com/orders/v2/order`
- **Funds Limits**: `GET https://gw-napi.kotaksecurities.com/user/v2/limits`
- **Symbols Master**:
  - `https://lapi.kotaksecurities.com/nest-scrip-master/NSE.csv`
  - `https://lapi.kotaksecurities.com/nest-scrip-master/NFO.csv`
