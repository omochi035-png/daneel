import type { Config, Context } from "https://edge.netlify.com/";
import { getChatStream, sanitizeMessages } from "../../lib/edge/openai.ts";
import { appConfig } from "../../config.edge.ts";

export default async function handler(req: Request, ctx: Context): Promise<Response> {
  if (!appConfig.OPENAI_API_KEY) {
    return new Response("Missing OPENAI_API_KEY", { status: 500 });
  }

  // systemPrompt を取り出し
  const raw =
    typeof appConfig.systemPrompt === "function"
      ? await appConfig.systemPrompt(req, ctx)
      : appConfig.systemPrompt;

  // 反映チェック用ログ（Netlify → Logs → Edge Functions で見える）
  console.log("[NOA_EDGE] head=", String(raw).slice(0, 40));

  // 先頭にNoaを“強制”で注入（判定マーカー付き）
  const forcedSystem = `NOA_FORCE_OK\n${raw}`;

  // リクエスト本文
  const data = await req.json().catch(() => ({}));
  const messages = sanitizeMessages(
    data?.messages ?? [],
    appConfig.historyLength,
    appConfig.maxMessageLength
  );

  // OpenAIへストリーミング
  const stream = await getChatStream(
    {
      ...appConfig.apiConfig,
      user: ctx.ip,
      messages: [{ role: "system", content: forcedSystem }, ...messages] as any,
    },
    appConfig.OPENAI_API_KEY
  );

  // 重要：text/plainでストリームをそのまま返す（フロントがその前提で読む）
  return new Response(stream, {
    headers: { "Content-Type": "text/plain" },
  });
}

export const config: Config = { path: "/api/noa-test" };
