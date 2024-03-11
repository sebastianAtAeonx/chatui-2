export const OWNER = "Yidadaa"
export const REPO = "ChatGPT-Next-Web"
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`
export const ISSUE_URL = `https://github.com/${OWNER}/${REPO}/issues`
export const UPDATE_URL = `${REPO_URL}#keep-updated`
export const RELEASE_URL = `${REPO_URL}/releases`
export const FETCH_COMMIT_URL = `https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=1`
export const FETCH_TAG_URL = `https://api.github.com/repos/${OWNER}/${REPO}/tags?per_page=1`
export const RUNTIME_CONFIG_DOM = "danger-runtime-config"

export const DEFAULT_API_HOST = "https://api.nextchat.dev"
export const OPENAI_BASE_URL = "https://api.openai.com"

export const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/"

export let Path

;(function(Path) {
  Path["Home"] = "/"
  Path["Chat"] = "/chat"
  Path["Settings"] = "/settings"
  Path["NewChat"] = "/new-chat"
  Path["Masks"] = "/masks"
  Path["Auth"] = "/auth"
})(Path || (Path = {}))

export let ApiPath

;(function(ApiPath) {
  ApiPath["Cors"] = "/api/cors"
  ApiPath["OpenAI"] = "/api/openai"
})(ApiPath || (ApiPath = {}))

export let SlotID

;(function(SlotID) {
  SlotID["AppBody"] = "app-body"
  SlotID["CustomModel"] = "custom-model"
})(SlotID || (SlotID = {}))

export let FileName

;(function(FileName) {
  FileName["Masks"] = "masks.json"
  FileName["Prompts"] = "prompts.json"
})(FileName || (FileName = {}))

export let StoreKey

;(function(StoreKey) {
  StoreKey["Chat"] = "chat-next-web-store"
  StoreKey["Access"] = "access-control"
  StoreKey["Config"] = "app-config"
  StoreKey["Mask"] = "mask-store"
  StoreKey["Prompt"] = "prompt-store"
  StoreKey["Update"] = "chat-update"
  StoreKey["Sync"] = "sync"
})(StoreKey || (StoreKey = {}))

export const DEFAULT_SIDEBAR_WIDTH = 300
export const MAX_SIDEBAR_WIDTH = 500
export const MIN_SIDEBAR_WIDTH = 230
export const NARROW_SIDEBAR_WIDTH = 100

export const ACCESS_CODE_PREFIX = "nk-"

export const LAST_INPUT_KEY = "last-input"
export const UNFINISHED_INPUT = id => "unfinished-input-" + id

export const STORAGE_KEY = "chatgpt-next-web"

export const REQUEST_TIMEOUT_MS = 60000

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown"

export let ServiceProvider

;(function(ServiceProvider) {
  ServiceProvider["OpenAI"] = "OpenAI"
  ServiceProvider["Azure"] = "Azure"
  ServiceProvider["Google"] = "Google"
})(ServiceProvider || (ServiceProvider = {}))

export let ModelProvider

;(function(ModelProvider) {
  ModelProvider["GPT"] = "GPT"
  ModelProvider["GeminiPro"] = "GeminiPro"
})(ModelProvider || (ModelProvider = {}))

export const OpenaiPath = {
  ChatPath: "v1/chat/completions",
  UsagePath: "dashboard/billing/usage",
  SubsPath: "dashboard/billing/subscription",
  ListModelPath: "v1/models"
}

export const Azure = {
  ExampleEndpoint: "https://{resource-url}/openai/deployments/{deploy-id}"
}

export const Google = {
  ExampleEndpoint: "https://generativelanguage.googleapis.com/",
  ChatPath: "v1beta/models/gemini-pro:generateContent",
  VisionChatPath: "v1beta/models/gemini-pro-vision:generateContent"

  // /api/openai/v1/chat/completions
}

export const DEFAULT_INPUT_TEMPLATE = `{{input}}` // input / time / model / lang
export const DEFAULT_SYSTEM_TEMPLATE = `
You are ChatGPT, a large language model trained by {{ServiceProvider}}.
Knowledge cutoff: {{cutoff}}
Current model: {{model}}
Current time: {{time}}
Latex inline: $x^2$ 
Latex block: $$e=mc^2$$
`

export const SUMMARIZE_MODEL = "gpt-3.5-turbo"
export const GEMINI_SUMMARIZE_MODEL = "gemini-pro"

export const KnowledgeCutOffDate = {
  default: "2021-09",
  "gpt-4-turbo-preview": "2023-12",
  "gpt-4-1106-preview": "2023-04",
  "gpt-4-0125-preview": "2023-12",
  "gpt-4-vision-preview": "2023-04",
  // After improvements,
  // it's now easier to add "KnowledgeCutOffDate" instead of stupid hardcoding it, as was done previously.
  "gemini-pro": "2023-12"
}

export const DEFAULT_MODELS = [
  {
    name: "gpt-4",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-4-0314",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-4-0613",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-4-32k",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-4-32k-0314",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-4-32k-0613",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-4-turbo-preview",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-4-1106-preview",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-4-0125-preview",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-4-vision-preview",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-3.5-turbo",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-3.5-turbo-0125",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-3.5-turbo-0301",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-3.5-turbo-0613",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-3.5-turbo-1106",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-3.5-turbo-16k",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gpt-3.5-turbo-16k-0613",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai"
    }
  },
  {
    name: "gemini-pro",
    available: true,
    provider: {
      id: "google",
      providerName: "Google",
      providerType: "google"
    }
  },
  {
    name: "gemini-pro-vision",
    available: true,
    provider: {
      id: "google",
      providerName: "Google",
      providerType: "google"
    }
  }
]

export const CHAT_PAGE_SIZE = 15
export const MAX_RENDER_MSG_COUNT = 45
