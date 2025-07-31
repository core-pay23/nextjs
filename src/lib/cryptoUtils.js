import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const TAG_LENGTH = 16;
const SALT_LENGTH = 32;

/**
 * Generate a cryptographically secure random salt
 * @returns {string} Base64 encoded salt
 */
export function generateSalt() {
  return crypto.randomBytes(SALT_LENGTH).toString("base64");
}

/**
 * Derive encryption key from password and salt using PBKDF2
 * @param {string} password - The password to derive key from
 * @param {string} salt - Base64 encoded salt
 * @returns {Buffer} Derived key
 */
function deriveKey(password, salt) {
  return crypto.pbkdf2Sync(
    password,
    Buffer.from(salt, "base64"),
    100000,
    KEY_LENGTH,
    "sha256"
  );
}

/**
 * Encrypt private key with password and salt
 * @param {string} privateKey - The private key to encrypt
 * @param {string} password - Password for encryption
 * @param {string} salt - Base64 encoded salt
 * @returns {string} Encrypted private key (base64)
 */
export function encryptPrivateKey(privateKey, password, salt) {
  const key = deriveKey(password, salt);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  // Optionally set AAD if you want extra authentication, but not required for most cases
  // cipher.setAAD(Buffer.from(salt, "base64"));

  let encrypted = cipher.update(privateKey, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const tag = cipher.getAuthTag();

  // Combine IV, auth tag, and encrypted data: [iv][tag][encrypted]
  const result = Buffer.concat([iv, tag, encrypted]);
  return result.toString("base64");
}

/**
 * Decrypt private key with password and salt
 * @param {string} encryptedPrivateKey - Base64 encoded encrypted private key
 * @param {string} password - Password for decryption
 * @param {string} salt - Base64 encoded salt
 * @returns {string} Decrypted private key
 */
export function decryptPrivateKey(encryptedPrivateKey, password, salt) {
  try {
    const key = deriveKey(password, salt);
    const data = Buffer.from(encryptedPrivateKey, "base64");

    const iv = data.slice(0, IV_LENGTH);
    const tag = data.slice(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
    const encrypted = data.slice(IV_LENGTH + TAG_LENGTH);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    // Optionally set AAD if you want extra authentication, but not required for most cases
    // decipher.setAAD(Buffer.from(salt, "base64"));

    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString("utf8");
  } catch (error) {
    throw new Error("Failed to decrypt private key: " + error.message);
  }
}

/**
 * Generate a new EOA wallet with private key
 * @returns {Object} Wallet object with address and private key
 */
export function generateWallet() {
  // Generate a random 32-byte private key
  const privateKey = crypto.randomBytes(32).toString("hex");

  // Derive address from private key (simplified for demo - in real app use proper derivation)
  const hash = crypto.createHash("sha256").update(privateKey).digest("hex");
  const address = "0x" + hash.slice(-40);

  return {
    address: address,
    privateKey: privateKey,
  };
}

/**
 * Hash data with salt using SHA-256
 * @param {string} data - Data to hash
 * @param {string} salt - Base64 encoded salt
 * @returns {string} Hashed data (hex)
 */
export function hashWithSalt(data, salt) {
  return crypto
    .createHash("sha256")
    .update(data + salt)
    .digest("hex");
}

/**
 * Validate if a string is a valid base64 encoded string
 * @param {string} str - String to validate
 * @returns {boolean} True if valid base64
 */
export function isValidBase64(str) {
  try {
    return Buffer.from(str, "base64").toString("base64") === str;
  } catch {
    return false;
  }
}
