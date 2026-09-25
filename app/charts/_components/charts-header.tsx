import type { ReactNode } from "react"

interface ChartsHeaderProps {
  children?: ReactNode
}

export function ChartsHeader({ children }: ChartsHeaderProps) {
  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-border/60 bg-background px-2 select-none overflow-x-auto overflow-y-hidden">
      {children}
    </header>
  )
}
