export const env = Object.freeze({
  API_PORT: Number(process.env.API_PORT) || 3001,
  API_HOST: process.env.API_HOST || '0.0.0.0',
})