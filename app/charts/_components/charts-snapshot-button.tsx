"use client"

import { Camera, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChartsSnapshotButtonProps {
  onTakeSnapshot?: () => void
  isSnapshotting?: boolean
}

export function ChartsSnapshotButton({
  onTakeSnapshot,
  isSnapshotting,
}: ChartsSnapshotButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      onClick={onTakeSnapshot}
      disabled={isSnapshotting}
      title="Take Snapshot"
      aria-label="Take chart snapshot"
      className="size-8 p-0 text-foreground hover:bg-muted/70 disabled:opacity-60"
    >
      {isSnapshotting ? (
        <Loader2 className="size-[18px] animate-spin" />
      ) : (
        <Camera className="size-[18px] stroke-[2.2]" />
      )}
    </Button>
  )
}
