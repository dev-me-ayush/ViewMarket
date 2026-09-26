# ICICI Direct (Breeze API v2) - Modular Specification Suite

<p align="left">
  <img src="../../assets/brokers/icicidirect.png" alt="ICICI Securities Broker Logo" width="80" height="80" />
</p>

## 1. Authentication & HMAC Verification
- **Required Credentials**:
  - `appKey`: Application key
  - `secretKey`: Secret encryption salt
  - `sessionToken`: Generated daily on Breeze API portal
- **HMAC-SHA256 Checksum on EVERY Request**:
  - `checksum = SHA256(timestamp + payload_json + secretKey)`
- **Mandatory Request Headers**:
  ```http
  X-Checksum: token {checksum}
  X-Timestamp: 2026-09-26T04:30:00.000Z
  X-AppKey: {appKey}
  X-SessionToken: {sessionToken}
  Content-Type: application/json
  ```

---

## 2. WebSocket Streaming (Socket.io)
- **Protocol**: Socket.io client over `wss://bws.icicidirect.com/`
- **Join Event**:
  ```javascript
  socket.emit('join', {
    appKey: appKey,
    sessionToken: sessionToken
  });
  ```
- **Subscribe Event**:
  ```javascript
  socket.emit('watch', {
    stock_code: '4.1!NIFTY 50',
    exchange_code: 'NSE'
  });
  ```
- **Special Capability**: Streams **1-second OHLC candles** directly via socket.

---

## 3. Orders, Funds & Historical Candles
- **Place Order**: `POST https://api.icicidirect.com/breezeapi/api/v1/order`
- **Funds & Margins**: `GET https://api.icicidirect.com/breezeapi/api/v1/funds`
  - Returns `total_bank_balance`, `allocated_equity`, `allocated_fno`, `unallocated_balance`.
- **Historical Data (10 Years History)**:
  - `GET https://api.icicidirect.com/breezeapi/api/v1/historicalcharts`
  - Intervals: `1second`, `1minute`, `5minute`, `30minute`, `1day`.
