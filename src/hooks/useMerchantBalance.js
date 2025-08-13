import { useBalance, useReadContract } from "wagmi";
import { mockUSDCAbi, mockUSDCAddress } from "@/lib/contracts/mockUSDC";
import { mockCoreBtcAddress } from "@/lib/contracts/btc";

export function useMerchantBalance(shopOwner) {
  // btc balance (native)
  const t2core = useBalance({
    address: shopOwner,
    watch: true,
  });

  // USDC balance (mock address — replace with real token)
  const btc = useReadContract({
    address: mockCoreBtcAddress,
    abi: mockUSDCAbi,
    functionName: "balanceOf",
    args: [shopOwner],
    query: { enabled: !!shopOwner },
  });

  const usdc = useReadContract({
    address: mockUSDCAddress,
    abi: mockUSDCAbi,
    functionName: "balanceOf",
    args: [shopOwner],
    query: { enabled: !!shopOwner },
  });

  const usdcFormatted =
    usdc.data !== undefined ? (Number(usdc.data) / 1e6).toFixed(2) : undefined; // assuming 6 decimals for USDC

  return {
    t2coreBalance: t2core.data?.formatted,
    btcBalance: btc.data?.formatted,
    usdcBalance: usdcFormatted,
    isLoading: t2core.isLoading || btc.isLoading || usdc.isLoading,
    refetch: () => {
      t2core.refetch();
      btc.refetch();
      usdc.refetch();
    },
  };
}
