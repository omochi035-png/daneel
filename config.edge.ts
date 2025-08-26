import type { AppConfig } from "./lib/edge/types.ts";
import { prompt } from "./prompts/noa.ts";

export const appConfig: AppConfig = {
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",
  historyLength: 8,
  maxMessageLength: 1000,
  apiConfig: {
    model: "gpt-4o",
    "temperature": 1.1,
"top_p": 0.92,
"frequency_penalty": 0.2,
"presence_penalty": 0.65
  },
  // ← 英語の追記を全部やめて、「Noaプロンプトだけ」を返す
  systemPrompt: () => prompt,
};
