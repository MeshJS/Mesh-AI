# Transaction Patterns

Common transaction patterns and recipes for `@meshsdk/transaction`.

## Table of Contents

- [Basic Transactions](#basic-transactions)
- [Script Transactions](#script-transactions)
- [Minting](#minting)
- [Staking](#staking)
- [Governance (Conway)](#governance-conway)
- [Advanced Patterns](#advanced-patterns)

---

## Basic Transactions

### Send ADA with Manual Inputs

```typescript
import { MeshTxBuilder } from '@meshsdk/transaction';

const txBuilder = new MeshTxBuilder();

const unsignedTx = txBuilder
  .txIn(
    '2cb57168ee66b68bd04a0d595060b546edf30c04ae1031b883c9ac797967dd85',
    0,
    [{ unit: 'lovelace', quantity: '10000000' }],
    'addr_test1qz...'
  )
  .txOut(
    'addr_test1qp...',
    [{ unit: 'lovelace', quantity: '5000000' }]
  )
  .changeAddress('addr_test1qz...')
  .completeSync();
```

### Send ADA with Auto Coin Selection

```typescript
import { MeshTxBuilder, BlockfrostProvider } from '@meshsdk/core';

const provider = new BlockfrostProvider('your-api-key');

const txBuilder = new MeshTxBuilder({
  fetcher: provider,
  submitter: provider,
  evaluator: provider,
});

// Get wallet UTxOs
const utxos = await provider.fetchAddressUTxOs(walletAddress);

const unsignedTx = await txBuilder
  .txOut('addr_test1qp...', [
    { unit: 'lovelace', quantity: '5000000' }
  ])
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();

// Sign with wallet
const signedTx = await wallet.signTx(unsignedTx);
const txHash = await wallet.submitTx(signedTx);
```

### Send Multiple Assets

```typescript
const unsignedTx = await txBuilder
  .txOut('addr_test1qp...', [
    { unit: 'lovelace', quantity: '2000000' },
    { unit: 'policyId' + 'assetNameHex', quantity: '100' }
  ])
  .txOut('addr_test1qr...', [
    { unit: 'lovelace', quantity: '3000000' }
  ])
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Add Metadata

```typescript
const unsignedTx = await txBuilder
  .txOut('addr_test1qp...', [{ unit: 'lovelace', quantity: '2000000' }])
  .metadataValue(721, {
    [policyId]: {
      [assetName]: {
        name: 'My NFT',
        image: 'ipfs://...',
        description: 'An awesome NFT'
      }
    }
  })
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

---

## Script Transactions

### Spend from Plutus Script (Inline Datum)

```typescript
const unsignedTx = await txBuilder
  // 1. Signal Plutus V2 script input
  .spendingPlutusScriptV2()
  // 2. Add the script UTxO
  .txIn(
    scriptUtxo.input.txHash,
    scriptUtxo.input.outputIndex,
    scriptUtxo.output.amount,
    scriptAddress
  )
  // 3. Provide the script
  .txInScript(scriptCbor)
  // 4. Signal inline datum is present
  .txInInlineDatumPresent()
  // 5. Provide redeemer
  .txInRedeemerValue({ data: { alternative: 0, fields: [] } })
  // 6. Add collateral
  .txInCollateral(
    collateralUtxo.input.txHash,
    collateralUtxo.input.outputIndex,
    collateralUtxo.output.amount,
    collateralUtxo.output.address
  )
  // 7. Add output and complete
  .txOut(recipientAddress, [{ unit: 'lovelace', quantity: '5000000' }])
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Spend from Plutus Script (Provided Datum)

```typescript
const datum = {
  constructor: 0,
  fields: [
    { bytes: ownerPubKeyHash },
    { int: deadline }
  ]
};

const unsignedTx = await txBuilder
  .spendingPlutusScriptV2()
  .txIn(scriptUtxo.input.txHash, scriptUtxo.input.outputIndex)
  .txInScript(scriptCbor)
  .txInDatumValue(datum, 'Mesh')  // Provide datum
  .txInRedeemerValue({ data: { alternative: 0, fields: [] } })
  .txInCollateral(collateralHash, collateralIndex, collateralAmount, collateralAddr)
  .requiredSignerHash(ownerPubKeyHash)  // Required for script validation
  .invalidBefore(currentSlot)  // Validity interval
  .txOut(recipientAddress, outputAmount)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Use Reference Script

```typescript
const unsignedTx = await txBuilder
  .spendingPlutusScriptV2()
  .txIn(scriptUtxo.input.txHash, scriptUtxo.input.outputIndex)
  // Reference script instead of inline
  .spendingTxInReference(
    refScriptUtxo.input.txHash,
    refScriptUtxo.input.outputIndex,
    scriptSize.toString(),  // Script size in bytes
    scriptHash
  )
  .txInInlineDatumPresent()
  .txInRedeemerValue(redeemer)
  .txInCollateral(...)
  .txOut(...)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Lock Funds at Script Address

```typescript
const datum = {
  constructor: 0,
  fields: [
    { bytes: beneficiaryPubKeyHash },
    { int: unlockTime }
  ]
};

const unsignedTx = await txBuilder
  .txOut(scriptAddress, [{ unit: 'lovelace', quantity: '10000000' }])
  .txOutInlineDatumValue(datum, 'Mesh')  // Inline datum
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

---

## Minting

### Mint with Plutus Policy

```typescript
const policyId = 'abc123...';
const assetName = '4d79546f6b656e';  // "MyToken" in hex
const redeemer = { data: { alternative: 0, fields: [] } };

const unsignedTx = await txBuilder
  // 1. Signal Plutus minting
  .mintPlutusScriptV2()
  // 2. Add mint operation
  .mint('1', policyId, assetName)
  // 3. Provide minting policy
  .mintingScript(policyScriptCbor)
  // 4. Provide redeemer
  .mintRedeemerValue(redeemer)
  // 5. Collateral for script execution
  .txInCollateral(...)
  // 6. Send minted token somewhere
  .txOut(recipientAddress, [
    { unit: 'lovelace', quantity: '2000000' },
    { unit: policyId + assetName, quantity: '1' }
  ])
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Mint with Native Script

```typescript
// Native script - no redeemer needed
const unsignedTx = await txBuilder
  .mint('100', policyId, assetName)
  .mintingScript(nativeScriptCbor)  // Native script CBOR
  .txOut(recipientAddress, [
    { unit: 'lovelace', quantity: '2000000' },
    { unit: policyId + assetName, quantity: '100' }
  ])
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Burn Tokens

```typescript
// Negative quantity = burn
const unsignedTx = await txBuilder
  .mintPlutusScriptV2()
  .mint('-50', policyId, assetName)  // Burn 50 tokens
  .mintingScript(policyScriptCbor)
  .mintRedeemerValue({ data: { alternative: 1, fields: [] } })  // Burn action
  .txInCollateral(...)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Mint Multiple Assets (Same Policy)

```typescript
const unsignedTx = await txBuilder
  .mintPlutusScriptV2()
  .mint('1', policyId, 'TokenA')
  .mintingScript(policyScriptCbor)
  .mintRedeemerValue(redeemer)
  // Additional mints with same policy auto-group
  .mintPlutusScriptV2()
  .mint('5', policyId, 'TokenB')
  .mintingScript(policyScriptCbor)
  .mintRedeemerValue(redeemer)  // Must be same redeemer for same policy
  .txInCollateral(...)
  .txOut(recipientAddress, [
    { unit: 'lovelace', quantity: '2000000' },
    { unit: policyId + 'TokenA', quantity: '1' },
    { unit: policyId + 'TokenB', quantity: '5' }
  ])
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

---

## Staking

### Register and Delegate Stake

```typescript
const unsignedTx = await txBuilder
  // Register stake address (2 ADA deposit)
  .registerStakeCertificate(stakeAddress)
  // Delegate to pool
  .delegateStakeCertificate(stakeAddress, poolId)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Withdraw Staking Rewards

```typescript
const rewards = await provider.fetchAccountInfo(stakeAddress);
const rewardAmount = rewards.withdrawableAmount;

const unsignedTx = await txBuilder
  .withdrawal(stakeAddress, rewardAmount)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Withdraw with Script

```typescript
const unsignedTx = await txBuilder
  .withdrawalPlutusScriptV2()
  .withdrawal(scriptStakeAddress, rewardAmount)
  .withdrawalScript(withdrawalScriptCbor)
  .withdrawalRedeemerValue(redeemer)
  .txInCollateral(...)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Deregister Stake (Reclaim Deposit)

```typescript
const unsignedTx = await txBuilder
  .deregisterStakeCertificate(stakeAddress)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

---

## Governance (Conway)

### Register as DRep

```typescript
const anchor = {
  anchorUrl: 'https://example.com/drep-metadata.json',
  anchorDataHash: 'abc123...'  // Hash of metadata file
};

const unsignedTx = await txBuilder
  .drepRegistrationCertificate(
    drepId,
    anchor,
    '500000000000'  // 500 ADA deposit
  )
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Vote on Governance Action

```typescript
const voter = {
  type: 'DRep',
  drepId: 'drep1...'
};

const govActionId = {
  txHash: 'abc123...',
  txIndex: 0
};

const votingProcedure = {
  vote: 'Yes',
  anchor: {
    anchorUrl: 'https://example.com/rationale.json',
    anchorDataHash: 'xyz789...'
  }
};

const unsignedTx = await txBuilder
  .vote(voter, govActionId, votingProcedure)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Delegate Voting Power

```typescript
const drep = {
  type: 'DRepId',
  drepId: 'drep1...'
};
// Or: { type: 'AlwaysAbstain' }
// Or: { type: 'AlwaysNoConfidence' }

const unsignedTx = await txBuilder
  .voteDelegationCertificate(drep, stakeAddress)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

---

## Advanced Patterns

### Multi-Signature Transaction

```typescript
const unsignedTx = await txBuilder
  .txOut(recipientAddress, amount)
  .requiredSignerHash(signer1PubKeyHash)
  .requiredSignerHash(signer2PubKeyHash)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();

// First signer signs partially
const partialSig1 = await wallet1.signTx(unsignedTx, true);  // partial = true

// Second signer signs
const fullySigned = await wallet2.signTx(partialSig1, true);

// Submit
const txHash = await wallet1.submitTx(fullySigned);
```

### Offline Transaction Building

```typescript
import { OfflineFetcher, MeshTxBuilder } from '@meshsdk/core';

const offlineFetcher = new OfflineFetcher('preprod');

// Cache UTxOs for offline use
offlineFetcher.cacheUtxos(cachedUtxos);

const txBuilder = new MeshTxBuilder({
  fetcher: offlineFetcher,
  params: {
    minFeeA: 44,
    minFeeB: 155381,
    coinsPerUtxoSize: 4310,
    // ... other protocol params
  }
});

const unsignedTx = await txBuilder
  .txOut(recipientAddress, amount)
  .changeAddress(walletAddress)
  .selectUtxosFrom(cachedUtxos)
  .complete();
```

### Chained Transactions

Build transaction B that depends on output from transaction A (before A is on-chain):

```typescript
// Build first transaction
const txA = await txBuilder
  .txOut(scriptAddress, [{ unit: 'lovelace', quantity: '5000000' }])
  .txOutInlineDatumValue(datum)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();

// Get txA hash (before submission)
const txAHash = await wallet.signTx(txA);
const txAId = // derive from signed tx

// Build second transaction that spends from txA
const txB = await new MeshTxBuilder({ fetcher, submitter, evaluator })
  .chainTx(txAHash)  // Tell builder about pending tx
  .spendingPlutusScriptV2()
  .txIn(txAId, 0)  // Spend output from txA
  .txInScript(scriptCbor)
  .txInInlineDatumPresent()
  .txInRedeemerValue(redeemer)
  .inputForEvaluation({
    input: { txHash: txAId, outputIndex: 0 },
    output: { address: scriptAddress, amount: [...], ... }
  })
  .txInCollateral(...)
  .txOut(recipientAddress, amount)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Deploy Reference Script

```typescript
const unsignedTx = await txBuilder
  .txOut(
    refScriptHolderAddress,
    [{ unit: 'lovelace', quantity: '10000000' }]  // Min UTxO for script
  )
  .txOutReferenceScript(scriptCbor, 'V2')  // Attach script as reference
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Time-Locked Transaction

```typescript
const currentSlot = await provider.fetchLatestSlot();
const lockUntilSlot = currentSlot + 3600;  // ~1 hour

const unsignedTx = await txBuilder
  .invalidBefore(lockUntilSlot)  // Valid only after this slot
  .txOut(recipientAddress, amount)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```

### Hydra L2 Transaction

```typescript
const txBuilder = new MeshTxBuilder({
  isHydra: true,  // Zero fees for Hydra
  fetcher: hydraProvider,
  submitter: hydraProvider,
});

const unsignedTx = await txBuilder
  .txOut(recipientAddress, amount)
  .changeAddress(walletAddress)
  .selectUtxosFrom(utxos)
  .complete();
```
