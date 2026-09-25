import { streamText } from "ai"
import { resolveAIModel } from "@/lib/ai/providers"
import { buildSystemPrompt } from "@/lib/knowledge/core/system-prompt"
import { verifyDomainQuery, createRefusalResponse } from "@/lib/knowledge/domain-gate"

export const runtime = "nodejs"

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

    // Pre-flight System 1 domain gating (Fail-Open with 250ms timeout)
    const latestUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || ""
    const domainCheck = await verifyDomainQuery(latestUserMessage)

    if (!domainCheck.allowed) {
      // Deterministic structured refusal referencing the specific topic without burning generative LLM tokens
      return new Response(createRefusalResponse(latestUserMessage), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      })
    }

    // Format conversation history for AI SDK
    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant" | "system",
      content: m.content,
    }))

    const result = streamText({
      model: aiModel,
      system: buildSystemPrompt(),
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
