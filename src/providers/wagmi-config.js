"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

// Define Lisk Sepolia chain
export const liskSepolia = defineChain({
  id: 4202,
  name: "Lisk Sepolia Testnet",
  network: "lisk-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc.sepolia-api.lisk.com"] },
    default: { http: ["https://rpc.sepolia-api.lisk.com"] },
  },
  blockExplorers: {
    blockscout: {
      name: "Blockscout",
      url: "https://sepolia-blockscout.lisk.com",
    },
    default: {
      name: "Blockscout",
      url: "https://sepolia-blockscout.lisk.com",
    },
  },
  testnet: true,
});

export const liskWagmiConfig = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [liskSepolia],
  ssr: false,
});

export default liskWagmiConfig;
