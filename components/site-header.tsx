import type { ReactNode } from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader({
  title = "Overview",
  children,
}: {
  title?: string
  children?: ReactNode
}) {
  return (
    <header className="sticky top-0 z-20 flex h-(--header-height) shrink-0 items-center border-b bg-background/95 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between px-3 lg:px-4">
        <div className="flex items-center gap-1">
          <SidebarTrigger className="-ml-1 size-7" />
          <Separator
            orientation="vertical"
            className="mx-1.5 h-4 data-vertical:self-auto"
          />
          <h1 className="text-sm font-medium">{title}</h1>
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </header>
  )
}
