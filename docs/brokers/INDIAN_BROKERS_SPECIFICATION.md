# Complete Architecture & Integration Specification: 8 Indian Brokers

This document contains the verified, comprehensive, end-to-end technical specifications for all 8 Indian broker APIs supported by ViewMarket:
1. **Zerodha (Kite Connect v3)**
2. **Angel One (SmartAPI v2)**
3. **Upstox (Upstox API v2 / v3)**
4. **Dhan (DhanHQ API v2)**
5. **Fyers (Fyers API v3)**
6. **Kotak Neo (Kotak Securities Neo API v2)**
7. **ICICI Direct (Breeze API v2)**
8. **Shoonya by Finvasia (Noren API)**

---

## 1. Master Comparative Matrix

| Broker | Base REST URL | WebSocket URL | Auth Protocol | Token Expiry | Historical Data Limits | Instruments Dump Source |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| ![Zerodha Logo](assets/brokers/zerodha.png) **Zerodha** | `https://api.kite.trade` | `wss://ws.kite.trade?api_key={k}&access_token={t}` | OAuth 2.0 (SHA-256 Checksum) | Daily at 06:00 AM IST | Tick/1m/3m/5m/15m/60m/day. Up to 7+ years. | `https://api.kite.trade/instruments` (CSV) |
| ![Angel One Logo](assets/brokers/angelone.png) **Angel One** | `https://apiconnect.angelbroking.com` | `wss://smartapisocket.angelone.in/smart-stream` | MPIN + TOTP Session (`jwtToken` + `refreshToken`) | JWT: 24 hours. Refresh token exchange available. | 1m/5m/15m/day. 5+ years free intraday. | `https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json` |
| ![Upstox Logo](assets/brokers/upstox.png) **Upstox** | `https://api.upstox.com/v2` | `wss://api.upstox.com/v2/feed/market-data-feed` | OAuth 2.0 Authorization Code flow | 24 Hours (Daily 03:30 AM IST) | 1m/30m/1day back to 2014. | `https://assets.upstox.com/market-quote/instruments/exchange/complete.csv.gz` |
| ![Dhan Logo](assets/brokers/dhan.png) **Dhan** | `https://api.dhan.co/v2` | `wss://api-feed.dhan.co?version=2&token={t}&clientId={c}&authType=2` | Static Access Token (portal generated) or OAuth | Static: 24 hours to 30 days. OAuth: 24h. | 1m intraday, Daily historic (5+ years). | `https://images.dhan.co/api-data/api-scrip-master.csv` |
| ![Fyers Logo](assets/brokers/fyers.png) **Fyers** | `https://api-t1.fyers.in/api/v3` | `wss://socket.fyers.in/socket/v3` | OAuth 2.0 (`app_id` + `secret_key` + auth_code) | 24 Hours (Daily 04:00 AM IST) | 1m/5m/60m/daily (10+ years for equity). | `https://public.fyers.in/sym_details/NSE_CD.csv`, `NSE_FO.csv`, `NSE_CM.csv` |
| ![Kotak Neo Logo](assets/brokers/kotakneo.png) **Kotak Neo** | `https://gw-napi.kotaksecurities.com` | `wss://feed.kotaksecurities.com/websocket` | Consumer Key/Secret + MPIN + TOTP | 24 Hours (Daily 06:00 AM IST) | 1m/5m/15m/60m/daily. | `https://lapi.kotaksecurities.com/nest-scrip-master/{exchange}.csv` |
| ![ICICI Securities Logo](assets/brokers/icicidirect.png) **ICICI Direct** | `https://api.icicidirect.com/breezeapi/api/v1` | `wss://bws.icicidirect.com/` (Socket.io) | App Key + Secret Key + SHA-256 Checksum + Session | Daily Session Token generated via Web Portal | 1-second, 1-minute, daily candles. 10 years equity. | `https://api.icicidirect.com/breezeapi/documents/index.html` (Master contract files) |
| ![Shoonya Logo](assets/brokers/shoonya.png) **Shoonya** | `https://api.shoonya.com/NorenWClientAPI/` | `wss://api.shoonya.com/NorenWSAPI/` | Client Code + Password + TOTP + SHA-256 AppKey | Daily Session Token (`susertoken`) | 1m/5m/daily via `/chartapi/getdata/`. | `https://api.shoonya.com/{exchange}_symbols.txt.zip` |

