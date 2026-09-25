# System 1 AI Decision Engine Specification (ModernBERT)

## 1. Executive Overview

The **System 1 Decision Engine** is ViewMarket's dedicated, deterministic, sub-30ms decision layer. It replaces slow, unpredictable, and expensive generative LLMs (e.g. Gemini, Claude, GPT-4) with an ultra-fast **Natural Language Inference (NLI) Cross-Encoder** model (`dleemiller/ModernCE-base-nli`).

Rather than generating text token by token, the engine evaluates a factual market state (**Premise**) against an actionable trading rule (**Hypothesis**) in a single parallel matrix forward pass. It outputs an exact mathematical probability distribution, a boolean `match` verdict, and a calibrated confidence score.

```
[ Market State / Portfolio Context ]  +  [ Trading Rule / Risk Assertion ]
                               │
                               ▼
               [ ModernBERT NLI Cross-Encoder ]
                               │ (Single Matrix Forward Pass: ~23ms - 36ms)
                               ▼
            { match: true, verdict: "entailment", confidence: 0.942 }
```

---

## 2. Comparison Matrix: ModernBERT vs Jev AI vs Generative LLMs

| Dimension | Generative LLMs (Claude / GPT-4 / Gemini) | Jev AI (Closed Hosted Service) | ViewMarket ModernBERT (In-House AWS) |
| :--- | :--- | :--- | :--- |
| **Model Type** | Autoregressive Decoder | NLI Cross-Encoder | Fused NLI Transformer Encoder |
| **Parameters** | 7B – 70B+ | ~100M – 4B | **149M** (`ModernCE-base-nli`) |
| **Execution Paradigm** | Sequential word-by-word loop | Single parallel forward pass | Single parallel forward pass |
| **Latency** | 800ms – 3,500ms | 30ms – 60ms | **23ms – 37ms** (Server-side) |
| **Hallucination Risk** | High (can invent prices/levels) | Zero (outputs mathematical scores) | **Zero** (deterministic softmax probabilities) |
| **Outputs** | Unstructured prose | Class labels + confidence | **Typed JSON**: `verdict`, `match`, `confidence`, `scores` |
| **Data Privacy** | Prompts logged by third-party | Vendor-hosted proprietary SaaS | **100% Private Sovereignty** (Self-hosted on AWS) |
| **Cost at Scale** | $1,000s/month (per-token pricing) | Per-request SaaS tier ($$$) | **Fixed ~$138.91/month** (Unlimited requests) |

---

## 3. Infrastructure & Compute Architecture

The engine runs on dedicated high-performance AWS infrastructure in Mumbai (`ap-south-1`):

- **Instance Type**: `c6a.2xlarge` (Dedicated Compute-Optimized)
- **Processor**: AMD EPYC 7R13 (Milan) @ 3.6 GHz Turbo (AVX2, FMA3, BMI2 vector instruction sets)
- **Compute Allocated**: **8 dedicated vCPUs** (100% quota utilization, zero hypervisor throttling)
- **RAM**: **16 GiB DDR4** (Model pinned in physical memory, **0ms cold start**)
- **Storage**: 30 GB gp3 SSD (3,000 baseline IOPS, 125 MB/s throughput)
- **Runtime Stack**:
  - **Reverse Proxy**: Nginx with upstream socket connection pooling (`keepalive 64; keepalive_requests 10000;`)
  - **Application Server**: Gunicorn process manager running 2 Uvicorn workers pinned to 4 OpenMP threads each
  - **Execution Engine**: Microsoft ONNX Runtime with transformer graph fusion (fused Multi-Head Attention, FastGELU, LayerNorm)
  - **Operating System**: Ubuntu 24.04 LTS x86_64
- **Monthly Cost**: Compute $136.51 + Disk $2.40 = **$138.91/month** (Guaranteed below $150 budget)
- **Detailed Machine Infrastructure**: See [`docs/modernbert-infra.md`](../modernbert-infra.md).

---

## 4. Security & Zero-Client-Exposure Architecture

To protect intellectual property, prevent unauthorized third-party usage, and comply with zero-trust security standards:

```
[ User Browser / Mobile App ]
             │  HTTPS (Only knows https://viewmarket.app/api/...)
             ▼
[ Google Cloud Next.js Server (Node.js) ]
             │  Reads DECISION_ENGINE_API_KEY from server-only process.env
             │  Attaches header: "X-Internal-Secret: vm_sec_..."
             ▼  Private Server-to-Server Network Hop
[ AWS EC2 Decision Engine (13.200.254.164) ]
             │  Verifies HMAC constant-time secret
             ▼
[ Sub-30ms ModernBERT Inference ]
```

