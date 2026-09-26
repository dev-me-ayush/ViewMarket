# Zerodha (Kite Connect v3) - Orders, Funds & Historical Data

## 1. Orders Management

### Place Order
- **Endpoint**: `POST https://api.kite.trade/orders/{variety}`
- **Varieties**: `regular`, `amo` (After Market Order), `iceberg`, `auction`.
- **Headers**:
  ```http
  Authorization: token {api_key}:{access_token}
  Content-Type: application/x-www-form-urlencoded
  ```
- **Parameters**:
  - `tradingsymbol`: e.g. `INFY`, `NIFTY24OCTFUT`
  - `exchange`: `NSE`, `BSE`, `NFO`, `MCX`
  - `transaction_type`: `BUY` or `SELL`
  - `order_type`: `MARKET`, `LIMIT`, `SL`, `SL-M`
  - `quantity`: Number of shares/contracts
  - `product`: `CNC` (Cash and Carry equity delivery), `MIS` (Intraday with leverage), `NRML` (Overnight F&O)
  - `price`: Limit order execution price (if `order_type="LIMIT"`)
  - `trigger_price`: Stop-loss trigger price (if `order_type="SL"` or `"SL-M"`)
  - `validity`: `DAY`, `IOC` (Immediate or Cancel), `TTL` (Time To Live in minutes)

### Order Modification & Cancellation
- Modify: `PUT https://api.kite.trade/orders/{variety}/{order_id}`
- Cancel: `DELETE https://api.kite.trade/orders/{variety}/{order_id}`
- Orderbook: `GET https://api.kite.trade/orders`

---

## 2. Funds & Margin Limits
- **Endpoint**: `GET https://api.kite.trade/user/margins` or `GET https://api.kite.trade/user/margins/{segment}` (`equity` / `commodity`)
- **Response Structure**:
  ```json
  {
    "status": "success",
    "data": {
      "equity": {
        "enabled": true,
        "net": 1254000.50,
        "available": {
          "adhoc_margin": 0,
          "cash": 850000.00,
          "opening_balance": 850000.00,
          "live_balance": 875240.50,
          "collateral": 404000.50,
          "intraday_payin": 25240.50
        },
        "utilised": {
          "m2m_unrealised": 5200.00,
          "m2m_realised": 18240.50,
          "debits": 0,
          "span": 124000.00,
          "option_premium": 25000.00,
          "holding_sales": 0,
          "exposure": 42000.00,
          "turnover": 0
        }
      }
    }
  }
  ```

---

## 3. Historical Data & Symbol Master

### Historical Candle Data
- **Endpoint**: `GET https://api.kite.trade/instruments/historical/{instrument_token}/{interval}?from=YYYY-MM-DD+HH:MM:SS&to=YYYY-MM-DD+HH:MM:SS`
- **Interval Options**: `minute`, `day`, `3minute`, `5minute`, `15minute`, `30minute`, `60minute`.
- **Query Limits**:
  - `minute`: Up to 60 days per call
  - `5minute` / `15minute`: Up to 100 days per call
  - `day`: Up to 2,000 days (~7 years) per call
- **Candle Response**:
  ```json
  {
    "status": "success",
    "data": {
      "candles": [
        ["2026-09-25T09:15:00+0530", 2540.0, 2555.5, 2538.0, 2550.25, 452000, 1250000],
        ["2026-09-25T09:16:00+0530", 2550.25, 2552.0, 2548.0, 2549.5, 120500, 1254000]
      ]
    }
  }
  ```
  Format: `[timestamp, open, high, low, close, volume, open_interest]`

### Symbol / Instrument Master List
- **Master URL**: `https://api.kite.trade/instruments` (Daily CSV updated at 08:00 AM IST)
- **Columns**: `instrument_token`, `exchange_token`, `tradingsymbol`, `name`, `last_price`, `expiry`, `strike`, `tick_size`, `lot_size`, `instrument_type`, `segment`, `exchange`.
