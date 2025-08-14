import { useBalance, useReadContract } from "wagmi";
import { mockUSDCAbi, mockUSDCAddress } from "@/lib/contracts/mockUSDC";
import { mockCoreBtcAddress, mockCoreBtcAbi } from "@/lib/contracts/btc";
import { tokenList } from "@/lib/tokenlist";

// Format balances for display
const formatNativeBalance = (balance) => {
  if (balance === undefined) return undefined;
  return parseFloat(balance).toFixed(6);
};

const formatTokenBalance = (address, balance)  => {
  const token = tokenList.find((token) => token.address.toLowerCase() === address.toLowerCase());
  if (!token) return undefined;
  return (Number(balance) / 10 ** token.decimals).toFixed(token.decimals - 4);
}

export function useMerchantBalance(shopOwner) {
  // t2core balance (native token)
  const t2core = useBalance({
    address: shopOwner,
    watch: true,
    query: {
      enabled: !!shopOwner,
      staleTime: 30 * 1000, // 30 seconds
    },
  });

  // BTC balance (mock address — replace with real token)
  const btc = useReadContract({
    address: mockCoreBtcAddress,
    abi: mockCoreBtcAbi,
    functionName: "balanceOf",
    args: [shopOwner],
    query: {
      enabled: !!shopOwner,
      staleTime: 30 * 1000, // 30 seconds
    },
  });

  const usdc = useReadContract({
    address: mockUSDCAddress,
    abi: mockUSDCAbi,
    functionName: "balanceOf",
    args: [shopOwner],
    query: {
      enabled: !!shopOwner,
      staleTime: 30 * 1000, // 30 seconds
    },
  });


  return {
    t2coreBalance: formatNativeBalance(t2core.data?.formatted),
    btcBalance: formatTokenBalance(mockCoreBtcAddress, btc.data),
    usdcBalance: formatTokenBalance(mockUSDCAddress, usdc.data),
    isLoading: t2core.isLoading || btc.isLoading || usdc.isLoading,
    isError: t2core.isError || btc.isError || usdc.isError,
    error: t2core.error || btc.error || usdc.error,
    refetch: () => {
      t2core.refetch();
      btc.refetch();
      usdc.refetch();
    },
  };
}
