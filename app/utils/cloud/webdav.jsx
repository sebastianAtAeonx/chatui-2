import { STORAGE_KEY } from "@/app/constant"
import { corsFetch } from "../cors"

export function createWebDavClient(store) {
  const folder = STORAGE_KEY
  const fileName = `${folder}/backup.json`
  const config = store.webdav
  const proxyUrl =
    store.useProxy && store.proxyUrl.length > 0 ? store.proxyUrl : undefined

  return {
    async check() {
      try {
        const res = await corsFetch(this.path(folder), {
          method: "MKCOL",
          headers: this.headers(),
          proxyUrl
        })
        console.log("[WebDav] check", res.status, res.statusText)
        return [201, 200, 404, 301, 302, 307, 308].includes(res.status)
      } catch (e) {
        console.error("[WebDav] failed to check", e)
      }

      return false
    },

    async get(key) {
      const res = await corsFetch(this.path(fileName), {
        method: "GET",
        headers: this.headers(),
        proxyUrl
      })

      console.log("[WebDav] get key = ", key, res.status, res.statusText)

      return await res.text()
    },

    async set(key, value) {
      const res = await corsFetch(this.path(fileName), {
        method: "PUT",
        headers: this.headers(),
        body: value,
        proxyUrl
      })

      console.log("[WebDav] set key = ", key, res.status, res.statusText)
    },

    headers() {
      const auth = btoa(config.username + ":" + config.password)

      return {
        authorization: `Basic ${auth}`
      }
    },
    path(path) {
      let url = config.endpoint

      if (!url.endsWith("/")) {
        url += "/"
      }

      if (path.startsWith("/")) {
        path = path.slice(1)
      }

      return url + path
    }
  }
}
