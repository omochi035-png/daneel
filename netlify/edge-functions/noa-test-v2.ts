import type { Config } from "https://edge.netlify.com/";

export default async function handler() {
  return new Response("EDGE_HIT", { status: 200 });
}

export const config: Config = { path: "/api/noa-test" };
