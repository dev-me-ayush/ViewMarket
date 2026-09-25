"use client"

import { useState } from "react"
import { toast } from "sonner"
import { SiteHeader } from "@/components/site-header"
import { ChatHeaderActions } from "./chat-header-actions"
import { ChatMessages } from "./chat-messages"
import { ChatInputBar } from "./chat-input-bar"
import { INITIAL_HISTORY, AVAILABLE_MODELS } from "./chat-constants"
import type { ChatMessage, AttachedFile, HistorySession } from "./types"

export function AgentChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [selectedModelId, setSelectedModelId] = useState(AVAILABLE_MODELS[0].id)
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null)
  const [history, setHistory] = useState<HistorySession[]>(INITIAL_HISTORY)

  const activeModel =
    AVAILABLE_MODELS.find((m) => m.id === selectedModelId)?.name || "Mercury 2.5"

  const handleSend = async () => {
    if ((!input.trim() && !attachedFile) || isThinking) return

    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const userText = input.trim() || (attachedFile ? `Attached: ${attachedFile.name}` : "")

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: timeString,
      attachments: attachedFile ? [attachedFile] : undefined,
    }

    const assistantMsgId = `msg-${Date.now() + 1}`
    const placeholderAssistant: ChatMessage = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: timeString,
      model: activeModel,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages([...updatedMessages, placeholderAssistant])
    setInput("")
    setAttachedFile(null)
    setIsThinking(true)

    try {
      const response = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          model: selectedModelId,
        }),
      })

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
          )
        )
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Failed to receive response"
      toast.error(errMsg)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? { ...msg, content: `Error: ${errMsg}. Please try again.` }
            : msg
        )
      )
    } finally {
      setIsThinking(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setInput("")
    setAttachedFile(null)
  }

  const handleSelectSession = (session: HistorySession) => {
    setMessages([
      {
        id: `prev-1-${session.id}`,
        role: "user",
        content: `Generate rules for: ${session.title}`,
        timestamp: session.timestamp,
      },
      {
        id: `prev-2-${session.id}`,
        role: "assistant",
        content: session.lastMessage,
        timestamp: session.timestamp,
        model: session.model,
      },
    ])
  }

  const handleDeleteSession = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="flex h-svh max-h-svh flex-col overflow-hidden bg-[#09090b]">
      <SiteHeader title="AI Agent">
        <ChatHeaderActions
          onNewChat={handleNewChat}
          onSelectSession={handleSelectSession}
          history={history}
          onDeleteSession={handleDeleteSession}
        />
      </SiteHeader>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex min-h-full w-full flex-col">
          <ChatMessages
            messages={messages}
            isThinking={isThinking}
            onSelectPrompt={(prompt) => setInput(prompt)}
          />
        </div>
      </div>

      <ChatInputBar
        input={input}
        setInput={setInput}
        onSend={handleSend}
        disabled={isThinking}
        selectedModelId={selectedModelId}
        onSelectModelId={setSelectedModelId}
        attachedFile={attachedFile}
        onAttachFile={setAttachedFile}
      />
    </div>
  )
}
