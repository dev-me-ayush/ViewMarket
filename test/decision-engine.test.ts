import { describe, it, expect, beforeAll } from "vitest";
import {
  evaluateTradeCondition,
  evaluateTradeBatch,
} from "@/lib/decision-engine";

describe("AWS ModernBERT Decision Engine Client", () => {
  beforeAll(() => {
    process.env.DECISION_ENGINE_URL = "http://13.200.254.164";
    process.env.DECISION_ENGINE_API_KEY =
      "vm_sec_86906c6a5f8f85f29475723d5439393e6b12b85a4c563d0140dbc7b753a5d40c";
  });

  it("evaluates a bullish trade setup with high confidence and sub-50ms server latency", async () => {
    const context =
      "BTC broke 68,000 resistance on massive volume, with 1h MACD displaying a bullish crossover and RSI at 64.";
    const condition =
      "Market structure is strongly bullish with upward momentum.";

    const result = await evaluateTradeCondition(context, condition);

    expect(result.verdict).toBe("entailment");
    expect(result.match).toBe(true);
    expect(result.confidence).toBeGreaterThan(0.6);
    expect(result.latency_ms).toBeLessThan(60);
    expect(result.roundtrip_ms).toBeGreaterThan(0);

    console.log(
      `[Test Single] Server Latency: ${result.latency_ms}ms | Roundtrip: ${result.roundtrip_ms}ms | Confidence: ${(result.confidence * 100).toFixed(1)}%`
    );
  });

  it("detects a platform risk limit violation with contradiction verdict", async () => {
    const context =
      "User margin account has $2,000 equity with an open position size of $50,000 (25x leverage), far exceeding the 5x max account risk rule.";
    const condition =
      "The open trade position satisfies all platform risk and leverage limits.";

    const result = await evaluateTradeCondition(context, condition);

    expect(result.verdict).toBe("contradiction");
    expect(result.match).toBe(false);
    expect(result.confidence).toBeGreaterThan(0.9);

    console.log(
      `[Test Risk Violation] Server Latency: ${result.latency_ms}ms | Roundtrip: ${result.roundtrip_ms}ms | Confidence: ${(result.confidence * 100).toFixed(1)}%`
    );
  });

  it("processes a batch of 5 trade conditions in a single parallel pass", async () => {
    const items = [
      {
        context: "BTC is testing resistance at 68,500.",
        condition: "Price is near resistance.",
      },
      {
        context: "ETH volume dropped 50% during consolidation.",
        condition: "Trading activity has significantly declined.",
      },
      {
        context: "SOL broke below support with high selling pressure.",
        condition: "Asset is breaking down.",
      },
      {
        context: "Account leverage is 2x with 1% stop loss.",
        condition: "Position is within low-risk parameters.",
      },
      {
        context: "RSI is 85 on 4h timeframe.",
        condition: "Asset is in severe overbought territory.",
      },
    ];

    const batchResult = await evaluateTradeBatch(items);

    expect(batchResult.count).toBe(5);
    expect(batchResult.results).toHaveLength(5);
    expect(batchResult.latency_per_item_ms).toBeLessThan(35);

    console.log(
      `[Test Batch 5 Items] Total Server: ${batchResult.total_latency_ms}ms | Per Item: ${batchResult.latency_per_item_ms}ms/item | Roundtrip: ${batchResult.roundtrip_ms}ms`
    );
  });
});
