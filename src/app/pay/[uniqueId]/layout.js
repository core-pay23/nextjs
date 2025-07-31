import DashboardProvider from "@/providers/DashboardProvider";
import prisma from "@/lib/prisma";
import React from "react";
import { notFound } from "next/navigation";

const PayLayout = async ({ children, params }) => {

  return (
    <DashboardProvider>
      {children}
    </DashboardProvider>
  );
};

export default PayLayout;
