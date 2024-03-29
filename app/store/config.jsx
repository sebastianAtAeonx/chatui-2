import { getClientConfig } from "../config/client"
import {
  DEFAULT_INPUT_TEMPLATE,
  DEFAULT_MODELS,
  DEFAULT_SIDEBAR_WIDTH,
  StoreKey
} from "../constant"
import { createPersistStore } from "../utils/store"

export let SubmitKey

;(function(SubmitKey) {
  SubmitKey["Enter"] = "Enter"
  SubmitKey["CtrlEnter"] = "Ctrl + Enter"
  SubmitKey["ShiftEnter"] = "Shift + Enter"
  SubmitKey["AltEnter"] = "Alt + Enter"
  SubmitKey["MetaEnter"] = "Meta + Enter"
})(SubmitKey || (SubmitKey = {}))

export let Theme

;(function(Theme) {
  Theme["Auto"] = "auto"
  Theme["Dark"] = "dark"
  Theme["Light"] = "light"
})(Theme || (Theme = {}))

export const DEFAULT_CONFIG = {
  lastUpdate: Date.now(), // timestamp, to merge state

  submitKey: SubmitKey.Enter,
  avatar: "1f603",
  fontSize: 14,
  theme: Theme.Auto,
  tightBorder: !!getClientConfig()?.isApp,
  sendPreviewBubble: true,
  enableAutoGenerateTitle: true,
  sidebarWidth: DEFAULT_SIDEBAR_WIDTH,

  disablePromptHint: false,

  dontShowMaskSplashScreen: false, // dont show splash screen when create chat
  hideBuiltinMasks: false, // dont add builtin masks

  customModels: "",
  models: DEFAULT_MODELS,

  modelConfig: {
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    top_p: 1,
    max_tokens: 4000,
    presence_penalty: 0,
    frequency_penalty: 0,
    sendMemory: true,
    historyMessageCount: 4,
    compressMessageLengthThreshold: 1000,
    enableInjectSystemPrompts: true,
    template: DEFAULT_INPUT_TEMPLATE
  }
}

export function limitNumber(x, min, max, defaultValue) {
  if (isNaN(x)) {
    return defaultValue
  }

  return Math.min(max, Math.max(min, x))
}

export const ModalConfigValidator = {
  model(x) {
    return x
  },
  max_tokens(x) {
    return limitNumber(x, 0, 512000, 1024)
  },
  presence_penalty(x) {
    return limitNumber(x, -2, 2, 0)
  },
  frequency_penalty(x) {
    return limitNumber(x, -2, 2, 0)
  },
  temperature(x) {
    return limitNumber(x, 0, 2, 1)
  },
  top_p(x) {
    return limitNumber(x, 0, 1, 1)
  }
}

export const useAppConfig = createPersistStore(
  { ...DEFAULT_CONFIG },
  (set, get) => ({
    reset() {
      set(() => ({ ...DEFAULT_CONFIG }))
    },

    mergeModels(newModels) {
      if (!newModels || newModels.length === 0) {
        return
      }

      const oldModels = get().models
      const modelMap = {}

      for (const model of oldModels) {
        model.available = false
        modelMap[model.name] = model
      }

      for (const model of newModels) {
        model.available = true
        modelMap[model.name] = model
      }

      set(() => ({
        models: Object.values(modelMap)
      }))
    },

    allModels() {}
  }),
  {
    name: StoreKey.Config,
    version: 3.8,
    migrate(persistedState, version) {
      const state = persistedState

      if (version < 3.4) {
        state.modelConfig.sendMemory = true
        state.modelConfig.historyMessageCount = 4
        state.modelConfig.compressMessageLengthThreshold = 1000
        state.modelConfig.frequency_penalty = 0
        state.modelConfig.top_p = 1
        state.modelConfig.template = DEFAULT_INPUT_TEMPLATE
        state.dontShowMaskSplashScreen = false
        state.hideBuiltinMasks = false
      }

      if (version < 3.5) {
        state.customModels = "claude,claude-100k"
      }

      if (version < 3.6) {
        state.modelConfig.enableInjectSystemPrompts = true
      }

      if (version < 3.7) {
        state.enableAutoGenerateTitle = true
      }

      if (version < 3.8) {
        state.lastUpdate = Date.now()
      }

      return state
    }
  }
)
