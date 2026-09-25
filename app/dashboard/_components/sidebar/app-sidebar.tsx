"use client"

import * as React from "react"
import Image from "next/image"
import icon from "@/assets/viewmarket-icon.png"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebarData } from "./sidebar-config"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Overview"
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/dashboard/overview" />}
            >
              <Image
                src={icon}
                alt="ViewMarket Icon"
                width={24}
                height={24}
                className="size-6 object-contain rounded-md"
              />
              <span className="text-base font-semibold tracking-tight text-white">
                ViewMarket
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
