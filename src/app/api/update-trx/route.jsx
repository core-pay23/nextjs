import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { uniqueId, txHash } = await request.json();

    // Validate input
    if (!uniqueId || !txHash) {
      return new Response(JSON.stringify({ error: "Invalid input: uniqueId and txHash are required" }), {
        status: 400,
      });
    }

    // Find payment with uniqueId where status is PENDING
    const payment = await prisma.payment.findUnique({
      where: {
        uniqueId: uniqueId,
        status: "PENDING",
      },
    });

    if (!payment) {
      return new Response(JSON.stringify({ error: "Payment not found or not in PENDING status" }), {
        status: 404,
      });
    }

    // Update payment status to COMPLETED and set txHash
    const updatedPayment = await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: "COMPLETED",
        txHash: txHash,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        payment: {
          id: updatedPayment.id,
          uniqueId: updatedPayment.uniqueId,
          status: updatedPayment.status,
          txHash: updatedPayment.txHash,
          updatedAt: updatedPayment.updatedAt,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating payment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update payment" }),
      { status: 500 }
    );
  }
}
