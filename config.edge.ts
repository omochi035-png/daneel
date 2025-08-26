import type { AppConfig } from "./lib/edge/types.ts";
import { prompt } from "./prompts/noa.ts";

export const appConfig: AppConfig = {
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",
  historyLength: 8,
  maxMessageLength: 1000,
  apiConfig: {
    model: "gpt-4o",
    "temperature": 1.05,
"top_p": 0.92,
"frequency_penalty": 0.25,
"presence_penalty": 0.55
  },
  // ← 英語の追記を全部やめて、「Noaプロンプトだけ」を返す
  systemPrompt: () => prompt,
};
