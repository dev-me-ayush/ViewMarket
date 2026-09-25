import Link from "next/link"
import {
  ArrowLeft,
  Search,
  ChevronDown,
  BarChart2,
  TrendingUp,
  Bell,
  RotateCcw,
  Undo2,
  Redo2,
  LayoutGrid,
  Settings,
  Camera,
  Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

function Divider() {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className="h-4.5 w-[2px] bg-zinc-700/80 mx-1.5 shrink-0 self-center rounded-full"
    />
  )
}

interface ChartsToolbarProps {
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

export function ChartsToolbar({ isFullscreen, onToggleFullscreen }: ChartsToolbarProps) {
  return (
    <div className="flex h-full w-full items-center justify-between min-w-0">
      {/* Left Cluster */}
      <div className="flex h-full items-center min-w-0">
        {/* Back Button (Tactile Framed Button) */}
        <Link
          href="/dashboard/overview"
          className="flex size-8 items-center justify-center rounded-lg border border-border/80 bg-zinc-900/60 text-foreground shadow-xs hover:bg-muted hover:border-border transition-all active:scale-95"
          title="Back to Dashboard"
        >
          <ArrowLeft className="size-[18px] stroke-[2.2]" />
        </Link>

        <Divider />

        {/* Symbol Search */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-xs font-semibold gap-2 hover:bg-muted/70 text-foreground"
          type="button"
        >
          <Search className="size-[18px] stroke-[2.2] text-foreground" />
          <span>NIFTY 50</span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">NSE</span>
        </Button>

        <Divider />

        {/* Timeframe Button (1m default) */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-xs font-medium hover:bg-muted/70 text-foreground"
          type="button"
          title="Select Timeframe"
        >
          <span className="font-semibold text-foreground text-[13px]">1m</span>
        </Button>

        <Divider />

        {/* Chart Style Switcher */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-xs hover:bg-muted/70 text-foreground"
          type="button"
          title="Chart Type: Candlestick"
        >
          <BarChart2 className="size-[18px] stroke-[2.2] text-foreground" />
        </Button>

        <div className="hidden sm:flex items-center">
          <Divider />
        </div>

        {/* Indicators */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-xs gap-2 font-medium hover:bg-muted/70 text-foreground hidden sm:flex"
          type="button"
        >
          <TrendingUp className="size-[18px] stroke-[2.2] text-emerald-500" />
          <span>Indicators</span>
        </Button>

        <div className="hidden lg:flex items-center">
          <Divider />
        </div>

        {/* Alerts */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-xs gap-2 hover:bg-muted/70 text-foreground hidden lg:flex"
          type="button"
        >
          <Bell className="size-[18px] stroke-[2.2]" />
          <span>Alert</span>
        </Button>

        <div className="hidden lg:flex items-center">
          <Divider />
        </div>

        {/* Replay */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-xs gap-2 hover:bg-muted/70 text-foreground hidden lg:flex"
          type="button"
        >
          <RotateCcw className="size-[18px] stroke-[2.2]" />
          <span>Replay</span>
        </Button>
      </div>

      {/* Right Cluster */}
      <div className="flex h-full items-center">
        {/* Undo */}
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground/40 hover:text-foreground hidden md:flex"
          type="button"
          disabled
          title="Undo"
        >
          <Undo2 className="size-[18px] stroke-[2.2]" />
        </Button>

        <div className="hidden md:flex items-center">
          <Divider />
        </div>

        {/* Redo */}
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground/40 hover:text-foreground hidden md:flex"
          type="button"
          disabled
          title="Redo"
        >
          <Redo2 className="size-[18px] stroke-[2.2]" />
        </Button>

        <Divider />

        {/* Layout Grid */}
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-foreground hover:bg-muted/70"
          type="button"
          title="Layout Grid"
        >
          <LayoutGrid className="size-[18px] stroke-[2.2]" />
        </Button>

        <Divider />

        {/* Chart Settings */}
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-foreground hover:bg-muted/70"
          type="button"
          title="Chart Settings"
        >
          <Settings className="size-[18px] stroke-[2.2]" />
        </Button>

        <Divider />

        {/* Snapshot / Camera */}
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-foreground hover:bg-muted/70"
          type="button"
          title="Take Snapshot"
        >
          <Camera className="size-[18px] stroke-[2.2]" />
        </Button>

        <Divider />

        {/* Fullscreen Toggle */}
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
    </div>
  )
}
