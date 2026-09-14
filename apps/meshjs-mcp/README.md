# meshjs-mcp

MCP ([Model Context Protocol](https://modelcontextprotocol.io)) server that gives AI agents and code editors real-time, retrieval-augmented MeshJS SDK documentation and Cardano development context.

It exposes a single tool, `askDocs`, which forwards a question to the Mesh AI retrieval-augmented backend and returns an AI generated answer grounded in the official MeshJS documentation.

## Requirements

The server calls out to an LLM on your behalf, so you need your own API key for the model you choose:

| Env var | Required | Description |
| --- | --- | --- |
| `API_KEY` | Yes | API key for the provider behind `MODEL` (OpenAI, Anthropic, or Google). |
| `MODEL` | Yes | Model identifier to use for answering, e.g. `gpt-4o-mini`, `claude-sonnet-4-20250514`, `gemini-1.5-pro`. |
| `MESH_AI_API_URL` | No | Override the Mesh AI backend URL. Defaults to the hosted `https://mimir-api.meshjs.dev`. |

## Usage

### Claude Code / Claude Desktop

```bash
claude mcp add-json mesh-mcp '{
  "command": "npx",
  "args": ["-y", "meshjs-mcp"],
  "env": {
    "API_KEY": "your-api-key",
    "MODEL": "your-preferred-model"
  }
}'
```

### VS Code / other MCP clients

```json
{
  "servers": {
    "mesh-mcp": {
      "command": "npx",
      "args": ["-y", "meshjs-mcp"],
      "env": {
        "API_KEY": "your-api-key",
        "MODEL": "your-preferred-model"
      }
    }
  }
}
```

## Development

```bash
npm install
npm run build
API_KEY=your-key MODEL=gpt-4o-mini node dist/index.js
```

See [meshjs.dev/ai/mcp](https://meshjs.dev/ai/mcp) for more details.

## Notes

- `@modelcontextprotocol/sdk` is intentionally pinned to `1.22.0` rather than a caret range. Versions `1.23.0` through at least `1.30.0` hit a TypeScript `TS2589: Type instantiation is excessively deep` error on `registerTool` with this project's zod version (see [modelcontextprotocol/typescript-sdk#1180](https://github.com/modelcontextprotocol/typescript-sdk/issues/1180)). The security advisories fixed in later SDK versions ([GHSA-345p-7cg4-v4c7](https://github.com/advisories/GHSA-345p-7cg4-v4c7), [GHSA-w48q-cv73-mx4w](https://github.com/advisories/GHSA-w48q-cv73-mx4w), [GHSA-8r9q-7v3j-jr4g](https://github.com/advisories/GHSA-8r9q-7v3j-jr4g)) only affect HTTP/SSE transports with multiple concurrent clients or servers exposing resource templates — this server only uses `StdioServerTransport` with a single tool and no resources, so it isn't exposed to any of them. Re-evaluate the pin once the upstream type regression is fixed.
