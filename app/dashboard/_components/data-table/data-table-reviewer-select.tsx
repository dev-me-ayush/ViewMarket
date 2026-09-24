"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { DataTableItem } from "./schema"

export function DataTableReviewerSelect({ item }: { item: DataTableItem }) {
  if (item.reviewer !== "Assign reviewer") {
    return <span>{item.reviewer}</span>
  }

  return (
    <>
      <Label htmlFor={`${item.id}-reviewer`} className="sr-only">
        Reviewer
      </Label>
      <Select
        items={[
          { label: "Eddie Lake", value: "Eddie Lake" },
          { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
        ]}
      >
        <SelectTrigger
          className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
          size="sm"
          id={`${item.id}-reviewer`}
        >
          <SelectValue placeholder="Assign reviewer" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
            <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
