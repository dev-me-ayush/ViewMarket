import * as React from "react"
import {
  BotIcon,
  ChartColumnIcon,
  LayoutDashboardIcon,
  PlugIcon,
} from "lucide-react"

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
      url: "/dashboard/charts",
      icon: <ChartColumnIcon />,
    },
    {
      title: "Connections",
      url: "/dashboard/connections",
      icon: <PlugIcon />,
    },
  ],
}
