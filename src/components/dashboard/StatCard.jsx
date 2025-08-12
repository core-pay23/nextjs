"use client";
import { useEOAAddress } from "@/hooks";
import { useMerchantBalance } from "@/hooks/useMerchantBalance";

export default function StatCard({ isLoading = false }) {
  const { eoaAddress, loading, error, clientWalletAddress } = useEOAAddress();
  const {
    ethBalance,
    usdcBalance,
    isLoading: isBalanceLoading,
    refetch: refetchBalances,
  } = useMerchantBalance(eoaAddress);

  const loadingBalance = isLoading || isBalanceLoading;

  return (
    <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-slate-900/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-white/60 font-medium">ETH & USDC</p>
        </div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="h-4 w-4 text-blue-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 1.75l-6.25 10.5L12 16l6.25-3.75L12 1.75zM5.75 13.5L12 22.25l6.25-8.75L12 17.25 5.75 13.5z" />
            </svg>
          </div>
          <div className="h-8 w-8 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="h-4 w-4 text-green-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
            </svg>
          </div>
        </div>
      </div>

      {loadingBalance ? (
        <div className="space-y-3">
          <div className="h-6 bg-white/10 animate-pulse rounded"></div>
          <div className="h-6 bg-white/10 animate-pulse rounded w-4/5"></div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
              <span className="text-xs text-white/70">ETH</span>
            </div>
            <span className="text-lg font-semibold text-white">
              {ethBalance ?? "0.00"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-white/70">USDC</span>
            </div>
            <span className="text-lg font-semibold text-white">
              ${usdcBalance ?? "0.00"}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
