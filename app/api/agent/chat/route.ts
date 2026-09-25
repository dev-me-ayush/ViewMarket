import { streamText } from "ai"
import { resolveAIModel } from "@/lib/ai/providers"

export const runtime = "nodejs"

const SYSTEM_PROMPT = `You are ViewMarket AI Agent, an elite algorithmic trading strategist and quant assistant.
Your capabilities:
1. Synthesize systematic trading rules (e.g. EMA crossovers, RSI mean reversion, breakout momentum, volume confirmation).
2. Formulate rigorous risk parameters: stop-loss, profit targets, risk-reward ratios (minimum 1:2 recommended), max loss caps.
3. Validate strategy logic for non-custodial broker integration (Zerodha Kite, Dhan, Angel One, Upstox).
4. Provide structured, actionable trading specifications rather than vague financial advice.

Guidelines:
- Maintain clear technical formatting (bullet points, parameter tables, formulas).
- Highlight risk guardrails prominently.
- When suggesting an algorithmic rule, specify Instrument, Timeframe, Entry Trigger, Exit Trigger, and Stop-Loss.
- Be concise, direct, and authoritative.`

export async function POST(req: Request) {
  try {
    const { messages, model = "mercury-2.5" } = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const aiModel = resolveAIModel(model)

    // Format conversation history for AI SDK
    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant" | "system",
      content: m.content,
    }))

    const result = streamText({
      model: aiModel,
      system: SYSTEM_PROMPT,
      messages: formattedMessages,
    })

    return result.toTextStreamResponse()
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal AI agent error"
    console.error("[Agent Chat Route Error]:", error)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
