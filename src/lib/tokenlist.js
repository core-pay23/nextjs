import { erc20Abi } from "viem";
import { mockUSDCAddress } from "./contracts/mockUSDC";
import { mockCoreBtcAbi, mockCoreBtcAddress } from "./contracts/btc";

export const tokenList = [
    {
        name: "mockCoreBtc",
        symbol: "mockCoreBtc",
        address: mockCoreBtcAddress,
        decimals: 18,
        abi: mockCoreBtcAbi,
        native: true,
    },
    {
        name: "tCore2",
        symbol: "tCore2",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        abi: erc20Abi,
        native: true,
    },
    {
        name: "Mock USDC",
        symbol: "MOCK USDC",
        address: mockUSDCAddress,
        decimals: 6,
        logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
        abi: erc20Abi,
        native: false,
    },
];