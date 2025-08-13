"use client";

import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import coreWagmiConfig from "./wagmi-config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const DashboardProvider = ({ children }) => {
  return (
    <WagmiProvider config={coreWagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default DashboardProvider;
