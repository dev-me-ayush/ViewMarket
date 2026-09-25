import type { CSSProperties, ReactNode } from "react"
import { AppSidebar } from "./_components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 10)",
        } as CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <SidebarInset className="min-w-0">{children}</SidebarInset>
    </SidebarProvider>
  )
}
