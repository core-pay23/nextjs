import { generateWallet, generateSalt, encryptPrivateKey, decryptPrivateKey } from './cryptoUtils';
import crypto from 'crypto';

function testEncryptionDecryption() {
  console.log('Testing encryption and decryption functions...\n');
  
  try {
    // Generate a wallet
    const wallet = generateWallet();
    console.log('Original wallet address:', wallet.address);
    console.log('Original private key:', wallet.privateKey);
    
    // Generate a salt
    const salt = generateSalt();
    console.log('Generated salt:', salt);
    
    // Use a test password
    const password = 'test-password-123';
    
    // Encrypt the private key
    const encryptedPrivateKey = encryptPrivateKey(wallet.privateKey, password, salt);
    console.log('Encrypted private key:', encryptedPrivateKey);
    
    // Decrypt the private key
    const decryptedPrivateKey = decryptPrivateKey(encryptedPrivateKey, password, salt);
    console.log('Decrypted private key:', decryptedPrivateKey);
    
    // Verify the decrypted private key matches the original
    if (decryptedPrivateKey === wallet.privateKey) {
      console.log('✅ Private key encryption/decryption test PASSED');
    } else {
      console.log('❌ Private key encryption/decryption test FAILED');
      return false;
    }
    
    // Verify that the wallet address remains the same
    // Derive address from decrypted private key using the same method as in generateWallet
    const hash = crypto.createHash('sha256').update(decryptedPrivateKey).digest('hex');
    const decryptedAddress = '0x' + hash.slice(-40);
    
    console.log('Decrypted wallet address:', decryptedAddress);
    
    if (decryptedAddress === wallet.address) {
      console.log('✅ Wallet address consistency test PASSED');
    } else {
      console.log('❌ Wallet address consistency test FAILED');
      return false;
    }
    
    // Test with incorrect password
    console.log('\nTesting with incorrect password...');
    try {
      decryptPrivateKey(encryptedPrivateKey, 'wrong-password', salt);
      console.log('❌ Incorrect password test FAILED - should have thrown error');
      return false;
    } catch (error) {
      console.log('✅ Incorrect password test PASSED - correctly threw error:', error.message);
    }
    
    // Test with incorrect salt
    console.log('\nTesting with incorrect salt...');
    try {
      const wrongSalt = generateSalt();
      decryptPrivateKey(encryptedPrivateKey, password, wrongSalt);
      console.log('❌ Incorrect salt test FAILED - should have thrown error');
      return false;
    } catch (error) {
      console.log('✅ Incorrect salt test PASSED - correctly threw error:', error.message);
    }
    
    console.log('\n🎉 All tests passed!');
    return true;
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return false;
  }
}

// Run the test
testEncryptionDecryption();
