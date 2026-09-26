import { Suspense } from "react"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { LogsHeaderControls } from "./_components/logs-header-controls"
import { LogsConsole } from "./_components/logs-console"

export const metadata: Metadata = {
  title: "Execution Logs | ViewMarket",
  description: "Live real-time agent execution stream, broker gateway traces, and order lifecycle logs.",
}

export default function LogsPage() {
  return (
    <>
      <SiteHeader title="Execution Logs">
        <Suspense fallback={null}>
          <LogsHeaderControls />
        </Suspense>
      </SiteHeader>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Suspense fallback={null}>
          <LogsConsole />
        </Suspense>
      </div>
    </>
  )
}
