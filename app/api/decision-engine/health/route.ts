import { evaluateTradeCondition } from "@/lib/decision-engine"

export const runtime = "nodejs"

export async function GET() {
  try {
    const startTime = performance.now()
    const result = await evaluateTradeCondition(
      "NIFTY 50 index crossed 25,000 resistance with positive market breadth.",
      "Index market structure is currently bullish."
    )
    const totalRoundtrip = Math.round(performance.now() - startTime)

    return Response.json({
      status: "healthy",
      service: "viewmarket-decision-engine",
      provider: "aws-ec2-mumbai",
      model: "dleemiller/ModernCE-base-nli (149M)",
      engine_latency_ms: result.latency_ms,
      total_roundtrip_ms: totalRoundtrip,
      test_verdict: result.verdict,
      match: result.match,
      confidence: result.confidence,
      timestamp: new Date().toISOString(),
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Decision engine check failed"
    return Response.json(
      {
        status: "unhealthy",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}
