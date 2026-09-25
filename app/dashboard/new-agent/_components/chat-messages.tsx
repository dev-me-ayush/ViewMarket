"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Copy, Check, FileText } from "lucide-react"
import { Streamdown } from "streamdown"
import { code } from "@streamdown/code"
import { STARTER_PROMPTS } from "./chat-constants"
import type { ChatMessage } from "./types"

interface ChatMessagesProps {
  messages: ChatMessage[]
  isThinking: boolean
  onSelectPrompt?: (prompt: string) => void
}

export function ChatMessages({ messages, isThinking, onSelectPrompt }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isThinking])

  const copyContent = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/90 text-zinc-200 shadow-lg">
          <Bot className="size-6 text-zinc-300" />
        </div>
        <h3 className="text-base font-medium text-zinc-100">ViewMarket Quant Synthesizer</h3>
        <p className="mt-1 max-w-md text-xs text-zinc-400">
          Synthesize algorithmic trading strategies, formulate risk rules, or parse indicators.
        </p>
        {onSelectPrompt && (
          <div className="mt-8 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onSelectPrompt(prompt)}
                className="group flex flex-col rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 text-left transition-all hover:border-zinc-700 hover:bg-zinc-800/60"
              >
                <span className="text-xs text-zinc-300 group-hover:text-zinc-100">{prompt}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 px-4 pt-3 pb-2 md:px-8 w-full">
      {messages.map((message, index) => {
        const isUser = message.role === "user"
        const isLatest = index === messages.length - 1

        return (
          <div
            key={message.id}
            className={`flex w-full ${isUser ? "justify-end" : "justify-start items-start"}`}
          >
            {!isUser && (
              <div className="mr-3 flex size-8 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 shadow-sm mt-0.5">
                <Bot className="size-4 text-zinc-200" />
              </div>
            )}

            <div
              className={`group relative flex flex-col space-y-1.5 ${
                isUser ? "max-w-[85%] items-end sm:max-w-[70%]" : "flex-1 min-w-0 items-start"
              }`}
            >
              {message.attachments && message.attachments.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {message.attachments.map((file) => (
                    <div
                      key={file.name}
                      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700/60 bg-zinc-800/90 px-2 py-1 text-[11px] text-zinc-300"
                    >
                      <FileText className="size-3 text-zinc-400" />
                      <span className="max-w-[140px] truncate">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}

              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? "rounded-tr-xs border border-zinc-700/60 bg-zinc-800 text-zinc-100 shadow-sm"
                    : "w-full rounded-tl-xs border border-zinc-800/80 bg-[#121215] text-zinc-200 shadow-md"
                }`}
              >
                {!message.content && isThinking && !isUser ? (
                  <div className="flex items-center gap-1.5 py-1 text-zinc-400">
                    <span className="size-1.5 animate-pulse rounded-full bg-zinc-400" />
                    <span className="size-1.5 animate-pulse rounded-full bg-zinc-400 [animation-delay:150ms]" />
                    <span className="size-1.5 animate-pulse rounded-full bg-zinc-400 [animation-delay:300ms]" />
                    <span className="ml-1.5 text-xs text-zinc-500 font-mono">Synthesizing...</span>
                  </div>
                ) : isUser ? (
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                ) : (
                  <div className="w-full text-zinc-200 overflow-x-auto">
                    <Streamdown
                      plugins={{ code }}
                      isAnimating={isThinking && isLatest}
                      className="w-full text-sm leading-relaxed"
                    >
                      {message.content}
                    </Streamdown>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 px-1 text-[10px] text-zinc-400">
                <span>{message.timestamp}</span>
                {message.model && (
                  <span className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-zinc-400">
                    {message.model}
                  </span>
                )}
                {!isUser && message.content && (
                  <button
                    type="button"
                    onClick={() => copyContent(message.id, message.content)}
                    className="ml-1 inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-200"
                    title="Copy message"
                  >
                    {copiedId === message.id ? (
                      <Check className="size-3 text-emerald-400" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })}

      <div ref={bottomRef} />
    </div>
  )
}
