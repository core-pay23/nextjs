import { useBalance, useReadContract } from "wagmi";
import { mockUSDCAbi, mockUSDCAddress } from "@/lib/contracts/mockUSDC";

export function useMerchantBalance(shopOwner) {
  // ETH balance (native)
  const eth = useBalance({
    address: shopOwner,
    watch: true,
  });

  // USDC balance (mock address — replace with real token)
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
    ethBalance: eth.data?.formatted,
    usdcBalance: usdcFormatted,
    isLoading: eth.isLoading || usdc.isLoading,
    refetch: () => {
      eth.refetch();
      usdc.refetch();
    },
  };
}
