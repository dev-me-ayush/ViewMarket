import { sanitizeSymbol, type ChartSnapshotMeta } from "./chart-snapshot-meta"

const HEADER_H = 60
const FOOTER_H = 36
const BG = "#09090b"
const FG = "#fafafa"
const MUTED = "#a1a1aa"
const DIVIDER = "rgba(255,255,255,0.08)"

function istParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00"
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
  }
}

export function snapshotDisplayTime(date = new Date()): string {
  const p = istParts(date)
  return `${p.day}/${p.month}/${p.year}, ${p.hour}:${p.minute}:${p.second} IST`
}

export function snapshotFileName(meta: ChartSnapshotMeta, date = new Date()): string {
  const p = istParts(date)
  const sym = sanitizeSymbol(meta.symbol)
  const tf = meta.timeframe.replace(/[^A-Za-z0-9]+/g, "")
  return `VIEWMARKET_${sym}_${meta.exchange}_${tf}_${p.year}${p.month}${p.day}_${p.hour}${p.minute}-IST.png`
}

export function composeSnapshot(
  chartCanvas: HTMLCanvasElement,
  meta: ChartSnapshotMeta,
  date = new Date()
): HTMLCanvasElement {
  const w = chartCanvas.width
  const h = chartCanvas.height
  const out = document.createElement("canvas")
  out.width = w
  out.height = h + HEADER_H + FOOTER_H
  const ctx = out.getContext("2d")
  if (!ctx) return chartCanvas

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, out.width, out.height)
  ctx.drawImage(chartCanvas, 0, HEADER_H)

  // Header
  ctx.fillStyle = FG
  ctx.font = "700 22px system-ui, sans-serif"
  ctx.textBaseline = "middle"
  ctx.fillText(meta.symbol, 20, 26)

  ctx.fillStyle = MUTED
  ctx.font = "600 13px system-ui, sans-serif"
  const symW = ctx.measureText(meta.symbol).width
  ctx.fillText(`${meta.exchange}  •  ${meta.timeframe}  •  ${meta.chartType}`, 24 + symW + 12, 27)

  ctx.fillStyle = MUTED
  ctx.font = "600 13px system-ui, sans-serif"
  ctx.textAlign = "right"
  ctx.fillText("ViewMarket", w - 20, 27)
  ctx.textAlign = "left"

  ctx.strokeStyle = DIVIDER
  ctx.beginPath()
  ctx.moveTo(0, HEADER_H + 0.5)
  ctx.lineTo(w, HEADER_H + 0.5)
  ctx.stroke()

  // Footer
  const fy = HEADER_H + h + FOOTER_H / 2
  ctx.fillStyle = MUTED
  ctx.font = "500 12px system-ui, sans-serif"
  ctx.fillText(snapshotDisplayTime(date), 20, fy)
  ctx.textAlign = "right"
  ctx.fillText("Not investment advice", w - 20, fy)
  ctx.textAlign = "left"

  return out
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"))
}
