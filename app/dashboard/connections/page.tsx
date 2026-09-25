import { Suspense } from "react"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { ConnectionsHeaderSwitch } from "./_components/connections-header-switch"
import { ConnectionsContent } from "./_components/connections-content"

export const metadata: Metadata = {
  title: "Connections | ViewMarket",
  description: "Manage personal broker connections, data providers, and messaging channels.",
}

export default function ConnectionsPage() {
  return (
    <>
      <SiteHeader title="Connections">
        <Suspense fallback={null}>
          <ConnectionsHeaderSwitch />
        </Suspense>
      </SiteHeader>
      <Suspense fallback={null}>
        <ConnectionsContent />
      </Suspense>
    </>
  )
}
