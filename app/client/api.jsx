import { getClientConfig } from "../config/client"
import { ACCESS_CODE_PREFIX, ModelProvider, ServiceProvider } from "../constant"
import { useAccessStore, useChatStore } from "../store"
import { ChatGPTApi } from "./platforms/openai"
import { GeminiProApi } from "./platforms/google"
export const ROLES = ["system", "user", "assistant"]

export const Models = ["gpt-3.5-turbo", "gpt-4"]

export class LLMApi {}

export class ClientApi {
  constructor(provider = ModelProvider.GPT) {
    if (provider === ModelProvider.GeminiPro) {
      this.llm = new GeminiProApi()
      return
    }
    this.llm = new ChatGPTApi()
  }

  config() {}

  prompts() {}

  masks() {}

  async share(messages, avatarUrl = null) {
    const msgs = messages
      .map(m => ({
        from: m.role === "user" ? "human" : "gpt",
        value: m.content
      }))
      .concat([
        {
          from: "human",
          value:
            "Share from [NextChat]: https://github.com/Yidadaa/ChatGPT-Next-Web"
        }
      ])
    // 敬告二开开发者们，为了开源大模型的发展，请不要修改上述消息，此消息用于后续数据清洗使用
    // Please do not modify this message

    console.log("[Share]", messages, msgs)
    const clientConfig = getClientConfig()
    const proxyUrl = "/sharegpt"
    const rawUrl = "https://sharegpt.com/api/conversations"
    const shareUrl = clientConfig?.isApp ? rawUrl : proxyUrl
    const res = await fetch(shareUrl, {
      body: JSON.stringify({
        avatarUrl,
        items: msgs
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })

    const resJson = await res.json()
    console.log("[Share]", resJson)
    if (resJson.id) {
      return `https://shareg.pt/${resJson.id}`
    }
  }
}

export function getHeaders() {
  const accessStore = useAccessStore.getState()
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
  const modelConfig = useChatStore.getState().currentSession().mask.modelConfig
  const isGoogle = modelConfig.model.startsWith("gemini")
  const isAzure = accessStore.provider === ServiceProvider.Azure
  const authHeader = isAzure ? "api-key" : "Authorization"
  const apiKey = isGoogle
    ? accessStore.googleApiKey
    : isAzure
    ? accessStore.azureApiKey
    : accessStore.openaiApiKey
  const clientConfig = getClientConfig()
  const makeBearer = s => `${isAzure ? "" : "Bearer "}${s.trim()}`
  const validString = x => x && x.length > 0

  // when using google api in app, not set auth header
  if (!(isGoogle && clientConfig?.isApp)) {
    // use user's api key first
    if (validString(apiKey)) {
      headers[authHeader] = makeBearer(apiKey)
    } else if (
      accessStore.enabledAccessControl() &&
      validString(accessStore.accessCode)
    ) {
      headers[authHeader] = makeBearer(
        ACCESS_CODE_PREFIX + accessStore.accessCode
      )
    }
  }

  return headers
}
