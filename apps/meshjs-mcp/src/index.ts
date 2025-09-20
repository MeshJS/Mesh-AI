#!/usr/bin/env node
import dotenv from "dotenv";
dotenv.config();
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

function requireEnv(name: string) {
    const value = process.env[name];
    if (!value) {
        console.log(`Missing required environment variable: ${name}`);
    }
    return value;
}

const OPENAI_API_KEY = requireEnv("OPENAI_API_KEY");
const MODEL = requireEnv("MODEL");

const server = new McpServer({
    name: "MeshJS MCP Server",
    version: "1.0.0"
});

server.registerTool(
    "getDocs",
    {
        title: "MeshJS Documentation Tool",
        description: "Provides comprehensive MeshJS library documentation for user's queries. This tool has access to official MeshJS documentation including: blockchain providers (Blockfrost, Koios, custom providers), wallet integrations, transaction building, smart contracts with Aiken, UTxO management, asset handling, staking operations, and SDK usage examples. Use this tool when users ask about MeshJS APIs, implementation patterns, code examples, troubleshooting, or any Cardano blockchain development with MeshJS. The tool can answer questions about specific functions, interfaces, best practices, and provide complete code snippets.",
        inputSchema: {
            query: z.string().describe("The user's question about MeshJS. Include specific context like: what you're trying to build, error messages, code snippets, or particular MeshJS features you need help with. More detailed queries yield better responses.")
        }
    },
    async ({ query }) => {
        try {
            const response = await axios.post("https://mimir-api.meshjs.dev/api/v1/ask-mesh-ai/mcp",
                {
                    "query": query,
                    "model": MODEL
                },
                {
                    headers: {
                        "Authorization": `Bearer ${OPENAI_API_KEY}`
                    }
                }
            );

            return {
                content: [{ type: "text", text: response.data }]
            }
        } catch (error) {
            console.error("Error fetching documentation");
            return {
                content: [{ type: "text", text: "Couldn't fetch docs at this time."}]
            }
        }
    }
)

const transport = new StdioServerTransport();
await server.connect(transport);