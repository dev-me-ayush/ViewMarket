export type MessageRole = "user" | "assistant"

export interface AttachedFile {
  name: string
  size?: string
}

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
  model?: string
  attachments?: AttachedFile[]
}

export interface AIModelOption {
  id: string
  name: string
  description: string
  tag: string
}

export interface HistorySession {
  id: string
  title: string
  lastMessage: string
  timestamp: string
  model: string
}
