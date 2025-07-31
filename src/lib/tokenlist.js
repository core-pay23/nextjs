import { erc20Abi } from "viem";

export const tokenList = [
    {
        name: "Lisk",
        symbol: "LSK",
        address: "0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D",
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/1214.png",
        abi: erc20Abi,
        native: false,
    },
    {
        name: "Ethereum",
        symbol: "ETH",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
        abi: erc20Abi,
        native: true,
    },
    {
        name: "Mock USDC",
        symbol: "MOCK USDC",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        decimals: 6,
        logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
        abi: erc20Abi,
        native: false,
    },
];