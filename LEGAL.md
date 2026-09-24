# Legal & Regulatory Architecture (India Market Compliance)

## 1. Operating Doctrine & Licensing Status

- **Entity Status**: Unlicensed Technology SaaS / Workflow Tooling Provider.
- **Licenses Held**: None (No SEBI Investment Adviser, Research Analyst, Stock Broker, Portfolio Manager, or FIU-IND VDA registration).
- **Core Principle**: **Substance Over Form**. Regulatory exposure is judged by actual software behavior and user perception, not boilerplate disclaimers ("Not Financial Advice", "For Educational Use Only").
- **Target Position**: Pure non-custodial, client-side execution utility (BYOA: Bring Your Own Account).

---

## 2. Architecture: How It Must Be Built

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER (User Domain)                    │
│                                                                        │
│   ┌──────────────────────┐              ┌──────────────────────────┐   │
│   │ Charting Canvas      │              │ Local Rule Engine        │   │
│   │ - Blank on load      │              │ - Evaluates user rules   │   │
│   │ - Direct broker WSS  │              │ - Triggers confirm modal │   │
│   └──────────┬───────────┘              └────────────┬─────────────┘   │
│              │                                       │                 │
│              │ Direct WSS (User Token)               │ Click-to-Trade  │
│              │ (Zero central relay)                  │ (Manual Click)  │
│              ▼                                       ▼                 │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │           BROKER API (Zerodha / Upstox / Dhan / Angel One)     │   │
│   └────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS (Metadata & Auth only)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        PLATFORM BACKEND SERVER                         │
│                                                                        │
│   - User Authentication & Account Management                           │
│   - Storage of User-Authored Rules & Flowcharts                        │
│   - Sandboxed Compute Engine for Parameter Optimization (IaaS billing) │
│   - System-Prompt-Firewalled Educational AI Assistant                  │
│   - ZERO tick streaming, ZERO order routing, ZERO token storage        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Module Specifications: What Must Be There

### Module 1: AI Chat Agent & Technical/Fundamental Analytics
- **Fundamental Summarizer**:
  - Ingest public corporate filings, MCA data, and quarterly balance sheets/P&Ls.
  - Compute standard descriptive ratios (P/E, ROCE, Debt-to-Equity, Operating Margin).
  - Summarize open-source news headlines via web search neutrally without editorial trading bias.
- **Descriptive Analytics & Gauges**:
  - Calculate multi-timeframe mathematical conditions (1D, 1W, 1M).
  - Use purely descriptive momentum/volatility labels:
    - `Trend Momentum: Bullish (> 50 SMA) | Bearish (< 50 SMA)`
    - `RSI State: Overbought (> 70) | Oversold (< 30) | Neutral`
    - `Volatility: High (ATR > 2.5σ) | Low`
    - `Support/Resistance: Mathematical Pivots (Fibonacci, Camarilla, Classical)`
- **Chat-Based Order Drafting (Click-to-Trade)**:
  - User initiates intent (e.g., *"Buy 50 shares of TCS at limit 3800"*).
  - AI acts strictly as an **NLP-to-JSON intent parser**.
  - Must render a **Confirmation Modal** containing:
    - Scrip Name, Exchange (NSE/BSE), Transaction Type (BUY/SELL), Product (MIS/CNC), Quantity, Price, Order Type (Limit/Market).
  - Order dispatches **only upon explicit human click** on client side.

### Module 2: Strategy Builder & Cloud Compute Optimization
- **Visual Condition Builder**: Allow users to chain standard technical blocks (`IF [Indicator A] [Operator] [Indicator B] THEN [Trigger]`).
- **AI Logic Translator**: Convert natural language descriptions into flowcharts or strategy code blocks for user inspection.
- **Compute-as-a-Service (Optimization Engine)**:
  - Bill purely for compute hardware resources (vCPU-hours / cloud runtime), identical to AWS/GCP instance rental.
  - Keep all optimization runs and parameter sets private to the user's isolated workspace.

