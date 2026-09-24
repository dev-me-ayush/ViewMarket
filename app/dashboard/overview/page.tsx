import dynamic from "next/dynamic"
import { AppSidebar } from "@/app/dashboard/_components/sidebar/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import data from "../data.json"

const ChartAreaInteractive = dynamic(
  () =>
    import("@/app/dashboard/_components/chart/chart-area-interactive").then(
      (mod) => mod.ChartAreaInteractive
    ),
  {
    loading: () => (
      <div className="h-[310px] w-full animate-pulse rounded-xl bg-muted/40" />
    ),
  }
)

const DataTable = dynamic(
  () =>
    import("@/app/dashboard/_components/data-table/data-table").then(
      (mod) => mod.DataTable
    ),
  {
    loading: () => (
      <div className="h-64 w-full animate-pulse rounded-xl bg-muted/30" />
    ),
  }
)

export default function OverviewPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
