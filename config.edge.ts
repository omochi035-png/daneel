import type { AppConfig } from "./lib/edge/types.ts";
import { prompt } from "./prompts/noa.ts";

export const appConfig: AppConfig = {
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",
  historyLength: 8,
  maxMessageLength: 1000,
  apiConfig: {
    model: "gpt-4o",
    temperature: 1.18,
    top_p: 0.90,
    frequency_penalty: 0.20,
    presence_penalty: 0.70,
  },
  // 英語の追記を全部やめて、「Noaプロンプトだけ」を返す
  systemPrompt: () => prompt,
};
