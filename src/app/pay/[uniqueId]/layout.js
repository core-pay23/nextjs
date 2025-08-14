import DashboardProvider from "@/providers/DashboardProvider";
import React from "react";

const PayLayout = async ({ children, params }) => {

  return (
    <DashboardProvider>
      {children}
    </DashboardProvider>
  );
};

export default PayLayout;