---

## 2. In-Depth Technical Profiles

### 1. Zerodha (Kite Connect v3)

<p align="left"><img src="assets/brokers/zerodha.png" alt="Zerodha Logo" width="36" height="36" /></p>
- **Required Credentials**:
  - `api_key`: Developer app identifier
  - `api_secret`: Secret salt for checksum hashing
  - `user_id`: Zerodha 6-character client ID (e.g. `ZM1234`)
- **Authentication Lifecycle**:
  1. Redirect browser to `https://kite.zerodha.com/connect/login?v=3&api_key={api_key}`.
  2. User authenticates with Zerodha credentials + TOTP.
  3. Zerodha redirects back to your configured `redirect_url` with `?request_token=XXXXX`.
  4. Perform SHA-256 exchange: `checksum = SHA256(api_key + request_token + api_secret)`.
  5. POST to `https://api.kite.trade/session/token` with payload `api_key`, `request_token`, `checksum`.
  6. Response returns `access_token` and `public_token`.
  7. Expiry: Every morning at **06:00 AM IST** automatically.
- **WebSocket Protocol**:
  - Endpoint: `wss://ws.kite.trade?api_key={api_key}&access_token={access_token}`.
  - Framing: **Binary Protobuf/ArrayBuffer** (Sub-millisecond performance).
  - Ping-Pong: Client must send periodic text heartbeat `ping` every 5-10s; server responds with `pong`.
  - Subscription Format:
    ```json
    {"a": "subscribe", "v": [738561, 5633]}
    {"a": "mode", "v": ["full", [738561]]}
    ```
    Modes supported: `ltp`, `quote` (with OHLC + volume), `full` (with 5-depth bid/ask, OI). Max 1,000 scrips.
- **Historical Data API**:
  - Endpoint: `GET https://api.kite.trade/instruments/historical/{instrument_token}/{interval}`
  - Intervals: `minute`, `day`, `3minute`, `5minute`, `15minute`, `30minute`, `60minute`.
  - History length: Multi-year daily; up to 60-90 days per query for 1-minute intervals.
- **Fund / Margin Endpoint**:
  - `GET https://api.kite.trade/user/margins` (returns `equity.available.cash`, `equity.utilised.m2m_unrealised`, etc.).
- **Order Types**: `MARKET`, `LIMIT`, `SL`, `SL-M`, `AMO` (After Market), `ICEBERG`, `TTL`.
- **Symbols Master**: `https://api.kite.trade/instruments` (CSV updated daily at 08:00 AM IST with all tokens, ticks, lot sizes).

---

### 2. Angel One (SmartAPI v2)

<p align="left"><img src="assets/brokers/angelone.png" alt="Angel One Logo" width="36" height="36" /></p>
- **Required Credentials**:
  - `apiKey`: Developer API Key from SmartAPI portal
  - `clientCode`: Angel One Client ID (e.g. `A102938`)
  - `password`: MPIN (4 digits)
  - `totpKey`: Base32 authenticator secret for pyotp
- **Authentication Lifecycle**:
  1. Generate TOTP: `otp = TOTP(totpKey).now()`.
  2. POST `https://apiconnect.angelbroking.com/rest/auth/partner/v1/generate-session` with `clientcode`, `password`, `totp`.
  3. Header: `X-PrivateKey: {apiKey}`, `X-UserType: USER`, `X-SourceID: WEB`.
  4. Response returns `jwtToken` (Auth header bearer) and `refreshToken`.
  5. WebSockets use an extra token: `feedToken = response.data.feedToken` or call `GET /rest/secure/angelbroking/user/v1/getfeedToken`.
- **WebSocket Protocol**:
  - Endpoint: `wss://smartapisocket.angelone.in/smart-stream`
  - Framing: JSON / TCP Binary Stream with sub-second heartbeats.
  - Subscribe Payload:
    ```json
    {
      "correlationID": "strat_01",
      "action": 1,
      "params": {
        "mode": 2,
        "tokenList": [{"exchangeType": 1, "tokens": ["26000", "26009"]}]
      }
    }
    ```
