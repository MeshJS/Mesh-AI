---
name: MeshTransaction
description: Cardano transaction building with @meshsdk/transaction
version: 1.9.0
triggers:
  - mesh
  - meshsdk
  - meshtxbuilder
  - cardano transaction
  - cardano tx
  - plutus script
  - minting tokens
  - stake delegation
  - drep
  - governance vote
---

# Mesh SDK Transaction Skill

AI-assisted Cardano transaction building using `MeshTxBuilder` from `@meshsdk/transaction`.

## Package Info

```bash
npm install @meshsdk/transaction
# or
npm install @meshsdk/core  # includes transaction + wallet + provider
```

## Quick Reference

| Task | Method Chain |
|------|--------------|
| Send ADA | `txIn() -> txOut() -> changeAddress() -> complete()` |
| Mint tokens (Plutus) | `mintPlutusScriptV2() -> mint() -> mintingScript() -> mintRedeemerValue() -> ...` |
| Mint tokens (Native) | `mint() -> mintingScript() -> ...` |
| Script spending | `spendingPlutusScriptV2() -> txIn() -> txInScript() -> txInDatumValue() -> txInRedeemerValue() -> ...` |
| Stake delegation | `delegateStakeCertificate(rewardAddress, poolId)` |
| Withdraw rewards | `withdrawal(rewardAddress, coin) -> withdrawalScript() -> withdrawalRedeemerValue()` |
| Governance vote | `vote(voter, govActionId, votingProcedure)` |
| DRep registration | `drepRegistrationCertificate(drepId, anchor?, deposit?)` |

## Constructor Options

```typescript
import { MeshTxBuilder } from '@meshsdk/transaction';

const txBuilder = new MeshTxBuilder({
  fetcher?: IFetcher,      // For querying UTxOs (e.g., BlockfrostProvider)
  submitter?: ISubmitter,  // For submitting transactions
  evaluator?: IEvaluator,  // For script execution cost estimation
  serializer?: IMeshTxSerializer,  // Custom serializer
  selector?: IInputSelector,       // Custom coin selection
  isHydra?: boolean,       // Hydra L2 mode (zero fees)
  params?: Partial<Protocol>,  // Custom protocol parameters
  verbose?: boolean,       // Enable logging
});
```

## Completion Methods

| Method | Async | Balanced | Use Case |
|--------|-------|----------|----------|
| `complete()` | Yes | Yes | Production - auto coin selection, fee calculation |
| `completeSync()` | No | No | Testing - requires manual inputs/fee |
| `completeUnbalanced()` | No | No | Partial build for inspection |
| `completeSigning()` | No | N/A | Add signatures after complete() |

## Files

- [TRANSACTION.md](./TRANSACTION.md) - Complete API reference
- [PATTERNS.md](./PATTERNS.md) - Common transaction recipes
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Error solutions

## Key Concepts

### Fluent API
All methods return `this` for chaining:
```typescript
txBuilder
  .txIn(hash, index)
  .txOut(address, amount)
  .changeAddress(addr)
  .complete();
```

### Script Versions
- `spendingPlutusScriptV1/V2/V3()` - Set before `txIn()` for script inputs
- `mintPlutusScriptV1/V2/V3()` - Set before `mint()` for Plutus minting
- `withdrawalPlutusScriptV1/V2/V3()` - Set before `withdrawal()` for script withdrawals
- `votePlutusScriptV1/V2/V3()` - Set before `vote()` for script votes

### Data Types
Datum and redeemer values accept three formats:
- `"Mesh"` (default) - Mesh Data type
- `"JSON"` - Raw constructor format
- `"CBOR"` - Hex-encoded CBOR string

### Reference Scripts
Use `*TxInReference()` methods to reference scripts stored on-chain instead of including them in the transaction (reduces tx size/fees).

## Important Notes

1. **Change address required** - `complete()` fails without `changeAddress()`
2. **Collateral required** - Script transactions need `txInCollateral()`
3. **Order matters** - Call `spendingPlutusScriptV2()` BEFORE `txIn()` for script inputs
4. **Coin selection** - Provide UTxOs via `selectUtxosFrom()` for auto-selection
