# Upstox (API v2 / v3) - Orders, Funds & Historical Data

## 1. Orders Management

### Place Order
- **Endpoint**: `POST https://api.upstox.com/v2/order/place`
- **Headers**:
  ```http
  Authorization: Bearer {access_token}
  Content-Type: application/json
  Accept: application/json
  ```
- **Payload**:
  ```json
  {
    "quantity": 10,
    "product": "I",
    "validity": "DAY",
    "price": 820.0,
    "tag": "viewmarket_strategy",
    "instrument_token": "NSE_EQ|INE062A01020",
    "order_type": "LIMIT",
    "transaction_type": "BUY",
    "disclosed_quantity": 0,
    "trigger_price": 0.0,
    "is_amo": false
  }
  ```

---

## 2. Funds & Margin Limits
- **Endpoint**: `GET https://api.upstox.com/v2/user/get-funds-and-margin?segment=SEC`
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "equity": {
        "used_margin": 15400.0,
        "payin_amount": 0.0,
        "span_margin": 0.0,
        "adhoc_margin": 0.0,
        "notional_cash": 0.0,
        "available_margin": 450000.50,
        "exposure_margin": 0.0
      }
    }
  }
  ```

---

## 3. Historical Data & Symbol Master

### Historical Candle Data
- **Endpoint**: `GET https://api.upstox.com/v2/historical-candle/{instrumentKey}/{interval}/{to_date}/{from_date}`
- **Example**: `GET https://api.upstox.com/v2/historical-candle/NSE_EQ|INE002A01018/1minute/2026-09-25/2026-09-20`
- **Intervals**: `1minute`, `30minute`, `day`, `week`, `month`.

### Symbol Master Download
- **Full Complete Master**: `https://assets.upstox.com/market-quote/instruments/exchange/complete.csv.gz`
- Automatically unpacks into CSV with `instrument_key`, `exchange_token`, `tradingsymbol`, `name`, `last_price`, `strike`, `tick_size`, `lot_size`, `instrument_type`, `option_type`, `expiry`.
