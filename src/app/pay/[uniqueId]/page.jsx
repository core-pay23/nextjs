import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

const PayPage = async ({ params }) => {
  const { uniqueId } = params;
  let paymentData = null;
  try {
    paymentData = await prisma.payment.findUnique({
      where: { uniqueId },
      include: { User: { select: { EoaAddress: true } } },
    });
    if (!paymentData) {
      console.log(`Payment with uniqueId ${uniqueId} not found`);
      notFound();
    }
  } catch (error) {
    console.error("Error fetching paymentData:", error);
    notFound();
  }

  // Render your payment page here, pass paymentData as needed
  return (
    <div>
      {/* Render paymentData details here */}
      <pre>{JSON.stringify(paymentData, null, 2)}</pre>
    </div>
  );
};

export default PayPage;
