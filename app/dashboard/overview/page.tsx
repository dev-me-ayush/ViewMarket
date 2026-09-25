import dynamic from "next/dynamic"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"

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
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-3 py-3 md:gap-4 md:py-4">
            <SectionCards />
            <div className="px-3 lg:px-4">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  )
}
