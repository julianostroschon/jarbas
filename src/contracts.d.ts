export interface EnvironmentVariables {
  CHAT_API_SECRET: string
  CHAT_API_URL: string
  API_PORT: number
  API_HOST: string
  team: Team
}

type Team = Record<string, number>