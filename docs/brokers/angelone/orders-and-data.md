# Angel One (SmartAPI v2) - Orders, Funds & Historical Data

## 1. Orders Management

### Place Order
- **Endpoint**: `POST https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/placeOrder`
- **Headers**:
  ```http
  Authorization: Bearer {jwtToken}
  Content-Type: application/json
  Accept: application/json
  X-PrivateKey: {apiKey}
  ```
- **Payload**:
  ```json
  {
    "variety": "NORMAL",
    "tradingsymbol": "SBIN-EQ",
    "symboltoken": "3045",
    "transactiontype": "BUY",
    "exchange": "NSE",
    "ordertype": "LIMIT",
    "producttype": "INTRADAY",
    "duration": "DAY",
    "price": "820.50",
    "squareoff": "0",
    "stoploss": "0",
    "quantity": "50"
  }
  ```

---

## 2. Funds & Margin Limits (RMS)
- **Endpoint**: `GET https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getRMS`
- **Response**:
  ```json
  {
    "status": true,
    "message": "SUCCESS",
    "data": {
      "net": "450250.75",
      "availablecash": "320000.00",
      "collateral": "130250.75",
      "m2mrealized": "4250.00",
      "m2munrealized": "-1200.50",
      "utilizedmargin": "85000.00"
    }
  }
  ```

---

## 3. Historical Data & Symbol Master

### Historical Candle Data (100% Free)
- **Endpoint**: `POST https://apiconnect.angelbroking.com/rest/secure/angelbroking/historical/v1/getCandleData`
- **Payload**:
  ```json
  {
    "exchange": "NSE",
    "symboltoken": "3045",
    "interval": "ONE_MINUTE",
    "fromdate": "2026-09-20 09:15",
    "todate": "2026-09-25 15:30"
  }
  ```
- **Intervals**: `ONE_MINUTE`, `THREE_MINUTE`, `FIVE_MINUTE`, `TEN_MINUTE`, `FIFTEEN_MINUTE`, `THIRTY_MINUTE`, `ONE_HOUR`, `ONE_DAY`.

### Symbols Master
- **Endpoint**: `https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json`
- **Format**: JSON array containing `token`, `symbol`, `name`, `expiry`, `strike`, `lotsize`, `instrumenttype`, `exch_seg`, `tick_size`.
