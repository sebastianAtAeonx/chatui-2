import { BUILTIN_MASKS } from "../masks"
import { getLang } from "../locales"
import { DEFAULT_TOPIC } from "./chat"
import { useAppConfig } from "./config"
import { StoreKey } from "../constant"
import { nanoid } from "nanoid"
import { createPersistStore } from "../utils/store"

export const DEFAULT_MASK_STATE = {
  masks: {}
}

export const DEFAULT_MASK_AVATAR = "gpt-bot"
export const createEmptyMask = () => ({
  id: nanoid(),
  avatar: DEFAULT_MASK_AVATAR,
  name: DEFAULT_TOPIC,
  context: [],

  // use global config as default
  syncGlobalConfig: true,

  modelConfig: { ...useAppConfig.getState().modelConfig },
  lang: getLang(),
  builtin: false,
  createdAt: Date.now()
})

export const useMaskStore = createPersistStore(
  { ...DEFAULT_MASK_STATE },
  (set, get) => ({
    create(mask) {
      const masks = get().masks
      const id = nanoid()
      masks[id] = {
        ...createEmptyMask(),
        ...mask,
        id,
        builtin: false
      }

      set(() => ({ masks }))
      get().markUpdate()

      return masks[id]
    },
    updateMask(id, updater) {
      const masks = get().masks
      const mask = masks[id]
      if (!mask) return
      const updateMask = { ...mask }
      updater(updateMask)
      masks[id] = updateMask
      set(() => ({ masks }))
      get().markUpdate()
    },
    delete(id) {
      const masks = get().masks
      delete masks[id]
      set(() => ({ masks }))
      get().markUpdate()
    },

    get(id) {
      return get().masks[id ?? 1145141919810]
    },
    getAll() {
      const userMasks = Object.values(get().masks).sort(
        (a, b) => b.createdAt - a.createdAt
      )
      const config = useAppConfig.getState()
      if (config.hideBuiltinMasks) return userMasks
      const buildinMasks = BUILTIN_MASKS.map(m => ({
        ...m,

        modelConfig: {
          ...config.modelConfig,
          ...m.modelConfig
        }
      }))
      return userMasks.concat(buildinMasks)
    },
    search(text) {
      return Object.values(get().masks)
    }
  }),
  {
    name: StoreKey.Mask,
    version: 3.1,

    migrate(state, version) {
      const newState = JSON.parse(JSON.stringify(state))

      // migrate mask id to nanoid
      if (version < 3) {
        Object.values(newState.masks).forEach(m => (m.id = nanoid()))
      }

      if (version < 3.1) {
        const updatedMasks = {}
        Object.values(newState.masks).forEach(m => {
          updatedMasks[m.id] = m
        })
        newState.masks = updatedMasks
      }

      return newState
    }
  }
)
