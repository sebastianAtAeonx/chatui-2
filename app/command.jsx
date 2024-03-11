import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Locale from "./locales"

export function useCommand(commands = {}) {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    let shouldUpdate = false
    searchParams.forEach((param, name) => {
      const commandName = name
      if (typeof commands[commandName] === "function") {
        commands[commandName](param)
        searchParams.delete(name)
        shouldUpdate = true
      }
    })

    if (shouldUpdate) {
      setSearchParams(searchParams)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, commands])
}

export const ChatCommandPrefix = ":"

export function useChatCommand(commands = {}) {
  function extract(userInput) {
    return userInput.startsWith(ChatCommandPrefix)
      ? userInput.slice(1)
      : userInput
  }

  function search(userInput) {
    const input = extract(userInput)
    const desc = Locale.Chat.Commands
    return Object.keys(commands)
      .filter(c => c.startsWith(input))
      .map(c => ({
        title: desc[c],
        content: ChatCommandPrefix + c
      }))
  }

  function match(userInput) {
    const command = extract(userInput)
    const matched = typeof commands[command] === "function"

    return {
      matched,
      invoke: () => matched && commands[command](userInput)
    }
  }

  return { match, search }
}
