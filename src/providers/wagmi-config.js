"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

// Define Somnia Testnet chain
export const coreTestnet = defineChain({
  id: 1114,
  name: "Somnia Testnet",
  network: "somnia-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tCORE2",
    symbol: "tCORE2",
  },
  rpcUrls: {
    public: { http: ["https://rpc.test2.btcs.network/"] },
    default: { http: ["https://rpc.test2.btcs.network/"] },
  },
  blockExplorers: {
    blockscout: {
      name: "Blockscout",
      url: "https://scan.test2.btcs.network/",
    },
    default: {
      name: "Blockscout",
      url: "https://scan.test2.btcs.network/",
    },
  },
  testnet: true,
});

export const coreWagmiConfig = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [coreTestnet],
  ssr: false,
});

export default coreWagmiConfig;
