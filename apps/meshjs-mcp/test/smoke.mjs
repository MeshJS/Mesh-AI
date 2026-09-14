// Smoke test: boots the built server over real stdio and checks it speaks MCP.
// This exists because the server previously shipped without ever calling
// `server.connect()`, so it built and type-checked fine but never actually
// served a request. A plain build/typecheck would not have caught that -
// only actually starting the process and talking MCP to it would.
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entry = path.join(__dirname, "..", "dist", "index.js");

function withTimeout(promise, ms, message) {
    let timer;
    const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function main() {
    const child = spawn(process.execPath, [entry], {
        env: { ...process.env, API_KEY: "test-key", MODEL: "gpt-4o-mini" },
        stdio: ["pipe", "pipe", "pipe"]
    });

    let stderr = "";
    child.stderr.on("data", (d) => { stderr += d.toString(); });

    const responses = [];
    let buf = "";
    child.stdout.on("data", (d) => {
        buf += d.toString();
        let idx;
        while ((idx = buf.indexOf("\n")) >= 0) {
            const line = buf.slice(0, idx);
            buf = buf.slice(idx + 1);
            if (line.trim()) responses.push(JSON.parse(line));
        }
    });

    function send(msg) {
        child.stdin.write(JSON.stringify(msg) + "\n");
    }

    function waitForResponse(id) {
        return new Promise((resolve) => {
            const check = () => {
                const found = responses.find((r) => r.id === id);
                if (found) return resolve(found);
                setTimeout(check, 25);
            };
            check();
        });
    }

    try {
        send({
            jsonrpc: "2.0",
            id: 1,
            method: "initialize",
            params: {
                protocolVersion: "2025-06-18",
                capabilities: {},
                clientInfo: { name: "smoke-test", version: "1.0.0" }
            }
        });

        const initResponse = await withTimeout(
            waitForResponse(1),
            5000,
            `Server did not respond to initialize within 5s. stderr: ${stderr}`
        );

        if (!initResponse.result?.serverInfo?.name) {
            throw new Error(`Unexpected initialize response: ${JSON.stringify(initResponse)}`);
        }

        send({ jsonrpc: "2.0", method: "notifications/initialized" });
        send({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });

        const toolsResponse = await withTimeout(
            waitForResponse(2),
            5000,
            `Server did not respond to tools/list within 5s. stderr: ${stderr}`
        );

        const tools = toolsResponse.result?.tools ?? [];
        if (!tools.some((t) => t.name === "askDocs")) {
            throw new Error(`Expected an "askDocs" tool, got: ${JSON.stringify(tools)}`);
        }

        console.log("OK: server initializes and exposes the askDocs tool over stdio.");
    } finally {
        child.kill();
    }
}

main().catch((err) => {
    console.error("Smoke test failed:", err.message);
    process.exit(1);
});
