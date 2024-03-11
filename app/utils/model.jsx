export function collectModelTable(models, customModels) {
  const modelTable = {}

  // default models
  models.forEach(m => {
    modelTable[m.name] = {
      ...m,
      displayName: m.name // 'provider' is copied over if it exists
    }
  })

  // server custom models
  customModels
    .split(",")
    .filter(v => !!v && v.length > 0)
    .forEach(m => {
      const available = !m.startsWith("-")
      const nameConfig = m.startsWith("+") || m.startsWith("-") ? m.slice(1) : m
      const [name, displayName] = nameConfig.split("=")

      // enable or disable all models
      if (name === "all") {
        Object.values(modelTable).forEach(
          model => (model.available = available)
        )
      } else {
        modelTable[name] = {
          name,
          displayName: displayName || name,
          available,
          provider: modelTable[name]?.provider // Use optional chaining
        }
      }
    })
  return modelTable
}

/**
 * Generate full model table.
 */
export function collectModels(models, customModels) {
  const modelTable = collectModelTable(models, customModels)
  const allModels = Object.values(modelTable)

  return allModels
}
