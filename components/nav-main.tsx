"use client"

import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    target?: string
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-1.5">
        <SidebarMenu className="gap-1.5">
          {items.map((item) => {
            const isActive =
              pathname === item.url ||
              (item.url !== "/dashboard" &&
                pathname?.startsWith(`${item.url}/`))
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={Boolean(isActive)}
                  className="h-10 px-3 text-sm font-medium transition-colors gap-2.5 rounded-lg group-data-[collapsible=icon]:h-8!"
                  render={
                    <a
                      href={item.url}
                      target={item.target}
                      rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    />
                  }
                >
                  {item.icon}
                  <span className="text-[13.5px] tracking-tight">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
