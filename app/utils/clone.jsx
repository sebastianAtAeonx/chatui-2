export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function ensure(obj, keys) {
  return keys.every(
    k => obj[k] !== undefined && obj[k] !== null && obj[k] !== ""
  )
}
