import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import PaymentContainer from "./_components/PaymentContainer";

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

  return <PaymentContainer paymentData={paymentData} />;
};

export default PayPage;
