import React, { useEffect } from "react";
import { useWithdrawModal } from "@/providers/WithdrawModalProvider";

const handleCopy = async (text, setCopied) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export default function WalletInfo({
  avatar,
  badge,
  eoaAddress,
  loading,
  error,
}) {
  const [copied, setCopied] = React.useState(false);
  const { openWithdrawModal } = useWithdrawModal();
  
  // Helper to shorten address
  const shortAddress = (addr) =>
    addr ? addr.slice(0, 6) + "..." + addr.slice(-4) : "";

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 px-6 -mt-12 pt-4 pb-4 relative z-10">
      {/* Avatar Skeleton */}
      {loading ? (
        <div className="w-24 h-24 rounded-full bg-slate-800 animate-pulse border-4 border-white/10" />
      ) : (
        <img
          src={avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-white/20 bg-slate-800 object-cover shadow-lg"
        />
      )}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-end justify-between w-full ">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 pt-8">
            {/* Badge Skeleton */}
            {loading ? (
              <span className="inline-block w-14 h-5 rounded-full bg-amber-500/40 animate-pulse" />
            ) : (
              <span className="bg-amber-500/80 text-xs px-2 py-0.5 rounded-full font-semibold text-white shadow">
                {badge}
              </span>
            )}
            {/* Address Skeleton */}
            {loading ? (
              <span className="inline-block w-32 h-6 rounded bg-white/10 animate-pulse" />
            ) : error ? (
              <span className="font-mono text-lg text-red-400 font-semibold">
                Error loading address
              </span>
            ) : (
              <span className="font-mono text-lg text-white font-semibold" alt={eoaAddress}>
                {shortAddress(eoaAddress)}
              </span>
            )}
          </div>
          {/* Full address skeleton */}
          {loading ? (
            <span className="inline-block w-56 h-4 rounded bg-white/5 animate-pulse mt-1" />
          ) : error ? (
            <span className="text-xs text-red-400 font-mono">
              {error?.message || "Failed to load address"}
            </span>
          ) : (
            <button
              className="text-xs text-white/60 font-mono cursor-pointer flex"
              onClick={() => handleCopy(eoaAddress, setCopied)}
            >
              <span className="pr-2">{eoaAddress}</span>
              {copied ? (
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        <button
          className="mt-8 sm:mt-0 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={openWithdrawModal}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}
