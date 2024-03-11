// To store message streaming controller
export const ChatControllerPool = {
  controllers: {},

  addController(sessionId, messageId, controller) {
    const key = this.key(sessionId, messageId)
    this.controllers[key] = controller
    return key
  },

  stop(sessionId, messageId) {
    const key = this.key(sessionId, messageId)
    const controller = this.controllers[key]
    controller?.abort()
  },

  stopAll() {
    Object.values(this.controllers).forEach(v => v.abort())
  },

  hasPending() {
    return Object.values(this.controllers).length > 0
  },

  remove(sessionId, messageId) {
    const key = this.key(sessionId, messageId)
    delete this.controllers[key]
  },

  key(sessionId, messageIndex) {
    return `${sessionId},${messageIndex}`
  }
}
