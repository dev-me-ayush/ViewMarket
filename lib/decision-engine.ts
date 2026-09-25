export type DecisionVerdict = "entailment" | "contradiction" | "neutral";

export interface DecisionScores {
  entailment: number;
  neutral: number;
  contradiction: number;
}

export interface DecisionResult {
  match: boolean;
  verdict: DecisionVerdict;
  confidence: number;
  scores: DecisionScores;
  latency_ms: number;
  roundtrip_ms: number;
}

export interface TradeEvaluationItem {
  context: string;
  condition: string;
}

export interface BatchDecisionResult {
  count: number;
  results: Array<{
    match: boolean;
    verdict: DecisionVerdict;
    confidence: number;
    scores: DecisionScores;
  }>;
  total_latency_ms: number;
  latency_per_item_ms: number;
  roundtrip_ms: number;
}

function getEngineConfig() {
  const url = process.env.DECISION_ENGINE_URL || "http://13.200.254.164";
  const apiKey = process.env.DECISION_ENGINE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "DECISION_ENGINE_API_KEY is not defined in environment variables."
    );
  }

  return { url, apiKey };
}

export async function evaluateTradeCondition(
  context: string,
  condition: string
): Promise<DecisionResult> {
  const { url, apiKey } = getEngineConfig();
  const startTime = performance.now();

  const response = await fetch(`${url}/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Secret": apiKey,
    },
    body: JSON.stringify({ context, condition }),
    cache: "no-store",
    keepalive: true,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Decision Engine failed (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  const roundtrip_ms = Math.round((performance.now() - startTime) * 100) / 100;

  return {
    ...data,
    roundtrip_ms,
  };
}

export async function evaluateTradeBatch(
  items: TradeEvaluationItem[]
): Promise<BatchDecisionResult> {
  if (items.length === 0) {
    return {
      count: 0,
      results: [],
      total_latency_ms: 0,
      latency_per_item_ms: 0,
      roundtrip_ms: 0,
    };
  }

  const { url, apiKey } = getEngineConfig();
  const startTime = performance.now();

  const response = await fetch(`${url}/evaluate-batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Secret": apiKey,
    },
    body: JSON.stringify({ items }),
    cache: "no-store",
    keepalive: true,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Decision Engine batch failed (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  const roundtrip_ms = Math.round((performance.now() - startTime) * 100) / 100;

  return {
    ...data,
    roundtrip_ms,
  };
}
