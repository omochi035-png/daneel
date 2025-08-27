import type { AppConfig } from "./lib/edge/types.ts";
import { prompt } from "./prompts/noa.ts";

export const appConfig: AppConfig = {
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",
  historyLength: 8,
  maxMessageLength: 1000,
  apiConfig: {
    model: "gpt-4o",
    "temperature": 1.2,
"top_p": 1.0,
"frequency_penalty": 0.1,
"presence_penalty": 0.7
  },
  // ← 英語の追記を全部やめて、「Noaプロンプトだけ」を返す
  systemPrompt: () => prompt,
};
