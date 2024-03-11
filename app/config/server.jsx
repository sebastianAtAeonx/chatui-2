import md5 from "spark-md5"
import { DEFAULT_MODELS } from "../constant"

const ACCESS_CODES = (function getAccessCodes() {
  const code = process.env.CODE

  try {
    const codes = (code?.split(",") ?? [])
      .filter(v => !!v)
      .map(v => md5.hash(v.trim()))
    return new Set(codes)
  } catch (e) {
    return new Set()
  }
})()

export const getServerSideConfig = () => {
  if (typeof process === "undefined") {
    throw Error(
      "[Server Config] you are importing a nodejs-only module outside of nodejs"
    )
  }

  const disableGPT4 = !!process.env.DISABLE_GPT4
  let customModels = process.env.CUSTOM_MODELS ?? ""

  if (disableGPT4) {
    if (customModels) customModels += ","
    customModels += DEFAULT_MODELS.filter(m => m.name.startsWith("gpt-4"))
      .map(m => "-" + m.name)
      .join(",")
  }

  const isAzure = !!process.env.AZURE_URL
  const isGoogle = !!process.env.GOOGLE_API_KEY

  const apiKeyEnvVar = process.env.OPENAI_API_KEY ?? ""
  const apiKeys = apiKeyEnvVar.split(",").map(v => v.trim())
  const randomIndex = Math.floor(Math.random() * apiKeys.length)
  const apiKey = apiKeys[randomIndex]
  console.log(
    `[Server Config] using ${randomIndex + 1} of ${apiKeys.length} api key`
  )

  return {
    baseUrl: process.env.BASE_URL,
    apiKey,
    openaiOrgId: process.env.OPENAI_ORG_ID,

    isAzure,
    azureUrl: process.env.AZURE_URL,
    azureApiKey: process.env.AZURE_API_KEY,
    azureApiVersion: process.env.AZURE_API_VERSION,

    isGoogle,
    googleApiKey: process.env.GOOGLE_API_KEY,
    googleUrl: process.env.GOOGLE_URL,

    gtmId: process.env.GTM_ID,

    needCode: ACCESS_CODES.size > 0,
    code: process.env.CODE,
    codes: ACCESS_CODES,

    proxyUrl: process.env.PROXY_URL,
    isVercel: !!process.env.VERCEL,

    hideUserApiKey: !!process.env.HIDE_USER_API_KEY,
    disableGPT4,
    hideBalanceQuery: !process.env.ENABLE_BALANCE_QUERY,
    disableFastLink: !!process.env.DISABLE_FAST_LINK,
    customModels
  }
}
