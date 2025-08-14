import { useBalance, useReadContract } from "wagmi";
import { mockUSDCAbi, mockUSDCAddress } from "@/lib/contracts/mockUSDC";
import { mockCoreBtcAddress, mockCoreBtcAbi } from "@/lib/contracts/btc";

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

  const usdcFormatted =
    usdc.data !== undefined ? (Number(usdc.data) / 1e6).toFixed(2) : undefined; // assuming 6 decimals for USDC

  // Format balances for display
  const formatBalance = (balance) => {
    if (balance === undefined) return undefined;
    return parseFloat(balance).toFixed(6);
  };

  return {
    t2coreBalance: formatBalance(t2core.data?.formatted),
    btcBalance: formatBalance(btc.data?.formatted),
    usdcBalance: usdcFormatted,
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