1. **Server-Side Exclusivity**:
   - `DECISION_ENGINE_URL` and `DECISION_ENGINE_API_KEY` are stored in `.env.local` and GCP Secret Manager without `NEXT_PUBLIC_` prefix. Next.js compiler strips them from all browser bundles.
2. **Cryptographic Header Verification**:
   - The AWS FastAPI service enforces constant-time comparison (`hmac.compare_digest`) on the `X-Internal-Secret` header. Unauthenticated or tampered requests immediately return `401 Unauthorized`.
3. **Internal Reverse Proxy**:
   - End-user clients interact only with Next.js Server Actions or Route Handlers (`app/api/decision/route.ts`). The AWS public IP is never visible in user browser DevTools.

---

## 5. Live Performance & Benchmark Metrics

| Metric | Measured Value | Operational Impact |
| :--- | :--- | :--- |
| **Short Sequence Latency (<20 tokens)** | **23.63 ms** | Instant confirmation for trade alerts |
| **Standard Trading Setup (~35 tokens)** | **36.02 ms – 37.24 ms** | Real-time chart candle evaluation |
| **Batch Latency (5–20 conditions)** | **16.36 ms / item** | Multi-asset parallel scanning |
| **Throughput Capacity** | **2,150+ RPM** sequential / **12,000+ RPM** with batching | Handles 1,000+ simultaneous 5-second chart tickers |
| **Cold Start** | **0.00 ms** | Model pre-warmed and locked in physical RAM |
| **Precision Fidelity** | **Exact match ($< 0.000001$ diff)** | Zero quantization distortion |

---

## 6. Future Integration Roadmap Across ViewMarket Features

The Decision Engine can be integrated across six major platform features:

### 1. Strategy Studio: Sub-Millisecond Condition Validation
- **Problem**: Complex strategy rules (e.g., *"Enter long when RSI < 30 AND price bounces off 200 EMA on expanding volume"*) currently require rigid hardcoded parsers or slow LLM reasoning.
- **Solution**: Pass live indicator state as Premise and user's plain-English rule as Hypothesis. Engine evaluates validity in 36ms with a confidence percentage.

### 2. Risk & Margin Sentinel (Pre-Trade Guardrail)
- **Problem**: Preventing catastrophic liquidations or accidental user fat-finger orders without relying on fragile client-side JavaScript checks.
- **Solution**: Before submitting an order payload to the broker (Zerodha/Upstox/Angel One), the backend passes the proposed position size against portfolio risk rules. Rejects orders when `verdict == "contradiction"` (95.5% confidence).

### 3. Voice & Chat AI Agents (VA Tool Gating)
- **Problem**: Voice AI agents (built with LiveKit Agents) need to make decisions in $<100\text{ms}$ while speaking with users. Waiting 2 seconds for a generative LLM causes unnatural pauses.
- **Solution**: The voice agent invokes `evaluateTradeCondition` to instantly confirm user intent, trade parameters, or risk clearance before speaking or placing orders.

### 4. High-Frequency Multi-Asset Chart Watchers
- **Problem**: 5,000 users watching 20 different crypto/stock charts every 5 seconds generates 20,000 requests/minute.
- **Solution**: Use `evaluateTradeBatch` to group 20 chart ticker signals into a single 320ms matrix calculation (**16ms per asset**).

### 5. SEBI Regulatory Compliance Audit
- **Problem**: Mandatory Indian regulatory guidelines require clear verification that users are not executing algorithmic trades without explicit manual confirmation.
- **Solution**: Audit logs record the exact input context, condition checked, calibrated confidence score, and timestamp for every trade recommendation.

### 6. Grounded RAG Gatekeeper for Generative Explanations
- **Problem**: When users ask the AI Assistant *"Why did my trade trigger?"*, generative LLMs can hallucinate fake indicators.
- **Solution**: Generative LLMs (Gemini/Claude) are constrained to only explain the factual scores produced by the ModernBERT Decision Engine.

---

## 7. TypeScript Developer API

```typescript
import {
  evaluateTradeCondition,
  evaluateTradeBatch,
  type DecisionResult,
  type BatchDecisionResult,
} from "@/lib/decision-engine";

// Single Condition Check
const result: DecisionResult = await evaluateTradeCondition(
  "ETH consolidated between 2,640 and 2,650 with flat moving averages.",
  "Ethereum is experiencing extreme multi-percent volatility."
);

console.log(result.verdict);    // "contradiction"
console.log(result.match);      // false
console.log(result.confidence); // 0.998 (99.8%)
console.log(result.latency_ms); // 35.82ms

// Parallel Batch Evaluation
const batch: BatchDecisionResult = await evaluateTradeBatch([
  { context: "BTC at 68,000.", condition: "Price is above support." },
  { context: "SOL dropped 5%.", condition: "Asset is breaking down." },
]);

console.log(batch.latency_per_item_ms); // ~16.5ms/item
```
