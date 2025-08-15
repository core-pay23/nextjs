
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

    if (!/^0x[a-fA-F0-9]{40}$/.test(eoaAddress)) {
      return NextResponse.json(
        { error: "Invalid EOA address format" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { EoaAddress: eoaAddress },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tokenDistribution = await prisma.payment.groupBy({
      by: ['tokenAddress'],
      _sum: {
        amount: true,
      },
      where: {
        userId: user.id,
        status: 'COMPLETED',
      },
    });

    const tokenList = {
        "0x742d35Cc6634C0532925a3b844Bc454e4438f44e": "BTC",
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": "USDC",
        "0x49242e1b7405148c4627142d1434a29e3a5e9005": "CORE"
    }

    const formattedDistribution = tokenDistribution.map(item => ({
      token: tokenList[item.tokenAddress] || item.tokenAddress,
      volume: item._sum.amount,
    }));

    return NextResponse.json({
      success: true,
      data: formattedDistribution,
    });
  } catch (error) {
    console.error("Error in get-token-distribution API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