- **Historical Data API**:
  - `POST https://apiconnect.angelbroking.com/rest/secure/angelbroking/historical/v1/getCandleData`
  - Payload: `{"exchange": "NSE", "symboltoken": "3045", "interval": "FIVE_MINUTE", "fromdate": "2026-09-01 09:15", "todate": "2026-09-25 15:30"}`
  - Completely **100% Free** (No subscription required).
- **Fund / Margin Endpoint**:
  - `GET https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getRMS`
  - Returns `net`, `availablecash`, `collateral`, `m2mrealized`.
- **Order Types**: `LIMIT`, `MARKET`, `STOPLOSS_LIMIT`, `STOPLOSS_MARKET`, `ROBO (Bracket)`, `AMO`.
- **Symbols Master**: `https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json`.

---

### 3. Upstox (API v2 / v3)
- **Required Credentials**:
  - `apiKey`: Client ID
  - `apiSecret`: Client Secret
  - `redirectUri`: Whitelisted callback URL
- **Authentication Lifecycle**:
  1. Redirect user to `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id={apiKey}&redirect_uri={redirectUri}`.
  2. Exchange `code`: POST `https://api.upstox.com/v2/login/authorization/token` with `code`, `client_id`, `client_secret`, `redirect_uri`, `grant_type=authorization_code`.
  3. Response returns `access_token` (valid 24h).
- **WebSocket Protocol**:
  - Upstox V3 Market Data Feed: `wss://api.upstox.com/v2/feed/market-data-feed`
  - Feed URL authorization: call `GET https://api.upstox.com/v2/feed/market-data-feed/authorize` using `Bearer {access_token}` to obtain a dynamic signed WebSocket URL.
  - Framing: **Protobuf binary** (`MarketDataFeed.proto`) or JSON.
  - Subscription message:
    ```json
    {"guid": "session_1", "method": "sub", "data": {"mode": "full", "instrumentKeys": ["NSE_EQ|INE002A01018"]}}
    ```
- **Historical Data API**:
  - Endpoint: `GET https://api.upstox.com/v2/historical-candle/{instrument_key}/{interval}/{to_date}/{from_date}`
  - Intervals: `1minute`, `30minute`, `day`, `week`, `month`. Multi-year historical data is accessible at zero cost.
- **Fund / Margin Endpoint**:
  - `GET https://api.upstox.com/v2/user/get-funds-and-margin?segment=SEC`
  - Returns `available_margin`, `used_margin`, `payin_amount`.
- **Order Types**: `MARKET`, `LIMIT`, `SL`, `SL-M`, `GTT` (Good-Till-Triggered), `AMO`.
- **Symbols Master**: `https://assets.upstox.com/market-quote/instruments/exchange/complete.csv.gz`.

---

### 4. Dhan (DhanHQ API v2)

<p align="left"><img src="assets/brokers/dhan.png" alt="Dhan Logo" width="36" height="36" /></p>
- **Required Credentials**:
  - `dhanClientId`: 10-digit user client ID (e.g. `1000000009`)
  - `accessToken`: JWT token (can be generated permanently or 24-hr from Dhan web portal)
- **Authentication Lifecycle**:
  - Dhan provides instant static tokens directly from their web portal under "API Access", or OAuth 2.0 authorization code exchange.
  - Zero ceremony: pass headers `'access-token': accessToken` and `'client-id': dhanClientId`.
  - Expiry: Portal access tokens can be configured for up to 30 days.
- **WebSocket Protocol**:
  - Endpoint: `wss://api-feed.dhan.co?version=2&token={accessToken}&clientId={dhanClientId}&authType=2`
  - Framing: **Binary Feed Engine** (Optimized packet format with 83-byte Quote and 50-byte Ticker frames).
  - Ping-Pong: Server sends heartbeat; client responds every 20s.
  - Subscription payload:
    ```json
    {"RequestCode": 15, "InstrumentCount": 1, "InstrumentList": [{"ExchangeSegment": "NSE_EQ", "SecurityId": "1333"}]}
    ```
- **Historical Data API**:
  - `POST https://api.dhan.co/v2/charts/historical` (Daily candles back 5+ years)
  - `POST https://api.dhan.co/v2/charts/intraday` (1-minute bars)
  - Payload requires `securityId`, `exchangeSegment`, `instrumentType`, `fromDate`, `toDate`.
- **Fund / Margin Endpoint**:
  - `GET https://api.dhan.co/v2/fundlimit`
  - Returns `availabelBalance`, `sodLimit`, `collateralAmount`, `utilizedAmount`.
