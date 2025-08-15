import { PrismaClient } from '@prisma/client';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { generateUniqueId } = require('../src/lib/utils/strings.js');

// Import token addresses
import { mockUSDCAddress } from '../src/lib/contracts/mockUSDC.js';
import { mockCoreBtcAddress } from '../src/lib/contracts/btc.js';

const prisma = new PrismaClient();

async function main() {
  // First, check if we have any users
  const users = await prisma.user.findMany();
  console.log('Existing users:', users);

  // If no users exist, create a test user
  let user;
  if (users.length === 0) {
    console.log('Creating test user...');
    user = await prisma.user.create({
      data: {
        clientWalletAddress: '0x1234567890123456789012345678901234567890',
        EoaAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
        salt: 'test-salt',
      },
    });
    console.log('Created user:', user);
  } else {
    user = users[0]; // Use the first user for testing
  }

  // Create some test payments with real token addresses
  console.log('Creating test payments...');
  
  // Create a completed payment with USDC (6 decimals)
  const completedPayment = await prisma.payment.create({
    data: {
      uniqueId: generateUniqueId(),
      amount: 100500000, // 100.50 USDC (6 decimals)
      tokenAddress: mockUSDCAddress,
      status: 'COMPLETED',
      txHash: '0xTxHash1',
      userId: user.id,
    },
  });
  console.log('Created completed payment (USDC):', completedPayment);

  // Create a failed payment with BTC (8 decimals)
  const failedPayment = await prisma.payment.create({
    data: {
      uniqueId: generateUniqueId(),
      amount: 7525000000, // 75.25 BTC (8 decimals)
      tokenAddress: mockCoreBtcAddress,
      status: 'FAILED',
      userId: user.id,
    },
  });
  console.log('Created failed payment (BTC):', failedPayment);

  // Create a pending payment with tCore2 (native token)
  const pendingPayment = await prisma.payment.create({
    data: {
      uniqueId: generateUniqueId(),
      amount: 200.00,
      tokenAddress: '0x0000000000000000000000000000000000000000',
      status: 'PENDING',
      userId: user.id,
    },
  });
  console.log('Created pending payment (tCore2, should not appear in history):', pendingPayment);

  // Fetch and display the transaction history for the user
  const payments = await prisma.payment.findMany({
    where: {
      userId: user.id,
      status: {
        in: ["COMPLETED", "FAILED"]
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  console.log('Transaction history for user:', payments);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
