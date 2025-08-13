'use client';

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
        logoURI: "/icons/btc.png",
    },
    {
        name: "tCore2",
        symbol: "tCore2",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        abi: erc20Abi,
        logoURI: "/icons/core.png",
        native: true,
    },
    {
        name: "Mock USDC",
        symbol: "MOCK USDC",
        address: mockUSDCAddress,
        decimals: 6,
        logoURI: "/icons/usdc.png",
        abi: erc20Abi,
        native: false,
    },
];

export const getTokenByName = (name) => {
    return tokenList.find((token) => token.name === name);
};