"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  CHART_SERIES_OPTIONS,
  seriesLabel,
  type ChartSeriesType,
} from "./chart-series-types"

interface ChartTypeDropdownProps {
  value: ChartSeriesType
  onChange?: (next: ChartSeriesType) => void
}

export function ChartTypeDropdown({ value, onChange }: ChartTypeDropdownProps) {
  const active = CHART_SERIES_OPTIONS.find((o) => o.value === value)
  const ActiveIcon = active?.Icon ?? CHART_SERIES_OPTIONS[0].Icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            type="button"
            title={`Chart Type: ${seriesLabel(value)}`}
            aria-label={`Chart type: ${seriesLabel(value)}`}
            className="h-8 px-2.5 text-xs hover:bg-muted/70 text-foreground"
          />
        }
      >
        <ActiveIcon className="size-[18px] stroke-[2.2] text-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Chart type</DropdownMenuLabel>
          {CHART_SERIES_OPTIONS.map((opt) => {
          const Icon = opt.Icon
          const selected = opt.value === value
          return (
            <DropdownMenuItem
              key={opt.value}
              onClick={() => onChange?.(opt.value)}
              className="gap-2.5 py-1.5"
            >
              <Icon className="size-[18px] stroke-[2.2] text-foreground" />
              <span className="flex flex-col leading-tight">
                <span className="text-[13px] font-medium">{opt.label}</span>
                <span className="text-[11px] text-muted-foreground">{opt.hint}</span>
              </span>
              {selected && <Check className="ml-auto size-4 text-emerald-500" />}
            </DropdownMenuItem>
          )
        })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
