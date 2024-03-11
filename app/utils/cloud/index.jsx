import { createWebDavClient } from "./webdav"
import { createUpstashClient } from "./upstash"

export let ProviderType

;(function(ProviderType) {
  ProviderType["WebDAV"] = "webdav"
  ProviderType["UpStash"] = "upstash"
})(ProviderType || (ProviderType = {}))

export const SyncClients = {
  [ProviderType.UpStash]: createUpstashClient,
  [ProviderType.WebDAV]: createWebDavClient
}

export function createSyncClient(provider, config) {
  return SyncClients[provider](config)
}