- **Order Types**: `LIMIT`, `MARKET`, `STOP_LOSS`, `STOP_LOSS_MARKET`, `FOREVER (GTT)`, `SUPER_ORDERS` (Bracket with target/SL).
- **Symbols Master**: `https://images.dhan.co/api-data/api-scrip-master.csv`.

---

### 5. Fyers (Fyers API v3)

<p align="left"><img src="assets/brokers/fyers.png" alt="Fyers Logo" width="36" height="36" /></p>
- **Required Credentials**:
  - `appId`: Developer App ID (e.g. `ABC1234-100`)
  - `secretKey`: Secret Key
  - `redirectUrl`: Whitelisted callback URL
- **Authentication Lifecycle**:
  1. User authenticates via `https://api-t1.fyers.in/api/v3/generate-authcode?client_id={appId}&redirect_uri={redirectUrl}&response_type=code&state=sample`.
  2. Exchange code via POST `https://api-t1.fyers.in/api/v3/validate-authcode` with `appIdHash = SHA256(appId:secretKey)` and `auth_code`.
  3. Returns `access_token` (valid until 04:00 AM IST next day).
- **WebSocket Protocol**:
  - Endpoint: `wss://socket.fyers.in/socket/v3`
  - Authorization: Sent inside the connection handshake or first subscription frame with `accessToken`.
  - Framing: Binary protobuf packets (`msg.proto`) or JSON.
  - Symbols follow Fyers format: `NSE:SBIN-EQ`, `NSE:NIFTY24OCTFUT`, `MCX:CRUDEOIL24NOVFUT`.
- **Historical Data API**:
  - `GET https://api-t1.fyers.in/data/history?symbol=NSE:SBIN-EQ&resolution=5&date_format=1&range_from=2026-09-01&range_to=2026-09-25`
  - Resolutions: `1`, `2`, `3`, `5`, `10`, `15`, `30`, `60`, `120`, `240`, `D`.
- **Fund / Margin Endpoint**:
  - `GET https://api-t1.fyers.in/api/v3/funds`
  - Returns fund limits per segment (`fund_limit.total_balance`, `realized_pnl`).
- **Order Types**: `MARKET`, `LIMIT`, `STOP`, `STOP_LIMIT`, `CO` (Cover Order), `BO` (Bracket Order).
- **Symbols Master**: Available by segment: `https://public.fyers.in/sym_details/NSE_CM.csv`, `NSE_FO.csv`.

---

### 6. Kotak Neo (Kotak Securities Neo API v2)

<p align="left"><img src="assets/brokers/kotakneo.png" alt="Kotak Neo Logo" width="36" height="36" /></p>
- **Required Credentials**:
  - `consumerKey` & `consumerSecret`: From Neo API Developer Portal
  - `mobileNumber`: Trader registered mobile number
  - `neoPassword`: Trading login password
  - `mpin`: 6-digit MPIN or TOTP
- **Authentication Lifecycle**:
  1. POST `https://gw-napi.kotaksecurities.com/oauth/token` with Basic Auth `Base64(consumerKey:consumerSecret)` to get bearer token.
  2. POST `/login/v2/validate` with mobile number and Neo password.
  3. POST `/login/v2/validate/mpin` or TOTP to complete 2FA.
  4. Response yields `sessionToken` and `jwtToken`.
- **WebSocket Protocol**:
  - Endpoint: `wss://feed.kotaksecurities.com/websocket`
  - Handshake requires `Bearer {jwtToken}` and `Sid {sessionToken}`.
  - Streaming updates for Quotes (HS feed) and Order execution feeds.
- **Historical Data API**:
  - Available through the Neo SDK (`client.historical_data`).
  - Supports 1m, 5m, 15m, 60m, daily candles.
- **Fund / Margin Endpoint**:
  - `GET https://gw-napi.kotaksecurities.com/user/v2/limits`
  - Returns total collateral, available trading limit, and utilized margin.
- **Order Types**: `MKT`, `L`, `SL`, `SL-M`, `AMO`.
- **Symbols Master**: `https://lapi.kotaksecurities.com/nest-scrip-master/NSE.csv`, `NFO.csv`, `BSE.csv`.

---

### 7. ICICI Direct (Breeze API v2)

