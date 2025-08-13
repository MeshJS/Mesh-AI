import { ProvideLinksToolSchema } from '../../../lib/chat/inkeep-qa-schema';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { convertToModelMessages, streamText } from 'ai';

//export const runtime = 'edge';

const mesh_api = createOpenAICompatible({
  name: 'MeshAI',
  apiKey: "",
  baseURL: 'https://meshjs-rag.onrender.com/api/v1/ask-mesh-ai',
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