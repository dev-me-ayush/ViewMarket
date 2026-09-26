import { Settings, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChartsToolbarDivider } from "./charts-toolbar-divider"
import { ChartsSnapshotButton } from "./charts-snapshot-button"

interface ChartsToolbarRightProps {
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
  onTakeSnapshot?: () => void
  isSnapshotting?: boolean
}

export function ChartsToolbarRight({
  isFullscreen,
  onToggleFullscreen,
  onTakeSnapshot,
  isSnapshotting,
}: ChartsToolbarRightProps) {
  return (
    <div className="flex h-full items-center">
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-foreground hover:bg-muted/70"
        type="button"
        title="Chart Settings"
      >
        <Settings className="size-[18px] stroke-[2.2]" />
      </Button>

      <ChartsToolbarDivider />

      <ChartsSnapshotButton
        onTakeSnapshot={onTakeSnapshot}
        isSnapshotting={isSnapshotting}
      />

      <ChartsToolbarDivider />

      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleFullscreen}
        className="size-8 p-0 text-foreground hover:bg-muted/70"
        type="button"
        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      >
        <Maximize2 className="size-[18px] stroke-[2.2]" />
      </Button>
    </div>
  )
}
