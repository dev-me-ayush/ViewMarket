"use client"

import { Sparkles } from "lucide-react"
import { useTypewriter } from "./use-typewriter"

const ROTATING_PROMPTS = [
  "Analyze breakout levels and volume spikes for NIFTY & BANKNIFTY...",
  "Synthesize a VWAP pullback strategy with 1:2 risk-reward...",
  "Scan multi-timeframe RSI divergences across momentum stocks...",
  "Draft algorithmic entry rules with trailing stop-loss...",
  "Formulate automated delta-neutral option adjustment rules...",
] as const

interface AgentEmptyStateProps {
  onSelectPrompt?: (prompt: string) => void
}

export function AgentEmptyState({ onSelectPrompt }: AgentEmptyStateProps) {
  const { displayText, currentWord } = useTypewriter({
    words: ROTATING_PROMPTS,
    typeSpeed: 38,
    deleteSpeed: 20,
    delayBetweenWords: 2000,
  })

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center select-none">
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-300 shadow-sm">
        <Sparkles className="size-5 text-zinc-400" />
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectPrompt?.(currentWord)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelectPrompt?.(currentWord)
          }
        }}
        className="group relative flex min-h-[3.25rem] max-w-xl cursor-pointer items-center justify-center rounded-xl px-4 py-2 text-center transition-colors hover:bg-zinc-900/40"
      >
        <p className="text-base md:text-lg font-medium tracking-tight text-zinc-300">
          <span>{displayText}</span>
          <span className="inline-block w-0.5 h-4 ml-1 bg-zinc-400 align-middle animate-pulse" />
        </p>
      </div>

      <p className="mt-2 text-xs text-zinc-500">
        Click to insert prompt or ask any question below
      </p>
    </div>
  )
}
