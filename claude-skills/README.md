# Mesh SDK AI Skills

AI assistant skills for building on Cardano with [Mesh SDK](https://meshjs.dev).

## What is this?

These are skill files that help AI coding assistants (Claude Code, Cursor, GitHub Copilot, etc.) understand and work with Mesh SDK packages. When installed, your AI assistant gains deep knowledge of:

- **Transaction building** - MeshTxBuilder API, patterns, troubleshooting
- **Wallet integration** - Browser wallets, signing, CIP standards
- **Low-level utilities** - Serialization, resolvers, Plutus data, CIP-8
- **React components** - UI components, hooks, patterns
- **Smart contracts** - Contract interactions, Plutus, Aiken

## Why Use This?

Building on Cardano with Mesh SDK has a steep learning curve. These skills eliminate that friction:

| Challenge Without Skills | With Skills Installed |
|-------------------------|----------------------|
| Must read extensive docs to understand API | AI assistant already knows the full API |
| Trial-and-error for transaction patterns | Ask "build a transaction that sends 5 ADA" and get working code |
| Debugging cryptic Cardano errors | Troubleshooting guides built into AI context |
| Forgetting method order (e.g., `spendingPlutusScriptV2()` before `txIn()`) | AI knows the correct order |
| Looking up CIP standards | AI understands CIP-30, CIP-8, etc. |

**In practice**, instead of:
1. Opening Mesh docs
2. Searching for the right method
3. Finding an example
4. Adapting it to your code

You just ask: *"Help me connect a browser wallet and send 10 ADA to this address"* — and get working, contextual code.

## Available Skills

| Skill | Package | Status |
|-------|---------|--------|
| [transaction](./transaction/) | `@meshsdk/transaction` | Ready |
| [wallet](./wallet/) | `@meshsdk/wallet` | Ready |
| [core-cst](./core-cst/) | `@meshsdk/core-cst` | Ready |

## Installation

### Option 1: Claude Code (Recommended)

```bash
# Install all skills
claude skill add @meshsdk/ai-skills

# Or link specific skill from source
claude skill link ./transaction
```

### Option 2: Manual Installation

Copy skill folders to Claude Code's skill directory:

```bash
# Copy transaction skill
cp -r transaction ~/.claude/skills/mesh-transaction

# Copy wallet skill
cp -r wallet ~/.claude/skills/mesh-wallet

# Copy core-cst skill
cp -r core-cst ~/.claude/skills/mesh-core-cst
```

### Option 3: Project-Local (Team-Wide)

Add to your repository so everyone on the team gets the skills automatically:

```bash
mkdir -p .claude/skills
cp -r transaction .claude/skills/mesh-transaction
cp -r wallet .claude/skills/mesh-wallet
cp -r core-cst .claude/skills/mesh-core-cst
```

Then commit to git — any team member using Claude Code gets the skills when they clone the repo.

### Option 4: Cursor IDE

Copy the skill's main file as Cursor rules:

```bash
cp transaction/SKILL.md .cursorrules
```

For multiple skills, concatenate them:

```bash
cat transaction/SKILL.md wallet/SKILL.md > .cursorrules
```

## How It Works

Each skill defines **triggers** in its frontmatter:

```yaml
triggers:
  - mesh
  - cardano transaction
  - plutus script
  - minting tokens
  - eternl
  - nami
```

When you mention any trigger word in conversation, the AI loads the relevant skill context. The skill includes:

- **Full API reference** - Every method, parameter, and return type
- **Common patterns** - Working code recipes for typical tasks
- **Troubleshooting** - Solutions to common errors

## Skill Structure

Each skill contains:

| File | Purpose |
|------|---------|
| `SKILL.md` | Main entry - triggers, overview, quick reference |
| `*.md` | Domain-specific documentation |
| `PATTERNS.md` | Common recipes with working code |
| `TROUBLESHOOTING.md` | Error solutions and debugging |

## Usage Examples

Once installed, ask your AI assistant:

- "Build a transaction that sends 5 ADA"
- "How do I mint an NFT with Mesh?"
- "Help me connect a browser wallet"
- "Show me how to interact with a Plutus script"
- "Why am I getting 'missing required signer' error?"
- "What's the correct order for spending from a script?"

## Contributing

1. Fork the [Mesh-AI repository](https://github.com/MeshJS/Mesh-AI)
2. Edit or add skill files in `claude-skills/`
3. Submit a PR

### Adding a New Skill

```bash
mkdir claude-skills/new-package
# Create SKILL.md with triggers and overview
# Add domain-specific documentation
# Add PATTERNS.md and TROUBLESHOOTING.md
```

## Related

- [Mesh SDK Documentation](https://meshjs.dev)
- [Mesh GitHub](https://github.com/MeshJS/mesh)
- [Claude Code](https://claude.ai/claude-code)

## License

Apache-2.0
