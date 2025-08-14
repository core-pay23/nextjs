import { generateWallet, generateSalt, encryptPrivateKey, decryptPrivateKey } from './cryptoUtils';

describe('cryptoUtils', () => {
  describe('encryptPrivateKey and decryptPrivateKey', () => {
    it('should encrypt and decrypt private key correctly, maintaining wallet address', () => {
      // Generate a wallet
      const wallet = generateWallet();
      const salt = generateSalt();
      
      // Use a test password
      const password = 'test-password-123';
      
      // Encrypt the private key
      const encryptedPrivateKey = encryptPrivateKey(wallet.privateKey, password, salt);
      
      // Decrypt the private key
      const decryptedPrivateKey = decryptPrivateKey(encryptedPrivateKey, password, salt);
      
      // Verify the decrypted private key matches the original
      expect(decryptedPrivateKey).toBe(wallet.privateKey);
      
      // Verify that the wallet address remains the same
      // Derive address from decrypted private key using the same method as in generateWallet
      const crypto = require('crypto');
      const hash = crypto.createHash('sha256').update(decryptedPrivateKey).digest('hex');
      const decryptedAddress = '0x' + hash.slice(-40);
      
      expect(decryptedAddress).toBe(wallet.address);
    });
    
    it('should throw error with incorrect password', () => {
      const wallet = generateWallet();
      const salt = generateSalt();
      const password = 'correct-password';
      const wrongPassword = 'wrong-password';
      
      const encryptedPrivateKey = encryptPrivateKey(wallet.privateKey, password, salt);
      
      // Try to decrypt with wrong password
      expect(() => {
        decryptPrivateKey(encryptedPrivateKey, wrongPassword, salt);
      }).toThrow('Failed to decrypt private key');
    });
    
    it('should throw error with incorrect salt', () => {
      const wallet = generateWallet();
      const salt = generateSalt();
      const wrongSalt = generateSalt();
      const password = 'test-password';
      
      const encryptedPrivateKey = encryptPrivateKey(wallet.privateKey, password, salt);
      
      // Try to decrypt with wrong salt
      expect(() => {
        decryptPrivateKey(encryptedPrivateKey, password, wrongSalt);
      }).toThrow('Failed to decrypt private key');
    });
  });
});
