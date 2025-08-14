# Crypto Utilities

This directory contains cryptographic utilities for the Lisk Payment Gateway.

## Files

- `cryptoUtils.js` - Main cryptographic functions for encryption/decryption
- `testCrypto.mjs` - Test script for encryption/decryption functions
- `cryptoUtils.test.js` - Jest test file (for future use)

## Running Tests

To test the encryption and decryption functions, run:

```bash
npm run test:crypto
```

This will:
1. Generate a new wallet
2. Encrypt the private key
3. Decrypt the private key
4. Verify that the decrypted private key matches the original
5. Verify that the wallet address remains consistent
6. Test error handling with incorrect passwords and salts

## Test Output

The test will show:
- Original wallet address and private key
- Generated salt
- Encrypted private key
- Decrypted private key
- Verification results for each test case

All tests should pass with ✅ indicators.
