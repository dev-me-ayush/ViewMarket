import * as React from "react"
import {
  BotIcon,
  ChartColumnIcon,
  LayoutDashboardIcon,
  PlugIcon,
  ScrollTextIcon,
} from "lucide-react"

export interface NavMainItem {
  title: string
  url: string
  icon?: React.ReactNode
  target?: string
}

export const sidebarData = {
  user: {
    name: "Trader",
    email: "trader@viewmarket.io",
    avatar: "/avatars/trader.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard/overview",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "New Agent",
      url: "/dashboard/new-agent",
      icon: <BotIcon />,
    },
    {
      title: "Charts",
      url: "/charts",
      icon: <ChartColumnIcon />,
      target: "_blank",
    },
    {
      title: "Logs",
      url: "/dashboard/logs",
      icon: <ScrollTextIcon />,
    },
    {
      title: "Connections",
      url: "/dashboard/connections",
      icon: <PlugIcon />,
    },
  ],
}
