"use client"

import * as React from "react"
import { X } from "lucide-react"

interface FullscreenExitBarProps {
  isFullscreen: boolean
  onExit: () => void
}

export function FullscreenExitBar({ isFullscreen, onExit }: FullscreenExitBarProps) {
  const [showExitBar, setShowExitBar] = React.useState(false)
  const isHoveredRef = React.useRef(false)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const scheduleHide = (delay = 1000) => {
    clearTimer()
    timerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        setShowExitBar(false)
      }
    }, delay)
  }

  React.useEffect(() => {
    if (!isFullscreen) {
      setShowExitBar(false)
      clearTimer()
      return
    }

    const handlePointerMove = (e: PointerEvent) => {
      // Top proximity zone: within top 45px of the viewport
      if (e.clientY <= 45) {
        clearTimer()
        setShowExitBar(true)
      } else {
        // If cursor moves below 45px and is not hovering the pill, hide promptly
        if (!isHoveredRef.current) {
          scheduleHide(600)
        }
      }
    }

    // Pointermove works reliably across canvas, iframe, and touch/mouse
    window.addEventListener("pointermove", handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      clearTimer()
    }
  }, [isFullscreen])

  if (!isFullscreen) return null

  return (
    <div
      onMouseEnter={() => {
        isHoveredRef.current = true
        clearTimer()
        setShowExitBar(true)
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false
        scheduleHide(500)
      }}
      className={`fixed top-0 left-1/2 z-50 -translate-x-1/2 transition-all duration-200 ease-out select-none ${
        showExitBar
          ? "translate-y-2 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={onExit}
        className="flex items-center gap-2 rounded-full border border-border/80 bg-zinc-900/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-foreground shadow-2xl hover:bg-zinc-800 transition-colors"
      >
        <X className="size-4 stroke-[2.2] text-zinc-300" />
        <span>Exit Fullscreen</span>
        <kbd className="rounded bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
          Esc
        </kbd>
      </button>
    </div>
  )
}
