"use client"

import * as React from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { DataTableItem } from "./schema"

export function DataTableEditableCell({
  item,
  field,
}: {
  item: DataTableItem
  field: "target" | "limit"
}) {
  const fieldName = field === "target" ? "Target" : "Limit"
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
          loading: `Saving ${item.header}`,
          success: "Done",
          error: "Error",
        })
      }}
    >
      <Label htmlFor={`${item.id}-${field}`} className="sr-only">
        {fieldName}
      </Label>
      <Input
        className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
        defaultValue={item[field]}
        id={`${item.id}-${field}`}
      />
    </form>
  )
}
