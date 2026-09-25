/**
 * Inception Labs API Key Pool & Load Balancer
 * Implements round-robin load distribution with automatic rate-limit (429) cooldown and failover.
 */

interface KeyState {
  key: string
  cooldownUntil: number
  failureCount: number
  totalRequests: number
}

class InceptionKeyPool {
  private keys: KeyState[] = []
  private currentIndex = 0

  constructor() {
    this.initKeys()
  }

  private initKeys() {
    const rawKeys = process.env.INCEPTION_API_KEYS || ""
    const keyList = rawKeys
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0)

    this.keys = keyList.map((key) => ({
      key,
      cooldownUntil: 0,
      failureCount: 0,
      totalRequests: 0,
    }))
  }

  /**
   * Returns the next available healthy key via round-robin.
   * If all keys are in cooldown, falls back to the one whose cooldown expires soonest.
   */
  public getNextKey(): string {
    if (this.keys.length === 0) {
      this.initKeys()
    }

    if (this.keys.length === 0) {
      throw new Error("No Inception Labs API keys configured in INCEPTION_API_KEYS environment variable.")
    }

    const now = Date.now()
    const poolSize = this.keys.length

    // Scan for first non-cooldown key starting from currentIndex
    for (let i = 0; i < poolSize; i++) {
      const idx = (this.currentIndex + i) % poolSize
      const candidate = this.keys[idx]

      if (now >= candidate.cooldownUntil) {
        this.currentIndex = (idx + 1) % poolSize
        candidate.totalRequests++
        return candidate.key
      }
    }

    // All keys on cooldown: pick the key that recovers soonest
    const sorted = [...this.keys].sort((a, b) => a.cooldownUntil - b.cooldownUntil)
    const fallback = sorted[0]
    fallback.totalRequests++
    return fallback.key
  }

  /**
   * Mark a key as rate-limited or failed, putting it into temporary cooldown.
   */
  public reportRateLimit(key: string, cooldownSeconds = 60) {
    const found = this.keys.find((k) => k.key === key)
    if (found) {
      found.failureCount++
      found.cooldownUntil = Date.now() + cooldownSeconds * 1000
    }
  }

  /**
   * Mark a key as healthy after successful response.
   */
  public reportSuccess(key: string) {
    const found = this.keys.find((k) => k.key === key)
    if (found) {
      found.failureCount = 0
    }
  }

  public getPoolStats() {
    const now = Date.now()
    return this.keys.map((k, index) => ({
      slot: index + 1,
      prefix: `${k.key.slice(0, 7)}...${k.key.slice(-4)}`,
      status: now < k.cooldownUntil ? "cooldown" : "active",
      cooldownRemainingMs: Math.max(0, k.cooldownUntil - now),
      totalRequests: k.totalRequests,
      failures: k.failureCount,
    }))
  }
}

// Singleton instance across server execution contexts
export const inceptionKeyPool = new InceptionKeyPool()
