# Troubleshooting Guide

Common errors and solutions when using `@meshsdk/transaction`.

## Table of Contents

- [Build Errors](#build-errors)
- [Script Errors](#script-errors)
- [Coin Selection Errors](#coin-selection-errors)
- [Submission Errors](#submission-errors)
- [Common Mistakes](#common-mistakes)

---

## Build Errors

### "Change address is not set"

**Error:**
```
Error: Change address is not set, utxo selection cannot be done without this
```

**Cause:** `complete()` requires a change address for coin selection.

**Solution:**
```typescript
txBuilder
  .txOut(...)
  .changeAddress(yourWalletAddress)  // Add this
  .selectUtxosFrom(utxos)
  .complete();
```

---

### "Transaction information is incomplete while no fetcher instance is provided"

**Error:**
```
Error: Transaction information is incomplete while no fetcher instance is provided. Provide a `fetcher`.
```

**Cause:** Input UTxOs are missing amount/address info and no fetcher is available to look them up.

**Solutions:**

1. **Provide complete input info:**
```typescript
txBuilder.txIn(
  txHash,
  txIndex,
  [{ unit: 'lovelace', quantity: '5000000' }],  // amount
  'addr_test1...'  // address
);
```

2. **Or provide a fetcher:**
```typescript
const txBuilder = new MeshTxBuilder({
  fetcher: new BlockfrostProvider('api-key')
});
```

---

### "Only KeyHash address is supported for utxo selection"

**Error:**
```
Error: Only KeyHash address is supported for utxo selection
```

**Cause:** `selectUtxosFrom()` received UTxOs with script addresses.

**Solution:** Filter to only include pubkey-controlled UTxOs:
```typescript
const pubKeyUtxos = utxos.filter(utxo => {
  // Only include UTxOs you can sign for
  return !utxo.output.scriptRef && !utxo.output.dataHash;
});
txBuilder.selectUtxosFrom(pubKeyUtxos);
```

---

### "Couldn't find value information for txHash#txIndex"

**Error:**
```
Error: Couldn't find value information for abc123...#0
```

**Cause:** The fetcher couldn't find the specified UTxO on-chain.

**Possible causes:**
1. Wrong txHash or txIndex
2. UTxO already spent
3. Transaction not yet confirmed
4. Wrong network

**Solution:**
```typescript
// Verify UTxO exists
const utxos = await provider.fetchUTxOs(txHash);
console.log(utxos);  // Check if it exists and has correct index
```

---

## Script Errors

### "Script input does not contain datum information"

**Error:**
```
Error: queueInput: Script input does not contain datum information
```

**Cause:** Plutus script inputs require datum but none was provided.

**Solution:**
```typescript
txBuilder
  .spendingPlutusScriptV2()
  .txIn(txHash, txIndex)
  .txInScript(scriptCbor)
  .txInDatumValue(datum)  // Provide datum
  // OR
  .txInInlineDatumPresent()  // If UTxO has inline datum
  .txInRedeemerValue(redeemer);
```

---

### "Script input does not contain redeemer information"

**Error:**
```
Error: queueInput: Script input does not contain redeemer information
```

**Cause:** Plutus script inputs require redeemer.

**Solution:**
```typescript
txBuilder
  .spendingPlutusScriptV2()
  .txIn(txHash, txIndex)
  .txInScript(scriptCbor)
  .txInDatumValue(datum)
  .txInRedeemerValue(redeemer)  // Add this
```

---

### "Script input does not contain script information"

**Error:**
```
Error: queueInput: Script input does not contain script information
```

**Cause:** Plutus script input missing the script itself.

**Solution:**
```typescript
txBuilder
  .spendingPlutusScriptV2()
  .txIn(txHash, txIndex)
  .txInScript(scriptCbor)  // Add inline script
  // OR
  .spendingTxInReference(refTxHash, refIndex, size, hash)  // Use reference script
```

---

### "Evaluate redeemers failed"

**Error:**
```
Error: Evaluate redeemers failed: <message>
```

**Causes:**
1. Script validation failed (logic error in script)
2. Wrong datum or redeemer format
3. Missing required signer
4. Time constraints not met

**Debug steps:**

1. **Check datum/redeemer format:**
```typescript
// Ensure correct format
.txInDatumValue(datum, 'Mesh')  // or 'JSON' or 'CBOR'
.txInRedeemerValue(redeemer, 'Mesh')
```

2. **Add required signers:**
```typescript
.requiredSignerHash(pubKeyHash)
```

3. **Check time constraints:**
```typescript
.invalidBefore(startSlot)
.invalidHereafter(endSlot)
```

4. **Enable verbose logging:**
```typescript
const txBuilder = new MeshTxBuilder({
  verbose: true,  // See detailed logs
  // ...
});
```

---

### "Tx evaluation failed" (Missing collateral)

**Cause:** Script transactions require collateral.

**Solution:**
```typescript
txBuilder
  .spendingPlutusScriptV2()
  .txIn(...)
  // ...
  .txInCollateral(  // Add collateral
    collateralUtxo.input.txHash,
    collateralUtxo.input.outputIndex,
    collateralUtxo.output.amount,
    collateralUtxo.output.address
  )
```

**Collateral requirements:**
- Must be pure ADA (no native assets)
- Usually 150% of estimated script execution cost
- Typically 5 ADA is enough for most scripts

---

## Coin Selection Errors

### "Insufficient funds"

**Error:**
```
InputSelectionError: Insufficient funds
```

**Causes:**
1. Not enough ADA to cover outputs + fees
2. Not enough native assets
3. Min UTxO requirements not met

**Solutions:**

1. **Check your UTxOs:**
```typescript
const utxos = await provider.fetchAddressUTxOs(address);
const totalAda = utxos.reduce((sum, u) => {
  const lovelace = u.output.amount.find(a => a.unit === 'lovelace');
  return sum + BigInt(lovelace?.quantity || 0);
}, 0n);
console.log('Total ADA:', totalAda / 1_000_000n);
```

2. **Ensure outputs meet min UTxO:**
```typescript
// Each output needs minimum ~1 ADA + more for assets
.txOut(address, [
  { unit: 'lovelace', quantity: '2000000' },  // 2 ADA minimum
  { unit: tokenId, quantity: '100' }
])
```

3. **Reduce number of outputs or consolidate UTxOs first**

---

### "Token bundle size exceeds limit"

**Error:**
```
Error: Token bundle size exceeds limit
```

**Cause:** Too many native assets in a single output.

**Solution:** Split assets across multiple outputs:
```typescript
// Instead of one output with 50 tokens:
.txOut(address, [
  { unit: 'lovelace', quantity: '5000000' },
  ...first25Tokens
])
.txOut(address, [
  { unit: 'lovelace', quantity: '5000000' },
  ...next25Tokens
])
```

---

### "Max tx size exceeded"

**Error:**
```
Error: Max tx size exceeded
```

**Causes:**
1. Too many inputs/outputs
2. Large inline datums
3. Large scripts (use reference scripts instead)

**Solutions:**

1. **Use reference scripts:**
```typescript
// Instead of inline script
.txInScript(largePlutusScript)

// Use reference
.spendingTxInReference(refTxHash, refIndex, scriptSize, scriptHash)
```

2. **Use datum hash instead of inline:**
```typescript
.txOutDatumHashValue(datum)  // Instead of inline
```

3. **Split into multiple transactions**

---

## Submission Errors

### "BadInputsUTxO"

**Error:**
```
SubmitTxError: BadInputsUTxO
```

**Cause:** One or more inputs don't exist on-chain.

**Possible reasons:**
1. Transaction already submitted (inputs spent)
2. Wrong network
3. Transaction that created the UTxO not yet confirmed

**Solution:** Wait for previous tx to confirm, or check network.

---

### "ValueNotConservedUTxO"

**Error:**
```
SubmitTxError: ValueNotConservedUTxO
```

**Cause:** Inputs don't equal outputs + fee (value conservation violated).

**Usually indicates:**
1. Missing mint operation
2. Wrong fee calculation
3. Bug in coin selection

**Solution:** Use `complete()` which handles this automatically.

---

### "FeeTooSmallUTxO"

**Error:**
```
SubmitTxError: FeeTooSmallUTxO
```

**Cause:** Manually set fee is too low.

**Solution:** Let `complete()` calculate fee, or increase manual fee:
```typescript
.setFee('300000')  // Increase fee
```

---

### "OutsideValidityIntervalUTxO"

**Error:**
```
SubmitTxError: OutsideValidityIntervalUTxO
```

**Cause:** Current slot is outside the transaction's validity interval.

**Solution:** Adjust validity interval:
```typescript
const currentSlot = await provider.fetchLatestSlot();
txBuilder
  .invalidBefore(currentSlot - 100)  // Buffer for propagation
  .invalidHereafter(currentSlot + 3600)  // Valid for ~1 hour
```

---

## Common Mistakes

### Wrong Order of Method Calls

**Wrong:**
```typescript
txBuilder
  .txIn(hash, index)  // Too late - already a PubKey input
  .spendingPlutusScriptV2()  // This won't work!
```

**Correct:**
```typescript
txBuilder
  .spendingPlutusScriptV2()  // FIRST - signals script input
  .txIn(hash, index)          // THEN - add the input
```

Same applies to `mintPlutusScriptV2()` before `mint()`, etc.

---

### Forgetting to Complete

**Wrong:**
```typescript
const tx = txBuilder
  .txIn(...)
  .txOut(...)
  .changeAddress(...);  // Missing .complete()
```

**Correct:**
```typescript
const tx = await txBuilder
  .txIn(...)
  .txOut(...)
  .changeAddress(...)
  .complete();  // Don't forget this!
```

---

### Mixing Sync and Async

**Wrong:**
```typescript
const tx = txBuilder.complete();  // Missing await!
```

**Correct:**
```typescript
const tx = await txBuilder.complete();  // complete() is async
// OR for sync (no balancing)
const tx = txBuilder.completeSync();
```

---

### Not Resetting Builder

**Issue:** Reusing builder without reset includes previous state.

**Solution:**
```typescript
txBuilder.reset();  // Clear state before new transaction
// Or create new instance
const newTxBuilder = new MeshTxBuilder({ ... });
```

---

### Wrong Datum Type

**Issue:** Script expects different datum format.

**Check your script's datum type and match it:**
```typescript
// If script expects { owner: PubKeyHash, deadline: POSIXTime }
const datum = {
  constructor: 0,  // ConstrPlutusData index
  fields: [
    { bytes: ownerPubKeyHash },
    { int: deadline }
  ]
};
.txInDatumValue(datum, 'Mesh')
```

---

## Debug Checklist

When transactions fail:

1. **Enable verbose mode:**
   ```typescript
   new MeshTxBuilder({ verbose: true, ... })
   ```

2. **Check the built transaction:**
   ```typescript
   const tx = await txBuilder.complete();
   console.log(txBuilder.meshTxBuilderBody);
   ```

3. **Verify UTxOs exist:**
   ```typescript
   const utxos = await provider.fetchUTxOs(txHash);
   ```

4. **Check wallet balance:**
   ```typescript
   const balance = await provider.fetchAddressUTxOs(address);
   ```

5. **Verify script hash matches:**
   ```typescript
   // Ensure you're spending to/from the correct script address
   ```

6. **Test on testnet first:**
   ```typescript
   // Use preview/preprod before mainnet
   ```
