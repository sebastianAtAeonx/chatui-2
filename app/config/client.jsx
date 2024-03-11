import { getBuildConfig } from "./build"

export function getClientConfig() {
  if (typeof document !== "undefined") {
    // client side
    return JSON.parse(queryMeta("config"))
  }

  if (typeof process !== "undefined") {
    // server side
    return getBuildConfig()
  }
}

function queryMeta(key, defaultValue) {
  let ret
  if (document) {
    const meta = document.head.querySelector(`meta[name='${key}']`)
    ret = meta?.content ?? ""
  } else {
    ret = defaultValue ?? ""
  }

  return ret
}
