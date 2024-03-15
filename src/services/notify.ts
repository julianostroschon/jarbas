import { EnvironmentVariables } from "@src/contracts";
import { sign } from "@tsndr/cloudflare-worker-jwt";

interface Body {
  method: "POST",
  headers: Record<string, string>,
  body: string,
}

async function constructBody(message: string, secret: string, receiver: number): Promise<Body> {
  const token = await sign({ message, phonenumber: `+55${receiver}` }, secret)
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  }
}

export async function notify(message: string, env: EnvironmentVariables, receivers: string[]) {
  const numbers = receivers.map((receiver: string): number => env.team[receiver])
  for (const receiver of numbers) {
    const data = await constructBody(message, env.CHAT_API_SECRET, receiver)
    await fetch(env.CHAT_API_URL, data);
  }
}