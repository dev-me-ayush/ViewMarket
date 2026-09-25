import { evaluateTradeCondition } from "@/lib/decision-engine"
import { createRefusalResponse } from "./core/guardrails"

export interface DomainGateResult {
  allowed: boolean
  fallbackUsed: boolean
  confidence?: number
  reason?: string
}

// Obvious trading & market terms that immediately pass (<0.1ms fast pass)
const FAST_PASS_REGEX =
  /\b(nifty|banknifty|sensex|finnifty|midcpnifty|stock|stocks|share|shares|equity|equities|f&o|futures|options|option|call|put|strike|premium|ce|pe|rsi|ema|sma|dema|tema|vwap|macd|super\s*trend|supertrend|bollinger|stochastic|ichimoku|atr|pivot|fibonacci|candlestick|candle|candles|chart|charts|breakout|breakdown|stop[\s-]?loss|target|drawdown|leverage|margin|zerodha|upstox|dhan|angel|groww|kite|broker|byoa|sebi|portfolio|backtest|quant|algo|viewmarket|trade|trader|trading|invest|investing|market|markets|p&l|mtm)\b/i

const DOMAIN_HYPOTHESIS =
  "The user is asking about trading, stocks, financial markets, technical indicators, or the ViewMarket platform."

/**
 * Validates whether a user query falls within financial/trading domain.
 * Architecture:
 * 1. Fast Regex Allowlist (~0.1ms)
 * 2. System 1 ModernBERT NLI with 250ms abort timeout
 * 3. Resilient Fail-Open fallback to generative LLM
 */
export async function verifyDomainQuery(query: string): Promise<DomainGateResult> {
  const clean = query.trim()
  if (!clean) {
    return { allowed: true, fallbackUsed: false }
  }

  // Tier 1: Fast-Pass for obvious market & indicator terms
  if (FAST_PASS_REGEX.test(clean)) {
    return { allowed: true, fallbackUsed: false, reason: "fast_pass_keyword" }
  }

  // Tier 2: Evaluate via System 1 Decision Engine with 250ms timeout
  try {
    const evaluation = await evaluateTradeCondition(
      `Topic: ${clean}`,
      DOMAIN_HYPOTHESIS,
      250
    )

    // Contradiction with high confidence (>= 0.70) indicates an off-topic query
    if (evaluation.verdict === "contradiction" && evaluation.confidence >= 0.7) {
      return {
        allowed: false,
        fallbackUsed: false,
        confidence: evaluation.confidence,
        reason: "out_of_domain_contradiction",
      }
    }

    return {
      allowed: true,
      fallbackUsed: false,
      confidence: evaluation.confidence,
      reason: evaluation.verdict,
    }
  } catch (err: unknown) {
    // Tier 3: Fail-Open Fallback (Timeout, Network down, EC2 cold start)
    // Never block user experience; generative model system prompt handles domain refusal
    console.warn("[DomainGate] Decision Engine unreachable or timed out (fail-open engaged):", err)
    return {
      allowed: true,
      fallbackUsed: true,
      reason: "decision_engine_fallback_open",
    }
  }
}

export { createRefusalResponse }
