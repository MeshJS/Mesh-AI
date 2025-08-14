import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { convertToModelMessages, streamText } from 'ai';

//export const runtime = 'edge';
const apiKey = process.env.API_KEY;
const baseURL = process.env.BACKEND_BASE_URL;

const mesh_api = createOpenAICompatible({
  name: 'MeshAI',
  apiKey: apiKey,
  baseURL: baseURL || "",
});

export async function POST(req: Request) {
  const reqJson = await req.json();

  const result = streamText({
    model: mesh_api("gpt-4o-mini"),
    messages: convertToModelMessages(reqJson.messages, {
      ignoreIncompleteToolCalls: true,
    }),
  });

  return result.toUIMessageStreamResponse();
}