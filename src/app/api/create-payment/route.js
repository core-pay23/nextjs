import { verifyMessage } from "viem";
import { PrismaClient } from "@prisma/client";
import { generateUniqueId } from "@/lib/utils/strings";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const {
      amount,
      tokenAddress,
      clientWalletAddress,
      signedMessage,
      message,
    } = await request.json();

    // Validate input
    if (
      !amount ||
      !tokenAddress ||
      !clientWalletAddress ||
      !signedMessage ||
      !message
    ) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
      });
    }

    const valid = await verifyMessage({
      address: clientWalletAddress,
      message: message,
      signature: signedMessage,
    });

    if (!valid) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
      });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clientWalletAddress },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        uniqueId: generateUniqueId(),
        amount: parseFloat(amount),
        tokenAddress,
        userId: user.id,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        payment: {
          id: payment.id,
          uniqueId: payment.uniqueId,
          amount: payment.amount,
          tokenAddress: payment.tokenAddress,
          createdAt: payment.createdAt,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create payment" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
