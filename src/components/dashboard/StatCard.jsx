"use client";
import { useEOAAddress } from "@/hooks";
import { useMerchantBalance } from "@/hooks/useMerchantBalance";
import { getTokenByName } from "@/lib/tokenlist";

const tCore2 = getTokenByName("tCore2");
const usdc = getTokenByName("Mock USDC");

export default function StatCard({ isLoading = false }) {
  const { eoaAddress, loading, error, clientWalletAddress } = useEOAAddress();
  const {
    btcBalance,
    usdcBalance,
    isLoading: isBalanceLoading,
    refetch: refetchBalances,
  } = useMerchantBalance(eoaAddress);

  const loadingBalance = isLoading || isBalanceLoading;

  return (
    <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-slate-900/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-white/60 font-medium">EOA Balance</p>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className={`h-8 w-8 bg-green-500/20 rounded-lg flex items-center justify-center hover:bg-green-500/40 transition relative overflow-hidden group focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed ${loadingBalance ? 'cursor-wait' : ''}`}
            onClick={refetchBalances}
            title="Refresh balances"
            disabled={loadingBalance}
          >
            <svg
              className={`h-4 w-4 text-green-400 transition-transform duration-300 ${loadingBalance ? 'animate-spin' : 'group-hover:rotate-90'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.13-3.36L23 10" />
              <path d="M20.49 15A9 9 0 015.87 18.36L1 14" />
            </svg>
            {loadingBalance && (
              <span className="absolute inset-0 flex items-center justify-center bg-green-500/30 animate-pulse rounded-lg"></span>
            )}
          </button>
        </div>
      </div>

      {loadingBalance ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="h-4 w-10 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-16 bg-white/10 rounded animate-pulse"></div>
          </div>
          {/* USDC skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="h-4 w-12 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-20 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
              <span className="text-xs text-white/70">CoreBTC</span>
            </div>
            <span className="text-lg font-semibold text-white">
              {btcBalance ?? "0.00"}
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
