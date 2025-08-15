
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const eoaAddress = searchParams.get("eoaAddress");
    const limit = parseInt(searchParams.get("limit") || "5", 10);

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

    const payments = await prisma.payment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: payments.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        tokenAddress: payment.tokenAddress,
        status: payment.status,
        createdAt: payment.createdAt,
      }))
    });
  } catch (error) {
    console.error("Error in get-recent-payments API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
