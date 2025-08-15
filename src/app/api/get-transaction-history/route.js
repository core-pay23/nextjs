import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const eoaAddress = searchParams.get("eoaAddress");

    if (!eoaAddress) {
      return NextResponse.json(
        { error: "eoaAddress is required" },
        { status: 400 }
      );
    }

    // Validate wallet address format (basic validation)
    if (!/^0x[a-fA-F0-9]{40}$/.test(eoaAddress)) {
      return NextResponse.json(
        { error: "Invalid EOA address format" },
        { status: 400 }
      );
    }

    // Find user by EOA address
    const user = await prisma.user.findUnique({
      where: { EoaAddress: eoaAddress },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get payments for this user with COMPLETED or FAILED status
    const payments = await prisma.payment.findMany({
      where: {
        userId: user.id,
        status: {
          in: ["COMPLETED", "FAILED", "PENDING"]
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: payments.map(payment => ({
        id: payment.id,
        uniqueId: payment.uniqueId,
        amount: payment.amount,
        tokenAddress: payment.tokenAddress,
        status: payment.status,
        txHash: payment.txHash,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt
      }))
    });
  } catch (error) {
    console.error("Error in get-transaction-history API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
