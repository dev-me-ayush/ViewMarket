"use client"

import * as React from "react"
import type { IChartApi } from "lightweight-charts"
import { toast } from "sonner"
import { CHART_SNAPSHOT_META, type ChartSnapshotMeta } from "./chart-snapshot-meta"
import { composeSnapshot, canvasToBlob, snapshotFileName } from "./snapshot-image"

export function useChartSnapshot(meta: ChartSnapshotMeta = CHART_SNAPSHOT_META) {
  const chartRef = React.useRef<IChartApi | null>(null)
  const [isSnapshotting, setIsSnapshotting] = React.useState(false)

  const handleChartReady = React.useCallback((chart: IChartApi | null) => {
    chartRef.current = chart
  }, [])

  const takeSnapshot = React.useCallback(async () => {
    const chart = chartRef.current
    if (!chart || isSnapshotting) return
    setIsSnapshotting(true)
    try {
      const base = chart.takeScreenshot()
      const finalCanvas = composeSnapshot(base, meta, new Date())
      const blob = await canvasToBlob(finalCanvas)
      if (!blob) throw new Error("Export failed")

      const fileName = snapshotFileName(meta, new Date())

      // Clipboard first (best for sharing), then download.
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ])
      } catch {
        // Clipboard blocked — download still succeeds below.
      }

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 4000)

      toast.success("Snapshot saved", {
        description: `${fileName} • copied to clipboard`,
      })
    } catch {
      toast.error("Snapshot failed", {
        description: "Chart is not ready yet. Try again.",
      })
    } finally {
      setIsSnapshotting(false)
    }
  }, [isSnapshotting, meta])

  return { handleChartReady, takeSnapshot, isSnapshotting }
}
