import type { Metadata } from "next"
import { ChartsShell } from "./_components/charts-shell"

export const metadata: Metadata = {
  title: "Charts | ViewMarket",
  description: "Dedicated charting workspace.",
}

export default function StandaloneChartsPage() {
  return <ChartsShell />
}
