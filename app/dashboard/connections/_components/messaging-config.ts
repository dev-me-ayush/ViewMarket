export interface MessagingField {
  id: string
  label: string
  placeholder: string
  type: "text" | "password"
  required: boolean
  helperText?: string
}

export interface MessagingProviderDefinition {
  id: string
  name: string
  tagline: string
  protocol: string
  category: "Chat Bot" | "Webhook" | "Critical Push"
  channelType: "chat" | "webhook" | "push"
  cost: "100% Free" | "Free API ($5 app)"
  features: string[]
  accentColor: string
  docsUrl: string
  setupGuide: string
  fields: MessagingField[]
}

export const SUPPORTED_MESSAGING_PROVIDERS: MessagingProviderDefinition[] = [
  {
    id: "telegram",
    name: "Telegram Bot",
    tagline: "Instant sub-second direct & channel trade alerts",
    protocol: "Telegram Bot API (HTTPS)",
    category: "Chat Bot",
    channelType: "chat",
    cost: "100% Free",
    features: ["Sub-second Latency", "Markdown Formatting", "Interactive Buttons", "Group & Channel Alerts"],
    accentColor: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    docsUrl: "https://core.telegram.org/bots/api",
    setupGuide: "Create bot via @BotFather to get your Bot Token, then send /start to get your Chat ID.",
    fields: [
      { id: "botToken", label: "Telegram Bot Token", placeholder: "e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ", type: "password", required: true },
      { id: "chatId", label: "Chat ID or @ChannelHandle", placeholder: "e.g. 987654321 or @MyTradingAlerts", type: "text", required: true },
    ],
  },
  {
    id: "discord",
    name: "Discord Webhook",
    tagline: "Rich embedded cards with chart snapshots for channels",
    protocol: "Discord Webhook API (JSON)",
    category: "Webhook",
    channelType: "webhook",
    cost: "100% Free",
    features: ["Rich Embed Cards", "Color-Coded Status", "Role Mentions (@here)", "Chart Snapshot Support"],
    accentColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    docsUrl: "https://discord.com/developers/docs/resources/webhook",
    setupGuide: "In Discord: Channel Settings → Integrations → Webhooks → New Webhook → Copy URL.",
    fields: [
      { id: "webhookUrl", label: "Discord Webhook URL", placeholder: "https://discord.com/api/webhooks/...", type: "password", required: true },
      { id: "customName", label: "Custom Bot Name (Optional)", placeholder: "e.g. ViewMarket TradeBot", type: "text", required: false },
    ],
  },
  {
    id: "custom-webhook",
    name: "Custom Webhook",
    tagline: "Push raw JSON payloads to Zapier, n8n, Make, or private servers",
    protocol: "Standard HTTP POST (JSON)",
    category: "Webhook",
    channelType: "webhook",
    cost: "100% Free",
    features: ["Standard JSON Payload", "HMAC / Bearer Auth", "Custom Header Support", "Full Automation Routing"],
    accentColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    docsUrl: "https://viewmarket.in/docs/webhooks",
    setupGuide: "Provide any HTTP POST endpoint configured to parse JSON trade alerts and execution events.",
    fields: [
      { id: "endpointUrl", label: "Webhook Endpoint URL", placeholder: "https://api.yourdomain.com/trading-alerts", type: "text", required: true },
      { id: "secretToken", label: "Authorization Header / Secret Key (Optional)", placeholder: "Bearer eyJhbGci... or Secret Key", type: "password", required: false },
    ],
  },
  {
    id: "slack",
    name: "Slack Incoming Webhook",
    tagline: "Channel notifications for trading desks & strategy teams",
    protocol: "Slack Block Kit Webhook",
    category: "Webhook",
    channelType: "webhook",
    cost: "100% Free",
    features: ["Desk Notifications", "Block Kit Layouts", "Thread Tracking", "Daily P&L Summaries"],
    accentColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    docsUrl: "https://api.slack.com/messaging/webhooks",
    setupGuide: "Install Incoming Webhooks app in your Slack Workspace and select the target alerts channel.",
    fields: [
      { id: "webhookUrl", label: "Slack Webhook URL", placeholder: "https://hooks.slack.com/services/T00/B00/XXXX", type: "password", required: true },
      { id: "channelName", label: "Channel Override (Optional)", placeholder: "#market-alerts", type: "text", required: false },
    ],
  },
  {
    id: "pushover",
    name: "Pushover Emergency Push",
    tagline: "Critical risk alerts that bypass mobile 'Do Not Disturb'",
    protocol: "Pushover REST API",
    category: "Critical Push",
    channelType: "push",
    cost: "Free API ($5 app)",
    features: ["Emergency Priority Bypass", "Persistent Alarm Sounds", "Zero Background Latency", "Desktop & Watch Sync"],
    accentColor: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    docsUrl: "https://pushover.net/api",
    setupGuide: "Sign up at pushover.net, install mobile app, and create an Application for your API Token.",
    fields: [
      { id: "userKey", label: "Pushover User Key", placeholder: "e.g. uQiRzpo...", type: "text", required: true },
      { id: "appToken", label: "Application API Token", placeholder: "e.g. azGDORe...", type: "password", required: true },
    ],
  },
]
