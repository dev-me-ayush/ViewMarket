"use client"

import { useRef, type ChangeEvent, type KeyboardEvent } from "react"
import { Paperclip, ArrowUp, X, FileCode, Sparkles, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AVAILABLE_MODELS } from "./chat-constants"
import type { AttachedFile } from "./types"

interface ChatInputBarProps {
  input: string
  setInput: (value: string) => void
  onSend: () => void
  disabled?: boolean
  selectedModelId: string
  onSelectModelId: (id: string) => void
  attachedFile: AttachedFile | null
  onAttachFile: (file: AttachedFile | null) => void
}

export function ChatInputBar({
  input,
  setInput,
  onSend,
  disabled = false,
  selectedModelId,
  onSelectModelId,
  attachedFile,
  onAttachFile,
}: ChatInputBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const currentModel =
    AVAILABLE_MODELS.find((m) => m.id === selectedModelId) ||
    AVAILABLE_MODELS[0]

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (input.trim() || attachedFile) {
        onSend()
      }
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onAttachFile({
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
      })
    }
  }

  const canSend = (input.trim().length > 0 || !!attachedFile) && !disabled

  return (
    <div className="sticky bottom-0 z-10 w-full bg-gradient-to-t from-[#09090b] via-[#09090b]/95 to-transparent px-4 pb-2 pt-1 md:px-8">
      <div className="w-full">
        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#121215] p-1.5 px-2.5 shadow-xl outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-within:outline-none focus-within:ring-0 sm:rounded-2xl">
          {/* File input attachment trigger */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".py,.json,.csv,.txt,.png,.jpg"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200"
            title="Attach strategy file or dataset"
          >
            <Paperclip className="size-4" />
          </button>

          {/* Staged file chip */}
          {attachedFile && (
            <div className="inline-flex shrink-0 items-center gap-1 rounded-md border border-zinc-700/80 bg-zinc-800/80 px-2 py-1 text-xs text-zinc-200">
              <FileCode className="size-3 text-zinc-400" />
              <span className="max-w-[120px] truncate text-[11px]">
                {attachedFile.name}
              </span>
              <button
                type="button"
                onClick={() => onAttachFile(null)}
                className="rounded p-0.5 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              >
                <X className="size-3" />
              </button>
            </div>
          )}

          {/* One-liner text input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message or prompt the agent..."
            className="min-w-0 flex-1 border-none bg-transparent px-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none ring-0 shadow-none focus:border-none focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0"
            disabled={disabled}
          />

          {/* Model selection dropdown on right side before send button */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 text-xs text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                >
                  <Sparkles className="size-3 text-zinc-400" />
                  <span className="font-medium">{currentModel.name}</span>
                  <ChevronDown className="size-3 text-zinc-400" />
                </button>
              }
            />
            <DropdownMenuContent
              align="end"
              className="w-64 border-zinc-800 bg-zinc-950 p-1.5 text-zinc-100"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 py-1 text-[11px] font-normal text-zinc-400">
                  Select Inference Model
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                {AVAILABLE_MODELS.map((model) => (
                  <DropdownMenuItem
                    key={model.id}
                    onClick={() => onSelectModelId(model.id)}
                    className={`flex flex-col items-start rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                      model.id === selectedModelId
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium">{model.name}</span>
                      <span className="rounded bg-zinc-800 px-1 py-0.2 text-[9px] text-zinc-400">
                        {model.tag}
                      </span>
                    </div>
                    <span className="mt-0.5 text-[10px] text-zinc-400">
                      {model.description}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Send button */}
          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-950 transition-all hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-white"
            title="Send message"
          >
            <ArrowUp className="size-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  )
}
