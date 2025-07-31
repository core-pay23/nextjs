import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateSalt, generateWallet, encryptPrivateKey } from '@/lib/cryptoUtils';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientWalletAddress = searchParams.get('clientWalletAddress');

    if (!clientWalletAddress) {
      return NextResponse.json(
        { error: 'clientWalletAddress is required' },
        { status: 400 }
      );
    }

    // Validate wallet address format (basic validation)
    if (!/^0x[a-fA-F0-9]{40}$/.test(clientWalletAddress)) {
      return NextResponse.json(
        { error: 'Invalid client wallet address format' },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { clientWalletAddress }
    });

    if (!user) {
      // Generate new wallet
      const wallet = generateWallet();
      const salt = generateSalt();
      
      // For now, we'll store the private key as-is (in production, encrypt it)
      // You should use a secure password for encryption in production
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

    return NextResponse.json({
      success: true,
      data: {
        clientWalletAddress: user.clientWalletAddress,
        eoaAddress: user.EoaAddress,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Error in get-eoa-address API:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Wallet address already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Also support POST method for better security
export async function POST(request) {
  try {
    const { clientWalletAddress } = await request.json();

    if (!clientWalletAddress) {
      return NextResponse.json(
        { error: 'clientWalletAddress is required' },
        { status: 400 }
      );
    }

    // Validate wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(clientWalletAddress)) {
      return NextResponse.json(
        { error: 'Invalid client wallet address format' },
        { status: 400 }
      );
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

    return NextResponse.json({
      success: true,
      data: {
        clientWalletAddress: user.clientWalletAddress,
        eoaAddress: user.EoaAddress,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Error in get-eoa-address API:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Wallet address already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}