<p align="left"><img src="assets/brokers/icicidirect.png" alt="ICICI Securities Logo" width="60" height="60" /></p>
- **Required Credentials**:
  - `appKey`: Application key
  - `secretKey`: Secret encryption salt
  - `sessionToken`: Generated daily after logging in at `https://api.icicidirect.com/`
- **Authentication Lifecycle**:
  - Every API call calculates a dynamic HMAC-SHA256 checksum:
    `checksum = SHA256(timestamp + payload + secretKey)`
  - Headers required on every HTTP call:
    - `X-Checksum: token {checksum}`
    - `X-Timestamp: {ISO-8601 UTC timestamp}`
    - `X-AppKey: {appKey}`
    - `X-SessionToken: {sessionToken}`
- **WebSocket Protocol**:
  - Powered by **Socket.io** over `wss://bws.icicidirect.com/`.
  - Connect with event `'join'` sending `appKey` and `sessionToken`.
  - Subscribe via socket emit:
    `socket.emit('join', {'stock_code': '4.1!NIFTY 50', 'exchange_code': 'NSE'})`
  - Unique advantage: Provides **1-second OHLC candles** over the socket.
- **Historical Data API**:
  - `GET https://api.icicidirect.com/breezeapi/api/v1/historicalcharts`
  - Intervals: `1second`, `1minute`, `5minute`, `30minute`, `1day`.
  - Up to 10 years of equity tick and bar history.
- **Fund / Margin Endpoint**:
  - `GET https://api.icicidirect.com/breezeapi/api/v1/funds`
  - Returns `total_bank_balance`, `allocated_equity`, `allocated_fno`, `unallocated_balance`.
- **Order Types**: `market`, `limit`, `stoploss`, `special` (Option multi-leg).
- **Symbols Master**: Downloadable security master list from Breeze API developer docs.

---

### 8. Shoonya by Finvasia (Noren API)

<p align="left"><img src="assets/brokers/shoonya.png" alt="Shoonya Logo" width="36" height="36" /></p>
- **Required Credentials**:
  - `userId`: Finvasia client code (e.g. `FA12345`)
  - `apiKey`: Generated from Shoonya PRISM backoffice
  - `password`: Account login password
  - `totpKey`: Base32 authenticator secret for automated 2FA
- **Authentication Lifecycle (Zero-Manual-Browser-Redirect)**:
  1. Compute current TOTP: `otp = pyotp.TOTP(totpKey).now()`.
  2. Compute SHA-256 AppKey: `appKey = SHA256(userId + apiKey)`.
  3. POST `https://api.shoonya.com/NorenWClientAPI/QuickAuth` with payload:
     ```
     jData={"uid":"FA12345","pwd":"password","factor2":"123456","vc":"FA12345_U","appkey":"checksum","imei":"mac_address"}
     ```
  4. Response returns `susertoken` (Session token).
  5. Subsequent requests pass `Authorization: Bearer {susertoken}` or form-encoded `jKey={susertoken}`.
- **WebSocket Protocol**:
  - Endpoint: `wss://api.shoonya.com/NorenWSAPI/`
  - Connect and send authorization JSON:
    ```json
    {"t": "c", "uid": "FA12345", "actid": "FA12345", "susertoken": "session_token", "source": "API"}
    ```
  - Subscription frame:
    ```json
    {"t": "t", "k": "NSE|2885#NSE|22"}
    ```
    (`t="t"` for Touchline LTP, `t="d"` for Market Depth).
  - Heartbeat: Send ping payload `{"t": "h"}` every 10 seconds.
- **Historical Data API**:
  - `POST https://api.shoonya.com/chartapi/getdata/`
  - Request: `jData={"exch":"NSE","token":"2885","st":"1693540800","et":"1696132800","intrv":"5"}`
  - Completely **Free** for all users.
- **Fund / Margin Endpoint**:
  - `POST https://api.shoonya.com/NorenWClientAPI/Limits`
  - Returns `cash`, `payin`, `marginused`, `collateral`.
- **Order Types**: `LMT`, `MKT`, `SL-LMT`, `SL-MKT`, `AMO`.
- **Symbols Master**:
  - Automated ZIP dump: `https://api.shoonya.com/NSE_symbols.txt.zip`, `NFO_symbols.txt.zip`, `MCX_symbols.txt.zip`.
