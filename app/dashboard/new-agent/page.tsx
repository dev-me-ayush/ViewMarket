import type { Metadata } from "next"
import { AgentChatContainer } from "./_components/agent-chat-container"

export const metadata: Metadata = {
  title: "AI Agent | ViewMarket",
  description: "Conversational strategy synthesizer and algorithmic rule builder.",
}

export default function NewAgentPage() {
  return <AgentChatContainer />
}
