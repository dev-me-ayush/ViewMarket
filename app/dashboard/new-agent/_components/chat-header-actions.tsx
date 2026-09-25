"use client"

import { useState } from "react"
import { History, Plus, MessageSquare, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { HistorySession } from "./types"

interface ChatHeaderActionsProps {
  onNewChat: () => void
  onSelectSession: (session: HistorySession) => void
  history: HistorySession[]
  onDeleteSession: (id: string) => void
}

export function ChatHeaderActions({
  onNewChat,
  onSelectSession,
  history,
  onDeleteSession,
}: ChatHeaderActionsProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 border-zinc-800 bg-zinc-900/60 px-2.5 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <History className="size-3.5 text-zinc-400" />
              <span>History</span>
            </Button>
          }
        />
        <SheetContent
          side="right"
          className="w-full max-w-sm border-zinc-800 bg-zinc-950 p-6 text-zinc-100 sm:max-w-md"
        >
          <SheetHeader className="mb-4 text-left">
            <SheetTitle className="font-serif text-lg font-medium text-white">
              Agent History
            </SheetTitle>
            <SheetDescription className="text-xs text-zinc-400">
              Select a prior conversation or strategy draft to resume.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
            {history.length === 0 ? (
              <div className="py-12 text-center text-xs text-zinc-500">
                No past conversations found.
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectSession(item)
                    setOpen(false)
                  }}
                  className="group relative flex cursor-pointer flex-col gap-1 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 truncate text-xs font-medium text-zinc-200">
                      <MessageSquare className="size-3 shrink-0 text-zinc-400" />
                      <span className="truncate">{item.title}</span>
                    </div>
                    <span className="shrink-0 rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] text-zinc-400">
                      {item.model}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-[11px] text-zinc-400">
                    {item.lastMessage}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-500">
                    <span>{item.timestamp}</span>
                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteSession(item.id)
                        }}
                        className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-red-400"
                        title="Delete conversation"
                      >
                        <Trash2 className="size-3" />
                      </button>
                      <span className="flex items-center gap-0.5 text-zinc-300">
                        Resume <ArrowRight className="size-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Button
        onClick={onNewChat}
        size="sm"
        className="h-8 gap-1.5 rounded-lg border border-zinc-700/60 bg-white px-2.5 text-xs font-medium text-zinc-950 transition-transform hover:bg-zinc-200 active:scale-95"
      >
        <Plus className="size-3.5" />
        <span>New Chat</span>
      </Button>
    </div>
  )
}
