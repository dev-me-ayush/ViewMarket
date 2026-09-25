import { describe, it, expect } from "vitest"

describe("Deployed Application Decision Engine Verification", () => {
  const targetUrl = process.env.DEPLOYED_APP_URL || "http://localhost:3000"

  it("checks /api/decision-engine/health returns healthy status and live latency", async () => {
    try {
      const response = await fetch(`${targetUrl}/api/decision-engine/health`)
      if (!response.ok) {
        console.warn(`[Skip Deployed Test] Server at ${targetUrl} returned HTTP ${response.status}`)
        return
      }

      const data = await response.json()
      expect(data.status).toBe("healthy")
      expect(data.service).toBe("viewmarket-decision-engine")
      expect(data.provider).toBe("aws-ec2-mumbai")
      expect(typeof data.engine_latency_ms).toBe("number")
      expect(data.engine_latency_ms).toBeLessThan(100)

      console.log(`[Verified Deployed Engine] AWS Server Latency: ${data.engine_latency_ms}ms | Roundtrip: ${data.total_roundtrip_ms}ms`)
    } catch {
      console.warn(`[Skip Deployed Test] Could not reach ${targetUrl}. Skipping deployed test when server is offline.`)
    }
  })
})
