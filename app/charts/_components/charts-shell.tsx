"use client"

import { ChartsHeader } from "./charts-header"
import { ChartsToolbar } from "./charts-toolbar"
import { ChartsFooter } from "./charts-footer"
import { ChartsRightPanel } from "./charts-right-panel"
import { ChartsCanvas } from "./charts-canvas"
import { FullscreenExitBar } from "./fullscreen-exit-bar"
import { useFullscreen } from "./use-fullscreen"

export function ChartsShell() {
  const { isFullscreen, toggleFullscreen, exitFullscreen } = useFullscreen()

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground">
      <FullscreenExitBar isFullscreen={isFullscreen} onExit={exitFullscreen} />

      {/* Header: hidden in fullscreen */}
      {!isFullscreen && (
        <ChartsHeader>
          <ChartsToolbar
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
        </ChartsHeader>
      )}

      {/* Main Workspace: only chart canvas in fullscreen */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <ChartsCanvas />
        {!isFullscreen && <ChartsRightPanel />}
      </div>

      {/* Footer: hidden in fullscreen */}
      {!isFullscreen && <ChartsFooter />}
    </div>
  )
}
