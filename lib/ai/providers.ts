import { createOpenAI } from "@ai-sdk/openai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { inceptionKeyPool } from "./inception-pool"
import type { LanguageModel } from "ai"

/**
 * Creates an Inception Labs model instance using round-robin balanced keys
 * with automatic 429 rate-limit reporting and cooldown.
 */
export function getInceptionModel(modelName = "mercury-2.5"): LanguageModel {
  const apiKey = inceptionKeyPool.getNextKey()
  const baseURL = process.env.INCEPTION_BASE_URL || "https://api.inceptionlabs.ai/v1"

  const client = createOpenAI({
    baseURL,
    apiKey,
    fetch: async (url, options) => {
      const response = await fetch(url, options)
      if (response.status === 429) {
        inceptionKeyPool.reportRateLimit(apiKey, 60)
      } else if (response.ok) {
        inceptionKeyPool.reportSuccess(apiKey)
      }
      return response
    },
  })

  return client.chat(modelName)
}

/**
 * Creates Google Gemini model instance (e.g. gemini-2.5-flash-lite or gemini-2.0-flash-lite).
 */
export function getGeminiModel(modelName = "gemini-2.5-flash-lite"): LanguageModel {
  const googleApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""
  const googleProvider = createGoogleGenerativeAI({
    apiKey: googleApiKey,
  })

  return googleProvider(modelName)
}

/**
 * Factory for routing selected model ID to its corresponding provider.
 */
export function resolveAIModel(modelId: string): LanguageModel {
  switch (modelId) {
    case "mercury-2.5":
    case "mercury":
      return getInceptionModel("mercury-2.5")
    case "gemini-2.5-flash-lite":
    case "gemini-2.5":
    case "gemini-flash":
      return getGeminiModel("gemini-2.5-flash-lite")
    default:
      // Default to high-throughput Mercury 2.5
      return getInceptionModel("mercury-2.5")
  }
}
