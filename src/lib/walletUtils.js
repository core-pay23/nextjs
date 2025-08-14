import { PrismaClient } from '@prisma/client';
import { generateSalt, generateWallet, encryptPrivateKey, decryptPrivateKey } from './cryptoUtils.js';

const prisma = new PrismaClient();

/**
 * Get or create EOA wallet for a client wallet address
 * @param {string} clientWalletAddress - The client's wallet address
 * @returns {Promise<Object>} User object with EOA address
 */
export async function getOrCreateEOA(clientWalletAddress) {
  try {
    // Validate address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(clientWalletAddress)) {
      throw new Error('Invalid client wallet address format');
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { clientWalletAddress }
    });

    if (!user) {
      // Generate new wallet
      const wallet = generateWallet();
      const salt = generateSalt();
      
      const encryptionPassword = process.env.ENCRYPTION_PASSWORD || 'default-password-change-this';
      const encryptedPrivateKey = encryptPrivateKey(wallet.privateKey, encryptionPassword, salt);

      // Create new user with wallet
      user = await prisma.user.create({
        data: {
          clientWalletAddress,
          EoaAddress: wallet.address,
          EoaPrivateKey: encryptedPrivateKey,
          salt: salt
        }
      });
    }

    return {
      success: true,
      data: {
        clientWalletAddress: user.clientWalletAddress,
        eoaAddress: user.EoaAddress,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  } catch (error) {
    console.error('Error in getOrCreateEOA:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Get decrypted private key for a client wallet address
 * @param {string} clientWalletAddress - The client's wallet address
 * @returns {Promise<string>} Decrypted private key
 */
export async function getPrivateKey(clientWalletAddress) {
  try {
    const user = await prisma.user.findUnique({
      where: { clientWalletAddress }
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.EoaPrivateKey || !user.salt) {
      throw new Error('Private key or salt not found');
    }
    console.log(user)

    const encryptionPassword = process.env.ENCRYPTION_PASSWORD || 'default-password-change-this';
    const decryptedPrivateKey = decryptPrivateKey(user.EoaPrivateKey, encryptionPassword, user.salt);

    return decryptedPrivateKey;
  } catch (error) {
    console.error('Error getting private key:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Check if a client wallet address exists
 * @param {string} clientWalletAddress - The client's wallet address
 * @returns {Promise<boolean>} True if exists
 */
export async function clientExists(clientWalletAddress) {
  try {
    const user = await prisma.user.findUnique({
      where: { clientWalletAddress },
      select: { id: true }
    });
    return !!user;
  } catch (error) {
    console.error('Error checking client existence:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Get all client wallet addresses
 * @returns {Promise<Array>} Array of client wallet addresses
 */
export async function getAllClientAddresses() {
  try {
    const users = await prisma.user.findMany({
      select: {
        clientWalletAddress: true,
        EoaAddress: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return users;
  } catch (error) {
    console.error('Error getting client addresses:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
