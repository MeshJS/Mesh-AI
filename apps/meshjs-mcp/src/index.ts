#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

const CACHE_DURATION_MS = process.env.CACHE_DURATION_MS
  ? parseInt(process.env.CACHE_DURATION_MS)
  : 3600000;

const MAX_RESPONSE_TOKENS = process.env.MAX_RESPONSE_TOKENS
  ? parseInt(process.env.MAX_RESPONSE_TOKENS)
  : 15000;

const DOCS_URL = process.env.DOCS_URL || "https://meshjs.dev/llms.txt";

const CHARS_PER_TOKEN = 4;
const MIN_KEYWORD_LENGTH = 2;
const EXACT_MATCH_SCORE = 100;
const KEYWORD_MATCH_SCORE = 10;
const MIN_RELEVANCE_SCORE = 100;

let docsCache: string | null = null;
let lastFetch: number = 0;

const server = new McpServer({
  name: "MeshJS MCP Server",
  version: "1.0.0"
});

async function fetchDocs(): Promise<string> {
  const now = Date.now();

  if (docsCache && (now - lastFetch) < CACHE_DURATION_MS) {
    return docsCache;
  }

  const response = await axios.get(DOCS_URL);
  docsCache = response.data;
  lastFetch = now;

  return docsCache;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function searchDocs(docs: string, query: string): string {
  const sections = docs.split(/\n(?=# )/);
  const queryLower = query.toLowerCase();
  const keywords = queryLower.split(/\s+/).filter(word => word.length > MIN_KEYWORD_LENGTH);

  const scoredSections = sections
    .map(section => {
      const sectionLower = section.toLowerCase();
      let score = 0;

      if (sectionLower.includes(queryLower)) {
        score += EXACT_MATCH_SCORE;
      }

      keywords.forEach(keyword => {
        const escapedKeyword = escapeRegex(keyword);
        const matches = (sectionLower.match(new RegExp(escapedKeyword, 'g')) || []).length;
        score += matches * KEYWORD_MATCH_SCORE;
      });

      return { section, score };
    })
    .filter(item => item.score >= MIN_RELEVANCE_SCORE)
    .sort((a, b) => b.score - a.score);

  if (scoredSections.length === 0 || scoredSections.length > sections.length * 0.5) {
    return "No relevant documentation found for your query. Try using different keywords or ask a more general question.";
  }

  const result: string[] = [];
  let estimatedTokens = 0;
  const maxChars = MAX_RESPONSE_TOKENS * CHARS_PER_TOKEN;

  for (const { section } of scoredSections) {
    if (estimatedTokens + section.length > maxChars && result.length > 0) {
      break;
    }
    result.push(section);
    estimatedTokens += section.length;
  }

  return result.join('\n\n---\n\n');
}

server.registerTool(
  "getDocs",
  {
    title: "MeshJS Documentation Tool",
    description: "Provides comprehensive MeshJS library documentation. This tool has access to official MeshJS documentation including: blockchain providers (Blockfrost, Koios, custom providers), wallet integrations, transaction building, smart contracts with Aiken, UTxO management, asset handling, staking operations, and SDK usage examples. Use this tool when users ask about MeshJS APIs, implementation patterns, code examples, troubleshooting, or any Cardano blockchain development with MeshJS.",
    inputSchema: {
      query: z.string().describe("The user's question about MeshJS. Include specific context like: what you're trying to build, error messages, code snippets, or particular MeshJS features you need help with.")
    }
  },
  async ({ query }) => {
    try {
      const docs = await fetchDocs();
      const relevantDocs = searchDocs(docs, query);

      return {
        content: [{
          type: "text",
          text: `Here is the relevant MeshJS documentation for: "${query}"\n\n${relevantDocs}`
        }]
      };
    } catch (error) {
      console.error("Error fetching documentation:", error);
      return {
        content: [{
          type: "text",
          text: "Unable to fetch MeshJS documentation at this time. Please try again later."
        }]
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