### Module 3: Broker Integration & Market Data Isolation
- **Blank Canvas on Load**: Charts render empty until user authenticates their personal broker session.
- **Direct Client-to-Broker WebSocket**:
  - Browser opens direct WebSocket (`wss://`) to the broker gateway using user's ephemeral session token.
  - Zero market tick data flows through or gets cached on platform backend servers.
  - Bypasses exchange data redistribution licensing (NSE Data & Analytics Ltd).
- **Client-Side Secret Isolation**: Store broker API keys and access tokens exclusively in client-side memory or encrypted local storage (`IndexedDB`).

### Module 4: Open-Source Algorithm Template Library
- **Textbook Standard Templates**:
  - Provide standard, public-domain code examples (e.g., *Moving Average Crossover, Dual Supertrend, Bollinger Squeeze, VWAP Mean Reversion*).
  - Full source code and logic must be visible to user.
- **Mandatory "Copy & Edit" Workflow**:
  - Users cannot deploy templates as black-boxes.
  - User must click **"Copy to My Builder"**, review parameters, set custom position sizing/risk controls, and save to their private account.

---

## 4. What to Avoid (Strict Regulatory Tripwires)

| Feature / Behavior | Regulatory Violation | Consequence / Penalty |
| :--- | :--- | :--- |
| **Prescriptive Meter Labels** (`Strong Buy`, `Sell`, `Exit Now`, `Accumulate`) | SEBI (Research Analysts) Regulations, 2014, Reg 2(1)(w) | Classed as unregistered Research Analyst. Order disgorgement & market bans. |
| **Price Targets & Future Projections** (*"Target: ₹850, SL: ₹780"*) | SEBI (Research Analysts) Regulations, 2014 | Unregistered research report publishing under Section 11B of SEBI Act. |
| **Personalized Portfolio Advice** (*"Sell X from your holdings and buy Y"*) | SEBI (Investment Advisers) Regulations, 2013 | Unregistered Investment Advisory. Debarment & fee refund orders. |
| **Autonomous / Unattended Auto-Trading** (Executing trades without human click per order) | SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD/P/CIR/2025/0000013 (Mandatory April 1, 2026) | Violates retail algo framework (Requires unique Exchange Algo ID & static IP). |
| **Strategy Leaderboards & Return Claims** (Displaying CAGR, win-rate, or ranking strategies) | SEBI Circular SEBI/HO/MIRSD/DOP/P/CIR/2022/117 (Sept 2, 2022) | Brokers legally mandated to terminate API integration within 7 days. |
| **Selling Proprietary Strategies / "Research Lab"** (Paywalled strategy subscriptions) | SEBI Circular on Association with Unregistered Entities (Oct 22, 2024) | Brokers barred from associating; broker API access immediately revoked. |
| **Central Market Data Redistribution** (Streaming ticks from backend to multiple users) | NSE Data Sharing & Usage Policy; Indian Copyright Act; IT Act Sec 43 | Unlicensed data redistribution. Exchange cease-and-desist & massive damages. |
| **Crypto Asset Trading Integrations** (Routing orders to crypto exchanges alongside SEBI brokers) | PMLA 2002; FIU-IND Notification S.O. 1072(E); RBI Banking Guidelines | Non-compliance with FIU-IND Reporting Entity rules; domestic broker API termination. |

---

## 5. Compliance Verification Rubric for Developers & Agents

Before implementing or proposing any new feature, verify against these 5 checks:

1. **The Prescriptive Test**: Does this feature tell the user *what* to trade, *when* to trade, or *which direction* to take? If YES $\rightarrow$ **REJECT**. Must only show mathematical state.
2. **The Confirmation Test**: Can a real-money order reach a broker without a physical user click on an explicit confirmation modal? If YES $\rightarrow$ **REJECT**.
3. **The Data Path Test**: Does live tick data pass through our backend server before reaching the client? If YES $\rightarrow$ **REJECT**. Data must stream client-to-broker directly.
4. **The Performance Marketing Test**: Does the UI display backtested percentage returns, Sharpe ratios, or rankings for pre-made templates? If YES $\rightarrow$ **REJECT**.
5. **The Entity Separation Test**: Does this touch crypto or unlicensed asset classes? If YES $\rightarrow$ **REJECT**. Keep Indian equities/F&O decoupled from VDAs.
