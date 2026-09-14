#!/usr/bin/env node
import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

const MESH_AI_API_URL = process.env.MESH_AI_API_URL || "https://mimir-api.meshjs.dev";
const API_KEY = process.env.API_KEY;
const MODEL = process.env.MODEL;

if (!API_KEY) {
    console.error("Missing required API_KEY environment variable. Provide an API key for the provider behind MODEL (OpenAI, Anthropic, or Google).");
    process.exit(1);
}

if (!MODEL) {
    console.error("Missing required MODEL environment variable, e.g. \"gpt-4o-mini\", \"claude-sonnet-4-20250514\", or \"gemini-1.5-pro\".");
    process.exit(1);
}

const server = new McpServer({
    name: "Mesh AI MCP Server",
    version: "1.2.0"
});

server.registerTool(
    "askDocs",
    {
        title: "Mesh AI Documentation Search",
        description: "Ask a question about the MeshJS SDK and Cardano development. This tool runs retrieval-augmented search over the official MeshJS documentation and returns an AI generated answer with supporting links. Use this to find information about MeshJS APIs, implementation patterns, code examples, troubleshooting, and best practices. More detailed queries yield better responses.",
        inputSchema: {
            question: z.string().describe("Your question or search query about MeshJS/Cardano development. Can be a question, topic, or keywords.")
        },
        annotations: {
            readOnlyHint: true,
            openWorldHint: true
        }
    },
    async ({ question }) => {
        try {
            const response = await axios.post(
                `${MESH_AI_API_URL}/api/v1/ask-mesh-ai/mcp`,
                { query: question, model: MODEL },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
                    },
                    timeout: 30_000
                }
            );

            const answer = typeof response.data === "string" ? response.data.trim() : "";

            if (!answer) {
                return {
                    content: [{ type: "text", text: "No matching documentation found." }]
                };
            }

            return {
                content: [{ type: "text", text: answer }]
            };
        } catch (error) {
            const errorMessage = axios.isAxiosError(error)
                ? `API Error: ${error.response?.data?.detail || error.response?.data?.message || error.message}`
                : `Error: ${(error as Error).message}`;

            console.error("Error querying Mesh AI API:", errorMessage);

            return {
                content: [{ type: "text", text: `Couldn't query MeshJS documentation: ${errorMessage}` }],
                isError: true
            };
        }
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);
