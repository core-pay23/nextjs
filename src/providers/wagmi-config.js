"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

// Define Somnia Testnet chain
export const somniaTestnet = defineChain({
  id: 50312,
  name: "Somnia Testnet",
  network: "somnia-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "STT",
    symbol: "STT",
  },
  rpcUrls: {
    public: { http: ["https://rpc.ankr.com/somnia_testnet/6e3fd81558cf77b928b06b38e9409b4677b637118114e83364486294d5ff4811"] },
    default: { http: ["https://rpc.ankr.com/somnia_testnet/6e3fd81558cf77b928b06b38e9409b4677b637118114e83364486294d5ff4811"] },
  },
  blockExplorers: {
    blockscout: {
      name: "Blockscout",
      url: "https://shannon-explorer.somnia.network/",
    },
    default: {
      name: "Blockscout",
      url: "https://shannon-explorer.somnia.network/",
    },
  },
  testnet: true,
});
// export const somniaTestnet = defineChain({
//   id: 421614,
//   name: "Arbitrum Sepolia",
//   network: "arbitrum-sepolia",
//   nativeCurrency: {
//     decimals: 18,
//     name: "ETH",
//     symbol: "ETH",
//   },
//   rpcUrls: {
//     public: { http: ["https://arbitrum-sepolia.api.onfinality.io/public"] },
//     default: { http: ["https://arbitrum-sepolia.api.onfinality.io/public"] },
//   },
//   blockExplorers: {
//     blockscout: {
//       name: "Blockscout",
//       url: "https://web3.okx.com/explorer/arbitrum-one/",
//     },
//     default: {
//       name: "Blockscout",
//       url: "https://web3.okx.com/explorer/arbitrum-one/",
//     },
//   },
//   testnet: true,
// });

export const somniaWagmiConfig = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [somniaTestnet],
  ssr: false,
});

export default somniaWagmiConfig;
