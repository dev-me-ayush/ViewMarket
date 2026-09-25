"use client"

import * as React from "react"

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrent = Boolean(
        document.fullscreenElement ||
          // @ts-expect-error - webkit support
          document.webkitFullscreenElement
      )
      setIsFullscreen(isCurrent)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = React.useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen()
        } else {
          // @ts-expect-error - Safari/WebKit fallback
          await document.documentElement.webkitRequestFullscreen?.()
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else {
          // @ts-expect-error - Safari/WebKit fallback
          await document.webkitExitFullscreen?.()
        }
      }
    } catch (err) {
      console.warn("Fullscreen toggle failed:", err)
    }
  }, [])

  const exitFullscreen = React.useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else {
          // @ts-expect-error - Safari/WebKit fallback
          await document.webkitExitFullscreen?.()
        }
      }
    } catch (err) {
      console.warn("Fullscreen exit failed:", err)
    }
  }, [])

  return { isFullscreen, toggleFullscreen, exitFullscreen }
}
