# Shoonya by Finvasia (Noren API) - Modular Specification Suite

<p align="left">
  <img src="../../assets/brokers/shoonya.png" alt="Shoonya Broker Logo" width="48" height="48" />
</p>

## 1. Authentication & Headless Login
Shoonya allows completely headless, programmatic morning logins without opening any browser.

- **Required Credentials**:
  - `userId`: Finvasia client code (e.g. `FA12345`)
  - `apiKey`: Generated from Shoonya PRISM
  - `password`: Account password
  - `totpKey`: Base32 authenticator secret for TOTP
- **Flow**:
  1. `totp = pyotp.TOTP(totpKey).now()`
  2. `appKey = SHA256(userId + apiKey)`
  3. `POST https://api.shoonya.com/NorenWClientAPI/QuickAuth`
     - Payload: `jData={"uid":"FA12345","pwd":"...","factor2":"123456","vc":"FA12345_U","appkey":"checksum","imei":"mac"}`
  4. Response: `susertoken` (session token passed in `Authorization: Bearer {susertoken}`).

---

## 2. WebSocket Market Feed
- **WebSocket Endpoint**: `wss://api.shoonya.com/NorenWSAPI/`
- **Connection Handshake**:
  ```json
  {
    "t": "c",
    "uid": "FA12345",
    "actid": "FA12345",
    "susertoken": "session_token",
    "source": "API"
  }
  ```
- **Subscribe Command**:
  ```json
  {"t": "t", "k": "NSE|2885#NSE|22"}
  ```
  (`t="t"` for touchline LTP, `t="d"` for 5-depth orderbook).
- **Heartbeat (Ping)**: Send `{"t": "h"}` every 10 seconds.

---

## 3. Orders, Funds & Symbols (Zero Brokerage)
- **Place Order**: `POST https://api.shoonya.com/NorenWClientAPI/PlaceOrder`
  - Lifetime ₹0 brokerage on Equity delivery, Intraday, and F&O.
- **Funds Limits**: `POST https://api.shoonya.com/NorenWClientAPI/Limits`
- **Historical Data**: `POST https://api.shoonya.com/chartapi/getdata/` (100% Free).
- **Symbols Master Dump**:
  - `https://api.shoonya.com/NSE_symbols.txt.zip`
  - `https://api.shoonya.com/NFO_symbols.txt.zip`
  - `https://api.shoonya.com/MCX_symbols.txt.zip`
