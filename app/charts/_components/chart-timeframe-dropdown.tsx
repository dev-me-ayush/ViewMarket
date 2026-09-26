"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import {
  CHART_TIMEFRAME_GROUPS,
  DEFAULT_EXPANDED_GROUP,
  timeframeGroupOf,
  type ChartTimeframe,
} from "./chart-timeframe-types"

interface ChartTimeframeDropdownProps {
  value: ChartTimeframe
  onChange?: (next: ChartTimeframe) => void
}

export function ChartTimeframeDropdown({ value, onChange }: ChartTimeframeDropdownProps) {
  const [openGroup, setOpenGroup] = React.useState<string>(() => timeframeGroupOf(value))

  // Keep the active section expanded when selection changes elsewhere.
  React.useEffect(() => {
    setOpenGroup(timeframeGroupOf(value))
  }, [value])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            type="button"
            title="Select Timeframe"
            aria-label={`Timeframe: ${value}`}
            className="h-8 px-2.5 text-xs font-medium hover:bg-muted/70 text-foreground"
          />
        }
      >
        <span className="font-semibold text-foreground text-[13px]">{value}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        {CHART_TIMEFRAME_GROUPS.map((group) => {
          const isActiveGroup = group.values.includes(value)
          return (
            <DropdownMenuSub
              key={group.label}
              open={openGroup === group.label}
              onOpenChange={(open) =>
                setOpenGroup(open ? group.label : "")
              }
              defaultOpen={group.label === DEFAULT_EXPANDED_GROUP}
            >
              <DropdownMenuSubTrigger className="justify-between py-1.5">
                <span className="flex items-center gap-2">
                  <span className="text-[13px] font-medium">{group.label}</span>
                  {isActiveGroup && (
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                      {value}
                    </span>
                  )}
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="min-w-28">
                {group.values.map((tf) => (
                  <DropdownMenuItem
                    key={tf}
                    onClick={() => onChange?.(tf)}
                    className="justify-between"
                  >
                    <span className="text-[13px] font-medium">{tf}</span>
                    {tf === value && <Check className="size-4 text-emerald-500" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
