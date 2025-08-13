import React from "react";

export default function WalletInfo({
  avatar,
  badge,
  eoaAddress,
  loading,
  error,
}) {
  // Helper to shorten address
  const shortAddress = (addr) =>
    addr ? addr.slice(0, 6) + "..." + addr.slice(-4) : "";

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
              <span className="font-mono text-lg text-white font-semibold">
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
            <span className="text-xs text-white/60 font-mono">
              {eoaAddress}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
