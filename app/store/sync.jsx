import { getClientConfig } from "../config/client"
import { ApiPath, STORAGE_KEY, StoreKey } from "../constant"
import { createPersistStore } from "../utils/store"
import {
  getLocalAppState,
  mergeAppState,
  setLocalAppState
} from "../utils/sync"
import { downloadAs, readFromFile } from "../utils"
import { showToast } from "../components/ui-lib"
import Locale from "../locales"
import { createSyncClient, ProviderType } from "../utils/cloud"
import { corsPath } from "../utils/cors"

const isApp = !!getClientConfig()?.isApp

const DEFAULT_SYNC_STATE = {
  provider: ProviderType.WebDAV,
  useProxy: true,
  proxyUrl: corsPath(ApiPath.Cors),

  webdav: {
    endpoint: "",
    username: "",
    password: ""
  },

  upstash: {
    endpoint: "",
    username: STORAGE_KEY,
    apiKey: ""
  },

  lastSyncTime: 0,
  lastProvider: ""
}

export const useSyncStore = createPersistStore(
  DEFAULT_SYNC_STATE,
  (set, get) => ({
    cloudSync() {
      const config = get()[get().provider]
      return Object.values(config).every(c => c.toString().length > 0)
    },

    markSyncTime() {
      set({ lastSyncTime: Date.now(), lastProvider: get().provider })
    },

    export() {
      const state = getLocalAppState()
      const datePart = isApp
        ? `${new Date()
            .toLocaleDateString()
            .replace(/\//g, "_")} ${new Date()
            .toLocaleTimeString()
            .replace(/:/g, "_")}`
        : new Date().toLocaleString()

      const fileName = `Backup-${datePart}.json`
      downloadAs(JSON.stringify(state), fileName)
    },

    async import() {
      const rawContent = await readFromFile()

      try {
        const remoteState = JSON.parse(rawContent)
        const localState = getLocalAppState()
        mergeAppState(localState, remoteState)
        setLocalAppState(localState)
        location.reload()
      } catch (e) {
        console.error("[Import]", e)
        showToast(Locale.Settings.Sync.ImportFailed)
      }
    },

    getClient() {
      const provider = get().provider
      const client = createSyncClient(provider, get())
      return client
    },

    async sync() {
      const localState = getLocalAppState()
      const provider = get().provider
      const config = get()[provider]
      const client = this.getClient()

      try {
        const remoteState = JSON.parse(await client.get(config.username))
        mergeAppState(localState, remoteState)
        setLocalAppState(localState)
      } catch (e) {
        console.log("[Sync] failed to get remote state", e)
      }

      await client.set(config.username, JSON.stringify(localState))

      this.markSyncTime()
    },

    async check() {
      const client = this.getClient()
      return await client.check()
    }
  }),
  {
    name: StoreKey.Sync,
    version: 1.1,

    migrate(persistedState, version) {
      const newState = persistedState

      if (version < 1.1) {
        newState.upstash.username = STORAGE_KEY
      }

      return newState
    }
  }
)
